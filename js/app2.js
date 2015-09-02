var app = angular.module('IntelLearner', ['ngRoute','onsen', 'dndLists']);

app.controller('MainCtrl', ["$scope",function($scope) {

	function david(name, age, conData){
        if(conData){
            this.name = conData.name;
            this.age = conData.age;
        }else{
            this.name = name;
            this.age = age;
        }
        this.type = "Term";
    }
    david.prototype = {
        objectType: 11,
        agePlus: function(){
            this.age = this.age + 1;
        }
    }
    ngScope = $scope;
	$scope.listItems = [
		new david("name1", 1),
	    new david("name2", 2),
	    new david("name3", 3),
	    new david("name4", 4)
    ];


    $scope.list = [];

}]);