var app = angular.module('ResumeApp', []);

app.controller('MainController',
['$scope', function($scope) {
  $scope.apps = [
    {
      title: "GPS Fleet Map",
      url: "samples/fleetmap/fleetmap.html",
      source: "",
      description: "Google map of gps fleet data."
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
        $("#code").removeClass("active");
        $("#samples").addClass("active");
        $("#sampback").addClass("active");
        $("#topnav").hide();
        $("#samples iframe").on("load", function() {
          var height = $("#samples iframe").contents().find("html").height();
          console.log(height);
          $("#samples iframe").height(Math.ceil(height)+2);
        });
        $("#samples iframe").attr('src',url);
      };
    }
  };
});
