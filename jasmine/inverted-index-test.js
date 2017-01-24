const books = [{
  "title": "Alice in Wonderland",
  "text": "Alice falls into a rabbit hole and enters a world full of imagination."
}, {
  "title": "The Lord of the Rings: The Fellowship of the Ring.",
  "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
}];

const invalidjson = [{
  "titles": {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  }
}];


describe('Inverted index', () => {
  let index;
  let indexedBook;
  beforeEach(function () {
    index = new InvertedIndex();
    indexedBook = index.createIndex('books.json', books);
  });
  describe('Index Constructor', () => {
    it('should be an instance of  InvertedIndex', () => {
      expect(index instanceof InvertedIndex).toBeTruthy();
      expect(typeof (index)).toEqual('object');
    });

    it('should have a defualt instatiated  values', () => {
      expect(index.indexedFiles).not.toBe(null);
      expect(Array.isArray(index.indexedFiles)).toBeTruthy();
    });
  });

  describe('Create index', () => {
    it('should return invalid input for invalid files', () => {
      const createdIndex = index.createIndex('book');
      expect(createdIndex).toEqual('invalid json file');
    });

    it('should return an object', () => {
      expect(typeof (indexedBook)).toEqual('object');
    });

    it('should cr̦̦̦̦̦̦eate a valid index', () => {
      expect(indexedBook.a).not.toBe(null);
      expect(indexedBook.alice).toEqual(jasmine.arrayContaining([1]));
      expect(indexedBook.and).toEqual(jasmine.arrayContaining([1, 2]));
    });

    it('should return error for invalid json format', () => {
      const index = new InvertedIndex();
      const indexedBook = index.createIndex('books.json', invalidjson);
      expect(typeof indexedBook).toEqual('object');
      expect(indexedBook.error).toEqual('invalid json format');
    });
  });

  describe('String stripper', () => {
    it('should return an array', () => {
      const strippedString = index.strip('Alice in Wonderland');
      expect(Array.isArray(strippedString)).toBeTruthy();
      expect(strippedString).toEqual(jasmine.arrayContaining(['alice', 'in', 'wonderland']));
    });

    it('should remove all non alphanumeric characters', () => {
      const strippedString = index.strip('he Lord of the Ring #==');
      expect(strippedString).toEqual(jasmine.arrayContaining(['he', 'lord', 'of']));
      expect(strippedString).not.toEqual(jasmine.arrayContaining(['#==']));
    });
  });

  describe('Get index', () => {
    it('should return not found if get index failed', () => {
      const indexedFile = index.getIndex('NOT A VALID PARAM');
      expect(indexedFile).toEqual('file not found');
    });

    it('should return an object when value is found', () => {
      const indexedFile = index.getIndex('books.json');
      expect(typeof (indexedFile) === 'object').toBeTruthy();
    });

    it('should contain valid indexed words and position', () => {
      const indexedFile = index.getIndex('books.json');
      expect(indexedFile.hasOwnProperty('alice')).toBeTruthy();
      expect(Array.isArray(indexedFile.alice)).toBeTruthy();
      expect(indexedFile.of).toEqual(jasmine.arrayContaining([1, 2]));
    });
  });

  describe('Search index', () => {
    it('should return no query when no value is passed in', () => {
      const searchResult = index.searchIndex();
      expect(searchResult).toEqual('no query to search');
    });

    it('should return an empty {object} if no query is found', () => {
      const searchResult = index.searchIndex('jesus', 'books.json');
      expect(typeof (searchResult)).toEqual('object');
      expect(Object.keys(searchResult).length).toBe(0);
    });

    it('should return an {object} with valid properties', () => {
      const searchResult = index.searchIndex('alice in wonderland', 'books.json');
      expect(typeof (searchResult) === 'object').toBe(true);
      expect(searchResult.alice).toEqual(jasmine.arrayContaining([1]));
    });
  });
});