
//initialize module 'terptrack'
var terpTrack = angular.module("terpTrack", []);



/* Open */
$("#reg").click(function () {
$("#myNav").css("height", "100%");
  $(".signin").hide();
});


/* Close */
function closeNav() {
  $(".signin").show();
    document.getElementById("myNav").style.height = "0%";
}
