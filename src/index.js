const inquirer = require('inquirer');

const clearConsole = require('./utils');
const { getBooks, formatBookResults } = require('./books');
const { addToReadingList, getReadingList } = require('./reading-list');

const firstQuestion = [
  {
    type: 'list',
    name: 'action',
    message: 'What do you want to do?',
    choices: [
      { name: 'Search for book', value: 'search' },
      { name: 'View Reading List', value: 'list' },
      { name: 'Exit', value: 'exit' },
    ],
  },
  {
    type: 'input',
    name: 'searchQuery',
    message: 'Enter what you want to search for:',
    when(answers) {
      return answers.action === 'search';
    },
  },
  // {
  //   type: 'expand',
  //   name: 'readingList',
  //   message: 'Reading List',
  //   choices: ['test1', 'test2'],
  //   when(answers) {
  //     return answers.action === 'list';
  //   },
  // },
  // {
  //   type: 'checkbox',
  //   name: 'results',
  //   message: 'Here are the results of your query. Select all you want to add to your Reading List',
  //   async choices(answers) {
  //     const results = await getBooks(answers.searchQuery);
  //     return formatBookResults(results);
  //   },
  //   when(answers) {
  //     return answers.searchQuery;
  //   },
  // },
];

const bookCli = async () => {
  clearConsole();
  console.log('Welcome to BookFinder!');
  try {
    const firstAnswer = await inquirer.prompt(firstQuestion);
    // console.log('firstAnswer: ', firstAnswer);

    if (firstAnswer.searchQuery) {
      // console.log('searchQuery: ', firstAnswer.searchQuery);
      const bookResults = await getBooks(firstAnswer.searchQuery);
      // console.log('bookResults: ', bookResults);
      // console.log('bookResults: ', JSON.stringify(bookResults));

      // add to list prompt
      const addToListAnswer = await inquirer.prompt({
        type: 'checkbox',
        name: 'addToList',
        message:
          'Here are the results of your query. Select all you want to add to your Reading List',
        async choices() {
          return formatBookResults(bookResults);
        },
      });

      if (addToListAnswer.addToList) {
        addToReadingList(bookResults, addToListAnswer.addToList);
      }
    }

    if (firstAnswer.action === 'list') {
      // console.log('getReadingList: ', getReadingList());
      getReadingList();
    }

    if (firstAnswer.action === 'exit') {
      console.log('exit')
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  bookCli,
};
