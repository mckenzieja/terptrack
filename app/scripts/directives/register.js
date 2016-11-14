'use strict';

angular.module('terptrack')
.directive('register', function(){
  return {
    templateUrl: 'templates/register.html',
    replace: true,
    controller: 'mainCtrl'
  }
});
