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
    },
    {
      title: 'Dogs',
      publisher: "Barron's Educational Series",
    },
    {
      title: 'Underwater Dogs',
    },
  ];

  describe('correctly formats output for reading list', () => {
    const middot = String.fromCharCode(186);
    const desiredOutput = [
      `${middot} Underwater Dogs\n   by Seth Casteel\n   published by Little, Brown\n`,
      `${middot} Dogs\n   by Catherine Johns\n`,
      `${middot} Dogs\n   published by Barron's Educational Series\n`,
      `${middot} Underwater Dogs   \n`,
    ];

    it('where has title, authors and publisher', () => {
      expect(formatBookOutput(dogSearchResults[0], 'reading-list')).toEqual(desiredOutput[0]);
    });

    it('where has title and authors', () => {
      expect(formatBookOutput(dogSearchResults[1], 'reading-list')).toEqual(desiredOutput[1]);
    });

    it('where has title and publisher', () => {
      expect(formatBookOutput(dogSearchResults[2], 'reading-list')).toEqual(desiredOutput[2]);
    });

    it('where has title only', () => {
      expect(formatBookOutput(dogSearchResults[3], 'reading-list')).toEqual(desiredOutput[3]);
    });
  });

  describe('correctly formats output for book choices', () => {
    const desiredOutput = [
      ` Underwater Dogs\n      by Seth Casteel, published by Little, Brown`,
      ` Dogs\n      by Catherine Johns`,
      ` Dogs\n      published by Barron's Educational Series`,
      ` Underwater Dogs      `,
    ];

    it('where has title, authors and publisher', () => {
      expect(formatBookOutput(dogSearchResults[0])).toEqual(desiredOutput[0]);
    });

    it('where has title and authors', () => {
      expect(formatBookOutput(dogSearchResults[1])).toEqual(desiredOutput[1]);
    });

    it('where has title and publisher', () => {
      expect(formatBookOutput(dogSearchResults[2])).toEqual(desiredOutput[2]);
    });

    it('where has title only', () => {
      expect(formatBookOutput(dogSearchResults[3])).toEqual(desiredOutput[3]);
    });
  });
});
