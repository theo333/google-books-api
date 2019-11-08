const inquirer = require('inquirer');
const axios = require('axios');
const readline = require('readline');

// TODO move all helper functions to utils.js
const clearConsole = () => {
  const blankScreen = '\n'.repeat(process.stdout.rows);
  console.log(blankScreen);
  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);
};

const getBooks = async searchQuery => {
  try {
    const fields = 'items(id,volumeInfo(title,authors,publisher))';
    // TODO working without key, so need it?
    // TODO in production app would move to .env file and grab using process.env
    const key = 'AIzaSyCT1qXZGb5kCBEuUJxWhS8YzL9CgwVS6Kg';

    const res = await axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: searchQuery,
        startIndex: 0,
        maxResults: 5,
        fields,
      },
    });
    return res.data.items;
  } catch (error) {
    console.error(error);
  }
};

const formatBookResults = results => {
  const formatted = results.map(x => {
    const { title, authors, publisher } = x.volumeInfo;
    return {
      name: `${title} by ${authors.join(', ')}, published by ${publisher}`,
      value: title,
      short: title,
    };
  });
  // console.log('formatted: ', formatted);
  return formatted;
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
    message: 'Here are the results of your query. Select all you want to add to your Reading List',
    async choices(answers) {
      const results = await getBooks(answers.searchQuery);
      return formatBookResults(results);
    },
    when(answers) {
      return answers.searchQuery;
    },
  },
];

const bookCli = async () => {
  clearConsole();
  console.log('Welcome to BookFinder!');
  // try {
  //   // prompt:  Search | List
  //   // answer: search
  //   // prompt (when): input search query
  //   // answer: call getBooks(searchQuery)
  //   // prompt (when): display results
  //   const answers1 = await inquirer.prompt(questions);
  //   console.log(answers1);

  //   if (answers1.searchQuery) {
  //     console.log('searchQuery: ', answers1.searchQuery);
  //   }
  // } catch (error) {
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
