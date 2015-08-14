app.factory('Storage', function(){

	/**
	 * Used to fillter the log file
	 * @type {String}
	 */
	var prefixKey = "com.intel.videoManager";

	/**
	 * Default constructor to prevent errors!
	 */
	function Storage(){}

	// Static method to add new data to localStorage
	function save(key, value){

		// objectType
		// value+"||"+valueType
		if(typeof value == Content.prototype.objectType){
			value += "Content";
			value = Content.prototype.toString();
		}
		else if(typeof value == Tab.prototype.objectType){
			value += "Tab";
			value = Tab.prototype.toString();
		}
		else if(typeof value == Workflow.prototype.objectType){
			value += "Workflow";
			value = Workflow.prototype.toString();
		}
		else if(typeof value == Workspace.prototype.objectType){
			value += "Workspace";
			value = Workspace.prototype.toString();
		}
		else if(typeof value == 'object')
			value += "Object";

		if(typeof key == 'String'){
			// - function
			// + object
			// - null
			// + other
			localStorage.setItem(key, value);
		}
	}

	// Static method to get data from localStorage
	function get(key){
		
	}

	// Static method to clear localStorage's data
	function clear(key, value){
		
	}



	return Storage;
});