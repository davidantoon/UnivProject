app.factory('Settings', ["Storage", "Server", function(Storage, Server){


	function Settings(){
		this.autoScroll = false;
		this.autoColor = false;
		this.autoSave = true;
		this.autoOpenTabs = false;
		this.defaultToastPosition = "BOTTOM";
		this.removeScrollOnMouseOver = true;
		
	}

	/**
	 * Rename a certan tab
	 * @param  {object}   tab      Tab
	 * @param  {string}   newName  new name for the tab
	 * @param  {Function} callback callback function
	 */
	// renameTab : function(tab, newName, callback){
	// 	if( tab == null || tab == undefined){
	// 		callback();
	// 		return;
	// 	}
	// 	tab.name = newName;
	// }
	// 
	// COLOR PICKER : http://www.dematte.at/colorPicker/

	return Settings;
}]);