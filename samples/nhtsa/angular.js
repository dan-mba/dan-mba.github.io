var app = angular.module('nhtsaApp', []);

app.controller('outputController',[]);

app.directive('vehicleOutput', function () {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'angular.html',
    link: function(scope, element, attrs) {
      scope.VehicleDescription = "";
    })
  };
});
