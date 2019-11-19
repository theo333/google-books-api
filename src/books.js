const axios = require('axios');
const { removeBoundaryQuotes } = require('./utils');

const getBooks = async searchQuery => {
  try {
    const fields = 'items(id,volumeInfo(title,authors,publisher))';
    // TODO working without key, so need it?
    // TODO in production app would move to .env file and grab using process.env
    // const key = '';

    const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: searchQuery,
        startIndex: 0,
        maxResults: 5,
        fields,
      },
    });
    const books = response.data.items.map(x => {
      if (x.volumeInfo.publisher) {
        x.volumeInfo.publisher = removeBoundaryQuotes(x.volumeInfo.publisher);
      }
      return x.volumeInfo;
    });
    return books;
  } catch (error) {
    console.error(error);
  }
};

const formatBookResults = results => {
  console.log('results: ', results);
  const formatted = results.map(x => {
    const { title, authors, publisher } = x;
    let name = title;
    name += authors ? ` by ${authors.join(', ')}` : '';
    name += publisher ? `, published by ${publisher}` : '';
    return {
      name,
      value: title,
      short: title,
    };
  });
  return formatted;
};

module.exports = {
  getBooks,
  formatBookResults,
};
