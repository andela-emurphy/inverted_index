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
    * l ink funtion to be called
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
          //event fired when reader.readAsTex is callec
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
    *  {Array} uploaded files
    */
    $scope.uploadedFiles = {};

    /*
    *  indexed value to display
    */
    $scope.index = [];

    /*
    *  {Boolean} shwows index table
    */
    $scope.showTable = false;


    /*set the value to be selected
    *
    * @return {String} selected value
    */
    $scope.selected = function () {
      return document.getElementById('uploaded-files').value;
    };



    $scope.createIndex = () => {
      let selected = $scope.selected();
      if ($scope.isValidFile(selected) && $scope.uploadedFiles.hasOwnProperty(selected)) {
        $scope.index = indexer.createIndex(selected, $scope.uploadedFiles[selected]);
        $scope.showTable = true;
      }
    };

    /*seaches for a query 
    *
    * @param {String}  query value
    * @return {void}  set the index value
    */
    $scope.searchIndex = function (query) {
      let result;
      if (!query) {
        alerts("please enter a query", "danger", true, 5000);
        $scope.index = indexer.getIndex($scope.selected());
        return false;
      }
      result = indexer.searchIndex(query, $scope.selected());
      $scope.index = result;
    };


    /*gets the length of the highest searched result
    *
    * @return {Integer} selected value
    */
    $scope.knowCount = function () {
      const selected = $scope.selected();
      return $scope.uploadedFiles[selected].length;
    };

    

    /*checks if the key in in the vakue
    *
    * @param {Array}  list of integers
    * @return {Boolen}  true or false
    */
    $scope.inValue = function (values, key) {
      // let a = $scope.knowCount();
      if (values.indexOf(key) > -1) {
        return true;
      }
    };

    /*set the value to be selected
    *
    * @param {String}  value to check
    * @return {Boolen  true or flase
    */
    $scope.isValidFile = function (file) {
      return file.match(/\.json$/);
    };
  });