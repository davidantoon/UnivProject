(function(angular) {
    // 'use strict';
	angular.module('IntelLearner').factory('Server', ["$rootScope", "Toast", "$httpR", "Globals","Log", function($rootScope, Toast, $httpR, Globals, Log){
	
		function Server(connectionType, dummy){
			try{
				if(dummy){
					this.baseUrl = "dummy";
				}else{
					this.baseUrl = "";
				}
				this.TypeOfData = connectionType;
			}catch(e){
	            Log.e("Server","server", e);
			}
		}
	 
		Server.prototype = {

			/**
			 * Search element in server
			 * @param  {object}   dataToSearch Object contains the data we want to search
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
						var ConvertData = function (results, error){
							if(error || !results){
								Log.e("Server","search", error);
								results = [];
							}else{
								for(var i=0; i<results.length; i++){
									results[i] = ngScope.objectServerToClient(results[i]);
								}
							}
							mergeData(results, ++resultCounter);
						}
						
						function mergeData(result, index){
							mergeResult = mergeResult.concat(result);
							if(index == 3){
								var tempData = [];
								for(var i=0; i<mergeResult.length; i++){
									var found = false;
									for(var j=0; j<tempData.length; j++){
										if(tempData[j].id == mergeResult[i].id && tempData[j].type == mergeResult[i].type){
											found = true;
										}
									}
									if(found == false){
										tempData.push(mergeResult[i]);
									}
								}
								callback(tempData);
							}
						}
						var searchFields = [];
						var mergeResult = [];
						var resultCounter = 0;
						var searchResults = [];
						if(dataToSearch.searchBy[0] == 1)
							searchFields.push("TITLE");
						if(dataToSearch.searchBy[1] == 1)
							searchFields.push("DESCRIPTION");
						if(dataToSearch.searchBy[2] == 1)
							searchFields.push("UID");
						var data= {
							"searchWord": dataToSearch["text"],
							"searchFields": searchFields
						};
						//Kbit
						if(dataToSearch.dataType[0] == 1){
							$httpR.connectToServer(data, $httpR.KBITsearchKbits, Globals, ConvertData);
						}else{
							mergeData([], ++resultCounter);
						}
						// Delivery
						if(dataToSearch.dataType[1] == 1){
							$httpR.connectToServer(data, $httpR.DELIVERYsearchDelivery, Globals, ConvertData);
						}else{
							mergeData([], ++resultCounter);
						}
						// Term
						if(dataToSearch.dataType[2] == 1){
							data.lang = ngScope.Settings.preferLanguage.LANG_CODE;
							$httpR.connectToServer(data, $httpR.TERMsearchTerms, Globals, ConvertData);
						}else{
							mergeData([], ++resultCounter);
						}

					}
				}catch(e){
	                Log.e("Server","search", e);
	                callback(null,{"message":e.message,"code":e.code});
				}
			},

			/**
			 * Saves NEW ELEMTN !!! to server
			 * @param {object}   obj      object we are going to save
			 * @param {Function} callback callback function
			 */
			
			// delivery , settings, kbits,steps, 
			saveElement: function(obj, callback){
				try{
					if(this.baseUrl == "dummy"){
						switch (obj.type){
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
						switch (obj.type){
							case "Delivery":
								$httpR.connectToServer({"json":obj.toJsonDeliveryServer()}, $httpR.DELIVERYupdateFullDelivery, Globals, function(success, error){
									if(error || !success){
										callback(null, error);
									}else{
										callback(success);
									}
								});
							break;
							case "Kbit":
								$httpR.connectToServer({"json":obj.toJsonKbitServer()}, $httpR.KBITupdateFullKbit, Globals, function(success, error){
									if(error || !success){
										callback(null, error);
									}else{
										callback(success);
									}
								});

								// call new method to save kbit and terms relations
							break;
							default:
							break;
						}
					}
				}catch(e){
	                Log.e("Server","saveElement", e);
	                callback(null,{"message":e.message,"code":e.code});
				}
			},

			/**
			 * Gets element from server by ID
			 * @param  {Number}   objID    the ID of the object
			 * @param  {Function} callback callback Function
			 * @return {object}            returns the objects we asked for
			 */
			getElementByID: function(objID, callback){
				try{	
					if(this.baseUrl == "dummy"){

						switch (this.TypeOfData){
							case "delivery":
								var deliveryDB = JSON.parse(localStorage.getItem("com.intel.Server.delivery"));
								for(var i = 0; deliveryDB.length; i++){
									if(deliveryDB[i].id == objID){
										callback(deliveryDB[i], null);
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
						// create data to search for using search method
						var dataToSearch = {
                            "text": objID.toString(),
                            "dataType": [
                                0, //  Kbits
                                0, //  Deliveries
                                0  //  Terms
                            ],
                            "searchBy": [
                                0, //  Name
                                0, //  Description
                                1  //  ID
                            ],
                            "forceSearch": 'ServerPull'
                        } ;

						switch (this.TypeOfData){
							case "delivery":
								dataToSearch.dataType[1] = 1;
								this.search(dataToSearch, callback);

							break;
							case "kbits":
								dataToSearch.dataType[0] = 1;
								this.search(dataToSearch, callback);
							break;
							case "term":
								dataToSearch.dataType[2] = 1;
								this.search(dataToSearch, callback);
							break;
							default:
								callback(null, {"message":"Element type is not found in getting element by id","code":"404"});
								return;
							break;
						}
					}
				}catch(e){
	                Log.e("Server","getElementByID", e);
	                callback(null,{"message":e.message,"code":e.code});
				}
			},

			/**
			 * Delete the element of the of the provided ID.
			 * @param  {Number}   objID    the object ID
			 * @param  {Function} callback callback @function
			 */
			deleteElementByID: function(objID, callback){
				try{
					if(this.baseUrl == "dummy"){
						localStorage.removeItem("dummy");
						callback("success",{"message": "dummy has been removed","code" : ""});
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
					}else{

						callback(true);
						// switch (this.TypeOfData){
						// 	case "delivery":
						// 	break;
						// 	case "kbits":
						// 		data.kbitUID = objID;
						// 		data.lang = 0;
						// 		console.warn("Delete kbit by id missing from API");
						// 		// $httpR.connectToServer(data, "TERMgetRelatedTerms", Globals, function(success, error){
						// 		// 	if(error || !(success)){
						// 		// 		console.log("error getting term by id: ", error);
						// 		// 	}else{
						// 		// 		console.log("term got by id from server: ", success);
						// 		// 	}
						// 		// });
						// 	break;
						// 	case "term":
						// 		data.kbitUID = objID;
						// 		data.lang = 0;
						// 		console.warn("Delete term by id missing from API");
								
						// 	break;
						// 	default:
						// 		callback(null, {"message":"Save Element func Object is not found","code":"404"});
						// 		return;
						// 	break;
						// }
					}
				}catch(e){
	                Log.e("Server","deleteElementByID", e);
	                callback(null,{"message":e.message,"code":e.code});
				}
			},

			/**
			 * Gets the steps from server.
			 * @param  {callback} callback callback function
			 * @return {json}              steps
			 */
			getSteps: function(callback){
				try{
					if(this.baseUrl == "dummy"){
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
					}else{
						$httpR.connectToServer({Key:"Steps"}, $httpR.KVPgetKeyValuePair, Globals, callback);
					}
				}catch(e){
	                Log.e("Server","getSteps", e);
	                callback(null,{"message":e.message,"code":e.code});
				}
			},

			/**
			 * Save the steps in server
			 * @param {Function} callback callback function
			 */
			setSteps: function(steps, callback){
				try{
					if(this.baseUrl == "dummy"){
						callback();
					}else{
						$httpR.connectToServer({Key:"Steps", value:steps}, $httpR.KVPsetKeyValuePair, Globals, callback);
					}
				}catch(e){
	                Log.e("Server","getSteps", e);
	                callback(null,{"message":e.message,"code":e.code});
				}
			},

			getFromServer: function(objectsArray, callback){
				try{
					var temmpArray = [];
					if(this.baseUr== "dummy"){
						callback([]);
					}else{
						if(objectsArray){
							if(objectsArray.length == 0){
								callback([]);
							}else{
								// send array to server and get the objects
								$httpR.connectToServer(objectsArray, $httpR.REFRESHERgetData, Globals, function(success, error){
									if(error && !success){
										console.log(error);
										callback([]);
									}
									else{
										success = success.DELIVERIES.concat(success.KBITS);
										if(success && success.length){
											var tempData = [];
											for(var i=0; i<success.length; i++){
												var found = false;
												for(var j=0; j<tempData.length; j++){
													if(tempData[j].UID == success[i].UID){
														found = true;
													}
												}
												if(found == false){
													tempData.push(success[i]);
												}
											}
											callback(tempData);
										}else{
											callback([]);
										}
									}
								});
							}
						}
					}
				}catch(e){
					Log.e("Server","getFromServer", e);
					callback(null, e);
				}
			},


			/********************************************************************
			*                                                                   *
			  00000000000  00000000000  000000000    000     000     00000     
			      000      000          000      00  0000   0000   000   000   
			      000      000          000      00  00 00 00 00   00          
			      000      00000000000  000000000    00  000  00    0000000    
			      000      000          000 000      00   0   00          00   
			      000      000          000   000    00       00   000   000   
			      000      00000000000  000     000  00       00     00000     
			*                                                                   *
			********************************************************************/

			/**
			 * Gets all terms from server
			 * @param  {Function} callback callback function
			 */
			getAllTerms: function(callback){
				try{
					var data = {
						lang: ngScope.Settings.preferLanguage.LANG_CODE
					};

					$httpR.connectToServer(data, $httpR.TERMgetAllTermsStrings, Globals, function(success, error){
						if(error || !success){
							Log.e("Server","getAllTerms", error);
							callback(null, error);
						}else{
							callback(success);
						}
					});
				}catch(e){
					Log.e("Server","getAllTerms", e);
					callback(null, e);
				}
			}

		}
		return Server;
	}]);
})(window.angular);







