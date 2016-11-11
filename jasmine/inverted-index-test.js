// var InvertedIndex = require('../src/inverted-index')

describe('inverted index', function() {
    
    describe('reading data from file', function() {
        // var index = new InvertedIndex();
        it('should not be empty', function() {
            var index = new InvertedIndex();
            var books = index.readJsonFile('books.json')
            expect(books).not.toBe(undefined)
        });

        it('should return a valid json', function() {
            var index = new InvertedIndex();
            var books = index.readJsonFile('books.json')
            expect(books.length).toBeGreaterThan(0)
        })

        it('should contain contain objects that has string values', function() {
            var index = new InvertedIndex();
            var bookCollection  = index.readJsonFile('boosk.json')
            for(books of bookCollection) {
                for (var book in Books){
                    expect(books[book]).toBe(String)
                }
            }
        })
    });
});