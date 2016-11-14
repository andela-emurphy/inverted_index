// var indexedFiles = null
// var index = new  InvertedIndex()

// var userDocments = document.getElementById('file')

// userDocments.addEventListener('change', function (evt) {
//   var invertedIndex = new InvertedIndex()
//   for (let key in this.files) {
//     if (key === 'length' || key === 'item') {
//       continue;
//     }
//     var file = this.files[key];
//     if (getFileExtention(file.name) !== 'json')
//       continue

//     var reader = new FileReader()

//     reader.onload = function (event) {
//       var file = JSON.parse(event.target.result)
//       invertedIndex.createIndex(file)
//     }
//     reader.readAsText(file)
//   }
//   indexedFiles = invertedIndex.indexedFiles
//   console.log(indexedFiles)
// });

// function getFileExtention(file) {
//   var fileArr = file.split('.')
//   return fileArr.splice(fileArr.length - 1).toString()

// }

// function getIndexedFile() {
//   return indexedFiles
// }

// // console.log(getIndexedFile())

// function generateButton(files) {
//   var btn = '<button class="btn btn-primary">'
//   files.forEach(file => {
//     var btn = '<button class="btn btn-primary" value="' + '>' + 'create index for file 1 </button> '

//   })
// }
