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
                .split(/\s+/g)
  }

  /* creates an inverted index
  *
  * @function
  * @param {Array} data to be indexed
  * @return {Array}
  */
  createIndex(fileData) {
    const terms = {};
    let sn = 0;
    try{
      if(typeof(fileData) !== 'object')
        return 'invalid json file';
        // throw Error('invalid json file');

      for (let book of fileData) {
        sn++;
        let document = sn;
        for (var key in book) {
          this.tokenizer(book[key]).forEach( word => {
            if (!terms.hasOwnProperty(word)) {
              terms[word] = [];
            }
            if (terms[word].indexOf(document) > -1) {
              return;
            }
            terms[word].push(document);
          });
        }
      }
    }catch(e) {
      return 'invalid json object';
    }

    this.indexedFiles['file_' +this.fileIndex] = terms;
    this.fileIndex++;
    return   terms;
  }


  /* searches through the indexed files
  *
  * @function
  * @param {String} text to be stripped
  * @return {Array}
  */
  getIndex(file) {
    return this.indexedFiles[file];
  }

  searchIndex(query, file) {
    let fileToSearch = this.indexedFiles[file]
    let found = {}
    if(!query) {
      return "no query to search"
    }
    console.log(query)
    this.tokenizer(query).forEach(word => {
      if(fileToSearch.hasOwnProperty(word)){
        found[word] = fileToSearch[word];
      }
    })

    return found

  }
}
