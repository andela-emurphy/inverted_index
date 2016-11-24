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
  .directive('fileUpload', (alerts) => {
    /*
    * template to be rendered
    */
    const template = `<input type="file" id="file" name="files" multiple>
                      <label for="file"><i class="fa fa-upload" aria-hidden="true"></i> 
                      Upload A file <span>{{ uploadedFilesCount }}</span></label>`;
    

    /*
    * link funtion to be called
    */
    function link(scope, elem) {
      elem.on('change', (evt) => {
        const fileList = evt.target.files;
        angular.forEach(fileList, (file) => {
          if (!scope.isValidFile(file.name)) {
            scope.$apply(function () {
              alerts("please all file must be a valid json", "danger", true, 5000);
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
                alerts("invalid json. pls refer to index guide ", "danger", true, 5000);
               });
              return;
            }
          };
          reader.readAsText(file);
        });
      });
    }
    return {
      template: template,
      link: link
    };
  })
  .controller('mainController', ($scope, alerts) => {
    const indexer = new InvertedIndex();
    /*
    *  {Object}  uploaded files
    */
    $scope.uploadedFiles = {};

    /*
    *  {Object} indexed value to display
    */
    $scope.index = [];

    /*
    *  {Boolean} shwows indexed table
    */
    $scope.showTable = false;

    /*
    *  {Array} Holds number of data in a file
    */
    $scope.fileCount = [];

    /*
    *  {Array} Holds all indexed files
    */
    $scope.allIndexedFiles = [];


    /*set the value to be selected
    *
    * @return {String} selected value
    */
    $scope.selected = (id) => {
      return document.getElementById(id || 'indexed-files').value;
    };

    $scope.transformData = (fileName, data, count) => {
     return {
          fileName : fileName,
          data: data,
          count: count
        };
    };

    $scope.createIndex = () => {
      const selected = $scope.selected('uploaded-files');
      const uploadedFiles = $scope.uploadedFiles;
      console.log(selected);
      if ($scope.isValidFile(selected) && uploadedFiles.hasOwnProperty(selected)) {
        const data = indexer.createIndex(selected, uploadedFiles[selected]);
        const fileCount = uploadedFiles[selected].length;
        $scope.index[0] = $scope.transformData(selected, data, fileCount);
        $scope.fileCount[selected] = fileCount;
        $scope.allIndexedFiles.push(selected);
        $scope.showTable = true;
      }
    };

    /*searches for a query 
    *
    * @param {String} query = value to be searched
    * @return {void}  set the index value
    */
    $scope.searchIndex = (query) => {
      let result;
      const selected = document.getElementById('indexed-files').value;
      let fileCount = null;
      $scope.index =[];
      // checks if a query was passed in
      if (!query || !selected) {
        alerts("please enter a query and what to search", "danger ", true, 5000);
        fileCount = $scope.fileCount[selected];
        result = indexer.searchIndex(query, selected);
        $scope.index[0] = $scope.transformData(selected, result, fileCount);
        return false;
      }
      // displays serach result for all indexed files
      if(selected === 'all') {
        let count = 0;
        for(let file in indexer.indexedFiles) {
          var searchData = indexer.searchIndex(query, file); 
          fileCount = $scope.fileCount[file];
          if(Object.keys(searchData) < 1){
            continue;
          }
          $scope.index[count] = $scope.transformData(file, searchData,fileCount);
          count++;
        }
      // displays search for single file
      }else{
        fileCount = $scope.fileCount[selected];
        result = indexer.searchIndex(query, selected);
        $scope.index[0] = $scope.transformData(selected, result, fileCount);
      }
    };



    /* checks the value to be selected
    *
    * @param {String}  value to check
    * @return {Boolen}  true or flase
    */
    $scope.isValidFile = function (file) {
      return file.match(/\.json$/);
    };
  });