var app = angular.module('nhtsaApp', []);
var outscope;

app.controller('outputController',['$scope',
  function($scope){
    outscope = $scope
    outscope.VehicleDescription = "Before";
  }]
);
