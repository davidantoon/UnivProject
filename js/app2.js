var app = angular.module('IntelLearner', ['onsen', 'firebase']);

app.controller('MainCtrl', ["$scope", "Workspace", "Globals",function($scope, Workspace) {

	var workspaces = new Workspace();
	console.log(workspaces);
}]);