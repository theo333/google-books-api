const axios = require('axios');

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
    const books = response.data.items.map(x => x.volumeInfo);
    return books;
  } catch (error) {
    console.error(error);
  }
};

const formatBookResults = results => {
  const formatted = results.map(x => {
    const { title, authors, publisher } = x;
    return {
      name: `${title} by ${authors.join(', ')}, published by ${publisher}`,
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
