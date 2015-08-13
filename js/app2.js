var app = angular.module('IntelLearner', ['onsen', 'firebase']);

app.controller('MainCtrl', ["$scope", "Workspace", "Globals",function($scope, Workspace) {

	$scope.workspaces = new Workspace();
	$scope.jsonWorkflow = JSON.parse(JSON.stringify($scope.workspaces.workflows[0].toJson()));
	console.log($scope.workspaces);

	$scope.friends =
          [{name:'John', phone:'555-1212', age:10},
           {name:'Mary', phone:'555-9876', age:19},
           {name:'Mike', phone:'555-4321', age:21},
           {name:'Adam', phone:'555-5678', age:35},
           {name:'Julie', phone:'555-8765', age:29}];

}]);