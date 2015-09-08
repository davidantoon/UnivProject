/**
 * Tab class managing tab properties
 * @class Tab
 */
function Tab(id, workflow, tempJson, color, isResultTab){
	this.color;
	this.parentWF;
	this.ID;
	this.title;
	this.Type;
	this.content;
	this.orderTab;
	this.dataHolding;
}

Tab.NORMAL_TAB = 0;// Search | Create | Edit'
Tab.SEARCH_TAB = 1;
Tab.CREATE_TAB = 2;
Tab.EDIT_TAB = 3;
Tab.RESULTS_TAB = 4;
Tab.CONTENT_VIEW = 5;
Tab.CREATE_TERM = 6;
Tab.prototype = {

	/**
	 * ChangTitle will change tab title that displayed at top of workflow.
	 * @param  {String} newTitle String Object
	 */
	changeTitle: function(newTitle){
		this.title = newTitle;
	},

	/**
	 * ChangeType will change the type of tab and his status. Optional tab types:<br> 
	 * 0) NORMAL_TAB<br>
	 * 1) SEARCH_TAB<br>
	 * 2) CREATE_TAB<br>
	 * 3) EDIT_TAB
	 * @param  {String} newType
	 */
	changeType: function(newType, content){},

	/**
	 * The dataHolding member used to manage current tab state, this function automatically called after changeType.
	 * @param {Object} dataHolding 
	 */
	addData: function(dataHolding){},

	/**
	 * Get instance or create new Content object and link it to this tab
	 * @param {Content || String} contentObj
	 * @param {Boolran} forceServerPull
	 */
	addContent: function(contentObj, forceServerPull){},

	addResults: function(contentObj){},

	/**
	 * Get tab XY posistion in the workflow tab bar to manage responsive UI.<br> <b>Return</b> Tab Position {'left': LeftPosition, 'top': TopPosition}
	 */
	getTabPos: function(){},

	/**
	 * Override toString default function to return json stringify<br> <b>Return</b> Json stringify string
	 */
	toString: function(){},

	toJson: function(){},

	toJsonSteps: function(){},

	equals: function(tab){
		return (this.ID == tab.ID);
	}

}





