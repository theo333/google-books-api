const inquirer = require('inquirer');
const axios = require('axios');
const readline = require('readline');
const { existsSync, readFileSync, writeFileSync } = require('fs');

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
  // console.log('formatted: ', formatted);
  return formatted;
};

const firstQuestion = [
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

// const questions2 = [
//   {
//     type: 'checkbox',
//     name: 'results',
//     message: 'Here are the results of your query. Select all you want to add to your Reading List',
//     async choices(bookResults) {
//       // const results = await getBooks(answers.searchQuery);
//       return formatBookResults(bookResults);
//     },
//   },
// ];

const bookCli = async () => {
  clearConsole();
  console.log('Welcome to BookFinder!');
  try {
    // prompt:  Search | List
    // answer: search
    // prompt (when): input search query
    // answer: call getBooks(searchQuery)
    // prompt (when): display results
    const firstAnswer = await inquirer.prompt(firstQuestion);
    // console.log('firstAnswer: ', firstAnswer);

    if (firstAnswer.searchQuery) {
      console.log('searchQuery: ', firstAnswer.searchQuery);
      const bookResults = await getBooks(firstAnswer.searchQuery);
      console.log('bookResults: ', bookResults);
      console.log('bookResults: ', JSON.stringify(bookResults));

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
        const addToReadingList = (bookResults, itemsToAddTitle) => {
          console.log('itemsToAddTitle: ', itemsToAddTitle);

          // grab json file
          const fileUrl = `${process.cwd()}/src/list.json`;
          let oldList = [];
          if (existsSync(fileUrl)) {
            const rawData = readFileSync(fileUrl);
            console.log('rawData: ', rawData.length);
            oldList = rawData.length ? JSON.parse(rawData) : [];
          }
          console.log('oldList: ', oldList);

          // filter bookResults to only include addToList items
          const itemsToAdd = bookResults.filter(x => itemsToAddTitle.includes(x.title));
          // console.log('itemsToAdd: ', itemsToAdd);

          // oldList.concat(newBooksToAdd_array)
          // TODO check to make sure item is not already in oldList before add so that do not get duplicates
          const newList = oldList.concat(itemsToAdd);
          console.log('newList: ', newList);

          // save json file
          const data = JSON.stringify(newList);
          writeFileSync(fileUrl, data);
        };

        addToReadingList(bookResults, addToListAnswer.addToList);
      }
    }
  } catch (error) {
    throw new Error(error);
  }

  // inquirer.prompt(questions).then(({ action, searchQuery, results }) => {
  //   if (action === 'Search for book') {
  //     console.info('Call API to: ', action);

  //     // grab data from api
  //     // display data
  //     // be able to select books want to add to
  //   } else {
  //     // grab reading list from json file
  //     // display books
  //     // selecting book will show author, publisher (use expand type)
  //     console.log('display book list');
  //   }
  //   // if (searchQuery) console.log('searchQuery: ', getBooks(searchQuery));
  //   if (results) console.log('results: ', results);
  // });
};

module.exports = {
  getBooks,
  bookCli,
};
