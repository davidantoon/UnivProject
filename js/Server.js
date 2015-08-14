app.factory('Server', ['', function(){
	
	function Server(connectionType){
		this.baseUrl = "dummy";
		this.searchQuery = "dummy";
		this.getElemQuery = "dummy";
		this.saveObjectQuery = "dummy";
		this.TypeOfData = connectionType;
	}

	Server.prototype = {

		/**
		 * Search element in server
		 * @param  {string}   searchText The text we are going to search
		 * @param  {Function} callback   callback function
		 */
		searchElement: function(searchText, callback){
			if(this.baseUrl == "dummy"){
				setTimeout(function(){

					/* START =>  dummy response for search request */
					var dataFromServer = [{
						"ID": "1",
						"Name": "Element 1",
						"Url": "Url 1",
						"Category": "Category 1",
						"Terms":["C","C#","Java"],
						"KbitsNeeded": [],
						"KbitProvided": [],
						"Locked": false,

					},{
						"ID": "2",
						"Name": "Element 2",
						"Url": "Url 2",
						"Category": "Category 2",
						"Terms":["C","C#","Java"],
						"KbitsNeeded": [],
						"KbitProvided": [],
						"Locked": false,

					},{
						"ID": "3",
						"Name": "Element 3",
						"Url": "Url 3",
						"Category": "Category 3",
						"Terms":["C","C#","Java"],
						"KbitsNeeded": [],
						"KbitProvided": [],
						"Locked": false,

					},{
						"ID": "4",
						"Name": "Element 4",
						"Url": "Url 4",
						"Category": "Category 4",
						"Terms":["C","C#","Java"],
						"KbitsNeeded": [],
						"KbitProvided": [],
						"Locked": false,

					},{
						"ID": "5",
						"Name": "Element 5",
						"Url": "Url 5",
						"Category": "Category 5",
						"Terms":["C","C#","Java"],
						"KbitsNeeded": [],
						"KbitProvided": [],
						"Locked": false,

					},{
						"ID": "6",
						"Name": "Element 6",
						"Url": "Url 6",
						"Category": "Category 6",
						"Terms":["C","C#","Java"],
						"KbitsNeeded": [],
						"KbitProvided": [],
						"Locked": false,

					},{
						"ID": "7",
						"Name": "Element 7",
						"Url": "Url 7",
						"Category": "Category 7",
						"Terms":["C","C#","Java"],
						"KbitsNeeded": [],
						"KbitProvided": [],
						"Locked": false,

					}];
					/* dummy response for search request  <= END */


					var dataToReturn = [];
					for(var i=0; i<dataFromServer.length; i++){
						if(CashedObjects[dataFromServer[i].ID] == undefined){
							CashedObjects[dataFromServer[i].ID] = new content(dataFromServer[i]);
						}
						dataToReturn.push(CashedObjects[dataFromServer[i].ID]);
					}
				},300);
			}else{
				$.ajax({
					url: baseUrl+searchQuery,
					type: 'GET',
					dataType: 'Content-Type: application/json',
					data: {text: searchText},
					success: function(res){
						callback(res);
					},
					error: function(err){
						callback("Error");
					}
				});
			}
		},

		/**
		 * Saves data to server
		 * @param {object}   obj      object we are going to save
		 * @param {Function} callback callback function
		 */
		
		// deleviry , settings, kbits,steps, 
		saveElement: function(obj, callback){
			var tempType = this.TypeOfData;
			if(tempType == "delivery"){
			}
			else if(tempType == "kbits"){

			}else if(tempType == "settings"){

			}else if(tempType == "steps"){

			}else if(tempType == "dummy"){
				
			}

			/*	if(saveObjectQuery == "dummy"){
					setTimeout(function(){
						callback(obj);
					},500);
			}else{
				$.ajax({
					url: baseUrl+saveObjectQuery,
					type: 'POST',
					dataType: 'Content-Type: application/json',
					data: {"Object": obj},
					success: function(res){
						callback(res);
					},
					error: function(err){
						callback("Error");
					}
				});
			}
			}else if(TypeOfData == "Kbits"){
			
			}else{

			}*/
		},

		/**
		 * Gets element from server by ID
		 * @param  {Number}   objID    the ID of the object
		 * @param  {Function} callback callback funtion
		 * @return {object}            returns the objects we asked for
		 */
		getElementByID: function(objID, callback){

		},

		/**
		 * Delete the element of the of the provided ID.
		 * @param  {Number}   objID    the object ID
		 * @param  {Function} callback callback funtion
		 */
		deleteElementByID: function(objID, callback){

		},

		/**
		 * Gets the version of the provided ID
		 * @param  {Number}   objID    the object ID
		 * @param  {Function} callback callback funtion
		 * @return {object}            the object version we need
		 */
		getVersionsByID: function(objID, callback){

		},

		/**
		 * Gets the versions list of the provided ID
		 * @param  {Number}   objID    the object ID
		 * @param  {Function} callback callback funtion
		 * @return {list}              the object versions.
		 */
		getVersionList: function(objID, callback){

		}


	}
}]);

