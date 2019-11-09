const { existsSync, readFileSync, writeFileSync } = require('fs');

// grab reading list from json file
// display books
// selecting book will show author, publisher (use expand type)

// think I need to do something like JSON.parse()
// fs.readFileSync(path.resolve(__dirname, 'json_filename.json'), function(err, data) {
// parse data into an object
// return the array of objects
// });

// addBookToList
// list.push()

// removeBookToList
// list.filter()

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

module.exports = {
  addToReadingList,
};
