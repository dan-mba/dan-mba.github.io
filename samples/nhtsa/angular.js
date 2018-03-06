var app = angular.module('nhtsaApp', []);
var outscope;

app.controller('outputController',
  function($scope){
    outscope = $scope
//    outscope.description = "Before";
//    outscope.OverallRating = "X";
  }
);

function updateOutput(results) {
  outscope.$apply(function() {
    outscope.description = "test";
  });
}