/*
function svrData(connectionType) {

	var baseUrl = "dummy";
	var searchQuery = "dummy";
	var getElemQuery = "dummy";
	var saveObjectQuery = "dummy";
	var TypeOfData = connectionType;


	this.searchElem = function(searchText, callback) {

		if(baseUrl == "dummy"){
			setTimeout(function(){

				/* START =>  dummy response for search request 
				var dataFromServer = [{
					"ID": "1",
					"Name": "Element 1",
					"Url": "Url 1",
					"Category": "Category 1",
					"Terms":["C","C#","Java"],
					"KbitsNeeded": [],
					"KbitProvided": [],
					"Locked": false,

				},{
					"ID": "2",
					"Name": "Element 2",
					"Url": "Url 2",
					"Category": "Category 2",
					"Terms":["C","C#","Java"],
					"KbitsNeeded": [],
					"KbitProvided": [],
					"Locked": false,

				},{
					"ID": "3",
					"Name": "Element 3",
					"Url": "Url 3",
					"Category": "Category 3",
					"Terms":["C","C#","Java"],
					"KbitsNeeded": [],
					"KbitProvided": [],
					"Locked": false,

				},{
					"ID": "4",
					"Name": "Element 4",
					"Url": "Url 4",
					"Category": "Category 4",
					"Terms":["C","C#","Java"],
					"KbitsNeeded": [],
					"KbitProvided": [],
					"Locked": false,

				},{
					"ID": "5",
					"Name": "Element 5",
					"Url": "Url 5",
					"Category": "Category 5",
					"Terms":["C","C#","Java"],
					"KbitsNeeded": [],
					"KbitProvided": [],
					"Locked": false,

				},{
					"ID": "6",
					"Name": "Element 6",
					"Url": "Url 6",
					"Category": "Category 6",
					"Terms":["C","C#","Java"],
					"KbitsNeeded": [],
					"KbitProvided": [],
					"Locked": false,

				},{
					"ID": "7",
					"Name": "Element 7",
					"Url": "Url 7",
					"Category": "Category 7",
					"Terms":["C","C#","Java"],
					"KbitsNeeded": [],
					"KbitProvided": [],
					"Locked": false,

				}];
				/* dummy response for search request  <= END 


				var dataToReturn = [];
				for(var i=0; i<dataFromServer.length; i++){
					if(CashedObjects[dataFromServer[i].ID] == undefined){
						CashedObjects[dataFromServer[i].ID] = new content(dataFromServer[i]);
					}
					dataToReturn.push(CashedObjects[dataFromServer[i].ID]);
				}

			},300);
		}else{
			$.ajax({
				url: baseUrl+searchQuery,
				type: 'GET',
				dataType: 'Content-Type: application/json',
				data: {text: searchText},
				success: function(res){
					callback(res);
				},
				error: function(err){
					callback("Error");
				}
			});
			
		}
	}

	/**
	 * Saves data to server
	 * @param {object}   obj      object we are going to save
	 * @param {Function} callback callback function
	 
	this.Save = function(obj, callback){
		if(TypeOfData == "Object"){
			if(saveObjectQuery == "dummy"){
				setTimeout(function(){
					callback(obj);
				},500);
			}else{
				$.ajax({
					url: baseUrl+saveObjectQuery,
					type: 'POST',
					dataType: 'Content-Type: application/json',
					data: {"Object": obj},
					success: function(res){
						callback(res);
					},
					error: function(err){
						callback("Error");
					}
				});
			}

		}else if(TypeOfData == "Kbits"){
			
		}else{

		}
	}

	this.getItemByID = function(objID, callback){
		
	}
}
*/