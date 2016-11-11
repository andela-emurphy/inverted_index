
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

    createIndex(data, cb) {
        var terms = {};
        var  sn = 0;
        for(let books of data ) {
            sn++
            var document = 'doc_' + sn
            for (var key in books) {
                books[key].split(' ').forEach( v => {
                    var v = v.toLowerCase()
                    if(!terms.hasOwnProperty(v)) {
                        terms[v] = []
                    }
                    if(terms[v].indexOf(document) > -1){
                        return 
                    }
                    terms[v].push(document)
                })
            }
        }
         cb(terms)
    }

    getIndex() {
        this.createIndex(books, function(terms) {
            console.log(terms)
        })
    }
}


var index = new InvertedIndex()
index.getIndex(books)
