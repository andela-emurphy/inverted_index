'use strict';

class InvertedIndex {

  /**
   * class constructor
   * @constructor
   */
  constructor() {
    this.indexedFiles = [];
  }


  /**  strips all non-character values.
   *
   *  @param {String} text to be stripped
   *  @return {Array} array of stripped values
   */
  strip(text) {
    return text.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/g);
  }


  /** creates an inverted index
   * 
   * @param {String} file name
   * @return {Object} data to be indexed
   */
  createIndex(fileName, fileData) {
    let terms = {};
    let count = 0;
    if (typeof (fileData) !== 'object') {
      return 'invalid json file';
    }
    try {
      for (let book of fileData) {
        count++;
        for (let key in book) {
          this.strip(book[key]).forEach(word => {
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
    } catch (e) {
      return { error: 'invalid json format'};
    }

    this.indexedFiles[fileName] = terms;
    return terms;
  }


  /**  get an indexed file
   *
   * @param {String} file name
   * @return {Object} file - the index file
   */
  getIndex(fileName) {
    let file = this.indexedFiles[fileName];
    return file? file : 'file not found';
  }


  /** search inverted index
   *
   * @function
   * @param {String} value for query
   * @param {String} file to be queried
   * @return {Object} 
   */
  searchIndex(query, fileName) {
    let fileToSearch = this.getIndex(fileName);
    let found = {};
    if (!query || typeof(fileToSearch) === 'string') {
      return 'no query to search';
    }
    this.strip(query).forEach(word => {
      if (fileToSearch.hasOwnProperty(word)) {
        found[word] = fileToSearch[word];
      }
    });
    return found;
  }
}


