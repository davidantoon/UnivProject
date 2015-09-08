/**
 * Content class support Delivery | Kbit | Term functionalities
 * @class Content
 */
function Content(conData, forceLastmodefied, forceServerPull){
	this.id;
	this.name;
	this.kBitsNeeded;
	this.kBitsProvided;
	this.terms;
	this.description;
	this.url;
	this.locked;
	this.lockedBy;
	this.lastModified;
	this.inProgress;
	this.type;
	this.termScope;
	this.connectToDataBase;
	this.progressWizard;
	this.newData;
	this.revision;
}

Content.prototype = {

	/**
	 * Lock Object in the server to prevent others to edit (Readonly)
	 * @param  {Function} callback Function called after execute object method. Return success/error result
	 */
	lock: function(callback){},

	/**
	 * Create copy of object to begin editing
	 */
	createTempData: function(){},



	modifyContent: function(keepSpinner){},

	/**
	 * Save Object to server as (DEBUG MODE)
	 * @param  {String}   versionNotes Note about updated object
	 * @param  {Function} callback Function called after execute object method. Return success/error result
	 */
	save: function(versionNotes, callback){},

	/**
	 * Save Object to server as (PRODUCT MODE) and Unlock it
	 * @param  {String}   versionNotes Note about updated object
	 * @param  {Function} callback     Function called after execute object method. Return success/error result
	 */
	release: function(versionNotes, callback){},


	revoke: function(versionNotes, callback){},

	/**
	 * Remove object from server database
	 * @param  {Boolran}  includePreviousVersions TRUE to remove object and it's history versions (NOT RECOMMENDED)
	 * @param  {Function} callback                Function called after execute object method. Return success/error result
	 */
	remove: function(includePreviousVersions, callback){},

	/**
	 * Restore object data from previous versions by versionId
	 * @param  {string}   versionId The version id of previous version to restore
	 * @param  {Function} callback  Function called after execute object method. Return success/error result
	 */
	reversion: function(versionId, callback){},

	/**
	 * Get list of previous version (id, dateAdded, notes)
	 * @param  {Function} callback Function called after execute object method. Return success/error result
	 */
	getVersions: function(callback){},

	/**
	 * Override to operator "=="
	 * @param  {Content} contentObj Content object to compare with
	 * @return {Boolean} If this object is the same as passed object
	 */
	equals: function(contentObj){},

	/**
	 * Override to operator "=" without pointer
	 * @param  {Content} contentObj Content
	 * @return {[type]}            [description]
	 */
	dublicate: function(contentObj){},

	/**
	 * Override toString default 
	 * @return {String} return json stringify
	 */
	toString: function(){},
	toJson: function(){},

	toJsonSteps: function(){},

	toJsonDeliveryServer: function(){},

	toJsonKbitServer: function(){},
	

}


