

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
        this.indexedBook = this.index.createIndex(books);
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
        var strippedString = this.index.tokenizer('Alice in Wonderland')
        expect(Array.isArray(strippedString)).toBe(true);
        expect(strippedString).toEqual(jasmine.arrayContaining(['alice', 'in', 'wonderland']))
      });

      it('should remove all non alphanumeric characters', function() {
        var strippedString = this.index.tokenizer('he Lord of the Ring #==')
        expect(strippedString).toEqual(jasmine.arrayContaining(['he', 'lord', 'of']))
        expect(strippedString).not.toEqual(jasmine.arrayContaining(['#==']))
      })
    });

    describe('')
});