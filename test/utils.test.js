/*eslint-disable quotes*/
const { removeBoundaryQuotes, formatBookOutput } = require('../src/utils');
const { titleColor, authorsColor, publisherColor } = require('../src/colors');

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
      `${middot} ${titleColor('Underwater Dogs')}\n   by ${authorsColor(
        'Seth Casteel',
      )}\n   published by ${publisherColor('Little, Brown')}\n`,
      `${middot} ${titleColor('Dogs')}\n   by ${authorsColor('Catherine Johns')}\n`,
      `${middot} ${titleColor('Dogs')}\n   published by ${publisherColor(
        "Barron's Educational Series",
      )}\n`,
      `${middot} ${titleColor('Underwater Dogs')}   \n`,
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
      ` ${titleColor('Underwater Dogs')}\n      by ${authorsColor(
        'Seth Casteel',
      )}, published by ${publisherColor('Little, Brown')}`,
      ` ${titleColor('Dogs')}\n      by ${authorsColor('Catherine Johns')}`,
      ` ${titleColor('Dogs')}\n      published by ${publisherColor("Barron's Educational Series")}`,
      ` ${titleColor('Underwater Dogs')}      `,
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
