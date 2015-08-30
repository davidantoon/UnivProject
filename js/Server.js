(function(angular) {
    // 'use strict';
	angular.module('IntelLearner').factory('Server', ["$rootScope", "Toast","$httpR", function($rootScope, Toast, $httpR){
	
		function Server(connectionType, dummy){
			try{
				if(dummy){
					this.baseUrl = "dummy";
					this.searchQuery = "dummy";
					this.getElemQuery = "dummy";
					this.saveObjectQuery = "dummy";
					this.TypeOfData = connectionType;
				}else{
					this.baseUrl = "http://192.168.1.4:8888/mopdqwompoaskdqomdiasjdiowqe/server/webservice.php/";
					this.method = "POST";
					this.timeout = 10000;

				}
			}catch(e){
				$rootScope.currentScope.Toast.show("Error!","There was an error in creating connection to server", Toast.LONG, Toast.ERROR);
	            console.error("server: ", e);
			}
		}
	 
		Server.prototype = {

			/**
			 * Search element in server
			 * @param  {string}   dataToSearch The data that defines the search we are going to do
			 * @param  {Function} callback     callback function
			 */
			search: function(dataToSearch, callback){
				try{ 
					if(this.baseUrl == "dummy"){
						var searchResults = [];
						var SplitText = dataToSearch.text.split(' ');
						if(this.TypeOfData == "SearchTab"){
							
							if(dataToSearch.dataType[0] == 1){ // Kbits

								var KbitsDB = JSON.parse(localStorage.getItem("com.intel.Server.Kbits"));
								for (var i = KbitsDB.length - 1; i >= 0; i--) {
									var found = 1;
									for(var j = 0; j < SplitText.length; j++){

										if(dataToSearch.searchBy[0] == 1){ // Name 
											if(KbitsDB[i].name.indexOf(SplitText[j]) == -1){
												found *=0;
											}
										}
										if(dataToSearch.searchBy[1] == 1){ // Description 
											if(KbitsDB[i].description.indexOf(SplitText[j]) == -1){
												found *=0;
											}
										}
										if(dataToSearch.searchBy[2] == 1){ // Id 
											if(Number(KbitsDB[i].id) !=  Number(SplitText[j])){
												found *=0;
											}
										}
									}
									if(found){
										searchResults.push(KbitsDB[i]);
									}
								}
							}
							if(dataToSearch.dataType[1] == 1){ // Deliveries
								var deliveryDB = JSON.parse(localStorage.getItem("com.intel.Server.delivery"));
								
								for (var i = deliveryDB.length - 1; i >= 0; i--) {
									var found = 1;
									for(var j = 0; j < SplitText.length; j++){

										if(dataToSearch.searchBy[0] == 1){ // Name 
											if(deliveryDB[i].name.indexOf(SplitText[j]) == -1){
												found *=0;
											}
										}
										if(dataToSearch.searchBy[1] == 1){ // Description 
											if(deliveryDB[i].description.indexOf(SplitText[j]) == -1){
												found *=0;
											}
										}
										if(dataToSearch.searchBy[2] == 1){ // Id 
											if(Number(deliveryDB[i].id) != Number(SplitText[j])){
												found *=0;
											}
										}
									}
									if(found){
										searchResults.push(deliveryDB[i]);
									}
								}
							}
							if(dataToSearch.dataType[2] == 1){ // Terms
								var termsDB = JSON.parse(localStorage.getItem("com.intel.Server.terms"));
								for (var i = termsDB.length - 1; i >= 0; i--) {
									var found = 1;
									for(var j = 0; j < SplitText.length; j++){

										if(dataToSearch.searchBy[0] == 1){ // Name 
											if(termsDB[i].name.indexOf(SplitText[j]) == -1){
												found *=0;
											}
										}
										if(dataToSearch.searchBy[1] == 1){ // Description 
											if(termsDB[i].description.indexOf(SplitText[j]) == -1){
												found *=0;
											}
										}
										if(dataToSearch.searchBy[2] == 1){ // Id 
											if(Number(termsDB[i].id) !=  Number(SplitText[j])){
												found *=0;
											}
										}
									}
									if(found){
										searchResults.push(termsDB[i]);
									}
								}
							}
						}
						callback(searchResults, null);
						return;
					}else{
						debugger;
						var searchFields = [];
						if(dataToSearch.searchBy[0] == 1)
							searchFields.push("TITLE");
						if(dataToSearch.searchBy[1] == 1)
							searchFields.push("DESCRIPTION");
						if(dataToSearch.searchBy[2] == 1)
							searchFields.push("UID");
						var data= {
							"searchWord": dataToSearch["text"],
							"searchFields": searchFields,
							"Token": "7Qpv7KBEZVk3t67TARQqcEBITdZKb9EiZ3O7OpLOl6ROdZHORye4dQM63MQeVuxVyl2nLOb6V3V83CWUbbYo1Ku4xljsQRnodqLY"
						};
						$httpR.connectToServer(data, "KBITsearchKbits", function(success, error){
							if(error || !success){
								console.error("error searching kbit is server: ", error);
							}else{
								console.log("search kbit in serve done: ", success);
							}
						});
					}
				}catch(e){
					$rootScope.currentScope.Toast.show("Error!","There was an error in search in server", Toast.LONG, Toast.ERROR);
	                console.error("search: ", e);
	                callback(null,{"message":e.message,"code":e.code});
				}
			},

			/**
			 * Saves data to server
			 * @param {object}   obj      object we are going to save
			 * @param {Function} callback callback function
			 */
			
			// deleviry , settings, kbits,steps, 
			saveElement: function(obj, callback){
				try{
					if(this.saveObjectQuery == "dummy"){

						switch (this.TypeOfData){
							case "Deliveries":
								var deliveryDB = JSON.parse(localStorage.getItem("com.intel.Server.delivery"));
								deliveryDB.push(obj);
								localStorage.removeItem("com.intel.Server.delivery");
								localStorage.setItem("com.intel.Server.delivery", JSON.stringify(deliveryDB));
								callback({"message":"delivery saved correctly","code":""} ,null);
							break;
							case "kbits":
								var kbitsDB = JSON.parse(localStorage.getItem("com.intel.server.kbits"));
								kbitsDB.push(obj);
								localStorage.removeItem("com.intel.server.kbits");
								localStorage.setItem("com.intel.server.kbits", JSON.stringify(kbitsDB));
								callback({"message":"kbits saved correctly","code":""}, null);
							break;
							case "settings":
								var settingsDB = JSON.parse(localStorage.getItem("com.intel.server.settings"));
								settingsDB.push(obj);
								localStorage.removeItem("com.intel.server.settings");
								localStorage.setItem("com.intel.server.settings", JSON.stringify(settingsDB));
								callback({"message":"settings saved correctly","code":""}, null);
							break;
							case "steps":
								// var stepsDB = JSON.parse(localStorage.getItem("com.intel.server.steps"));
								localStorage.removeItem("com.intel.server.steps");
								localStorage.setItem("com.intel.server.steps", JSON.stringify(obj));
								callback({"message":"steps saved correctly","code":""}, null);
							break;
							case "Terms":
								var termsDB = JSON.parse(localStorage.getItem("com.intel.server.terms"));
								termsDB.push(obj);
								localStorage.removeItem("com.intel.server.terms");
								localStorage.setItem("com.intel.server.terms", JSON.stringify(termsDB));
								callback({"message":"term saved correctly","code":""}, null);
							break;
							default:
								callback(null, {"message":"Could not save element","code":""});
							break;
						}
						console.warn("DUMMY REQUESTS");
					}else{
						// AJAX
					}
				}catch(e){
					$rootScope.currentScope.Toast.show("Error!","There was an error in saving element", Toast.LONG, Toast.ERROR);
	                console.error("saveElement: ", e);
	                callback(null,{"message":e.message,"code":e.code});
				}
			},

			/**
			 * Gets element from server by ID
			 * @param  {Number}   objID    the ID of the object
			 * @param  {Function} callback callback funtion
			 * @return {object}            returns the objects we asked for
			 */
			getElementByID: function(objD, callback){
				try{	
					if(saveObjectQuery == "dummy"){
					// 	return localStorage.getItem("dummy");
					// }

						switch (this.TypeOfData){
							case "delivery":
								var deliveryDB = JSON.parse(localStorage.getItem("com.intel.Server.delivery"));
								for(var i = 0; deliveryDB.length; i++){
									if(deleviry[i].id == objID){
										callback(deleviry[i], null);
										return;
									}
								}
								callback(null, {"message":"Object delivery not found","code":"404"});
								return;
							break;
							case "kbits":
								var kbitsDB = JSON.parse(localStorage.getItem("com.intel.server.kbits"));
								for(var i = 0; kbitsDB.length; i++){
									if(kbitsDB[i].id == objID){
										callback(kbitsDB[i],null);
										return;
									}
								}
								callback(null, {"message":"Object kbits not found","code":"404"});
								return;
							break;
							case "term":
								var termsDB = JSON.parse(localStorage.getItem("com.intel.server.terms"));
								for(var i = 0; termsDB.length; i++){
									if(termsDB[i].id == objID){
										callback(termsDB[i],null);
										return;
									}
								}
								callback(null, {"message":"Object term not found","code":"404"});
								return;
							break;
							default:
								callback(null, {"message":"Save Element func Object is not found","code":"404"});
								return;
							break;
						}
					}else{
						// AJAAAXXX
					}
				}catch(e){
					$rootScope.currentScope.Toast.show("Error!","There was an error in getting element", Toast.LONG, Toast.ERROR);
	                console.error("getElementByID: ", e);
	                callback(null,{"message":e.message,"code":e.code});
				}
			},

			/**
			 * Delete the element of the of the provided ID.
			 * @param  {Number}   objID    the object ID
			 * @param  {Function} callback callback funtion
			 */
			deleteElementByID: function(objID, callback){
				try{
					if(saveObjectQuery == "dummy"){
						localStorage.removeItem("dummy");
						callback("success",{"message": "dummy has been removed","code" : ""});
					}

					switch(this.TypeOfData){
						case "delivery":
							var deliveryDB = JSON.parse(localStorage.getItem("com.intel.server.delivery"));
							for(var i = 0; i < deliveryDB.length; i++){
								if(deliveryDB[i].id == objID){
									deliveryDB.splice(i,1);
									localStorage.setItem("com.intel.server.delivery",deliveryDB);
									callback({"message":"delivery has successfuly removed","code":""},null);
									return;
								}
							}
							callback(null,{"message":"could not remove delivery","code":""});
							return;
						break;
						case "kbits":
							var kbitsDB = JSON.parse(localStorage.getItem("com.intel.server.kbits"));
							for(var i = 0; i < kbitsDB.length; i++){
								if(kbitsDB[i].id == objID){
									kbitsDB.splice(i,1);
									localStorage.setItem("com.intel.server.kbits",kbitsDB);
									callback({"message":"kbits has successfuly removed","code":""},null);
									return;
								}
							}
							callback(null,{"message":"could not remove kbits","code":""});
							return;
						break;
						case "term":
							var termsDB = JSON.parse(localStorage.getItem("com.intel.server.term"));
							for(var i = 0; i < termsDB.length; i++){
								if(termsDB[i].id == objID){
									termsDB.splice(i,1);
									localStorage.setItem("com.intel.server.term",termsDB);
									callback({"message":"term has successfuly removed","code":""},null);
									return;
								}
							}
							callback(null,{"message":"could not remove term","code":""});
							return;
						break;
						default:
							callback(null, {"message":"Delete Element func Object is not found","code":"404"});
							return;
						break;
					}
				}catch(e){
					$rootScope.currentScope.Toast.show("Error!","There was an error in deleting element", Toast.LONG, Toast.ERROR);
	                console.error("deleteElementByID: ", e);
	                callback(null,{"message":e.message,"code":e.code});
				}
			},

			/**
			 * Gets the version of the provided ID
			 * @param  {Number}   objID    the object ID
			 * @param  {Function} callback callback funtion
			 * @return {object}            the object version we need
			 */
			getVersionsByID: function(objID, callback){
				try{
					callback(null, null);
				}catch(e){
					callback(null, {"message":e.message,"code":e.code});
				}
			},

			/**
			 * Gets the versions list of the provided ID
			 * @param  {Number}   objID    the object ID
			 * @param  {Function} callback callback funtion
			 * @return {list}              the object versions.
			 */
			getVersionList: function(objID, callback){
				try{
					callback(null, null);
				}catch(e){
					callback(null,{"message":e.message,"code":e.code});
				}
			},

			/**
			 * Gets the steps from server.
			 * @param  {callback} callback callback funtion
			 * @return {json}              steps
			 */
			getSteps: function(callback){
				try{
					var stepsDB = localStorage.getItem("com.intel.server.steps");
					if(stepsDB == null || stepsDB == undefined){
						callback(null, {"message":"could not get steps from server", "code": ""});
						return;
					}else{
						if(stepsDB.length == 0){
							callback(null, {"message":"there is no steps in server", "code": ""});
							return;
						}
						callback(JSON.parse(stepsDB), null);
						return;
					}
				}catch(e){
					$rootScope.currentScope.Toast.show("Error!","There was an error in getting steps from server", Toast.LONG, Toast.ERROR);
	                console.error("getSteps: ", e);
	                callback(null,{"message":e.message,"code":e.code});
				}
			},

			/**
			 * 	------------------------------- ASK IF IT SHOULD TAKE ID TO GET SPECIFIC SETTINGS -------------------------------------
			 * Gets the settings from Server
			 * @param  {callback} callback callback function
			 * @return {json}              steps found in server
			 */
			getSettings: function(callback){
				try{
					var settingsDB = localStorage.getItem("com.intel.server.settings");
					if(settingsDB == null || settingsDB == undefined){
						callback(null, {"message":"could not get settings from server","code":""});
						return;
					}else{
						if(settingsDB.length == 0){
							callback({"message":"there is no settings in server", "code": ""}, null );
							return;
						}
						callback(JSON.parse(settingsDB), null);
						return;
					}
				}catch(e){
					$rootScope.currentScope.Toast.show("Error!","There was an error in getting settings from server", Toast.LONG, Toast.ERROR);
	                console.error("getSettings: ", e);
	                callback(null,{"message":e.message,"code":e.code});
				}
			}
		}
		return Server;
	}]);
})(window.angular);







