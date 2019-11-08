const inquirer = require('inquirer');
const axios = require('axios');

const getBooks = async searchQuery => {
  try {
    const fields = 'items(id,volumeInfo(title,authors,publisher))';
    const key = 'AIzaSyCT1qXZGb5kCBEuUJxWhS8YzL9CgwVS6Kg';

    const res = await axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: searchQuery,
        startIndex: 0,
        maxResults: 5,
        fields,
      },
    });
    const results = res.data.items;
    const titleResults = results.map(x => x.volumeInfo.title);
    console.log('titleResults: ', titleResults);
    return titleResults;
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
  {
    type: 'input',
    name: 'searchQuery',
    message: 'Enter what you want to search for:',
    when(answers) {
      return answers.action === 'Search for book';
    },
  },
  {
    type: 'checkbox',
    name: 'results',
    message:
      'Here are the results of your query. /n Select all you want to add to your Reading List',
    async choices(answers) {
      return getBooks(answers.searchQuery);
    },
    when(answers) {
      return answers.searchQuery;
    },
  },
];

const bookCli = async () => {
  // try {
  //   // prompt:  Search | List
  //     // answer: search
  //       // prompt (when): input search query
  //         // answer: call getBooks(searchQuery)
  //           // prompt (when): display results

  // } catch(error) {
  //   throw new Error(error);
  // }

  inquirer.prompt(questions).then(({ action, searchQuery, results }) => {
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
    // if (searchQuery) console.log('searchQuery: ', getBooks(searchQuery));
    if (results) console.log('results: ', results);
  });
};

module.exports = {
  getBooks,
  bookCli,
};
