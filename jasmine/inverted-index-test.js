"use strict";

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


describe('inverted index', () => {
  beforeEach( () => {
    this.index = new InvertedIndex();
    this.indexedBook = this.index.createIndex('books.json', books);
  });

  describe('index Constructor', () => {

    it('should be an instance of  InvertedIndex', () => {
      expect(this.index instanceof InvertedIndex).toBeTruthy();
      expect(typeof (this.index)).toEqual('object');
    });

    it('should have a defualt instatiated  values', () => {
      expect(this.index.indexedFiles).not.toBe(null);
      expect(Array.isArray(this.index.indexedFiles)).toBeTruthy();
    });
  });

  describe('create index',  () => {

    it('should return invalid input for invalid files',  () => {
      const createIndex = this.index.createIndex('book');
      expect(createIndex).toEqual('invalid json file');
    });

    it('should return an object',  () => {
      expect(typeof (this.indexedBook)).toEqual('object');
    });

    it('should create a valid index', () => {
      expect(this.indexedBook.a).not.toBe(null);
      expect(this.indexedBook.alice).toEqual(jasmine.arrayContaining([1]));
      expect(this.indexedBook.and).toEqual(jasmine.arrayContaining([1, 2]));
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
      const strippedString = this.index.strip('Alice in Wonderland');
      expect(Array.isArray(strippedString)).toBeTruthy();
      expect(strippedString).toEqual(jasmine.arrayContaining(['alice', 'in', 'wonderland']));
    });

    it('should remove all non alphanumeric characters',  () => {
      console.log(this.index)
      const strippedString = this.index.strip('he Lord of the Ring #==');
      expect(strippedString).toEqual(jasmine.arrayContaining(['he', 'lord', 'of']));
      expect(strippedString).not.toEqual(jasmine.arrayContaining(['#==']));
    });
  });

  describe('get index',  () => {
    it('should return not found if get index failed',  () => {
      const getIndex = this.index.getIndex('NOT A VALID PARAM');
      expect(getIndex).toEqual('file not found');
    });

    it('should return an object when value is found',  () => {
      const getIndex = this.index.getIndex('books.json');
      expect(typeof (getIndex) === 'object').toBeTruthy();
    });

    it('should contain valid indexed words and position',  () => {
      const getIndex = this.index.getIndex('books.json');
      expect(getIndex.hasOwnProperty('alice')).toBeTruthy();
      expect(Array.isArray(getIndex.alice)).toBeTruthy();
      expect(getIndex.of).toEqual(jasmine.arrayContaining([1, 2]));
    });
  });

  describe('search index',  () => {
    it('should return no query when no value is passed in',  () => {
      const searchIndex = this.index.searchIndex();
      expect(searchIndex).toEqual('no query to search');
    });

    it('should return an empty {object} if no query is found',  () => {
      const searchIndex = this.index.searchIndex('jesus', 'books.json');
      expect(typeof (searchIndex)).toEqual('object');
      expect(Object.keys(searchIndex).length).toBe(0);
    });

    it('should return an {object} with valid properties',  () => {
      const searchIndex = this.index.searchIndex('alice in wonderland', 'books.json');
      expect(typeof (searchIndex) === 'object').toBe(true);
      expect(searchIndex.alice).toEqual(jasmine.arrayContaining([1]));
    });
  });
});