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

		if(typeof key == 'String'){
			
			switch(typeof value){
			case "function":
				Done(false,"value is function");
			break;
			case undefined:
				Done(false,"value is undefined");
			break;
			case null:
				Done(false,"value is null");
			break;
			case 'number':
				value = value.toString() + "||Number";
				Done(true, value);
			break;
			case 'array':
				value = value.toString() + "||Array";
				Done(true,value);
			break;
			case 'string':
				value += "||String";
				Done(true, value);
			break;
			case 'object':
				if(TypeOf.get(value) == null || TypeOf.get(value) == undefined){
						// Regular object 
						value = JSON.stringify(value) + "||Object";
						Done(true,value);
				}else{ // one of our objects (workspace or tab or content etc.)
						switch(TypeOf.get(value)){
							case Content.prototype.objectType:
								value = Content.prototype.toString() + "||Content";
								Done(true,value);
							break;
							case Tab.prototype.objectType:
								value = Tab.prototype.toString() + "||Tab";
								Done(true,value);
							break;
							case Workflow.prototype.objectType:
								value = Workflow.prototype.toString() + "||Workflow";
								Done(true,value);
							break;
							default:
							Done(false,"Error");
							break;
						}
					}
			break;
			default:
			Done(false,"Error");
			break;
			} // end outter switch

			function done(sucsess, data){
				if(sucsess){
					localStorage.setItem(key, data);
				}else{
					console.log(new Error(data));
				}
			}
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