
angular.module('invertedIndex', [])
    .service('invertedIndex', function() {
        return {
            invertedIndex : InvertedIndex
        }
    })
    .controller('mainController', function($scope) {

        console.log(InvertedIndex)

    })