/**
 * Steps class managing user steps
 * @class Steps
 */
function Steps(){

	this.last20Steps = [];	
	this.currentStep = {};
	this.currentUndoOrder = 0;
	this.savedInServer = false;
	this.lastFocusedWorkflow = null;
	this.currentGlobals = [];
}


Steps.prototype = {

	loadSteps: function(workspace, callback){},


	/**
	 * check if there is older step to undo it <br> <b>Return</b> True if older step exist, else False
	 */
	canUndo: function(){},

	/**
	 * check if there is newer step to undo it <br> <b>Return</b> True if newer step exist, else False
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
     * Creates Json <br> <b>Return</b> Json object
     */
	toJson: function(){},

	removeRelatedSteps: function(content){}
}
