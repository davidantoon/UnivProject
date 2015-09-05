(function(angular) {
    'use strict';
	angular.module('IntelLearner').factory('Settings', ["$rootScope", "Storage", "Server", function($rootScope, Storage, Server){


		function Settings(){
			var TAG = "Settings";
			this.autoScroll = false;
			this.autoColor = false;
			this.autoSave = false;
			this.autoOpenTabs = false;
			this.defaultToastPosition = "BOTTOM";
			this.removeScrollOnMouseOver = false;
			this.lastModified = new Date();
		}

		Settings.prototype = {
			loadSettings: function(callback){
				var passThis = this;
				try{
					var stor = new Storage();
					stor.getWorkspaceData(false,function(dataFromLocalStorage, error){
						dataFromLocalStorage = ((dataFromLocalStorage)?dataFromLocalStorage.Settings:null);
						// init Settings
						if(dataFromLocalStorage != null){
							passThis.autoScroll = dataFromLocalStorage.autoScroll;
							passThis.autoColor = dataFromLocalStorage.autoColor;
							passThis.autoSave = dataFromLocalStorage.autoSave;
							passThis.autoOpenTabs = dataFromLocalStorage.autoOpenTabs;
							passThis.defaultToastPosition = dataFromLocalStorage.defaultToastPosition;
							passThis.removeScrollOnMouseOver = dataFromLocalStorage.removeScrollOnMouseOver;
							passThis.lastModified = dataFromLocalStorage.lastModified;
						}
						callback();
					});
				}catch(e){
					console.log("loadSettings: ", e);
					callback();
				}
			},
			saveSettings: function(callback){
				var stor = new Storage();
				stor.setWorkspaceData(null, x.Settings, null,function(dataSaved, error){
					if(error || !dataSaved){}
					else{
						var svr = new Server("steps", $rootScope.currentScope.isDummy);
						if(typeof callback == "funtion")
							svr.setSteps(localStorage["com.intel.userdata"], callback);
						else
							svr.setSteps(localStorage["com.intel.userdata"], function(){});
					}
				});
			}
		}

		return Settings;
	}]);
})(window.angular);