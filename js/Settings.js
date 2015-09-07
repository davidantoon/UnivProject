(function(angular) {
    'use strict';
	angular.module('IntelLearner').factory('Settings', ["$rootScope", "Storage", "Server", "$httpR", "Globals","Log", function($rootScope, Storage, Server, $httpR, Globals, Log){


		function Settings(){
			var TAG = "Settings";
			this.autoScroll = false;
			this.autoColor = false;
			this.autoSave = false;
			this.autoOpenTabs = false;
			this.defaultToastPosition = "BOTTOM";
			this.removeScrollOnMouseOver = false;
			this.preferLanguage = {"LANG_CODE":"en","LANG_NAME":"English"};
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
							passThis.preferLanguage = dataFromLocalStorage.preferLanguage;
							passThis.lastModified = dataFromLocalStorage.lastModified;
						}
						callback();
					});
				}catch(e){
					Log.e("Settings","loadSettings", e);
					callback();
				}
			},
			saveSettings: function(){
				var stor = new Storage();
				stor.setWorkspaceData(null, x.Settings, null,function(dataSaved, error){
					if(error || !dataSaved)
						Log.e("Settings","saveSettings", error);
					else{
						var svr = new Server("steps", ngScope.isDummy);
						if(typeof callback == "funtion")
							svr.setSteps(localStorage["com.intel.userdata"], callback);
						else
							svr.setSteps(localStorage["com.intel.userdata"], function(){});
					}
				});
			},
			getLanguages: function(callback){
				if(ngScope.isDummy)
					callback([{"LANG_CODE":"en", "LANG_NAME":"English"},{"LANG_CODE":"he","LANG_NAME":"Hebrew"},{"LANG_CODE":"ar","LANG_NAME":"Arabic"}]);
				else{
					$httpR.connectToServer({}, $httpR.getLanguages, Globals, function(success, error){
						if(error || !success)
							callback([{"LANG_CODE":"en", "LANG_NAME":"English"},{"LANG_CODE":"he","LANG_NAME":"Hebrew"},{"LANG_CODE":"ar","LANG_NAME":"Arabic"}]);
						else
							callback(success);
					});
				}
			}
		}

		return Settings;
	}]);
})(window.angular);