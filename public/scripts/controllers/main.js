'use strict';
terpTrack.controller('mainCtrl', function($scope){
  $scope.list = [];
  $scope.submit = function() {
    var userEmail = this.login.email;
    var userPass = this.login.password;
    if (userEmail && userPass)
  $scope.list.push(userEmail, userPass);
  $scope.login.email = "";
  $scope.login.password = "";
  console.log("submit triggered!");
  };

  $scope.register = function() {
    var newUser = $scope.newuser.name;
    var newEmail = $scope.newuser.email;
    var newPass = $scope.newuser.pass;

    if (newUser && newEmail && newPass) {
      $scope.list.push(newUser, newPass, newEmail);
      $scope.newuser.name = "";
      $scope.newuser.email = "";
      $scope.newuser.pass = "";
      console.log("Successfully Registered");

    }

  };
});
