/**
 * Steps class managing user steps
 * @class Steps
 * @constructor
 */
function Steps(){
	 /**
     * Holding last 20 steps
     * @protected
     */
	this.last20Steps;	
	/**
     * Holding current step
     * @protected
     */
	this.currentStep;
	/**
     * Holding current undo 
     * @protected
     */
	this.currentUndoOrde;
	/**
     * Holding flag if its saved in server
     * @protected
     */
	this.savedInServer;
	/**
     * Holding focused workflow
     * @protected
     */
	this.lastFocusedWorkflo;
	/**
     * Holding current globals
     * @protected
     */
	this.currentGlobals;
}


Steps.prototype = {

	/**
	 * Loads steps
	 * @param  {Object}   workspace
	 * @param  {Function} callback
	 */
	loadSteps: function(workspace, callback){},

	/**
	 * check if there is older step to undo it <br><b>Return</b> {Boolean} True if older step exist, else False
	 */
	canUndo: function(){},

	/**
	 * check if there is newer step to undo it
	 * <br> <b>Return</b> {Boolean} True if newer step exist, else False
	 */
	canRedo: function(){},

	/**
	 * Restore previous OLD step of workspace properties
	 * Restore previous NEW step of workspace properties
	 * @param  {Workspace} workspace current workspace
	 */
	restorePoint: function(workspace, action, callback){},
	

	/**
	 * Update last steps object to support new steps
	 */
	UpdateLastSteps: function(){},

	/**
	 * Insert new step to last steps object
	 */
	InsertStepToLastSteps: function(workspace, force){},

	restoreStep: function(workspace, callback){},
	/**
	 * Remove all steps from local and server, and add one step represents current state
	 */
	clearLastSteps: function(workspace){},

	/**
	 * Save last steps to server
	 */
	commitSteps: function(workspace, callback){},


	getDiffSteps: function(before, after){},
	/**
     * Creates Json 
     * <br><b>Return</b> {Object} Json object
     */
	toJson: function(){},

	/**
	 * Remove related steps of content
	 * @param  {Object} content
	 */
	removeRelatedSteps: function(content){}
}
