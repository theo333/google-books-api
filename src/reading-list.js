const { existsSync, readFileSync, writeFileSync } = require('fs');
const { formatBookOutput } = require('./utils');

const fileUrl = `${process.cwd()}/data/list.json`;

const getReadingListJson = file => {
  if (existsSync(file)) {
    const rawData = readFileSync(file);
    return rawData.length ? JSON.parse(rawData) : [];
  }
  return [];
};

const addToReadingList = (bookResults, itemsToAddTitle) => {
  const oldList = getReadingListJson(fileUrl);

  // filter bookResults to only include addToList items
  const itemsToAdd = bookResults.filter(x => itemsToAddTitle.includes(x.title));

  const notInList = (oldList, obj) => {
    return !oldList.find(x => x.title === obj.title);
  };

  let itemsToAddNotInList = [];
  if (oldList.length) {
    itemsToAddNotInList = itemsToAdd.filter(x => notInList(oldList, x));
    if (!itemsToAddNotInList.length)
      console.log('\nThese book(s) are already on your Reading List.\n');
  } else {
    itemsToAddNotInList = itemsToAdd;
  }

  const newList = oldList.concat(itemsToAddNotInList);

  // TODO? display updated reading list

  // save to json file
  const data = JSON.stringify(newList, null, 2);
  writeFileSync(fileUrl, data);
};

const getReadingList = () => {
  const readingListJson = getReadingListJson(fileUrl);
  if (readingListJson.length) {
    readingListJson.forEach(book => {
      console.log(formatBookOutput(book, 'reading-list'));
    });
  } else {
    console.log('\nThere are no books in your reading list.\n');
  }
};

module.exports = {
  addToReadingList,
  getReadingList,
};
