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