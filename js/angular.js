var app = angular.module('ResumeApp', []);

app.controller('MainController',
['$scope', function($scope) {
  $scope.apps = [
    {
      title: "GPS Static Fleet Map",
      url: "samples/fleetmap/fleetmap.html",
      source: "//github.com/dan-mba/dan-mba.github.io/tree/master/samples/fleetmap",
      description: "I developed this application to take data from the GPS provider & display it on a map. " +
                  "This app uses the Google Static Maps API. I used this API because at the time it could be used without a key. " +
                  "Because the maps this API provides are static images, I had to develop an interface to allow you to zoom " +
                  "& move around the map. I also needed to determine the geographical center of the coordinates " +
                  "and the maximum latitude & longitude distance from the center, " +
                  "so I could ensure all the items would be displayed on the initial map."
    },
    {
      title: "GPS JavaScript Fleet Map",
      url: "samples/fleetmapjs/fleetmap.html",
      source: "//github.com/dan-mba/dan-mba.github.io/tree/master/samples/fleetmapjs",
      description: "This is an updated version of the Static Fleet Map that uses the Google Maps JavaScript API. " +
                  "I created this after finding out Google updated their Maps API TOS to require a key for all usage. " +
                  "Using the JavaScript API allowed me to create a map with clickable location markers to display the " +
                  "relevant data right on the map in an info bubble."
      
    },
    {
      title: "NHTSA Safety Ratings",
      url: "samples/nhtsa/nhtsa.html",
      source: "//github.com/dan-mba/dan-mba.github.io/tree/master/samples/nhtsa",
      description: "I developed this application as I was learning how to access REST APIs. " +
                  "This application accesses data from the NHTSA 5 Star Safety Ratings API and " +
                  "displays the available data for the vehicle model selected. " +
                  "I recently updated the app to use jQueryUI stylized select menus for a more modern look " +
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
      scope.showCode = function (url, isSource) {
        /* IE will not display in iframes correctly, so I open apps in a new tab */
        /* The same codes is used to open source links to fix a stuck focus when using anchor links */
        if((isIE != 0) || isSource) {
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
      
      scope.info.description += " Test!";
    }
  };
});
