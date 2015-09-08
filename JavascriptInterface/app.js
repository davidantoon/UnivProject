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

    /* Hide/ Show new tab buttons */
    this.displayNewWorkflowTabButtons;

    /* Hide/ Show new workflow buttons */
    this.displayNewWorkflowButtons;

    /* Holding standby counter to save last step */
    this.counterBeforeSave;

    /* Holding blur worfklows (true = "Blur" || false = "Unblur") */
    this.blurAllWindow;

    /* Holding current filter color for workflows */
    this.handlePickColor;

    /* Holding window scroll (true = "Enable" || false = "Disable") */
    this.bodyScrolling;

    /* Holding service that contains helper functions */
    this.UTILS;

    /* WorkSpace Class instance */
    this.workSpaces;

    /* Steps Class instance */
    this.Steps;

    /* Settings Class instance */
    this.Settings;

    /* Log Class instance */
    this.Log;

    /* Globals Class instance */
    this.Globals;

    /* Server Class instance */
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
     * Load user 
     * @return {[type]} [description]
     */
    loadUserData: function() {},


    UndoWorkflow: function() {},

    RedoWorkflow: function() {},

    selectTab: function(workflow, tab) {},

    updateAllTabName: function() {},

    back: function(dataHolding){},

    refocusMe: function(workflow){},

    updateMatrixLayout: function() {},

    prepareForSearch: function(wFlow){},

    FilterResults: function(results, type){},

    draggingItems: function(item){},

    EnableScroll: function(a, wflwId){},

    
    
}