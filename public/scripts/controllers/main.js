'use strict';
terpTrack.controller('mainCtrl', function($scope, $http){

//Register function
$scope.register = function(){
//stores form field information into a variable for submission
  var data = {
    "name": $scope.newuser.name,
    "email": $scope.newuser.email,
    "password": $scope.newuser.pass
    };
  //sends form field data to server via post.
  $http.post('/api/users', data).then(function successCallback(response){
      //Clenas up form fields after submission.
      $scope.newuser.name = "";
      $scope.newuser.email = "";
      $scope.newuser.pass = "";
      //For the sake of time I am using jQuery to notify user of
      //successful registration by changing the class of bootstrap button.
      $("#submitnew").addClass('btn-success').removeClass('btn-primary');;
      $("#submitnew").html("SUCCESS!");

      //triggers a timer to close out the register overlay
      setTimeout(closeNav, 2000);

    }, function errorCallback (response){
      //TODO: Create Red Button for Error
      if(response.status == 500){
        alert("Server Error");
      } else if (response.status == 404){
        alert("Email already exists");
      }
      console.log(response)
    });
};//end of register function

// Login submit function
$scope.submit = function(){
  //Stores form field data into an object
  var loginData = {
    "email": $scope.login.email,
    "pass" : $scope.login.password
    };
  $http.post('/api/login', loginData).then(function successCallback(response){
    $scope.login.email = "";
    $scope.login.password = "";
    
    if(response.status == 200){
      //TODO: Trigger redirect to profile page.
    }
    }, function errorCallback (response){
      //TODO: Create an formal error alert.
      alert("Login Failed");
    });
  };//end of submit function
});//end of mainCtrl
