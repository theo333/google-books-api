const readline = require('readline');

const clearConsole = () => {
  const blankScreen = '\n'.repeat(process.stdout.rows);
  console.log(blankScreen);
  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);
};

const removeBoundaryQuotes = str => str.replace(/^"|"$/g, '');

module.exports = {
  clearConsole,
  removeBoundaryQuotes,
};
