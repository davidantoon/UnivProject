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
							"searchFields": searchFields,
							"Token": "I6VT3j9c4GSWcCqKLlvXAaTkyItRHGvpMqiPJs1N9UKlwa5iwBf6L8rkRUbzBGYn6hcQJeDS8oeFykY5VdcHmE1eycNaTMx03KQN"
						};
						//Kbit
						if(dataToSearch.dataType[0] == 1){
							$httpR.connectToServer(data, "KBITsearchKbits", function(success, error){
								
								var successModified = [];
								if(error || !success){
									console.error("error searching kbit is server: ", error);
								}else{
									console.log("search kbit in serve done: ", success);
									// loop on kbits
									for(var i=0; i<success.length; i++){
										var tempTerms= [];
										var lockingUser = {};
										if(success[i].TERMS)
											// loop on terms inside kbit
											for(var j=0; j< success[i].TERMS.length; j++){
												var tempDisc= {};
												if(success[i].TERMS[j].TERM_STRING.other_langs){
													// loop on other lang inside term
													for(var k=0; k<success[i].TERMS[j].TERM_STRING.other_langs.length; k++){
														tempDisc[success[i].TERMS[j].TERM_STRING.other_langs[k].LANG] = success[i].TERMS[j].TERM_STRING.other_langs[k].TEXT;
													}
												}
												tempDisc[success[i].TERMS[j].TERM_STRING.LANG] = success[i].TERMS[j].TERM_STRING.TEXT;
												tempTerms.push({
													id: success[i].TERMS[j].UID,
													lastModified: new Date(success[i].TERMS[j].CREATION_DATE),
													description: tempDisc,
													type: "Term"
												});
											}
										if(success[i].LOCKING_USER){
											lockingUser = {
												id: success[i].LOCKING_USER.UID,
												username: success[i].LOCKING_USER.USERNAME,
												firstName: success[i].LOCKING_USER.FIRST_NAME,
												lastName: success[i].LOCKING_USER.LAST_NAME,
												email: success[i].LOCKING_USER.EMAIL,
												profilePicture: success[i].LOCKING_USER.PROFILE_PICTURE
											};
											successModified.push({
												id: success[i].UID,
												name: success[i].TITLE,
												terms: tempTerms,
												description: success[i].DESCRIPTION,
												locked: true,
												lockedBy: lockingUser,
												lastModified: new Date(success[i].CREATION_DATE),
												inProgress: false,
												type: "Kbit",
											});
										}else{
											successModified.push({
												id: success[i].UID,
												name: success[i].TITLE,
												terms: tempTerms,
												description: success[i].DESCRIPTION,
												locked: false,
												lockedBy: null,
												lastModified: new Date(success[i].CREATION_DATE),
												inProgress: false,
												type: "Kbit",
											});
										}
									}
								}
								mergeData(successModified, ++resultCounter);
							});
						}else{
							mergeData([], ++resultCounter);
						}
						// Delivery
						if(dataToSearch.dataType[1] == 1){
							$httpR.connectToServer(data, "DELIVERYsearchDelivery", function(success, error){
								
								var successModified = [];
								var lockingUser = {};
								if(error || !success){
									console.error("error searching delivery is server: ", error);
								}else{
									console.log("search delivery in serve done: ", success);
									// loop on deliveries
									for(var i=0; i<success.length; i++){
										var termKbits = [];
										
										if(success[i].KBITS){
											var successKbitModifiedNeeded = [];
											var successKbitModifiedProvided = [];
											// loop over the kbits dic.
											var tempKbitsNeeded = success[i].KBITS["NEEDED"];
											var tempKbitsProvided = success[i].KBITS["PROVIDED"];
											for(var j=0; j<tempKbitsNeeded.length; j++){
												var tempTerms= [];
												var lockingUserKbit = {};
												if(tempKbitsNeeded[j].TERMS){
													// loop on terms inside kbit
													for(var k=0; k< tempKbitsNeeded[j].TERMS.length; k++){
														var tempDisc= {};
														if(tempKbitsNeeded[j].TERMS[k].TERM_STRING.other_langs){
															// loop on other lang inside term
															for(var h=0; h<tempKbitsNeeded[j].TERMS[k].TERM_STRING.other_langs.length; h++){
																
																tempDisc[tempKbitsNeeded[j].TERMS[k].TERM_STRING.other_langs[h].LANG] = tempKbitsNeeded[j].TERMS[k].TERM_STRING.other_langs[h].TEXT;
															}
														}
														tempDisc[tempKbitsNeeded[j].TERMS[k].TERM_STRING.LANG] = tempKbitsNeeded[j].TERMS[k].TERM_STRING.TEXT;
														tempTerms.push({
															id: tempKbitsNeeded[j].TERMS[k].UID,
															lastModified: new Date(tempKbitsNeeded[j].TERMS[k].CREATION_DATE),
															description: tempDisc,
															type: "Term"
														});
													}
												}
												if(tempKbitsNeeded[j].LOCKING_USER){
													lockingUserKbit = {
														id: tempKbitsNeeded[j].LOCKING_USER.UID,
														username: tempKbitsNeeded[j].LOCKING_USER.USERNAME,
														firstName: tempKbitsNeeded[j].LOCKING_USER.FIRST_NAME,
														lastName: tempKbitsNeeded[j].LOCKING_USER.LAST_NAME,
														email: tempKbitsNeeded[j].LOCKING_USER.EMAIL,
														profilePicture: tempKbitsNeeded[j].LOCKING_USER.PROFILE_PICTURE
													};
													successKbitModifiedNeeded.push({
														id: tempKbitsNeeded[j].UID,
														name: tempKbitsNeeded[j].TITLE,
														terms: tempTerms,
														description: tempKbitsNeeded[j].DESCRIPTION,
														locked: true,
														lockedBy: lockingUserKbit,
														lastModified: new Date(tempKbitsNeeded[j].CREATION_DATE),
														inProgress: false,
														type: "Kbit"
													});
												}else{
													successKbitModifiedNeeded.push({
														id: tempKbitsNeeded[j].UID,
														name: tempKbitsNeeded[j].TITLE,
														terms: tempTerms,
														description: tempKbitsNeeded[j].DESCRIPTION,
														locked: false,
														lockedBy: null,
														lastModified: new Date(tempKbitsNeeded[j].CREATION_DATE),
														inProgress: false,
														type: "Kbit"
													});
												}
											}
											// loop over kbits provided
											for(var j=0; j<tempKbitsProvided.length; j++){
												var tempTerms= [];
												var lockingUserKbit = {};
												if(tempKbitsProvided[j] != null)
												if(tempKbitsProvided[j].TERMS){
													// loop on terms inside kbit
													for(var k=0; k< tempKbitsProvided[j].TERMS.length; k++){
														var tempDisc= {};
														if(tempKbitsProvided[j].TERMS[k].TERM_STRING.other_langs){
															// loop on other lang inside term
															for(var h=0; h<tempKbitsProvided[j].TERMS[k].TERM_STRING.other_langs.length; h++){
																
																tempDisc[tempKbitsProvided[j].TERMS[k].TERM_STRING.other_langs[h].LANG] = tempKbitsProvided[j].TERMS[k].TERM_STRING.other_langs[h].TEXT;
															}
														}
														tempDisc[tempKbitsProvided[j].TERMS[k].TERM_STRING.LANG] = tempKbitsProvided[j].TERMS[k].TERM_STRING.TEXT;
														tempTerms.push({
															id: tempKbitsProvided[j].TERMS[k].UID,
															lastModified: new Date(tempKbitsProvided[j].TERMS[k].CREATION_DATE),
															description: tempDisc,
															type: "Term"
														});
													}
												}

												if(tempKbitsProvided[j] != null)
												if(tempKbitsProvided[j].LOCKING_USER){
													lockingUserKbit = {
														id: tempKbitsProvided[j].LOCKING_USER.UID,
														username: tempKbitsProvided[j].LOCKING_USER.USERNAME,
														firstName: tempKbitsProvided[j].LOCKING_USER.FIRST_NAME,
														lastName: tempKbitsProvided[j].LOCKING_USER.LAST_NAME,
														email: tempKbitsProvided[j].LOCKING_USER.EMAIL,
														profilePicture: tempKbitsProvided[j].LOCKING_USER.PROFILE_PICTURE
													};
													successKbitModifiedProvided.push({
														id: tempKbitsProvided[j].UID,
														name: tempKbitsProvided[j].TITLE,
														terms: tempTerms,
														description: tempKbitsProvided[j].DESCRIPTION,
														locked: true,
														lockedBy: lockingUserKbit,
														lastModified: new Date(tempKbitsProvided[j].CREATION_DATE),
														inProgress: false,
														type: "Kbit",
													});
												}else{
													successKbitModifiedProvided.push({
														id: tempKbitsProvided[j].UID,
														name: tempKbitsProvided[j].TITLE,
														terms: tempTerms,
														description: tempKbitsProvided[j].DESCRIPTION,
														locked: false,
														lockedBy: null,
														lastModified: new Date(tempKbitsProvided[j].CREATION_DATE),
														inProgress: false,
														type: "Kbit",
													});
												}
											}
										}

										if(success[i].LOCKING_USER){
											lockingUser = {
												id: success[i].LOCKING_USER.UID,
												username: success[i].LOCKING_USER.USERNAME,
												firstName: success[i].LOCKING_USER.FIRST_NAME,
												lastName: success[i].LOCKING_USER.LAST_NAME,
												email: success[i].LOCKING_USER.EMAIL,
												profilePicture: success[i].LOCKING_USER.PROFILE_PICTURE
											};
											successModified.push({
												id: success[i].UID,
												name: success[i].TITLE,
												description: success[i].DESCRIPTION,
												lastModified: new Date(success[i].CREATION_DATE),
												type: "Delivery",
												lockedBy: lockingUser,
												locked: true,
												kBitsNeeded: successKbitModifiedNeeded,
												kBitsProvided: successKbitModifiedProvided,
												terms: termKbits
											});
										}else{
											successModified.push({
												id: success[i].UID,
												name: success[i].TITLE,
												description: success[i].DESCRIPTION,
												lastModified: new Date(success[i].CREATION_DATE),
												type: "Delivery",
												kBitsNeeded: successKbitModifiedNeeded,
												kBitsProvided: successKbitModifiedProvided,
												terms: termKbits
											});
										}
									}
								}
								mergeData(successModified, ++resultCounter);
							});
						}else{
							mergeData([], ++resultCounter);
						}
						// Term
						if(dataToSearch.dataType[2] == 1){
							$httpR.connectToServer(data, "TERMsearchTerms", function(success, error){
								var successModified = [];
								if(error || !success){
									console.error("error searching kbit is server: ", error);
								}else{
									console.log("search kbit in serve done: ", success);
									// for(){
									// 	successModified.push({
									// 		// conten properties
									// 	});
									// }
									
								}
								mergeData(successModified, ++resultCounter);
							});
						}else{
							mergeData([], ++resultCounter);
						}
						

						function mergeData(result, index){
							mergeResult = mergeResult.concat(result);
							if(index == 3)
								callback(mergeResult);
						}




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







