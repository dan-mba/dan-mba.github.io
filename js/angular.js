var app = angular.module('ResumeApp', []);

app.controller('MainController',
['$scope', function($scope) {
  $scope.apps = [
    {
      title: "GPS Static Fleet Map",
      url: "samples/fleetmap/fleetmap.html",
      source: "",
      description: "I developed this application to take data from the GPS provider & display it on a map. " +
                  "This app uses the Google Static Maps API. I used this API because at the time it could be used without a key. " +
                  "Because the maps this API provides are static images, I had to devlop an interface to allow you to zoom " +
                  "& move arround the map. I also needed to determine the geographical center of the coordinates " +
                  "and the maximum latitude & longitude distance from the center, " +
                  "so I could ensure all the items would be displayed on the initial map."
    },
    {
      title: "GPS Javascript Fleet Map",
      url: "samples/fleetmapjs/fleetmap.html",
      source: "",
      description: "This is an updated version of the Static Fleet Map that uses the Google Maps Javascript API. " +
                  "I created this after finding out Google updated their maps API TOS to require a key for all usage. " +
                  "Using the Javascript API allowed me to create a map with clickable location markers to display the " +
                  "relevant data right on the map in an info bubble."
      
    },
    {
      title: "NHTSA Safety Ratings",
      url: "samples/nhtsa/nhtsa.html",
      source: "",
      description: "I developed this application as I was learning how to access REST APIs. " +
                  "This application acceseses data from the NHTSA 5 Star Safety Ratings API and " +
                  "displays the available data for the vehicle model selected. " +
                  "I recently updatded the app to use jQueryUI stylized select menus for a more modern look " +
                  "& AngularJS for improved formatting & code readability."
    }
  ];
}]);

app.directive('codeSample', function() {
  return {
    restrict: 'E',
    scope: {
      info: '='
    },
    templateUrl: 'js/codeSample.html',
    link: function(scope, element, attrs) {
      scope.showCode = function (url) {
        /* IE will not display in iframes correctly, so I open apps in a new tab */
        if(isIE != 0) {
          $("#code button").blur();
          var win = window.open(url,"_blank");
          win.focus();
         }
        else {
          $("#code").removeClass("active");
          $("#samples").addClass("active");
          $("#sampback").addClass("active");
          $("#topnav").hide();
          $("#samples iframe").on("load", function() {
            var height = $("#samples iframe").contents().find("html").height();
            $("#samples iframe").height(Math.max(Math.ceil(height)+2, $(window).height()-75));
          });
          $("#samples iframe").attr('src',url);
        }
      };
    }
  };
});
