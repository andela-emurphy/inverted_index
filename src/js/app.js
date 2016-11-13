

// class InvertedIndex {

//   constructor() {
//     this.indexedFiles = this.indexedFiles || []
//   }


//   strip(text) {
//     return text.toLowerCase()
//                 .replace(/[^a-z0-9\s]/g, '')
//                 .split(/\s+/g)
//   }

//   createIndex(data, cb) {
//     var terms = {};
//     var sn = 0;
//     for (let book of data) {
//       sn++
//       var document = 'doc_' + sn
//       for (var key in book) {
//         this.strip(book[key]).forEach( word => {
//           if (!terms.hasOwnProperty(word)) {
//             terms[word] = []
//           }
//           if (terms[word].indexOf(document) > -1) {
//             return
//           }
//           terms[word].push(document)
//         })
//       }
//     }
//     this.indexedFiles.push(terms)
//   }

//   getIndex() {
  
//   }

//   searchIndex() {

//   }
// }


angular.module('invetedIndex', [])
    .service('InvertedIndex', InvertedIndex)
    .controller('mainController', function($scope) {

        console.log(InvertedIndex)

    })