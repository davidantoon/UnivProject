/**
 * Content class support Delivery | Kbit | Term functionalities
 * @class Content
 * @constructor
 * @param {[type]} conData           [description]
 * @param {[type]} forceLastmodefied [description]
 * @param {[type]} forceServerPull   [description]
 */
function Content(conData, forceLastmodefied, forceServerPull){
	/**
     * Holding content id
     * @protected
     */
	this.id;
	/**
     * Holding content name
     * @protected
     */
	this.name;
	/**
     * Holding content kbits needed
     * @protected
     */
	this.kBitsNeeded;
	/**
     * Holding content kbits provided
     * @protected
     */
	this.kBitsProvided;
	/**
     * Holding content terms
     * @protected
     */
	this.terms;
	/**
     * Holding content description
     * @protected
     */
	this.description;
	/**
     * Holding content url
     * @protected
     */
	this.url;
	/**
     * Holding content locked flag
     * @protected
     */
	this.locked;
	/**
     * Holding content locked by user
     * @protected
     */
	this.lockedBy;
	/**
     * Holding content last modifide date
     * @protected
     */
	this.lastModified;
	/**
     * Holding content in progress flag
     * @protected
     */
	this.inProgress;
	/**
     * Holding content type
     * @protected
     */
	this.type;
	/**
     * Holding content term scope
     * @protected
     */
	this.termScope;
	/**
     * Holding content connection to database
     * @protected
     */
	this.connectToDataBase;
	/**
     * Holding content progress wizard
     * @protected
     */
	this.progressWizard;
	/**
     * Holding content new data
     * @protected
     */
	this.newData;
	/**
     * Holding content version
     * @protected
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


