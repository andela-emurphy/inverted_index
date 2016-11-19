"use strict"

angular.module('invertedIndex', [])
  .filter('range', () => {
      return function (input,number) {
        for(let i=1; parseInt(number) >= i; i++) {
          input.push(i);
        }
        return input;
      }
  })
  .directive('fileUpload', ($log) => {
    const template = ' <input type="file" id="file" name="files">\
                <label for="file"><i class="fa fa-upload" aria-hidden="true"></i> Upload A file</label>'

    function link(scope, elem, attr) {
      elem.on('change', function (evt) {
        const fileList = evt.target.files
        angular.forEach(fileList, (file) => {
          if (!scope.isValidFile(file.name)) {
            alert("please all file must be a valid json");
            return
          }
          const reader = new FileReader();
          reader.onload = function (event) {
            try {
              let result = JSON.parse(event.target.result);
              scope.$apply(function () {
                scope.uploadedFiles[file.name] = result
              })
            } catch (e) {
              alert('invalid json file ' + e);
              $log.log('invalid json file');
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
  .controller('mainController', ($scope, alert, $log, $timeout) =>  {

      $scope.uploadedFiles = {}
      $scope.index
  

      $scope.createIndex = () => {

        var selected = document.getElementById('uploaded-files').value

        if($scope.isValidFile(selected) && $scope.uploadedFiles.hasOwnProperty(selected)) {
          var indexer = new InvertedIndex()
          $scope.index = indexer.createIndex($scope.uploadedFiles[selected])
        
        }

      }

    $scope.knowCount = function () {
      let indexProp = $scope.index
      let len = 0
      for(let key in indexProp) {
        let indexArr  = indexProp[f].length;     
        len = Math.max(...indexArr)> len ? indexArr : len
      }
      $log.log(len)            
      return len;
    }

    $scope.inValue = function(values, i) {
        let a = $scope.knowCount();
        if(values.indexOf(i) > -1 ){
          return true;
        }      
    }


    $scope.isValidFile =  function (file) {
      return file.match(/\.json$/)
    }
 });