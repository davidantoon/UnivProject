app.factory('Settings', ["Storage", "Server", function(Storage, Server){


	function Settings(){
		this.autoScroll = false;
		this.autoColor = false;
		this.autoSave = false;
		this.autoOpenTabs = false;
		
	}

	return Settings;
}]);