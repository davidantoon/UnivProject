/**
 * Globals class managing cashed content
 * @class Globals
 * @constructor
 */
function Globals(){
    /**
     * Holding cashed objects
     * @protected
     */
    this.CashedObjects;
    /**
     * Holding current user
     * @protected
     */
    this.CurrentUser;
}
Globals.prototype = {
    /**
     * Gets object from cashed <br> <b>Return</b> object
     * @param  {Number} id
     * @param  {String} type
     */
    get: function(id, type) {},
    /**
     * Set object to cashed object
     * @param {Object} obj
     */
    set: function(obj) {},
    /**
     * Clears user from current user and clears cashe objects
     * @param  {Objet} clearUser
     */
    clear: function(clearUser) {},
    /**
     * Checks if all object is saved <br><b>Return </b> True if all object are saved
     */
    allObjectsaved: function() {},
    /**
     * Removes specific object from cashed object <br> <b>Return</b> poped object
     * @param  {Number} id   
     * @param  {String} type
     */
    pop: function(id, type) {},
    /**
     * minimze data to save
     * @param  {Function} callback
     */
    getMinimized: function(callback) {},
    /**
     * Gets recent objects <br><b>Return</b> Recent objects
     * @param  {String} type
     */
    getRecentObjects: function(type){},
    /**
     * Checks if there is no locked items <br><b>Return</b> True if no locked items
     */
    noLockedItems:function(){},
    /**
     * Updates the user objects
     * @param  {Object} workspace
     */
    updateUsedObjects: function(workspace){},
    /**
     * Gets all objects <br><b>Return</b> all objects
     */
    getAllObjectToJson: function(){}
}