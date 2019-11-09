const { existsSync, readFileSync, writeFileSync } = require('fs');

// grab reading list from json file
// display books
// selecting book will show author, publisher (use expand type)

// think I need to do something like JSON.parse()
// fs.readFileSync(path.resolve(__dirname, 'json_filename.json'), function(err, data) {
// parse data into an object
// return the array of objects
// });

// removeBookToList
// list.filter()

const fileUrl = `${process.cwd()}/src/list.json`;

const getReadingListJson = file => {
  if (existsSync(file)) {
    const rawData = readFileSync(file);
    return rawData.length ? JSON.parse(rawData) : [];
  }
};

const addToReadingList = (bookResults, itemsToAddTitle) => {
  // grab json file
  const oldList = getReadingListJson(fileUrl);

  // filter bookResults to only include addToList items
  const itemsToAdd = bookResults.filter(x => itemsToAddTitle.includes(x.title));

  const notInList = (oldList, obj) => {
    return !oldList.find(x => x.title === obj.title);
  };

  const itemsToAddNotInList = itemsToAdd.filter(x => notInList(oldList, x));
  const newList = oldList.concat(itemsToAddNotInList);

  // save to json file
  const data = JSON.stringify(newList, null, 2);
  writeFileSync(fileUrl, data);
};

const getReadingList = () => {
  // grab json
  const readingListJson = getReadingListJson(fileUrl);
  readingListJson.forEach(x => {
    console.log(x.title);
  });
};

module.exports = {
  addToReadingList,
  getReadingList,
};
