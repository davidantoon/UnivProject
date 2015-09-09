/**
 * App class holding Project UX
 * @class App
 */
function App(){
    /**
     * Holding App status (1 = "Not Logged In" ||  2 = "Loggin In") 
     * @memberOf App
     */
    this.AppStatus;

    /**
     * Holding current user information (include token)
     * @memberOf App
     */
    this.currentUser;

    /**
     * Holding current focused workflow 
     * @memberof App
     */
    this.selectedWorkflow;

    /** Hide/ Show new tab buttons 
     * @memberOf App
     */
    this.displayNewWorkflowTabButtons;

    /** Hide/ Show new workflow buttons 
     * @memberOf App
     */
    this.displayNewWorkflowButtons;

    /** Holding standby counter to save last step 
     * @memberOf App
     */
    this.counterBeforeSave;

    /** Holding blur worfklows (true = "Blur" || false = "Unblur") 
     * @memberOf App
     */
    this.blurAllWindow;

    /** Holding current filter color for workflows 
     * @memberOf App
     */
    this.handlePickColor;

    /** Holding window scroll (true = "Enable" || false = "Disable") 
     * @memberOf App
     */
    this.bodyScrolling;

    /** Holding service that contains helper functions 
     * @memberOf App
     */
    this.UTILS;

    /** WorkSpace Class instance 
     * @memberOf App
     */
    this.workSpaces;

    /** Steps Class instance 
     * @memberOf App
     */
    this.Steps;

    /** Settings Class instance 
     * @memberOf App
     */
    this.Settings;

    /** Log Class instance 
     * @memberOf App
     */
    this.Log;

    /** Globals Class instance 
     * @memberOf App
     */
    this.Globals;

    /** Server Class instance 
     * @memberOf App
     */
    this.Server;
}
/** @lends App.prototype */
App.prototype = {
    /**
     * Logout <b><i>currentUser</i></b> => clear cashed tokens => navigate to <b><i>Login Page</i></b>
     */
    logout: function() {},

    /**
     * Clear <b><i>cashed objects</i></b> in <b><i>localStorage</i></b> and <b><i>currentUser</i></b> information.
     */
    clearData: function() {},

    /**
     * Login function, if success store user information in <b><i>localStorage</i></b><br>
     * @param  {String} username 
     * @param  {String} password 
     */
    login: function(username, password){},
    
    /**
     * Load user data, last steps and workspace settings from server.
     */
    loadUserData: function() {},

    /**
     * Undo to previous step, and rerender current step's workspace
     */
    UndoWorkflow: function() {},

    /**
     * Redo to next step, and rerender current step's workspace
     */
    RedoWorkflow: function() {},

    /**
     * Loop in workspace to get all tabs names and update name in UX.
     */
    updateAllTabName: function() {},

    /**
     * Focusing Parent workflow tab, dataHolding holding parent workflow position.
     * @param  {Object} dataHolding 
     */
    back: function(dataHolding){},

    /**
     * Focusing passed workflow
     * @param  {Workflow} workflow 
     */
    refocusMe: function(workflow){},

    /**
     * Update UI, and render the workflows
     */
    updateMatrixLayout: function() {},

    /**
     * Prepare workspace for search content, creating <b>Results Workflow</b>
     * @param  {Workflow} wFlow
     */
    prepareForSearch: function(wFlow){},

    /**
     * Filter Results that come from server side by type : <b><i>Delivery | Kbit | Term</i></b>
     * @param {Array} results
     * @param {Type} type
     */
    FilterResults: function(results, type){},

    /**
     * Holding dragging item, animate dragging html in UI.
     * @param  {Content} item 
     */
    draggingItems: function(item){},

    /**
     * Disable / Enable workflow scroll to make UI smoothly scrolling
     * @param {Number} a 
     * @param {Workflow} wflwId 
     */
    EnableScroll: function(a, wflwId){},

    
    
}