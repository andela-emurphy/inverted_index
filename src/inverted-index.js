"use strict";

class InvertedIndex {

  /**
   * class constructor
   * @constructor
   */
  constructor() {
    this.indexedFiles = this.indexedFiles || [];
  }


  /* strips all non-character values.
   *
   * @function
   * @param {String} text to be stripped
   * @return {Array}
   */
  tokenizer(text) {
    return text.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/g);
  }


  /* creates an inverted index
   *
   * @function
   * @param {Array} data to be indexed
   * @return {Array}
   */
  createIndex(fileName, fileData) {
    const terms = {};
    let count = 0;
    if (typeof (fileData) !== 'object') {
      return 'invalid json file';
    }
    for (let book of fileData) {
      count++;
      for (let key in book) {
        this.tokenizer(book[key]).forEach(word => {
          if (!terms.hasOwnProperty(word)) {
            terms[word] = [];
          }
          if (terms[word].indexOf(count) > -1) {
            return;
          }
          terms[word].push(count);
        });
      }
    }

    this.indexedFiles[fileName] = terms;
    return terms;
  }


  /* searches through the indexed files
   *
   * @function
   * @param {String} text to be stripped
   * @return {Array}
   */
  getIndex(fileName) {
    return this.indexedFiles[fileName];
  }

  searchIndex(query, fileName) {
    let fileToSearch = this.getIndex(fileName) || [];
    let found = {};
    if (!query) {
      return "no query to search";
    }
    this.tokenizer(query).forEach(word => {
      if (fileToSearch.hasOwnProperty(word)) {
        found[word] = fileToSearch[word];
      }
    });
    return found;
  }

  
}
var book1 = [{
    "title": "the ninja tutles",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The god is goodip of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }, {
    "title": "jesus is lord",
    "text": "animal instiß"
  }
];

var book2 = [{
    "title": "TunezMedia",
    "text": "2016 is looking like a good year alice for many in showbiz. Moments after Omoni Oboli showed the world clips of P-Square new home her colleague in the movie industry, Daniella Okeke also shared snaps of her ongoing building project, with hopes of finishing it up before the year finally runs out."
  },

  {
    "title": "opeyemiieblog",
    "text": "wow.... congrats... more n more good things in ur life oo"
  },

  {
    "title": "Philistine",
    "text": "Alice falls into a rabbit hole anfuncd enters a world full of imagination."
  },

  {
    "title": "LesbianBoy",
    "text": "I usually see people call her a sh!t eater. Guess eating sh!t paid afterall grin"
  }
];



// let index = new InvertedIndex();
// index.createIndex('book1', book1);
// index.createIndex('book2', book2);
// console.log(index.indexedFiles);
// console.log(index.indexAllSearchedFiles('alice'));