'use strict';


/* In this function I am implmenting a workaround because I was not able to load
a template on $http success callback in Angular */
function loadProfile(){
  $("#profile").removeAttr("style");
  $("#login").remove();


//reloads a google map script after http callback.
  var head= document.getElementsByTagName('head')[0];
      var script= document.createElement('script');
      script.type= 'text/javascript';
      script.src= 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAhGQCRIApdyDGTfqRFCVjaa2n-HHVOg7w&callback=initMap';
      head.appendChild(script);
}

terpTrack.controller('mainCtrl', function($scope, $http, fileUpload){


//Photo Upload function
  $scope.uploadFile = function(){
     var file = $scope.myFile;

     console.log('file is ' );
     console.dir(file);

     var uploadUrl = "/img/"+ $scope.currentuser.email;
     fileUpload.uploadFileToUrl(file, uploadUrl);
  };



//Register function
$scope.register = function(){
//stores form field information into a variable for submission
  var data = {
    "name": $scope.newuser.name,
    "email": $scope.newuser.email,
    "password": $scope.newuser.pass
    };
  //sends form field data to server via post.
  $http.post('/register', data).then(function successCallback(response){
      //Clenas up form fields after submission.
      $scope.newuser.name = "";
      $scope.newuser.email = "";
      $scope.newuser.pass = "";
      //For the sake of time I am using jQuery to notify user of
      //successful registration by changing the class of bootstrap button.
      $("#submitnew").addClass('btn-success').removeClass('btn-primary');;
      $("#submitnew").html("SUCCESS!");

      //triggers a timer to close out the register overlay
      setTimeout(closeNav, 1500);
      //ERROR callback
    }, function errorCallback (response){

      if(response.status == 500){
        alert("Server Error");
        //Router is programmed to send 404 if a match is found
      } else if (response.status == 404){
        //Changes UI to reflect a match
        $("#submitnew").addClass('btn-warning').removeClass('btn-primary');;
        $("#submitnew").html("Email Already Exists");
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
  $http.post('/login', loginData).then(function successCallback(response){


    if(response.status == 200){
  //Here I store the user infomation that's found and stores it in "currentuser"
      $scope.currentuser = response.data;
  //Changes HTML upon successful login. jQuery is a work around.
      loadProfile();
    }
    }, function errorCallback (response){
      //Creates a formal error alert.
      $("#submit").addClass('btn-danger').removeClass('btn-primary');
      $("#submit").html("Wrong Login Info");
      $("#submit").blur(function(){
        $("#submit").addClass('btn-primary').removeClass('btn-danger').html("Sign In");
        $scope.login.email = "";
        $scope.login.password = "";
      });
    });
  };//end of submit function
});//end of mainCtrl

terpTrack.directive('fileModel', ['$parse', function ($parse) {
   return {
      restrict: 'A',
      link: function(scope, element, attrs) {
         var model = $parse(attrs.fileModel);
         var modelSetter = model.assign;

         element.bind('change', function(){
            scope.$apply(function(){
               modelSetter(scope, element[0].files[0]);
            });
         });
      }
   };
}]);

terpTrack.service('fileUpload', ['$http', function ($http) {
   this.uploadFileToUrl = function(file, uploadUrl){
      var fd = new FormData();
      fd.append('file', file);

      $http.put(uploadUrl, fd, {
         transformRequest: angular.identity,
         headers: {
           'Content-Type': undefined,
          }
      })

      .success(function(){
      })

      .error(function(){
      });
   }
}]);
