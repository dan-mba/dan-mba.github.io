var outscope;
var to;
var app = angular.module('nhtsaApp', ['ngSanitize']);

app.controller('outputController',
  function($scope,$http,$timeout){
    outscope = $scope;
    to = $timeout;
  }
);
