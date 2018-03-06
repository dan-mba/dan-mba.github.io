var app = angular.module('nhtsaApp', []);
var outscope;

app.controller('outputController',['$scope',
  function($scope){
    $scope.VehicleDescription = "";
    outscope = $scope;
  }]
);
