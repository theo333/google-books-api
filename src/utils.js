const readline = require('readline');

const clearConsole = () => {
  const blankScreen = '\n'.repeat(process.stdout.rows);
  console.log(blankScreen);
  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);
};

const removeBoundaryQuotes = str => str.replace(/^"|"$/g, '');

const spaces = num => String.fromCharCode(32).repeat(num);

const formatBookOutput = (book, outputType = '') => {
  const { title, authors, publisher } = book;
  const isReadingList = outputType === 'reading-list';
  let output = isReadingList ? `${String.fromCharCode(186)} ` : ' ';
  output += title;
  output += !authors && !publisher ? '' : '\n';
  output += isReadingList ? spaces(3) : spaces(6);
  output += authors ? ` by ${authors.join(', ')}` : '';
  output += authors && publisher ? (isReadingList ? `\n${spaces(3)}` : ',') : '';
  output += publisher ? ` published by ${publisher}` : '';
  output += isReadingList ? '\n' : '';
  return output;
};

module.exports = {
  clearConsole,
  removeBoundaryQuotes,
  spaces,
  formatBookOutput,
};
