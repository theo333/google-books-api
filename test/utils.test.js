/*eslint-disable quotes*/
const { removeBoundaryQuotes, formatBookOutput } = require('../src/utils');

describe('removeBoundaryQuotes removes quotes from beginning and end of string', () => {
  const strings = [
    '"Remove my strings!"',
    "Don't remove my stings",
    "Don't remove 'my' stings",
    'Don\'t remove "my" strings either',
  ];

  const sanitzedStrings = [
    'Remove my strings!',
    "Don't remove my stings",
    "Don't remove 'my' stings",
    'Don\'t remove "my" strings either',
  ];

  it('removes first and last double quotes', () => {
    expect(removeBoundaryQuotes(strings[0])).toEqual(sanitzedStrings[0]);
  });

  it('does not remove single quotes', () => {
    expect(removeBoundaryQuotes(strings[1])).toEqual(sanitzedStrings[1]);
  });

  it('does not remove single quotes in middle of string', () => {
    expect(removeBoundaryQuotes(strings[2])).toEqual(sanitzedStrings[2]);
  });

  it('does not remove double quotes in middle of string', () => {
    expect(removeBoundaryQuotes(strings[3])).toEqual(sanitzedStrings[3]);
  });
});

describe('formatBookOutput correctly formats output for reading list and book choices', () => {
  const dogSearchResults = [
    {
      title: 'Underwater Dogs',
      authors: ['Seth Casteel'],
      publisher: 'Little, Brown',
    },
    {
      title: 'Dogs',
      authors: ['Catherine Johns'],
      publisher: 'Harvard University Press',
    },
    {
      title: 'Dogs',
      authors: ['Kate Petty'],
      publisher: "Barron's Educational Series",
    },
  ];

  // describe('correctly formats output for reading list', () => {
  //   const desiredOutput = [

  //   ];
  //   it('')
  // });
});
