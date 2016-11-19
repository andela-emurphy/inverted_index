'use strict';

angular.module('invertedIndex')
  .service('alert', function($rootScope, $timeout) {
    return function(message, type, show, timeout) {
      // var alertTimeout;
      $rootScope.alert = {
        hasBeenHidden: true,
        message: message,
        type: type,
        show: false
      }
    $timeout(function() {
        $rootScope.alert.show = false
      }, timeout || 5000)
    }
  });
