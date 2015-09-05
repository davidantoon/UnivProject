(function(angular) {
    // 'use strict';
	angular.module('IntelLearner').factory('Content', ["$rootScope", 'Globals', "Toast", "Server", "$httpR", function($rootScope, Globals, Toast, Server, $httpR){
	
		function Content(conData, forceLastmodefied, forceServerPull){
			try{
				this.id = ((conData != undefined)?conData.id:'');
				this.name = ((conData != undefined)?conData.name:''); // Term STRING
				this.kBitsNeeded = ((conData != undefined)?conData.kBitsNeeded:[]);
				this.kBitsProvided = ((conData != undefined)?conData.kBitsProvided:[]);
				this.terms = ((conData != undefined)?conData.terms:[]);
				this.description = ((conData != undefined)?conData.description:''); // Term MEANING
				this.url = ((conData != undefined)?conData.url:'');  
				this.locked = ((conData != undefined)?conData.locked:false);
				this.lockedBy = ((conData != undefined)?conData.lockedBy:null);
				this.lastModified = ((conData != undefined)?conData.lastModified:null);
				this.inProgress = ((conData != undefined)?conData.inProgress:false);
				this.type = ((conData != undefined)?conData.type:null);
				this.termScope = ((conData !=undefined)?conData.termScope: null);
				this.connectToDataBase = ((this.type && new Server(this.type, $rootScope.currentScope.isDummy)) || null);
				this.progressWizard = ((conData != undefined)?conData.progressWizard:{});
				this.newData = ((conData != undefined)?conData.newData:null);
				if(!this.progressWizard){
					this.progressWizard = {};
				}
				this.progressWizard.spinner = false;
				this.revision = ((conData != undefined)?conData.revision:1);
			}catch(e){
				$rootScope.currentScope.Toast.show("Error!","There was an error in creating new Content", Toast.LONG, Toast.ERROR);
	            console.error("Content: ", e);
	            return null;
			}
		}

		

		Content.prototype = {

			objectType: "Content",
			/**
			 * Lock Object in the server to prevent others to edit (Readonly)
			 * @param  {Function} callback Function called after execute object method. Return success/error result
			 */
			lock: function(callback){
				try{
					var dataToSend = {};
					dataToSend[this.type.toLowerCase()+"UID"] = this.id;
					var passThis = this;
					$httpR.connectToServer(dataToSend, this.type.toUpperCase() + "beginEdit", Globals, function(success, error){
						if(error && !success){
							callback(null, error);
						}else{
							passThis.locked = true;
							passThis.lockedBy = Globals.CurrentUser;
							callback(success, null);
						}
					});
				}catch(e){
	           		console.error("lock: ", e);
	           		callback(null, e);
				}
			},

			/**
			 * Create copy of object to begin editing
			 */
			createTempData: function(){
				this.newData = {
					"name": this.name,
					"description": this.description,
					"url": this.url,
					"kBitsNeeded": [],
					"kBitsProvided": [],
					"terms": []
				};
				if(this.type == "Delivery"){
					// loop in kBitsNeeded
					for(var i=0; i<this.kBitsNeeded.length; i++){
						this.newData.kBitsNeeded.push(this.kBitsNeeded[i]);
					}
					// loop in kBitsProvided
					for(var i=0; i<this.kBitsProvided.length; i++){
						this.newData.kBitsProvided.push(this.kBitsProvided[i]);
					}
				}
				// loop in terms
				for(var i=0; i<this.terms.length; i++){
					this.newData.terms.push(this.terms[i]);
				}
			},



			modifyContent: function(keepSpinner){
				switch(this.type){
					case "Delivery":
						this.name = this.newData.name;
						this.description = this.newData.description;
						this.url = this.newData.url;
						this.kBitsNeeded = this.newData.kBitsNeeded;
						this.kBitsProvided = this.newData.kBitsProvided;
						this.terms = this.newData.terms;
					break;
					case "Kbit":
						this.name = this.newData.name;
						this.description = this.newData.description;
						this.url = this.newData.url;
						this.terms = this.newData.terms;
					break;
					default:
					break;
				}
			},

			/**
			 * Save Object to server as (DEBUG MODE)
			 * @param  {String}   versionNotes Note about updated object
			 * @param  {Function} callback Function called after execute object method. Return success/error result
			 */
			save: function(versionNotes, callback){
				try{
					debugger;
					this.modifyContent();
					var mThis = this;
					this.connectToDataBase.saveElement(mThis, function(success, error){
						if(error || !success){
							callback(false);
						}else{
							callback(true);
						}
					});
				}catch(e){
					console.error("content.save: ", error);
	            	callback(null,{"message":e.message,"code":e.code});
	            }
			},

			/**
			 * Save Object to server as (PRODUCT MODE) and Unlock it
			 * @param  {String}   versionNotes Note about updated object
			 * @param  {Function} callback     Function called after execute object method. Return success/error result
			 */
			release: function(versionNotes, callback){
				try{

				}catch(e){
					$rootScope.currentScope.Toast.show("Error!","There was an error in releasing content", Toast.LONG, Toast.ERROR);
	           		console.error("release: ", e);
				}
			},

			/**
			 * Remove object from server database
			 * @param  {Boolran}  includePreviousVersions TRUE to remove object and it's history versions (NOT RECOMMENDED)
			 * @param  {Function} callback                Function called after execute object method. Return success/error result
			 */
			remove: function(includePreviousVersions, callback){
				try{

				}catch(e){
					$rootScope.currentScope.Toast.show("Error!","There was an error in removing content", Toast.LONG, Toast.ERROR);
	           		console.error("remove: ", e);
				}
			},

			/**
			 * Restore object data from previous versions by versionId
			 * @param  {string}   versionId The version id of previous version to restore
			 * @param  {Function} callback  Function called after execute object method. Return success/error result
			 */
			reversion: function(versionId, callback){
				try{

				}catch(e){
					$rootScope.currentScope.Toast.show("Error!","There was an error in restoring content", Toast.LONG, Toast.ERROR);
	           		console.error("reversion: ", e);
				}
			},

			/**
			 * Get list of previous version (id, dateAdded, notes)
			 * @param  {Function} callback Function called after execute object method. Return success/error result
			 */
			getVersions: function(callback){
				try{

				}catch(e){
					$rootScope.currentScope.Toast.show("Error!","There was an error in getting previous versions", Toast.LONG, Toast.ERROR);
	           		console.error("getVersions: ", e);
				}
			},

			/**
			 * Override to operator "=="
			 * @param  {Content} contentObj Content object to compare with
			 * @return {Boolean} If this object is the same as passed object
			 */
			equals: function(contentObj){
				try{
					return (this.id == contentObj.id);
				}catch(e){
					$rootScope.currentScope.Toast.show("Error!","There was an error in checking equal content", Toast.LONG, Toast.ERROR);
	           		console.error("equal: ", e);
	           		return false;
				}
			},

			/**
			 * Override to operator "=" without pointer
			 * @param  {Content} contentObj Content
			 * @return {[type]}            [description]
			 */
			dublicate: function(contentObj){
				try{
					return new Content(contentObj);
				}catch(e){
					$rootScope.currentScope.Toast.show("Error!","There was an error in dublicating content", Toast.LONG, Toast.ERROR);
	           		console.error("dublicate: ", e);
	           		return null;
				}
			},

			/**
			 * Override toString default 
			 * @return {String} return json stringify
			 */
			toString: function(){
				try{	
					return JSON.stringify(this.toJson());
				}catch(e){
					$rootScope.currentScope.Toast.show("Error!","There was an error in converting to string", Toast.LONG, Toast.ERROR);
	           		console.error("toString: ", e);
	           		return null;
				}
			},
			toJson: function(){
				try{
					return {
						"id": this.id,
						"name": this.name,
						"kBitsNeeded": this.kBitsNeeded,
						"kBitsProvided": this.kBitsProvided,
						"terms": this.terms,
						"description": this.description,
						"url": this.url,
						"locked": this.locked,
						"lockedBy": this.lockedBy,
						"lastModified": this.lastModified,
						"inProgress": this.inProgress,
						"type": this.type,
						"termScope": this.termScope,
						"objectType": this.objectType,
						"progressWizard": this.progressWizard,
						"newData": this.newData,
						"revision": this.revision
					}
				}catch(e){
					$rootScope.currentScope.Toast.show("Error!","There was an error in converting to JSON", Toast.LONG, Toast.ERROR);
	           		console.error("toJson: ", e);
	           		return null;
				}
			},

			toJsonDeliveryServer: function(){
				try{
					var tempJSON = {
						"UID": this.id,
						"TITLE": this.name,
						"KBITS": {
							"NEEDED": [], // this.kBitsNeeded
							"PROVIDED": [], // this.kBitsProvided
							"OTHERS": []
							
						},
						"TERMS": [], // this.terms
						"DESCRIPTION": this.description,
						"FRONT_DELIVERY": {
							"FRONT_TYPE": "DELIVERY_FRONT",
							"PATH": this.url
						}
					}
					for(var i=0; i<this.kBitsNeeded.length; i++){
						tempJSON.KBITS.NEEDED.push(Number(this.kBitsNeeded[i].id));
					}
					for(var i=0; i<this.kBitsProvided.length; i++){
						tempJSON.KBITS.PROVIDED.push(Number(this.kBitsProvided[i].id));
					}
					for(var i=0; i<this.terms.length; i++){
						tempJSON.TERMS.push(Number(this.terms[i].id));
					}
					return tempJSON;
				}catch(e){
	           		console.error("toJson: ", e);
	           		return null;
				}
			},

			/**
			 * Gets difference in kbits needed
			 * @param  {ArraY} oldArray old kbits needed array
			 * @param  {Array} newArray new kbits needed array
			 * @return {object}         object contains the deleted and inserted
			 */
			getDiffKbitsNeeded: function(){
				return {
	                "deleted":(this.kBitsNeeded.filter(function(a) {
	                    var found = false;
	                    for(var i=0; i<this.newData.length ;i++){
	                        if(this.newData[i].id == a.id){
	                            found = true;
	                        }
	                    }
	                    return (!found);
	                })),
	                "inserted":(this.newData.filter(function(a) {
	                    var found = false;
	                    for(var i=0; i<this.kBitsNeeded.length ;i++){
	                        if(this.kBitsNeeded[i].id == a.id){
	                            found = true;
	                        }
	                    }
	                    return (!found);
	                }))
            	}
			},

			/**
			 * Gets difference in kbits provided
			 * @param  {ArraY} oldArray old kbits needed array
			 * @param  {Array} newArray new kbits needed array
			 * @return {object}         object contains the deleted and inserted
			 */
			getDiffKbitsProvided: function(){
				return {
	                "deleted":(this.kBitsProvided.filter(function(a) {
	                    var found = false;
	                    for(var i=0; i<this.newData.length ;i++){
	                        if(this.newData[i].id == a.id){
	                            found = true;
	                        }
	                    }
	                    return (!found);
	                })),
	                "inserted":(this.newData.filter(function(a) {
	                    var found = false;
	                    for(var i=0; i<this.kBitsProvided.length ;i++){
	                        if(this.kBitsProvided[i].id == a.id){
	                            found = true;
	                        }
	                    }
	                    return (!found);
	                }))
            	}
			}

		}


		return Content;
	}]);
})(window.angular);






