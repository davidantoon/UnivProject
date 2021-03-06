/**
 * Workspace class managing workflows
 * @class Workspace
 * @constructor
 * @param {[type]} scope [description]
 */
function Workspace(scope) {
	/**
     * Holding workflows
     * @protected
     */
	this.workflows;
	/**
     * Holding colored workflows
     * @protected
     */
	this.coloredWorkflows;
	/**
     * Holding the last workflow id
     * @protected
     */
	this.lastWorkflowId;
	/**
     * Holding the new workflow buttons object
     * @protected
     */
	this.newWorkflowButtons;
	/**
     * Holding selected workflow object
     * @protected
     */
	this.selectedWorkflow;
	/**
     * Holding object type
     * @protected
     */
	this.objectType;
	/**
     * Holding user progress line
     * @protected
     */
	this.progressLines;
	/**
     * Holding Colors
     * @protected
     */
	this.colors;
	/**
     * Holding selected colors
     * @protected
     */
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
	 * Gets the places where to show workflow buttons (add new workflow buttons) <br><b>Return</b> the position of the new workflow burrons
	 * @param  {Number} workFlowIndex
	 * @param  {Number} size
	 */
	getNewWorkflowButtons: function(workFlowIndex, size){},

	/**
	 * Checks the surronding area of the workflow to add buttons
	 * @param  {Number} x Index x
	 * @param  {Number} y Index y
	 * @param  {Array} tempNewWorkflowButtons
	 */
	checkNewWorkflowButtons: function(x, y, tempNewWorkflowButtons, size){},

	/**
	 * Updates the ID for the last workflow
	 */
	updateLastId: function(){},

	/**
	 * Scrolls to specific workflow 
	 * @param  {object} Steps
	 */
	scrollToLastWorkflow: function(Steps){},

	/**
	 * Updates data in specific tab	
	 * @param  {object} tabHoldingData 
	 * @param  {object} results 
	 */
	updateDataInTab: function(tabHoldingData, results){},

	/**
	 * Focus on specific tab after doing a search
	 * @param  {object} tabHoldingData
	 */
	selectTabAfterSearch: function(tabHoldingData){},
 
	/**
	 * Deletes child tab
	 * @param  {Object} tabHoldingData
	 * @param  {Boolean} deleteParent
	 */
	deleteChildTabIds: function(tabHoldingData, deleteParent){},

	/**
	 * Changes the colors objects to know what colors are in used
	 */
	checkUserColorsInWorkspace: function(){},

	/**
	 * Replaces the contet data in specific child
	 * @param  {object} childHoldingData 
	 * @param  {ibject} content 
	 */
	replaceSearchChildContent: function(childHoldingData, content){},

	/**
	 * Retuns workflow by ID
	 * @param  {Number} wFlowId 
	 */
	getWFlow: function(wFlowId){},

	/**
	 * Creates new workflow with the action needed to display 
	 * @param  {object} newWorkflow
	 */
	convertToWorkflow: function(newWorkflow){},

	/**
	 * Focus on last workflow
	 */
    refocusLastWorkflow: function(){},
    /**
     * Focus specific workflow
     * @param  {Object} workflow
     */
    focusThisWorkflow: function(workflow){},

    /**
	 * Creates new workflow
	 */
    openNewWorkflow: function(){},

    /**
     * Selects a color to filter the workspace
     * @param  {String} color
     */
    selectColorFilter: function(color){},

    /**
     * Removes color from the color filter
     * @param  {String} color 
     */
    removeColorFromColorFilter: function(color){},
}