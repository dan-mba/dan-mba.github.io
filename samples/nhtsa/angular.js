var outscope;
var app = angular.module('nhtsaApp', []);

app.controller('outputController',
  function($scope,$http){
    outscope = $scope;
    outscope.description = "Before";
    outscope.overallRating = "X";
  }
);

function updateOutput(results) {
//  outscope.$apply(function() {
    outscope.overallRating = "test";
//  });
}
