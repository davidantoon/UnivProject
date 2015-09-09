/**
 * App class holding Project UX
 * @class App
 * @constructor
 */
function App(){
    /**
     * Holding App status (1 = "Not Logged In" ||  2 = "Loggin In") 
     * @protected
     */
    this.AppStatus;

    /**
     * Holding current user information (include token)
     * @protected
     */
    this.currentUser;

    /**
     * Holding current focused workflow 
     * @protected
     */
    this.selectedWorkflow;

    /** Hide/ Show new tab buttons 
     * @protected
     */
    this.displayNewWorkflowTabButtons;

    /** Hide/ Show new workflow buttons 
     * @protected
     */
    this.displayNewWorkflowButtons;

    /** Holding standby counter to save last step 
     * @protected
     */
    this.counterBeforeSave;

    /** Holding blur worfklows (true = "Blur" || false = "Unblur") 
     * @protected
     */
    this.blurAllWindow;

    /** Holding current filter color for workflows 
     * @protected
     */
    this.handlePickColor;

    /** Holding window scroll (true = "Enable" || false = "Disable") 
     * @protected
     */
    this.bodyScrolling;

    /** Holding service that contains helper functions 
     * @protected
     */
    this.UTILS;

    /** WorkSpace Class instance 
     * @protected
     */
    this.workSpaces;

    /** Steps Class instance 
     * @protected
     */
    this.Steps;

    /** Settings Class instance 
     * @protected
     */
    this.Settings;

    /** Log Class instance 
     * @protected
     */
    this.Log;

    /** Globals Class instance 
     * @protected
     */
    this.Globals;

    /** Server Class instance 
     * @protected
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