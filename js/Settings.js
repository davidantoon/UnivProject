(function(angular) {
    'use strict';
	angular.module('IntelLearner').factory('Settings', ["$rootScope", "Storage", "Server", function($rootScope, Storage, Server){


		function Settings(){
			this.autoScroll = false;
			this.autoColor = false;
			this.autoSave = true;
			this.autoOpenTabs = false;
			this.defaultToastPosition = "BOTTOM";
			this.removeScrollOnMouseOver = false;
			this.lastModified = new Date();
		}

		Settings.prototype = {
			loadSettings: function(callback){

				// compare setting from storage and server
				
				// update current instacne
				
				callback();
			}
		}

		return Settings;
	}]);
})(window.angular);