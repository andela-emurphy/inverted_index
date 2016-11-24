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
   * @param {String} file name 
   * @return {Object} data to be indexed 
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


  /* get an indexed file
   *
   * @param {String} file name
   * @return {Object} file - the index file
   */
  getIndex(fileName) {
    return this.indexedFiles[fileName];
  }


  /* search inverted index
   *
   * @function
   * @param {String} value for query
   * @param {String} file to be queried
   * @return {Object} 
   */
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
