(function(angular) {
    // 'use strict';
	angular.module('IntelLearner').factory('Storage', ["$rootScope", "Globals", "TypeOf", "Content", function($rootScope, Globals, TypeOf, Content){


		/**
		 * Default constructor to prevent errors!
		 */
		function Storage(){}
		
		Storage.prototype = {
			/**
			 * Saves value in local storage
			 * @param  {String}   key      key of th value we are going to save
			 * @param  {String}   value    the value we are going to search
			 * @param  {Function} callback callback function
			 */
			save: function(key, value, callback){
				try{
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

					/**
					 * Success function after saving and finish it up
					 * @param {Boolean} sucsess to know if the saving have been done succesfully
					 * @param {object} data    the object we saved
					 * @param {String} type    the type of the object
					 */
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
				}catch(e){
					$rootScope.currentScope.Toast.show("Error!","There was an error in saving in storage", Toast.LONG, Toast.ERROR);
	                console.error("save: ", e);
				}
			},

			/**
			 * Gets the value by key from local storage
			 * @param  {String}   key      the key we want to get
			 * @param  {Function} callback callback function
			 */
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
								if(tempData == null){
									console.warn("you should check server !!!!");
									obj.data = new Content(JSON.parse(obj.data));
								}
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
					// callback(null, exp);
					// console.error("Storage: save() ", exp);
					$rootScope.currentScope.Toast.show("Error!","There was an error in getting value from storage", Toast.LONG, Toast.ERROR);
	                console.error("get: ", e);
				}

			},

			/**
			 * Clears the local storage or removes item from it
			 * @param  {string}   key      the key we are going to remove
			 * @param  {string}   value    the value we are going to remove
			 * @param  {Function} callback callback funtion
			 */
			clear: function(key, value, callback){
				try{
					if(Globals.noLockedItemrs()){
						// clear all storage
						if(key == null || key == undefined || key == ""){
							localStorage.clear();
							callback("sucsess", null);
							return;
						}

						// remove specific key from storage
						if(value == null || value == undefined || value == ""){
							localStorage.removeItem(key);
							callback(JSON.parse(localStorage.getItem(key)), null);
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
						callback(null, {"message": "no item has been removed","code": ""});
						return;
					}else{
						console.warn("clear local storage while there is locked items not implemented");
						callback(null, null);
					}
				}catch(e){
					$rootScope.currentScope.Toast.show("Error!","There was an error in clearing local storage", Toast.LONG, Toast.ERROR);
	                console.error("clear: ", e);
				}
			},

			/**
			 * Gets Steps, Settings, currentUser
			 * @param  {Function} callback ({Steps, Settings, CurrentUser}, error)
			 */
			getWorkspaceData: function(stringType, callback){
				try{
					var dataToRetrieve = localStorage["com.intel.userdata"];
					if(stringType == true){
						strDecompress(dataToRetrieve, function(stepsComp){
							callback(stepsComp, null);
						});
					}
					else{
						if(dataToRetrieve){
							strDecompress(dataToRetrieve, function(stepsComp){
								dataToRetrieve = JSON.parse(stepsComp);
								callback(dataToRetrieve, null);
							});

						}else{
							var data = {
								"Steps": null,
								"Settings": null,
								"CurrentUser": null
							};
							callback(data, null);
						}
					}
					return;
				}catch(e){
					console.error("getWorkspaceData:", e);
					var data = {
						"Steps": null,
						"Settings": null,
						"CurrentUser": null
					};
					callback(data, null);
				}
			},

			/**
			 * Save Steps, Settings, currentUser
			 * @param {Steps}   steps       Current Steps object
			 * @param {Settings}   settings    Current Settings obejct
			 * @param {Object}   currentUser Current logged user
			 * @param {Function} callback    (success, error)
			 */
			setWorkspaceData: function(steps, settings, currentUser, callback){
				try{
					this.getWorkspaceData(false, function(data){
						if(data){
							data.Steps = ((steps)?steps:data.Steps);
							data.Settings = ((settings)?settings:data.Settings);
							data.CurrentUser = ((currentUser)?currentUser:data.CurrentUser);
						}else{
							data = {
								"Steps": steps,
								"Settings": settings,
								"CurrentUser": currentUser
							};
						}
						strCompress(JSON.stringify(data), function(stepsComp){
							localStorage.setItem("com.intel.userdata", stepsComp);
							callback(true, null);
						});
					});

				}catch(e){
					console.error("setWorkspaceData:", e);
				}
			},


			/**
			 * Gets elemtent or creates new onw if it doesnt exist
			 * @param  {number}   elemId            element id
			 * @param  {object}   jsonObject        content object
			 * @param  {boolean}  forceLastmodefied true if force last modified change
			 * @param  {boolean}  forceServerPull   true if force pull from server
			 * @param  {Function} callback          callback function
			 */
			getElementById: function(jsonObject, forceLastmodefied, forceServerPull, callback){
				var elemId = jsonObject.id;
				var elemType = jsonObject.type;
				if( elemId != undefined && elemId != null && elemId != ""){
					var cashedObject = Globals.get(elemId, elemType);
					if(forceServerPull == true){
						if(cashedObject != null){
							Globals.pop(cashedObject.id, cashedObject.type);
						}
						createObjects(jsonObject, callback, this);
					}else if(forceLastmodefied == true){
						if(cashedObject == null)
							createObjects(jsonObject, callback, this);
						else{
							if(jsonObject.lastModified >= cashedObject.lastModified){
								Globals.pop(cashedObject.id, cashedObject.type);							
								createObjects(jsonObject, callback, this);
							}
							else
								callback(cashedObject);
						}
					}else{
						if(cashedObject == null){
							createObjects(jsonObject, callback, this);
						}else
							callback(cashedObject);
					}

					function createObjects(objectToAdd, passCallback, passThis){
						if(objectToAdd == null || objectToAdd == undefined)
							passCallback(null);
						else{
							switch(objectToAdd.type){
								case "Delivery":
									// loop over terms and add them to object to add terms
									loopTerms(0, objectToAdd.terms,[]);
									function loopTerms(index, termsArray, termResults){
										if(index < termsArray.length){
											passThis.getElementById(termsArray[index],objectToAdd.forceLastmodefied,objectToAdd.forceServerPull,function(resultTerm){
												if(resultTerm != undefined && resultTerm != null){
													termResults.push(resultTerm);
												}
												loopTerms(Number(index)+1,termsArray,termResults);
											});
										}else{
											// loop over kbits needed and add them to object
											objectToAdd.terms = termResults;
											loopKbitsNeeded(0, objectToAdd.kBitsNeeded,[]);
											function loopKbitsNeeded(index, kbitsNeededArray, kbitsNeededResults){
												if(index < kbitsNeededArray.length){
													passThis.getElementById(kbitsNeededArray[index], objectToAdd.forceLastmodefied, objectToAdd.forceServerPull,function(kbitsResults){
														if(kbitsResults != undefined && kbitsResults != null){
															kbitsNeededResults.push(kbitsResults);
														}
														loopKbitsNeeded(Number(index)+1, kbitsNeededArray,kbitsNeededResults);
													});
												}else{
													// loop over kbits provided and add them to object
													objectToAdd.kBitsNeeded = kbitsNeededResults;
													loopKbitsProvided(0, objectToAdd.kBitsProvided, []);
													function loopKbitsProvided(index, kbitsProvidedArray, KbitsProvidedResutls){
														if(index < kbitsProvidedArray.length){
															passThis.getElementById(kbitsProvidedArray[index], objectToAdd.forceLastmodefied, objectToAdd.forceServerPull, function(kbitsResult){
																if(kbitsResult != undefined && kbitsResult != null){
																	KbitsProvidedResutls.push(kbitsResult);
																}
																loopKbitsProvided(Number(index)+1, kbitsProvidedArray, KbitsProvidedResutls);
															});
														}else{
															objectToAdd.kBitsProvided = KbitsProvidedResutls;
															var newObject = new Content(objectToAdd);
															Globals.set(newObject);
															passCallback(newObject);
														}
													}
												}
											}
										}
									}
								break;
								case "Kbit":
									if(objectToAdd.terms)
										loopTerms2(0, objectToAdd.terms, []);
									else{
										objectToAdd.terms =	[];
										var newObject = new Content(objectToAdd);
										Globals.set(newObject);
										passCallback(newObject);
									}
									function loopTerms2(index, termsArray, termResults){
										if(index < termsArray.length){
											passThis.getElementById(termsArray[index], objectToAdd.forceLastmodefied, objectToAdd.forceServerPull, function(resultTerm){
												if(resultTerm != undefined && resultTerm != null){
													termResults.push(resultTerm);
												}
												loopTerms2(Number(index)+1, termsArray, termResults);
											});
										}else{
											objectToAdd.terms =	termResults;
											var newObject = new Content(objectToAdd);
											Globals.set(newObject);
											passCallback(newObject);
										}
									}
								break;
								case "Term":
									var newObject = new Content(objectToAdd);
									Globals.set(newObject);
									passCallback(newObject);
								break;
							}
						}
					}
				}else{
					callback(null);
				}
			}
		};

		return Storage;
	}]);
})(window.angular);






