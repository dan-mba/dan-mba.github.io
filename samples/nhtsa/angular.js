var outscope;
var app = angular.module('nhtsaApp', ['ngSanitize']);

app.controller('outputController',
  function($scope,$http){
    outscope = $scope;
    outscope.description = "Before";
    outscope.overallRating = "X";
  }
);
