const inquirer = require('inquirer');
const { clearConsole } = require('./utils');
const { getReadingList } = require('./reading-list');
const search = require('./search');
const { helloByeColor, infoColor, errorColor } = require('./colors');

const mainQuestion = [
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
  console.log(`Welcome to ${helloByeColor('BookFinderCLI')}!\n`);
  try {
    let exitApp = false;
    while (!exitApp) {
      const mainAnswer = await inquirer.prompt(mainQuestion);

      const { action, searchQuery } = mainAnswer;

      switch (action) {
        case 'search':
          await search(searchQuery);
          break;
        case 'list':
          console.log('\n');
          getReadingList();
          break;
        case 'exit':
          console.log(
            `\nThanks for using ${helloByeColor(
              'BookFinderCLI',
            )}!\n\nHave a great day!\n\n${infoColor('********************************')}\n`,
          );
          exitApp = true;
          break;
        default:
          console.log('Must select from one of the choices given.');
      }
    }
  } catch (error) {
    throw new Error(errorColor(error));
  }
};

module.exports = bookCli;
