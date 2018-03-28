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
                    "Because the maps this API provides are static images, I had to devlop an interface to allow you to zoom & move arround the map. " +
                    "I also needed to determine the geographical center of the coordinates and the maximum latitude & longitude distance from the center, " +
                    "so I could ensure all the items would be displayed on the initial map."
    },
    {
      title: "NHTSA Safety Ratings",
      url: "samples/nhtsa/nhtsa.html",
      source: "",
      description: "Application to display data from the NHTSA Saftey Rating API"
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
