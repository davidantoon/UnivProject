// app.factory('Content', ['Globals', 'Server', function(Globals, Server){
app.factory('Content', ['Globals', function(Globals){
	
	function Content(conData){
		this.id = ((conData && conData.id != null) || ""); 
		this.name = ((conData && conData.name) || ""); 
		this.kBitsNeeded = ((conData && conData.kBitsNeeded) || []);
		this.kBitProvided = ((conData && conData.kBitProvided) || []);
		this.terms = ((conData && conData.terms) || []);
		this.category = ((conData && conData.category) || "");
		this.url = ((conData && conData.url) || "");
		this.locked = ((conData && conData.locked) || null);
		this.lastModified = ((conData && conData.lastModified) || null);
		this.inProgress = ((conData && conData.inProgress) || null);
		this.type = ((conData && conData.type) || "");
		this.connectToDataBase = ((this.type && new Server(this.type)) || null);
	}

	Content.prototype = {

		objectType: "Content",
		/**
		 * Lock Object in the server to prevent others to edit (Readonly)
		 * @param  {Function} callback Function called after execute object method. Return success/error result
		 */
		lock: function(callback){

		},

		/**
		 * Unlock Object in the server to enable others to edit
		 * @param  {Function} callback Function called after execute object method. Return success/error result
		 */
		unlock: function(callback){
			
		},

		/**
		 * Save Object to server as (DEBUG MODE)
		 * @param  {String}   versionNotes Note about updated object
		 * @param  {Function} callback Function called after execute object method. Return success/error result
		 */
		save: function(versionNotes, callback){
			var mThis = this;
			this.connectToDataBase.Save(mThis, function(res){
				if(res != "Error"){
					mThis.lastModified = res.lastModified;
					mThis.inProgress = false;
					callback(true);
				}else
					callback(false);
			});
		},

		/**
		 * Save Object to server as (PRODUCT MODE) and Unlock it
		 * @param  {String}   versionNotes Note about updated object
		 * @param  {Function} callback     Function called after execute object method. Return success/error result
		 */
		release: function(versionNotes, callback){
			
		},

		/**
		 * Remove object from server database
		 * @param  {Boolran}  includePreviousVersions TRUE to remove object and it's history versions (NOT RECOMMENDED)
		 * @param  {Function} callback                Function called after execute object method. Return success/error result
		 */
		remove: function(includePreviousVersions, callback){

		},

		/**
		 * Restore object data from previous versions by versionId
		 * @param  {string}   versionId The version id of previous version to restore
		 * @param  {Function} callback  Function called after execute object method. Return success/error result
		 */
		reversion: function(versionId, callback){

		},

		/**
		 * Get list of previous version (id, dateAdded, notes)
		 * @param  {Function} callback Function called after execute object method. Return success/error result
		 */
		getVersions: function(callback){

		},

		/**
		 * Override to operator "=="
		 * @param  {Content} contentObj Content object to compare with
		 * @return {Boolean} If this object is the same as passed object
		 */
		equals: function(contentObj){
			return (this.id == contentObj.id);
		},

		/**
		 * Override to operator "=" without pointer
		 * @param  {Content} contentObj Content
		 * @return {[type]}            [description]
		 */
		dublicate: function(contentObj){
			return new Content(contentObj);
		},

		/**
		 * Override toString default 
		 * @return {String} return json stringify
		 */
		toString: function(){
			return JSON.stringify(this.toJson());
		},
		toJson: function(){
			return {
				"id": this.id,
				"name": this.name,
				"kBitsNeeded": this.kBitsNeeded,
				"kBitProvided": this.kBitProvided,
				"terms": this.terms,
				"category": this.category,
				"url": this.url,
				"locked": this.locked,
				"lastModified": this.lastModified,
				"inProgress": this.inProgress,
				"type": this.type,
				"objectType": this.objectType
				// "connectToDataBase": this.connectToDataBase 
			}
		}

	}


	return Content;
}]);






