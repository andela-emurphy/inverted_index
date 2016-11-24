"use strict";

angular.module('invertedIndex', [])
  .filter('range', () => {
    return function (input, number) {
      for (let i = 1; parseInt(number) >= i; i++) {
        input.push(i);
      }
      return input;
    };
  })
  .directive('fileUpload', ['alerts', (alerts) => {
    /*
     * link funtion to be called
     */
    function link(scope, elem) {
      elem.on('change', (evt) => {
        const fileList = evt.target.files;
        angular.forEach(fileList, (file) => {
          if (!scope.isValidFile(file.name)) {
            scope.$apply(function () {
              alerts("please all file must be a valid json",
                "danger", true, 5000);
            });
            return;
          }
          const reader = new FileReader();
          //event fired when reader.readAsTex is called
          reader.onload = function (event) {
            try {
              const result = JSON.parse(event.target.result);
              scope.$apply(() => {
                scope.uploadedFiles[file.name] = result;
              });
            } catch (e) {
              scope.$apply(() => {
                alerts("invalid json. pls refer to index guide ",
                  "danger", true, 5000);
              });
              return;
            }
          };
          reader.readAsText(file);
        });
      });
    }
    return {
      templateUrl: '../views/upload-file.html',
      link: link
    };
  }])
  .controller('mainController', ['$scope', 'alerts', ($scope, alerts) => {
    /**
     *  {Object} instanciates the invertedIndex class
     */
    const indexer = new InvertedIndex();


    $scope.uploadedFiles = {};

    $scope.index = [];

    $scope.showTable = false;

    $scope.fileCount = [];

    $scope.allIndexedFiles = [];


    /** set the value to be selected
     * @param {String} dom element to get
     * @return {String} selected value
     */
    $scope.selected = (id) => {
      return document.getElementById(id || 'indexed-files').value;
    };


    /**
     * @param  {String} fileName - file name
     * @param  {Object} data  - data to transform
     * @param  {count} count - count of object in the file
     */
    $scope.transformData = (fileName, data, count) => {
      return {
        fileName: fileName,
        data: data,
        count: count
      };
    };

    /**
     * creates an inverted Index 
     */
    $scope.createIndex = () => {
      const selected = $scope.selected('uploaded-files');
      const uploadedFiles = $scope.uploadedFiles;
      console.log(selected);
      if ($scope.isValidFile(selected) &&
        uploadedFiles.hasOwnProperty(selected)) {
        const data = indexer.createIndex(selected, uploadedFiles[selected]);
        if (data === 'error' || $scope.length(data) < 1) {
          alerts('invalid json file', 'danger');
          return false;
        }
        const fileCount = uploadedFiles[selected].length;
        $scope.index[0] = $scope.transformData(selected, data, fileCount);
        $scope.fileCount[selected] = fileCount;
        $scope.allIndexedFiles.push(selected);
        $scope.showTable = true;
      }
    };

    /** searches for a query
     *
     * @param {String} query = value to be searched
     * @return {void}  set the index value
     */
    $scope.searchIndex = (query) => {
      let result;
      const selected = document.getElementById('indexed-files').value;
      let fileCount = null;
      $scope.index = [];
      // checks if a query was passed in
      if (!query || selected === "--select a file--") {
        alerts("please enter a query and select file  to search",
          "danger ", true, 5000);
        return false;
      }
      // displays serach result for all indexed files
      if (selected === 'all') {
        let count = 0;
        for (let file in indexer.indexedFiles) {
          let searchData = indexer.searchIndex(query, file);
          fileCount = $scope.fileCount[file];
          if ($scope.length(searchData) < 1) {
            continue;
          }
          $scope.index[count] = $scope
            .transformData(file, searchData, fileCount);
          count++;
        }
        if ($scope.index.length < 1) {
          alert('word does not exist in any file', 'danger');
        }
      } else {
        fileCount = $scope.fileCount[selected];
        result = indexer.searchIndex(query, selected);
        $scope.index[0] = $scope.transformData(selected, result, fileCount);
      }
    };


    /** checks the value to be selected
     *
     * @param {String}  value to check
     * @return {Boolen}  true or flase
     */
    $scope.isValidFile = function (file) {
      return file.match(/\.json$/);
    };

    /** gets the let oh an object
     *
     * @param {Object}  value to check
     * @return {Int}  true or flase
     */
    $scope.length = (object) => {
      return Object.keys(object).length;
    };
  }]);
  