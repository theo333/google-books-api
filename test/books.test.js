/*eslint-disable no-script-url*/
/*eslint-disable quotes*/
const { bookChoices } = require('../src/books');

const searchResultsFromApi = [
  {
    title: 'JavaScript & jQuery: The Missing Manual',
    authors: ['David Sawyer McFarland'],
    publisher: '"O\'Reilly Media, Inc."',
  },
  {
    title: 'Eloquent JavaScript',
    authors: ['Marijn Haverbeke'],
    publisher: 'No Starch Press',
  },
  {
    title: 'JavaScript: The Definitive Guide',
    authors: ['David Flanagan'],
    publisher: '"O\'Reilly Media, Inc."',
  },
];

//** test list **
// grab data from api
//* clean publisher field - removeBoundaryQuotes
// format data
// - for book choices
// - for reading list

let results;
let result;

beforeEach(() => {
  results = bookChoices(searchResultsFromApi);
  result = results[0];
  // console.log('results:', results)
});

describe('bookChoices returns correctly formatted results', () => {
  // it('returns an array', () => {
  //   expect(Array.isArray(results)).toBe(true);
  // });

  // it('elements of return array are objects', () => {
  //   const isPlainObject = (obj) => {
  //     return obj === Object(obj) && Object.prototype.toString.call(obj) !== '[object Array]'
  //   };
  //   expect(isPlainObject(result)).toBe(true);
  // });

  xit('returns results in correct format', () => {
    const expectedFormatResults = [
      {
        name:
          "JavaScript & jQuery: The Missing Manual by David Sawyer McFarland, published by O'Reilly Media, Inc.",
        value: 'JavaScript & jQuery: The Missing Manual',
        short: 'JavaScript & jQuery: The Missing Manual',
      },
      {
        name: 'Eloquent JavaScript by Marijn Haverbeke, published by No Starch Press',
        value: 'Eloquent JavaScript',
        short: 'Eloquent JavaScript',
      },
      {
        name:
          "JavaScript: The Definitive Guide by David Flanagan, published by O'Reilly Media, Inc.",
        value: 'JavaScript: The Definitive Guide',
        short: 'JavaScript: The Definitive Guide',
      },
    ];

    expect(results).toEqual(expectedFormatResults);
  });
});
