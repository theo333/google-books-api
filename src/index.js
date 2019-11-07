const inquirer = require('inquirer');
const axios = require('axios');


const getBooks = async (search_terms) => {
  try {
    const key = 'AIzaSyCT1qXZGb5kCBEuUJxWhS8YzL9CgwVS6Kg';
    const fields = 'items(id,volumeInfo(title,authors,publisher))';
    const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search_terms}&startIndex=0&maxResults=5&fields=${fields}`);
    // const res = await axios.get(`https://www.googleapis.com/books/v1/volumes`);
    // const res = await axios.get(`https://www.googleapis.com/books/v1?fields=items`);
    console.log('results: ', res.data)
  } catch (error) {
    console.error(error);
  }

}

const questions = [
  {
    type: 'list',
    name: 'action',
    message: 'What do you want to do?',
    choices: ['Search for book', 'View Reading List'],
  },
];

const bookCli = () => {
  inquirer
    .prompt(questions)
    .then(({ action }) => {
      if (action === 'Search for book') {
        console.info('Call API to: ', action)

        // grab data from api
        // display data
        // be able to select books want to add to 
      } else {
        // grab reading list from json file
        // display books
        // selecting book will show author, publisher (use expand type)
        console.log('display book list')
      }
    })
}

module.exports = {
  getBooks,
  bookCli,
};