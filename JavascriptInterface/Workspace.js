/**
 * Workspace class managing workflows
 * @class Workspace
 */
function Workspace(scope) {
	/**
     * Holding workflows
     * @memberOf Workspace
     */
	this.workflows;
	this.coloredWorkflows;
	this.lastWorkflowId;
	this.newWorkflowButtons;
	this.selectedWorkflow;
	this.objectType;
	this.progressLines;
	this.colors;
	this.selectedColors;
}

Workspace.prototype = {

	/**
	 * Creates new work flow
	 * @param {[workflow]}
	 */
	addNewWorkflow: function(newWorkflow){},

	/**
	 * Updates the new work flow buttons
	 * @param {Number} size
	 */
	updateNewWorkflowButtons: function(size){},

	/**
	 * Gets the places where to show workflow buttons (add new workflow buttons)
	 * @param  {[int workflow index]}
	 */
	getNewWorkflowButtons: function(workFlowIndex, size){},

	/**
	 * Checks the surronding area of the workflow to add buttons
	 * @param  {int} x Index x
	 * @param  {int} y Index y
	 * @param  {Array} tempNewWorkflowButtons  New Workflow buttons
	 */
	checkNewWorkflowButtons: function(x, y, tempNewWorkflowButtons, size){},

	/**
	 * Updates the ID for the last workflow
	 */
	updateLastId: function(){},

	/**
	 * Scrolls to specific workflow 
	 * @param  {object} Steps Steps object to check workflow
	 */
	scrollToLastWorkflow: function(Steps){},

	/**
	 * Updates data in specific tab	
	 * @param  {object} tabHoldingData the workflow and tab id we are going to update
	 * @param  {object} results        the new contet
	 */
	updateDataInTab: function(tabHoldingData, results){},

	/**
	 * Focus on specific tab after doing a search
	 * @param  {object} tabHoldingData the workflow id and the ab id we want to select
	 */
	selectTabAfterSearch: function(tabHoldingData){},
 
	/**
	 * Deletes child tab
	 * @param  {Object} tabHoldingData Data holding that contain the Ids
	 * @param  {Boolean} deleteParent  True if we want to update child after deleting it's parent
	 */
	deleteChildTabIds: function(tabHoldingData, deleteParent){},

	/**
	 * Changes the colors objects to know what colors are in used
	 */
	checkUserColorsInWorkspace: function(){},

	/**
	 * Replaces the contet data in specific child
	 * @param  {object} childHoldingData child data holding
	 * @param  {ibject} content          contect we want to change
	 */
	replaceSearchChildContent: function(childHoldingData, content){},

	getWFlow: function(wFlowId){},
	convertToWorkflow: function(newWorkflow){},
    refocusLastWorkflow: function(){},
    focusThisWorkflow: function(workflow){},
    openNewWorkflow: function(){},
    selectColorFilter: function(color){},
    removeColorFromColorFilter: function(color){},
}