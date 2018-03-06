var app = angular.module('nhtsaApp', []);
var outscope;

app.controller('outputController',['$scope',
  function($scope){
    $scope.VehicleDescription = "Before";
    outscope = $scope;
  }]
);
