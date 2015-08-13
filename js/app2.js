var app = angular.module('IntelLearner', ['onsen', 'firebase']);

app.controller('MainCtrl', ["$scope","Globals",function($scope, Globals) {

	console.log(Globals);
}]);