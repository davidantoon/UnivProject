(function(angular) {
    'use strict';
	angular.module('IntelLearner').factory('Settings', ["$rootScope", "Storage", "Server", function($rootScope, Storage, Server){


		function Settings(){
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
				var passThis1 = this;
				var svr = new Server("Settings", $rootScope.currentScope.isDummy);
				svr.getSettings(function(result, error){
					if(error || !result){
						ServerResquestComplete(null, passThis1);
					}else{
						try{
							var x =JSON.parse(strDecompress(result.OBJECT_VALUE));
							ServerResquestComplete(x, passThis1);
						}catch(e){
							ServerResquestComplete(null, passThis1);
						}
					}
				});
				function ServerResquestComplete(serverSettings, passThis){
					try{
						var stor = new Storage();
						stor.getWorkspaceData(false,function(dataFromLocalStorage, error){
							dataFromLocalStorage = ((dataFromLocalStorage)?dataFromLocalStorage.Settings:null);
							// init workspace
							if(serverSettings){
								if(dataFromLocalStorage != null){
									// compare 
									if(Number(serverSettings.lastModified) < dataFromLocalStorage.lastModified){
										passThis.autoScroll = dataFromLocalStorage.autoScroll;
										passThis.autoColor = dataFromLocalStorage.autoColor;
										passThis.autoSave = dataFromLocalStorage.autoSave;
										passThis.autoOpenTabs = dataFromLocalStorage.autoOpenTabs;
										passThis.defaultToastPosition = dataFromLocalStorage.defaultToastPosition;
										passThis.removeScrollOnMouseOver = dataFromLocalStorage.removeScrollOnMouseOver;
										passThis.lastModified = dataFromLocalStorage.lastModified;
									}else{
										
										passThis.autoScroll = serverSettings.autoScroll;
										passThis.autoColor = serverSettings.autoColor;
										passThis.autoSave = serverSettings.autoSave;
										passThis.autoOpenTabs = serverSettings.autoOpenTabs;
										passThis.defaultToastPosition = serverSettings.defaultToastPosition;
										passThis.removeScrollOnMouseOver = serverSettings.removeScrollOnMouseOver;
										passThis.lastModified = serverSettings.lastModified;
									}
								}else{
									// only server steps
									passThis.autoScroll = serverSettings.autoScroll;
									passThis.autoColor = serverSettings.autoColor;
									passThis.autoSave = serverSettings.autoSave;
									passThis.autoOpenTabs = serverSettings.autoOpenTabs;
									passThis.defaultToastPosition = serverSettings.defaultToastPosition;
									passThis.removeScrollOnMouseOver = serverSettings.removeScrollOnMouseOver;
									passThis.lastModified = serverSettings.lastModified;
								}
							}else{
								// only local steps
								if(dataFromLocalStorage != null){
									passThis.autoScroll = dataFromLocalStorage.autoScroll;
									passThis.autoColor = dataFromLocalStorage.autoColor;
									passThis.autoSave = dataFromLocalStorage.autoSave;
									passThis.autoOpenTabs = dataFromLocalStorage.autoOpenTabs;
									passThis.defaultToastPosition = dataFromLocalStorage.defaultToastPosition;
									passThis.removeScrollOnMouseOver = dataFromLocalStorage.removeScrollOnMouseOver;
									passThis.lastModified = dataFromLocalStorage.lastModified;
								}
							}
							callback();
						});
					}catch(e){
						console.log("loadSettings: ", e);
						callback();
					}
				}
			}
		}

		return Settings;
	}]);
})(window.angular);