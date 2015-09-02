(function(angular) {
    // 'use strict';
	angular.module('IntelLearner').factory('Server', ["$rootScope", "Toast", "$httpR", "Globals", function($rootScope, Toast, $httpR, Globals){
	
		function Server(connectionType, dummy){
			try{
				if(dummy){
					this.baseUrl = "dummy";
					this.searchQuery = "dummy";
					this.getElemQuery = "dummy";
					this.saveObjectQuery = "dummy";
					this.TypeOfData = connectionType;
				}else{
					this.baseUrl = "http://94.159.162.6:8888/mopdqwompoaskdqomdiasjdiowqe/server/webservice.php/";
					this.method = "POST";
					this.TypeOfData = connectionType;
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

						debugger;
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
							$httpR.connectToServer(data, $httpR.KBITsearchKbits, Globals, function(success, error){
								
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
							$httpR.connectToServer(data, $httpR.DELIVERYsearchDelivery, Globals, function(success, error){
								
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

							data.lang = 'en';
							$httpR.connectToServer(data, $httpR.TERMsearchTerms, Globals, function(success, error){
								var successModified = [];
								debugger;
								if(error || !success){
									console.error("error searching term is server: ", error);
								}else{
									for(var i=0; i<success.length; i++){
										successModified.push({
											id: success[i].UID,
											name: success[i].TERM_STRING,
											description: success[i].TERM_MEANING + " Language: " +success[i].LANG,
											type: "Term"
										});
									}
									
								}
								mergeData(successModified, ++resultCounter);
							});
						}else{
							mergeData([], ++resultCounter);
						}
						

						function mergeData(result, index){
							debugger;
							mergeResult = mergeResult.concat(result);
							if(index == 3)
								callback(mergeResult);
						}




					}
				}catch(e){
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
					if(this.baseUrl == "dummy"){

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
						switch (this.TypeOfData){
							case "Deliveries":
								
							break;
							case "kbits":
								console.warn("add kbit update and kbit publish functions");
							break;
							case "settings":
							break;
							case "steps":
							break;
							case "Terms":

							break;
							default:
							break;
						}
						
					}
				}catch(e){
	                console.error("saveElement: ", e);
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
	                console.error("getElementByID: ", e);
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
						
						switch (this.TypeOfData){
							case "delivery":
							break;
							case "kbits":
								data.kbitUID = objID;
								data.lang = 0;
								console.warn("Delete kbit by id missing from API");
								// $httpR.connectToServer(data, "TERMgetRelatedTerms", Globals, function(success, error){
								// 	if(error || !(success)){
								// 		console.log("error getting term by id: ", error);
								// 	}else{
								// 		console.log("term got by id from server: ", success);
								// 	}
								// });
							break;
							case "term":
								data.kbitUID = objID;
								data.lang = 0;
								console.warn("Delete term by id missing from API");
								
							break;
							default:
								callback(null, {"message":"Save Element func Object is not found","code":"404"});
								return;
							break;
						}
					}
				}catch(e){
	                console.error("deleteElementByID: ", e);
	                callback(null,{"message":e.message,"code":e.code});
				}
			},

			/**
			 * Gets the version of the provided ID
			 * @param  {Number}   objID    the object ID
			 * @param  {Function} callback callback function
			 * @return {object}            the object version we need
			 */
			getVersionsByID: function(objID, callback){
				try{
					callback(null, null);
				}catch(e){
					console.error("getVersionsByID: ", e);
					callback(null, {"message":e.message,"code":e.code});
				}
			},
 
			/**
			 * Gets the versions list of the provided ID
			 * @param  {Number}   objID    the object ID
			 * @param  {Function} callback callback function
			 * @return {list}              the object versions.
			 */
			getVersionList: function(objID, callback){
				try{
					callback(null, null);
				}catch(e){
					console.error("getVersionList: ", e);
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
	                console.error("getSteps: ", e);
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
						steps = strCompress(JSON.stringify(steps));
						$httpR.connectToServer({Key:"Steps", value:steps}, $httpR.KVPsetKeyValuePair, Globals, callback);
					}
				}catch(e){
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
	                console.error("getSettings: ", e);
	                callback(null,{"message":e.message,"code":e.code});
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
			 * Adds term to term relation
			 * @param {Number}   firstTermID  term id
			 * @param {Number}   secondTermID term id
			 * @param {Function} callback     callback function
			 */
			AddTermToTermRelation: function(firstTermID, secondTermID, callback){
				try{
					if((firstTermID !=null && firstTermID !=undefined) && (secondTermID != null && secondTermID !=undefined)){
						var data = {
							firstUID: firstTermID,
							secondUID: secondTermID,
							isHier: true
						};

						$httpR.connectToServer(data, $httpR.TERMaddTermToTermRelation, Globals, function(success, error){
							if(error || !success){
								console.error("error adding term to term relation: ", error);
								callback(null, error);
							}else{
								callback(success, null);
							}
						});
					}else{
						console.error("error adding term to term relation");
						callback(null, "error adding term to term relation");
					}
				}catch(e){
					console.error("AddTermToTermRelation: ", e);
					callback(null, e);
				}
			},
			
			/**
			 * Removes term to term relation
			 * @param  {Number}   firstTermID  first term id
			 * @param  {Number}   secondTermID second term id
			 * @param  {Function} callback     callback function
			 */
			removeTermToTermRelation: function(firstTermID, secondTermID, callback){
				try{
					if((firstTermID !=null && firstTermID !=undefined) && (secondTermID != null && secondTermID !=undefined)){
						var data = {
							firstUID: firstTermID,
							secondUID: secondTermID
						};

						$httpR.connectToServer(data, $httpR.TERMremoveTermToTermRelation, Globals, function(success, error){
							if(error || !success){
								console.error("error removing term to term relation: ", error);
								callback(null, error);
							}else{
								callback(success, null);
							}
						});
					}else{
						console.error("error removing term to term relation");
						callback(null, "error removing term to term relation");
					}
				}catch(e){
					console.error("removeTermToTermRelation: ", e);
					callback(null, e);
				}
			},

			/**
			 * Gets all terms from server
			 * @param  {Function} callback callback function
			 */
			getAllTerms: function(callback){
				try{
					var data = {
						lang: 0
					};

					$httpR.connectToServer(data, $httpR.TERMgetAllTermsStrings, Globals, function(success, error){
						if(error || !success){
							console.error("error getting all terms: ", error);
							callback(null, error);
						}else{
							callback(success);
						}
					});
				}catch(e){
					console.error("getAllTerms: ", e);
					callback(null, e);
				}
			},

			/**
			 * Gets all related term to specific term
			 * @param  {Number}   termID   term id
			 * @param  {Function} callback callback fucntion
			 */
			getRelatedTermsByID: function(termID, callback){
				try{
					if(termID){
						var data = {
							termUID: termID,
							lang: 0
						};

						$httpR.connectToServer(data, $httpR.TERMgetRelatedTerms, Globals, function(success, error){
							if(error || !success){
								console.error("error getting related terms: ", error);
								callback(null, error);
							}else{
								callback(success);
							}
						});
					}else{
						console.error("error getting related terms");
						callback(null, "error getting related terms");
					}
				}catch(e){
					console.error("getRelatedTermsByID: ", e);
					callback(null, e);
				}
			},




			/********************************************************************
			*                                                                   *
			  000     000  000000000    00000000000  00000000000     00000     
			  000    000   000     000      000          000       000   000   
			  000  000     000     000      000          000       00          
			  00000        0000000000       000          000        0000000    
			  000  000     000     000      000          000              00   
			  000    000   000     000      000          000       000   000   
			  000     000  000000000    00000000000      000         00000     
			*                                                                   *
			********************************************************************/




			/**
			 * Start editing kbit ( lock )
			 * @param {Number}   kbitID   kbit id
			 * @param {Function} callback callback function
			 */
			StartEditingKbit: function(kbitID, callback){
				try{
					if(kbitID){
						var data = {
							kbitUID: kbitID
						};

						$httpR.connectToServer(data, $httpR.KBITbeginEdit, Globals, function(success, error){
							if(error || !success){
								console.log("error begining edit kbit: ", error);
								callback(null, error);
							}else{
								callback(success, null);
							}
						});
					}else{
						console.log("error begining edit kbit");
						callback(null, "error begining edit kbit");
					}
				}catch(e){
					console.error("StartEditingKbit: ", e);
					callback(null, e);
				}
			},

			/**
			 * Cancel editing kbit
			 * @param {Number}   kbitID   kbit id
			 * @param {Function} callback callback function
			 */
			CancelEditingKbit: function(kbitID, callback){
				try{
					if(kbitID){
						var data = {
							kbitUID: kbitID
						};

						$httpR.connectToServer(data, $httpR.KBITcancelEdit, Globals, function(success, error){
							if(error || !success){
								console.log("error canceling edit kbit: ", error);
								callback(null, error);
							}else{
								callback(success, null);
							}
						});
					}else{
						console.log("error canceling edit kbit");
						callback(null, "error canceling editing kbit");
					}
				}catch(e){
					console.error("CancelEditingKbit: ", e);
					callback(null, e);
				}
			},

			/**
			 * Adds kbit to kbit relation
			 * @param {Number}   firstKbitID  kbit id
			 * @param {Number}   secondKbitID kbit id
			 * @param {String}   relation     if the relation is needed or provided
			 * @param {Function} callback     callback function
			 */
			
			AddKbitToKbit: function(firstKbitID, secondKbitID, isHier, callback){
				try{
					if((firstKbitID !=null && firstKbitID !=undefined) && (secondKbitID != null && secondKbitID !=undefined)){
						var data = {
							firstUID: firstKbitID,
							secondUID: secondKbitID,
							isHier: true
						};
						console.warn(" update needed or provided");
						if(relation == "NEEDED"){

						}
						if(relation == "PROVIDED"){

						}

						$httpR.connectToServer(data, $httpR.KBITaddRelatedKbit, Globals, function(success, error){
							if(error || !success){
								console.log("error adding kbit to kbit relation ", error);
								callback(null, error);
							}else{
								callback(success, null);
							}
						});
					}else{
						console.log("error adding kbit to kbit relation");
						callback(null, "error adding kbit to kbit relation");
					}
				}catch(e){
					console.error("AddKbitToKbit: ", e);
					callback(null, e);
				}
			},

			/**
			 * Removes kbit to kbit relaition
			 * @param {Number}   firstKbitID  kbit id
			 * @param {Number}   secondKbitID kbit id
			 * @param {Function} callback     callback function
			 */
			RemoveKbitToKbit: function(firstKbitID, secondKbitID, callback){
				try{
					if( (firstKbitID !=null && firstKbitID !=undefined) && (secondKbitID != null && secondKbitID !=undefined) ){
						var data = {
							firstUID: firstKbitID,
							secondUID: secondKbitID
						};

						$httpR.connectToServer(data, $httpR.KBITremoveRelatedKbit, Globals, function(success, error){
							if(error || !success){
								console.log("error removing kbit to kbit relation ", error);
								callback(null, error);
							}else{
								callback(success, null);
							}
						});
					}else{
						console.log("error removing kbit to kbit relation");
						callback(null, "error removing kbit to kbit relation " );
					}
				}catch(e){
					console.error("RemoveKbitToKbit: ", e);
					callback(null, e);
				}
			},

			/**
			 * Adds term to kbit terms arrat
			 * @param {number}   kbitID   kibt id
			 * @param {number}   termID   term id
			 * @param {String}   linkType type link
			 * @param {Function} callback callback function
			 */
			addTermToKbit: function(kbitID, termID, linkType, callback){
				try{
					if( (kbitID !=null && kbitID !=undefined) && (termID != null && termID !=undefined) && (linkType != null && linkType !=undefined) ){
						var data = {
							kbitUID: kbitID,
							termUID: termID,
							linkType: " "
						};

						$httpR.connectToServer(data, $httpR.KBITaddTermByUID, Globals, function(success, error){
							if(error || !success){
								console.log("error adding term to kbit: ", error);
								callback(null, error);
							}else{
								callback(success, null);
							}
						});
					}else{
						console.log("error adding term to kbit");
						callback(null, "error adding term to kbit");
					}
				}catch(e){
					console.error("addTermToKbit: ", e);
					callback(null, e);
				}
			},

			/**
			 * Removes relation between kbit and term
			 * @param  {number}   kbitID   kbit id
			 * @param  {number}   termID   term id
			 * @param  {String}   relation link relation
			 * @param  {Function} callback callback function
			 */
			removeTermFromKbit: function(kbitID, termID, relation, callback){
				try{
					if( (kbitID !=null && kbitID !=undefined) && (termID != null && termID !=undefined) && (relation != null && relation !=undefined) ){
						console.warn("link Type ??? ");
						var data = {
							kbitUID: kbitID,
							termUID: termID,
							linkType: " "
						};

						$httpR.connectToServer(data, $httpR.KBITremoveTerm, Globals, function(success, error){
							if(error || !success){
								console.error("error removing term from kbit: ", error);
								callback(null, error);
							}else{
								callback(success, null);
							}
						});
					}else{
						console.error("error removing term from kbit");
						callback(null, "error removing term from kbit");
					}
				}catch(e){
					console.error("addTermToKbit: ", e);
					callback(null, e);
				}
			},



			/***********************************************************************************************************
			*                                                                                                          *
			  000000000    00000000000  000          00000000000 00         00 00000000000  000000000    000     000  
			  000     000  000          000              000      00       00  000          000      00   000   000   
			  000     000  000          000              000       00     00   000          000      00    000 000    
			  000     000  00000000000  000              000        00   00    00000000000  000000000        000      
			  000     000  000          000              000         00 00     000          000 000          000      
			  000     000  000          000              000          000      000          000   000        000      
			  000000000    00000000000  0000000000   00000000000       0       00000000000  000     000      000      
			*                                                                                                          *
			***********************************************************************************************************/





			/**
			 * Start editing delivery
			 * @param {Number}   deliveryID delivery id
			 * @param {Function} callback   callback function
			 */
			StartEditingDelivery: function(deliveryID, callback){
				try{
					if(deliveryID){
						var data = {
							deliveryUID: deliveryID
						};

						$httpR.connectToServer(data, $httpR.DELIVERYbeginEdit, Globals, function(success, error){
							if(error || !success){
								console.error("error starting edit delivery: ", error);
								callback(null, error);
							}else{
								callback(success, null);
							}
						});
					}else{
						console.error("error starting edit delivery");
						callback(null, "error editing delivery");
					}
				}catch(e){
					console.error("StartEditingDelivery: ", e);
					callback(null, e);
				}
			},

			/**
			 * Cancel editing delivery
			 * @param {Number}   deliveryID delivery id
			 * @param {Function} callback   callback function
			 */
			CancelEditingDelivery: function(deliveryID, callback){
				try{
					if(deliveryID){
						var data = {
							deliveryUID: deliveryID
						};

						$httpR.connectToServer(data, $httpR.DELIVERYcancelEdit, Globals, function(success, error){
							if(error || !success){
								console.error("error canceling edit delivery: ", error);
								callback(null, error);
							}else{
								callback(success, null);
							}
						});
					}else{
						console.error("error canceling edit deliver");
						callback(null, "error canceling edit deliver");
					}
				}catch(e){
					console.error("CancelEditingDelivery: ", e);
					callback(null, e);
				}
			},

			/**
			 * Publish delivery on server
			 * @param  {Number}   deliveryID delivery id
			 * @param  {Function} callback   callback function
			 */
			publishDelivery: function(deliveryID, callback){
				try{
					if(deliveryID){
						var data = {
							deliveryUID: deliveryID
						};

						$httpR.connectToServer(data, $httpR.DELIVERYpublish, Globals, function(success, error){
							if(error || !success){
								console.error("error publishing delivery: ", error);
								callback(null, error);
							}else{
								callback(success, null);
							}
						});
					}else{
						console.error("error publishing deliver:");
						callback(null, "error publishing deliver");
					}
				}catch(e){
					console.error("publishDelivery: ", e);
					callback(null, e);
				}
			},

			/**
			 * Updates delivery in server
			 * @param  {Number}   deliveryID    delivery id
			 * @param  {String}   deliveryTitle delivery title
			 * @param  {String}   deliverydesc  delivery description
			 * @param  {Array}   frontArr       content array
			 * @param  {Function} callback      callback function
			 */
			updateDelivery:function(deliveryID, deliveryTitle, deliverydesc, frontArr, callback){
				try{
					if(deliveryID){
						var data = {
							deliveryUID: deliveryID,
							title: deliveryTitle,
							desc: deliverydesc,
							front: frontArr
						};

						$httpR.connectToServer(data, $httpR.DELIVERYupdate, Globals, function(success, error){
							if(error || !success){
								console.error("error updating delivery: ", error);
								callback(null, error);
							}else{
								callback(success, null);
							}
						});
					}else{
						console.error("error updating delivery");
						callback(null, "error updating delivery");
					}
				}catch(e){
					console.error("updateDelivery: ", e);
					callback(null, e);
				}
			},

			/**
			 * Adds delivery to delivery relation
			 * @param {Number}   firstDeliveryID  first delivery id
			 * @param {Number}   secondDeliveryID second delivery id
			 * @param {Function} callback         callback function
			 */
			addDeliverytoDeliveryRelation: function(firstDeliveryID, secondDeliveryID, callback){
				try{
					debugger;
					if(firstDeliveryID && secondDeliveryID){
						var data = {
							firstUID: firstDeliveryID,
							secondUID: secondDeliveryID,
							isHier: true
						};
						$httpR.connectToServer(data, $httpR.DELIVERYaddRelatedDelivery, Globals, function(success, error){
							if(error || !success){
								console.error("error adding delivery relation: ", success, error);
								callback(null, error);
							}else{
								callback(success, null);
							}
						});
					}else{
						console.error("error adding delivery relation");
						callback(null, "error adding delivery relation");
					}
				}catch(e){
					console.error("addDeliverytoDeliveryRelation: ", e);
					callback(null, e);
				}
			},

			/**
			 * Removes two deliveries relations
			 * @param  {Number}   firstDeliveryID  first delivery id
			 * @param  {Number}   secondDeliveryID second delivery id
			 * @param  {Function} callback         callback function
			 */
			removeDeliveryFromDeliveryRelation: function(firstDeliveryID, secondDeliveryID, callback){
				try{
					if( firstDeliveryID && secondDeliveryID){
						var data = {
							firstUID: firstDeliveryID,
							secondUID: secondDeliveryID
						};
						$httpR.connectToServer(data, $httpR.DELIVERYremoveRelatedDelivery, Globals, function(success, error){
							if(error || !success){
								console.error("error removing delivery relation: ", error);
								callback(null, error);
							}else{
								callback(success, null);
							}
						});
					}else{
						console.error("error removing delivery relation");
						callback(null, "error removing delivery relation");
					}
				}catch(e){
					console.error("removeDeliveryFromDeliveryRelation: ", e);
					callback(null, e);
				}
			},

			/**
			 * Adds term to delivery relation
			 * @param {Number}   deliveryID delivery id
			 * @param {Number}   termID     term id
			 * @param {String}   linkType   Link type
			 * @param {Function} callback   callback function
			 */
			addTermToDeliveryRelation: function(deliveryID, termID, linkType, callback){
				try{
					if(deliveryID && termID){
						var data = {
							deliveryUID: deliveryID,
							termUID: termID,
							linkType: " "
						};

						$httpR.connectToServer(data, $httpR.DELIVERYaddTermByUID, Globals, function(success, error){
							if(error || !success){
								console.error("error adding term to delivery relation: ", error);
								callback(null, error);
							}else{
								callback(success, null);
							}
						});
					}else{
						console.error("error adding term to delivery relation");
						callback(null, "error adding term to delivery relation");
					}
				}catch(e){
					console.error("addTermToDeliveryRelation: ", e);
					callback(null, e);
				}
			},

			/**
			 * Removes term and delivery relation
			 * @param  {Number}   deliveryID delivery id
			 * @param  {Number}   termID     term id
			 * @param  {String}   linkType   link type
			 * @param  {Function} callback callback function
			 */
			removeTermFromDeliveryRelation: function(deliveryID, termID, linkType, callback){
				try{
					if(deliveryID && termID){
						var data = {
							deliveryUID: deliveryID,
							termUID: termID,
							linkType: " "
						};

						$httpR.connectToServer(data, $httpR.DELIVERYremoveTerm, Globals, function(success, error){
							if(error || !success){
								console.error("error removing term to delivery relation: ", error);
								callback(null, error);
							}else{
								callback(success, null);
							}
						});
					}else{
						console.error("error removing term to delivery relation");
						callback(null, "error removing term to delivery relation");
					}
				}catch(e){
					console.error("removeTermFromDeliveryRelation: ", e);
					callback(null, e);
				}
			},

			/**
			 * Adds kbit to delivery relation
			 * @param {Number}   deliveryID delivery id
			 * @param {Number}   kbitID     kbit id
			 * @param {String}   linkType   link type
			 * @param {Float}    linkWeight link weight
			 * @param {Function} callback   callback function
			 */
			addKbitToDeliveryRelation: function(deliveryID, kbitID, linkType, linkWeight, callback){
				try{
					if(deliveryID && kbitID){
						var data = {
							deliveryUID: deliveryID,
							kbitUID: kbitID,
							linkType: " ",
							linkWeight: linkWeight
						};

						$httpR.connectToServer(data, $httpR.DELIVERYaddRelatedKbit, Globals, function(success, error){
							if(error || !success){
								console.error("error adding kbit to delivery relation: ", error);
								callback(null, error);
							}else{
								callback(success, null);
							}
						});
					}else{
						console.error("error adding kbit to delivery relation");
						callback(null, "error adding kbit to delivery relation");
					}
				}catch(e){
					console.error("addKbitToDeliveryRelation: ", e);
					callback(null, e);
				}
			},

			/**
			 * Removes kbit from delivery relation
			 * @param  {Number}   deliveryID delivery id
			 * @param  {Number}   kbitID     kbit id
			 * @param  {String}   linkType   link type
			 * @param  {Float}    linkWeight link weight
			 * @param  {Function} callback   callback function
			 */
			removeKbitFromDeliveryRelation: function(deliveryID, kbitID, linkType, linkWeight, callback){
				try{
					if(deliveryID && kbitID){
						var data = {
							deliveryUID: deliveryID,
							kbitUID: kbitID,
							linkType: " ",
							linkWeight: linkWeight
						};

						$httpR.connectToServer(data, $httpR.DELIVERYremoveRelatedKbit, Globals, function(success, error){
							if(error || !success){
								console.error("error removing kbit from delivery relation: ", error);
								callback(null, error);
							}else{
								callback(success, null);
							}
						});
					}else{
						console.error("error removing kbit from delivery relation");
						callback(null, "error removing kbit from delivery relation");
					}
				}catch(e){
					console.error("removeKbitFromDeliveryRelation: ", e);
					callback(null, e);
				}
			},

		}
		return Server;
	}]);
})(window.angular);







