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
				value = value.toString();
				Done(true, value, "Number");
			break;
			case 'array':
				value = value.toString();
				Done(true, value,"Array");
			break;
			case 'string':
				Done(true, value,"String");
			break;
			case 'object':
				if(TypeOf.get(value) == null || TypeOf.get(value) == undefined){
						// Regular object 
						value = JSON.stringify(value);
						Done(true, value, "Object");
				}else{ // one of our objects (workspace or tab or content etc.)
						switch(TypeOf.get(value)){
							case Content.prototype.objectType:
								value = Content.prototype.toString();
								Done(true, value,"Content");
							break;
							case Tab.prototype.objectType:
								value = Tab.prototype.toString() ;
								Done(true, value,"Tab");
							break;
							case Workflow.prototype.objectType:
								value = Workflow.prototype.toString();
								Done(true, value,"Workflow");
							break;
							default:
							Done(false,"Error");
							break;
						} // end inner switch
					}
			break;
			default:
			Done(false,"Error");
			break;
			} // end outter switch

			function Done(sucsess, data, type){
				if(sucsess){
					objectSave = {
						"data": data,
						"type": type,
						"lastModified": +(new Date)
					};
					localStorage.setItem(key, JSON.stringify(objectSave));
				}else{
					console.log(new Error("Storage save() " + data));
				}
			}
		}
	}

	// Static method to get data from localStorage
	function get(key){
		var obj = localStorage.getItem(key);
		

	}

	// Static method to clear localStorage's data
	function clear(key, value){
		
	}



	return Storage;
});