![alt](https://travis-ci.org/andela-emurphy/inverted_index.svg?branch=develop)  ![alt](https://coveralls.io/repos/github/andela-emurphy/inverted_index/badge.svg?branch=develop)
# Inverted Index
------------------------------
## Introduction
 Inverted index, designed to allow very fast full-text searches. An inverted index consists of a list of all the unique words that appear in any document, and for each word, a list of the documents in which it appears.  
#### Technologies
- Nodejs
- Angularjs

 <p>
    Inverted Indexed
    Elasticsearch uses a structure called an inverted index, which is designed to allow very fast full-text searches. An inverted index consists of a list of all the unique words that appear in any document, and for each word, a list of the documents in which it appears.

    For example, let’s say we have two documents, each with a content field containing the following:

    The quick brown fox jumped over the lazy dog
    Quick brown foxes leap over lazy dogs in summer
    To create an inverted index, we first split the content field of each document into separate words (which we call terms, or tokens), create a sorted list of all the unique terms, and then list in which document each term appears. The result looks something like this:
  </p>
  <pre>Term      Doc_1  Doc_2
-------------------------  HOW TO FORMAT JSON FILE
quick   |       |  X       [{
The     |   X   |     
brown   |   X   |  X        "title": " The quick brown fox jumped over the lazy dog",
dogs    |       |  X        "text": "Quick brown foxes leap over lazy dogs in summer"
fox     |   X   |          }]
jumped  |   X   |                
lazy    |   X   |  X                                                
leap    |       |  X                                               
in      |       |  X                                                  
over    |   X   |  X                                                  
summer  |       |  X                                              
    </pre>
  </div>

#### Local use or development
- clone the repo
- run npm install
- run bower install
- run gulp - to start server
- npm test - for testing

#### How should this be manually tested?  
- run npm install 
- run npm test

