

var books = [{
  "title": "Alice in Wonderland",
  "text": "Alice falls into a rabbit hole and enters a world full of imagination."
}, {
  "title": "The Lord of the Rings: The Fellowship of the Ring.",
  "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
}];


describe('inverted index', function() {
    beforeEach(function() {
        this.index = new InvertedIndex();
        this.indexedBook = this.index.createIndex('books.json', books);
    });

    describe('index Constructor', function() {

      it('should be an instance of  InvertedIndex', function() {
        expect(this.index instanceof InvertedIndex).toBe(true);
        expect(typeof(this.index)).toEqual('object');
      });

      it('should have a defualt instatiated  values',function() {
        expect(this.index.indexedFiles).not.toBe(null);
        expect(Array.isArray(this.index.indexedFiles)).toBe(true);
        expect(typeof(this.index.fileIndex)).toEqual('number');
      });

    });

    describe('creating index', function() {

      it('should return invalid file for wrong input', function() {
          expect(this.indexedBook).not.toBe('invalid json file');
      });

      it('should return an object', function() {
          expect(typeof (this.indexedBook)).toEqual('object');
      });

      it('should create a valid index', function() {
          expect(this.indexedBook['a']).not.toBe(null);
          expect(this.indexedBook['alice']).toEqual(jasmine.arrayContaining([1]));
          expect(this.indexedBook['and']).toEqual(jasmine.arrayContaining([1, 2]));
      });
    });

    describe('String tokenizer', function() {

      it('should return an array', function () {
        let strippedString = this.index.tokenizer('Alice in Wonderland')
        expect(Array.isArray(strippedString)).toBe(true);
        expect(strippedString).toEqual(jasmine.arrayContaining(['alice', 'in', 'wonderland']))
      });

      it('should remove all non alphanumeric characters', function() {
        let strippedString = this.index.tokenizer('he Lord of the Ring #==')
        expect(strippedString).toEqual(jasmine.arrayContaining(['he', 'lord', 'of']))
        expect(strippedString).not.toEqual(jasmine.arrayContaining(['#==']))
      })
    });

    describe('get index', function() {

      it('should return undefined if get index failed', function() {
        let getIndex = this.index.getIndex('NOT A VALID PARAM'); 
        expect(getIndex).toEqual(undefined);
      });

      it('should return an object when value is found', function() {
        let getIndex = this.index.getIndex('books.json');
        expect(typeof(getIndex) === 'object').toBe(true);
      });

       it('should contain valid indexed words and position', function() {
        let getIndex = this.index.getIndex('books.json')
        expect(getIndex.hasOwnProperty('alice')).toBe(true);
        expect(Array.isArray(getIndex['alice'])).toBe(true);
        expect(getIndex['of']).toEqual(jasmine.arrayContaining([1,2]))
      });
    })

    describe('search index', function() {
      it('should return no query when no value is passed in', function() {
        let searchIndex = this.index.searchIndex();
        expect(searchIndex).toEqual('no query to search');
      });

      it('should return an empty {object} if no query is found', function() {
        let searchIndex = this.index.searchIndex( 'jesus',  'books.json')
        expect(typeof(searchIndex) === 'object').toBe(true)
        expect(searchIndex.length).toEqual(0);
      });

      it('should return an {object} with valid properties', function() {
         let searchIndex = this.index.searchIndex( 'alice in wonderland',  'books.json')
         console.log(searchIndex)
          expect(typeof(searchIndex) === 'object').toBe(true)
          expect(searchIndex.length > 0).toBe(true);
          expect(searchIndex['alice']).toEqual(jasmine.arrayContaining([1]))
      })

    });
});