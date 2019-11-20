const axios = require('axios');
const { removeBoundaryQuotes, formatBookOutput } = require('./utils');

const getBooks = async searchQuery => {
  try {
    const fields = 'items(id,volumeInfo(title,authors,publisher))';
    // TODO working without key, so need it?
    // TODO in production app would move to .env file and grab using process.env
    // const key = '';

    const _response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: searchQuery,
        startIndex: 0,
        maxResults: 5,
        fields,
      },
    });
    const response = _response.data.items;
    if (response) {
      const books = response.map(book => {
        const { volumeInfo } = book;
        if (volumeInfo.publisher) {
          volumeInfo.publisher = removeBoundaryQuotes(volumeInfo.publisher);
        }
        return volumeInfo;
      });
      return books;
    }
    console.log('\nNo results for your search.  Please try again.\n');
    return [];
  } catch (error) {
    console.error(error);
  }
};

//
const formatBookChoices = results => {
  // console.log('results: ', results);
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
  formatBookChoices,
};
