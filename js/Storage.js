app.factory('Storage', ["Globals", function(Globals){

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
				value = JSON.stringify(value);
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
						"valueType": type,
						"lastModified": +(new Date)
					};
					localStorage.setItem(key, JSON.stringify(objectSave));
				}else{
					console.log(new Error("Storage: save() " + data));
				}
			}
		}
	}

	// Static method to get data from localStorage
	function get(key, callback){
		var obj = JSON.parse(localStorage.getItem(key));
		if(obj.data != undefined && obj.valueType != undefined && obj.lastModified != undefined){
			switch (obj.valueType){
				case "number":
					obj.data = Number(obj.data);
				break;
				case "array":
					obj.data = JSON.parse(obj.data);
				break;
				case "Object":
					obj.data = JSON.parse(obj.data);
				break;
				case "Content":
					var tempData = Globals.get(JSON.parse(obj.data).id), obj.valueType);
					if(tempData == null)
						obj.data = new Content(JSON.parse(obj.data));
					else
						obj.data = tempData;
				break;
				case "Tab":
					var tempData = Globals.get(JSON.parse(obj.data).ID), obj.valueType);
					if(tempData == null)
						obj.data = new Tab(JSON.parse(obj.data));
					else
						obj.data = tempData;
				break;
				case "Workflow":
					var tempData = Globals.get(JSON.parse(obj.data).ID), obj.valueType);
					if(tempData == null)
						obj.data = new Workflow(JSON.parse(obj.data));
					else
						obj.data = tempData;
				break;
				default: break;
			}
			callback(obj);
		}else{
			console.log(new Error("Storage: save() " + data));
		}

	}

	// Static method to clear localStorage's data
	function clear(key, value){
		
	}



	return Storage;
}]);