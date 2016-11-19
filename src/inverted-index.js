class InvertedIndex {

  /**
   * class constructor
   * @constructor
   */
  constructor() {
    this.indexedFiles = this.indexedFiles || [];
    this.fileIndex = 1;
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
    try{
      if(typeof(fileData) !== 'object')
        return 'invalid json file';
        // throw Error('invalid json file');

      for (let book of fileData) {
        count++;
        for (var key in book) {
          this.tokenizer(book[key]).forEach( word => {
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
    }catch(e) {
      return 'invalid json object';
    }

    this.indexedFiles[fileName] = terms;
    this.fileIndex++;
    return  terms
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
    if(!query) {
      return "no query to search";
    }
    this.tokenizer(query).forEach(word => {
      if(fileToSearch.hasOwnProperty(word)){
        found[word] = fileToSearch[word];
      };
    })
    return found;
  };
}

