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
];

const bookCli = async () => {
  clearConsole();
  console.log('Welcome to BookFinder!');
  try {
    let exitApp = false;
    while (!exitApp) {
      const firstAnswer = await inquirer.prompt(firstQuestion);

      if (firstAnswer.action === 'search') {
        if (firstAnswer.searchQuery) {
          const bookResults = await getBooks(firstAnswer.searchQuery);

          // addToList prompt / answer
          const addToListAnswer = await inquirer.prompt({
            type: 'checkbox',
            name: 'addToList',
            message:
              'Here are the results of your query. Select all you want to add to your Reading List',
            async choices() {
              return formatBookResults(bookResults);
            },
          });

          if (addToListAnswer.addToList.length) {
            addToReadingList(bookResults, addToListAnswer.addToList);
          } else {
            console.log('\nNo books added to your list.\n');
          }
        } else {
          console.log('No search query entered.  Please try again.');
        }
      }

      if (firstAnswer.action === 'list') {
        console.log('\n');
        getReadingList();
        console.log('\n');
      }

      if (firstAnswer.action === 'exit') {
        console.log('Thanks for using BookFinder!\nHave a great day!\n');
        exitApp = true;
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  bookCli,
};
