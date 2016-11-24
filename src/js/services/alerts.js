'use strict';

angular.module('invertedIndex')
  .service('alerts', function ($rootScope, $timeout) {

    /* configures the alert property
     *
     * @param {Strimg} message to alert
     * @param {tye} type of message
     * @param {Boolean} checks for falsy
     * @param {Integer} time of display 
     */

    return function (message, type, show, timeout) {
      // var alertTimeout;
      $rootScope.alert = {
        hasBeenHidden: true,
        message: message,
        type: type,
        show: true
      };
      $timeout( () => {
        $rootScope.alert.show = false;
      }, timeout || 5000);
    };
  }); 
