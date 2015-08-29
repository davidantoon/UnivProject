(function(angular) {
    // 'use strict';
	angular.module('IntelLearner').factory('Content', ["$rootScope", 'Globals', "Toast", "Server", function($rootScope, Globals, Toast, Server){
	
		function Content(conData, forceLastmodefied, forceServerPull){
			try{
				this.id = ((conData != undefined)?conData.id:'');
				this.name = ((conData != undefined)?conData.name:'');
				this.kBitsNeeded = ((conData != undefined)?conData.kBitsNeeded:[]);
				this.kBitsProvided = ((conData != undefined)?conData.kBitsProvided:[]);
				this.terms = ((conData != undefined)?conData.terms:[]);
				this.description = ((conData != undefined)?conData.description:'');
				this.url = ((conData != undefined)?conData.url:'');
				this.locked = ((conData != undefined)?conData.locked:false);
				this.lockedBy = ((conData != undefined)?conData.lockedBy:null);
				this.lastModified = ((conData != undefined)?conData.lastModified:null);
				this.inProgress = ((conData != undefined)?conData.inProgress:false);
				this.type = ((conData != undefined)?conData.type:null);
				this.connectToDataBase = ((this.type && new Server(this.type, true)) || null);
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

				}catch(e){
					$rootScope.currentScope.Toast.show("Error!","There was an error in locking content", Toast.LONG, Toast.ERROR);
	           		console.error("lock: ", e);
				}
			},

			/**
			 * Unlock Object in the server to enable others to edit
			 * @param  {Function} callback Function called after execute object method. Return success/error result
			 */
			unlock: function(callback){
				try{

				}catch(e){
					$rootScope.currentScope.Toast.show("Error!","There was an error in unlocking content", Toast.LONG, Toast.ERROR);
	           		console.error("unlock: ", e);
				}
			},

			/**
			 * Save Object to server as (DEBUG MODE)
			 * @param  {String}   versionNotes Note about updated object
			 * @param  {Function} callback Function called after execute object method. Return success/error result
			 */
			save: function(versionNotes, callback){
				try{
					var mThis = this;
					this.connectToDataBase.Save(mThis, function(res){
						if(res != "Error"){
							mThis.lastModified = res.lastModified;
							mThis.inProgress = false;
							callback(true);
						}else
							callback(false);
					});
				}catch(e){
					$rootScope.currentScope.Toast.show("Error!","There was an error in saving Content", Toast.LONG, Toast.ERROR);
	            	console.error("save: ", e);
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
						"objectType": this.objectType
						// "connectToDataBase": this.connectToDataBase 
					}
				}catch(e){
					$rootScope.currentScope.Toast.show("Error!","There was an error in converting to JSON", Toast.LONG, Toast.ERROR);
	           		console.error("toJson: ", e);
	           		return null;
				}
			}

		}


		return Content;
	}]);
})(window.angular);






