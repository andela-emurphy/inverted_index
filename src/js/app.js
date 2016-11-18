"use strict"

angular.module('invertedIndex', [])
  .controller('mainController', function($scope, alert) {
    $scope.indexedFiles = []
    $scope.indexer = new InvertedIndex();
    $scope.message = false
    $scope.file = ''
    $scope.query = ''
    // $scope.$apply($scope.messag÷e);

    $scope.getIndexedFile = function (file) {
      // console.log($scope.indexedFiles)
      return $scope.indexedFiles
    }

    $scope.searchIndxedFile = function (value) {

    }


    let fileUploaded = angular.element(document.querySelector('#file'))
    fileUploaded.on('change', (evt) =>  {
    const fileList = evt.target.files

      console.log(evt)
      for (let key in fileList) {
        console.log(key)
        if (key === 'length' || key === 'item') {
          continue;
        }
        var file = fileList[key];
        //console.log(file)
        if(!file.name.match(/\.json$/)) {
          $scope.$apply(() => {
            alert("one or more files are in valid fix and reupload", "danger") ;
          })
          console.log('dkkdkkd');
          return;
        }
        var reader = new FileReader();

        reader.onload = function(event) {
          var file = JSON.parse(event.target.result);
          $scope.indexedFiles
            .push($scope.indexer.createIndex(file));
          // console.log(file)
        };
        reader.readAsText(file);
      }
    })   

    $scope.isValidFile = function(file) {
      return file.match(/\.json$/)
    } 
  });
