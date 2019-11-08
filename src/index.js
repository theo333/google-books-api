const inquirer = require('inquirer');
const axios = require('axios');

const getBooks = async searchTerms => {
  try {
    const fields = 'items(id,volumeInfo(title,authors,publisher))';
    const key = 'AIzaSyCT1qXZGb5kCBEuUJxWhS8YzL9CgwVS6Kg';

    const res = await axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: searchTerms,
        startIndex: 0,
        maxResults: 5,
        fields,
      },
    });
    console.log(res.data.items);
    return res.data.items;
  } catch (error) {
    console.error(error);
  }
};

const questions = [
  {
    type: 'list',
    name: 'action',
    message: 'What do you want to do?',
    choices: ['Search for book', 'View Reading List'],
  },
];

const bookCli = () => {
  inquirer.prompt(questions).then(({ action }) => {
    if (action === 'Search for book') {
      console.info('Call API to: ', action);

      // grab data from api
      // display data
      // be able to select books want to add to
    } else {
      // grab reading list from json file
      // display books
      // selecting book will show author, publisher (use expand type)
      console.log('display book list');
    }
  });
};

module.exports = {
  getBooks,
  bookCli,
};
