app.factory('Storage', ["Globals", "TypeOf", function(Globals, TypeOf){


	/**
	 * Default constructor to prevent errors!
	 */
	function Storage(){}
	Storage.prototype = {
		save: function(key, value, callback){

			if(typeof key == 'string'){
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
			}else{
				Done(false,"Error");
			}
			function Done(sucsess, data, type){
				if(sucsess){
					objectSave = {
						"data": data,
						"valueType": type,
						"lastModified": +(new Date)
					};
					localStorage.setItem(key, JSON.stringify(objectSave));
					callback(true, null);
				}else{
					callback(null, {"message":"Exception localStorage insert","code":100});
					console.error(new Error("Storage: save() " + data));
				}
			}
		},
		get: function(key, callback){
			try{
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
							var tempData = Globals.get(JSON.parse(obj.data).id);
							if(tempData == null)
								obj.data = new Content(JSON.parse(obj.data));
							else
								obj.data = tempData;
						break;
						case "Tab":
							obj.data = new Tab(JSON.parse(obj.data));
						break;
						case "Workflow":
							obj.data = new Workflow(JSON.parse(obj.data));
						break;
						default: break;
					}
					callback(obj);
				}else{
					callback(null, {"message":"Object not found","code":"404"});
					console.error(new Error("Storage: save() "), data);
				}
			}catch(exp){
				callback(null, exp);
				console.error("Storage: save() ", exp);
			}

		},

		/**
		 * Clears the local storage or removes item from it
		 * @param  {string}   key      the key we are going to remove
		 * @param  {string}   value    the value we are going to remove
		 * @param  {Function} callback callback funtion
		 */
		clear: function(key, value, callback){
			// clear all storage
			if(key == null || key == undefined || key == ""){
				localStorage.clear();
				callback("sucsess", null);
				return;
			}

			// remove specific key from storage
			if(value == null || value == undefined || value == ""){
				localStorage.removeItem(key);
				callback(JSON.parse(localStorage.getItem(key))), null);
				return;
			}

			//remove specific value from key in storage
			var tempData = JSON.parse(localStorage.getItem(key));
			for (var i = tempData.length - 1; i >= 0; i--) {
				if( JSON.stringify(value) == JSON.stringify(tempData[i]) ){
					tempData.splice(i, 1);
					localStorage.setItem(key, tempData);
					callback(JSON.parse(localStorage.getItem(key)), null);
					return;
				}
			}
			callback(null, {"message": "no item has been removed","code": "");
			return;
		},

		/**
		 * Saves steps locally
		 * @param  {object}   steps    steps we are going to save
		 * @param  {Function} callback callback function
		 */
		saveStepsLocaly: function(steps, callback){
			if(steps == null || steps == undefined){
				callback(null, {"message": "steps you wanted to save is null or undefined", "code": ""});
				return;
			}
			localStorage.setItem("steps",JSON.stringify(steps));
			callback({"message":"steps has sucsessfully save in local storage","code":""}, null);
			return;
		},

		/**
		 * Gets steps from local storage
		 * @param  {Function} callback callback function
		 */
		getStepsFromStorage: function(callback){
			callback(JSON.parse(localStorage.getItem("steps")), null);
			return;
		}
	};

	return new Storage();
}]);
