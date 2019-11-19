const axios = require('axios');
const { removeBoundaryQuotes, formatBookOutput } = require('./utils');

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
  const formatted = results.map(book => {
    const { title } = book;
    const name = formatBookOutput(book);
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
