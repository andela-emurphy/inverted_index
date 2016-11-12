var books = [
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
]

class InvertedIndex {




  strip(text) {
    return text.toLowerCase()
                .replace(/[^a-z0-9\s]/g, '')
                .split(/\s+/)
  }

  createIndex(data, cb) {
    var terms = {};
    var sn = 0;
    for (let book of data) {
      sn++
      var document = 'doc_' + sn
      for (var key in book) {
        this.strip(book[key]).forEach( word => {
          if (!terms.hasOwnProperty(word)) {
            terms[word] = []
          }
          if (terms[word].indexOf(document) > -1) {
            return
          }
          terms[word].push(document)
        })
      }
    }
    return {
      terms: terms
    }
  }

  getIndex() {
  
  }

  searchIndex() {
    
  }
}

var index = new InvertedIndex()
index.getIndex(books)
console.log(index.createIndex(books))
// console.log(create('doc', books))
