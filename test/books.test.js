const { bookChoices } = require('../src/books');
const { removeBoundaryQuotes } = require('../src/utils');

const searchResultsFromApi = [{
  title: 'JavaScript & jQuery: The Missing Manual',
  authors: ['David Sawyer McFarland'],
  publisher: `"O'Reilly Media, Inc."`
},
{
  title: 'Eloquent JavaScript',
  authors: ['Marijn Haverbeke'],
  publisher: 'No Starch Press'
},
{
  title: 'JavaScript: The Definitive Guide',
  authors: ['David Flanagan'],
  publisher: `"O'Reilly Media, Inc."`
}];

let results, result;

beforeEach(() => {
  results = bookChoices(searchResultsFromApi);
  result = results[0];
  // console.log('results:', results)
});

describe('removeBoundaryQuotes removes quotes from beginning and end of string', () => {
  it('removes quotes', () => {
    const str = `"Remove my strings!"`;
    const sanitizedStr = `Remove my strings!`;
    expect(removeBoundaryQuotes(str)).toEqual(sanitizedStr);
  });
});

describe('bookChoices returns correctly formatted results', () => {

  it('returns an array', () => {
    expect(Array.isArray(results)).toBe(true);
  });

  it('elements of return array are objects', () => {
    const isPlainObject = (obj) => {
      return obj === Object(obj) && Object.prototype.toString.call(obj) !== '[object Array]'
    };
    expect(isPlainObject(result)).toBe(true);
  });

  xit('returns results in correct format', () => {
    const expectedFormatResults = [
      {
        name: "JavaScript & jQuery: The Missing Manual by David Sawyer McFarland, published by O'Reilly Media, Inc.",
        value: "JavaScript & jQuery: The Missing Manual",
        short: "JavaScript & jQuery: The Missing Manual"
      },
      {
        name: "Eloquent JavaScript by Marijn Haverbeke, published by No Starch Press",
        value: "Eloquent JavaScript",
        short: "Eloquent JavaScript"
      },
      {
        name:
          "JavaScript: The Definitive Guide by David Flanagan, published by O'Reilly Media, Inc.",
        value: "JavaScript: The Definitive Guide",
        short: "JavaScript: The Definitive Guide"
      }
    ];

    expect(results).toEqual(expectedFormatResults);
  });
});