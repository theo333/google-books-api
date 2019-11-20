const inquirer = require('inquirer');
const { getBooks, bookChoices } = require('./books');
const { addToReadingList } = require('./reading-list');

const search = async query => {
  if (query) {
    const bookResults = await getBooks(query);

    // addToList prompt / answer
    if (bookResults.length) {
      const addToListAnswer = await inquirer.prompt({
        type: 'checkbox',
        name: 'addToList',
        message: `Search results for: "${query}". Select all you want to add to your Reading List`,
        async choices() {
          return bookChoices(bookResults);
        },
      });

      if (addToListAnswer.addToList.length) {
        addToReadingList(bookResults, addToListAnswer.addToList);
      } else {
        console.log('\nNo books added to your list.\n');
      }
    }
  } else {
    console.log('No search query entered.  Please try again.');
  }
};

module.exports = search;
