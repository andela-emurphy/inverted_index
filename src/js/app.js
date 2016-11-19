"use strict"

angular.module('invertedIndex', [])
  .filter('range', () => {
    return function (input, number) {
      for (let i = 1; parseInt(number) >= i; i++) {
        input.push(i);
      }
      return input;
    }
  })
  .directive('fileUpload', ($log, alerts) => {
    const template = ' <input type="file" id="file" name="files" multiple>\
                <label for="file"><i class="fa fa-upload" aria-hidden="true"></i> Upload A file <span>{{ uploadedFilesCount }}</span></label>'

    function link(scope, elem, attr) {
      elem.on('change', (evt) => {
        const fileList = evt.target.files
        angular.forEach(fileList, (file) => {
          if (!scope.isValidFile(file.name)) {
            scope.$apply(function () {
              alerts("please all file must be a valid json", "danger", true, 5000)
            })
            return
          }
          const reader = new FileReader();
          reader.onload = function (event) {
            try {
              let result = JSON.parse(event.target.result);
              scope.$apply(function () {
                scope.uploadedFiles[file.name] = result
                scope.uploadedFilesCount = scope.uploadedFiles.length
              })
            } catch (e) {
              scope.$apply(function () {
                alerts("invalid json. pls refer to index guide ", "danger", true, 5000)
              })
              return;
            }
          }
          reader.readAsText(file);
        })
      })
    }
    return {
      template: template,
      link: link
    }
  })
  .controller('mainController', ($scope, alerts, $log, $timeout) => {
    const indexer = new InvertedIndex();
    $scope.uploadedFiles = {};
    $scope.uploadedFilesCount = $scope.uploadedFiles.length;
    $scope.index;
    $scope.showTable = false;

    // $scope.search = 'enaho';


    $scope.selected = function () {
      return document.getElementById('uploaded-files').value
    }
    $scope.createIndex = () => {
      var selected = $scope.selected()
      if ($scope.isValidFile(selected) && $scope.uploadedFiles.hasOwnProperty(selected)) {
        $log.log($scope.uploadedFiles[selected]);
        $scope.index = indexer.createIndex(selected, $scope.uploadedFiles[selected]);
        $scope.showTable = true;
        $log.log($scope.index);
      }
    }


    $scope.searchIndex = function (query) {
      let result
      if (!query) {
        alerts("please enter a query", "success", true, 5000)
        $log.log(alert.show)
        return false
      }
      result = indexer.searchIndex(query, $scope.selected());
      $scope.index = result
      $log.log(result)
    }

    $scope.knowCount = function () {
      const selected = $scope.selected();
      return $scope.uploadedFiles[selected].length;
    }

    $scope.inValue = function (values, i) {
      // let a = $scope.knowCount();
      if (values.indexOf(i) > -1) {
        return true;
      }
    }


    $scope.isValidFile = function (file) {
      return file.match(/\.json$/)
    }
  });