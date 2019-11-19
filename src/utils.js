const readline = require('readline');

const clearConsole = () => {
  const blankScreen = '\n'.repeat(process.stdout.rows);
  console.log(blankScreen);
  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);
};

const removeBoundaryQuotes = str => str.replace(/^"|"$/g, '');

const formatBookOutput = book => {
  const { title, authors, publisher } = book;
  let output = title;
  output += authors ? ` by ${authors.join(', ')}` : '';
  output += publisher ? `, published by ${publisher}` : '';
  return output;
};

module.exports = {
  clearConsole,
  removeBoundaryQuotes,
  formatBookOutput,
};
