"use strict"
angular.module('invertedIndex')
    .directive('fileUploader', ['alert', 'invertedIndex', fileUploader])


function fileUploader(alert, invertedIndex, $scope) {
    console.log(new invertedIndex.invertedIndex)
    var indexer = new invertedIndex.invertedIndex();

    function link(scope, elem, attr) {
        console.log(alert)
        elem.on('change', function (evt) {
           
        })
    }

    function parser(fileList) {
        for (let key in fileList) {
            if (key === 'length' || key === 'item') {
                continue;
            }
            var file = fileList[key];
            if (getFileExtention(file.name) !== 'json')
                continue

            var reader = new FileReader()

            reader.onload = function (event) {
                var file = JSON.parse(event.target.result)
                indexer.createIndex(file)
            }
            reader.readAsText(file)
        }
        return indexer.indexedFiles
    }


    function getFileExtention(file) {
        var fileArr = file.split('.')
        return fileArr.splice(fileArr.length - 1).toString()
    }

    return {
        restrict: 'A',
        link: link
    }
}