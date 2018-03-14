var app = angular.module('ResumeApp', []);

app.controller('MainController',
['$scope', function($scope) {
  $scope.apps = [
    {
      title: "GPS Fleet Map",
      url: "samples/fleetmap/fleetmap.html",
      source: "Fleet Map Source",
      sourcelink: "",
      description: "Google map of gps fleet data."
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
        $("#samples iframe").attr('src',url);
        $("#samples iframe").on("load", function() {
          var height = $("#samples iframe").contents().find("html").height();
          console.log(height);
          $("#samples iframe").height(height);
        });
      };
    }
  };
});
