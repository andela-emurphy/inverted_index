angular.module('invertedIndex')
  .directive('fileUpload', () => {
    /*
     * link funtion to be called
     */
    function link(scope, elem) {
      elem.on('change', (evt) => {
        const fileList = evt.target.files;
        angular.forEach(fileList, (file) => {
          if (!scope.isValidFile(file.name)) {
            scope.$apply(function () {
              scope.alerts("please all files must be a valid json",
                "danger", true, 5000);
            });
            return;
          }
          const reader = new FileReader();
          //event fired when reader.readAsTex is called
          reader.onload = (event) => {
            try {
              const result = JSON.parse(event.target.result);
              scope.$apply(() => {
                scope.uploadedFiles[file.name] = result;
              });
            } catch (e) {
              scope.$apply(() => {
                scope.alerts("invalid json. pls refer to index guide ",
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
      templateUrl: '../../views/upload-file.html',
      link: link
    };
  });