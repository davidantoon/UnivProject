/**
 * Tab class managing tab properties
 * @class Tab
 * @constructor
 * @param id          
 * @param workflow    
 * @param tempJson    
 * @param color       
 * @param isResultTab 
 */
function Tab(id, workflow, tempJson, color, isResultTab){
	/**
     * Holding tab color
     * @protected
     */
	this.color;
	/**
     * Holding tab parent workflow
     * @protected
     */
	this.parentWF;
	/**
     * Holding tab id
     * @protected
     */
	this.ID;
	/**
     * Holding tab title
     * @protected
     */
	this.title;
	/**
     * Holding tab type
     * @protected
     */
	this.Type;
	/**
     * Holding tab content
     * @protected
     */
	this.content;
	/**
     * Holding tab order
     * @protected
     */
	this.orderTab;
	/**
     * Holding tab data holding
     * @protected
     */
	this.dataHolding;
}
/**
 * Normal tab index
 * @public
 */
Tab.NORMAL_TAB = 0;// Search | Create | Edit'
/**
 * search tab index
 * @public
 */
Tab.SEARCH_TAB = 1;
/**
 * create tab index
 * @public
 */
Tab.CREATE_TAB = 2;
/**
 * edit tab index
 * @public
 */
Tab.EDIT_TAB = 3;
/**
 * result tab index
 * @public
 */
Tab.RESULTS_TAB = 4;
/**
 * content view index
 * @public
 */
Tab.CONTENT_VIEW = 5;
/**
 * create term index
 * @public
 */
Tab.CREATE_TERM = 6;

Tab.prototype = {

	/**
	 * ChangTitle will change tab title that displayed at top of workflow.
	 * @param  {String}
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

	/**
     * Creates Json <br> <b>Return</b> Json object
     */
	toJson: function(){},

	/**
     * Creates Json Steps <br> <b>Return</b> Json object
     */
	toJsonSteps: function(){},

	/**
     * Override "==" operator to compare between object <br><b>Return</b> True if two objects are equals
     * @param  {object} obj
     */
	equals: function(tab){}

}





