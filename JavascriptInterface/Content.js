/**
 * Content class support Delivery | Kbit | Term functionalities
 * @class Content
 */
function Content(conData, forceLastmodefied, forceServerPull){
/**
     * Holding content id
     * @memberOf Content
     */
	this.id;
/**
     * Holding content name
     * @memberOf Content
     */
	this.name;
/**
     * Holding content kbits needed
     * @memberOf Content
     */
	this.kBitsNeeded;
/**
     * Holding content kbits provided
     * @memberOf Content
     */
	this.kBitsProvided;
	/**
     * Holding content terms
     * @memberOf Content
     */
	this.terms;
	/**
     * Holding content description
     * @memberOf Content
     */
	this.description;
	/**
     * Holding content url
     * @memberOf Content
     */
	this.url;
	/**
     * Holding content locked flag
     * @memberOf Content
     */
	this.locked;
	/**
     * Holding content locked by user
     * @memberOf Content
     */
	this.lockedBy;
	/**
     * Holding content last modifide date
     * @memberOf Content
     */
	this.lastModified;
/**
     * Holding content in progress flag
     * @memberOf Content
     */
	this.inProgress;
	/**
     * Holding content type
     * @memberOf Content
     */
	this.type;
	/**
     * Holding content term scope
     * @memberOf Content
     */
	this.termScope;
	/**
     * Holding content connection to database
     * @memberOf Content
     */
	this.connectToDataBase;
	/**
     * Holding content progress wizard
     * @memberOf Content
     */
	this.progressWizard;
	/**
     * Holding content new data
     * @memberOf Content
     */
	this.newData;
	/**
     * Holding content version
     * @memberOf Content
     */
	this.revision;
}

Content.prototype = {

	/**
	 * Lock Object in the server to prevent others to edit (Readonly)
	 * @param  {Function} callback Function 
	 */
	lock: function(callback){},

	/**
	 * Create copy of object to begin editing
	 */
	createTempData: function(){},



	modifyContent: function(keepSpinner){},

	/**
	 * Save Object to server as (DEBUG MODE)
	 * @param  {String}   versionNotes 
	 * @param  {Function} callback
	 */
	save: function(versionNotes, callback){},

	/**
	 * Save Object to server as (PRODUCT MODE) and Unlock it
	 * @param  {String}   versionNotes
	 * @param  {Function} callback     Function
	 */
	release: function(versionNotes, callback){},


	revoke: function(versionNotes, callback){},

	/**
	 * Remove object from server database
	 * @param  {Boolran}  includePreviousVersions 
	 * @param  {Function} callback  
	 */
	remove: function(includePreviousVersions, callback){},

	/**
	 * Restore object data from previous versions by versionId
	 * @param  {string}  
	 * @param  {Function} callback 
	 */
	reversion: function(versionId, callback){},

	/**
	 * Get list of previous version (id, dateAdded, notes)
	 * @param  {Function} callback
	 */
	getVersions: function(callback){},

	/**
     * Override "==" operator to compare between object <br><b>Return</b> True if two objects are equals
     * @param  {object} obj
     */
	equals: function(contentObj){},

	/**
	 * Override to operator "=" without pointer
	 * @param  {Content} contentObj Content
	 */
	dublicate: function(contentObj){},

	/**
	 * Override toString default function to return json stringify<br> <b>Return</b> Json stringify string
	 */
	toString: function(){},

	/**
     * Creates Json <br> <b>Return</b> Json object
     */
	toJson: function(){},

	/**
     * Creates Json Steps <br> <b>Return</b> Json object
     */
	toJsonSteps: function(){},

	/**
     * Creates delivery Json for server <br> <b>Return</b> Json object
     */
	toJsonDeliveryServer: function(){},
	/**
     * Creates kbit Json for server <br> <b>Return</b> Json object
     */
	toJsonKbitServer: function(){},
	

}


