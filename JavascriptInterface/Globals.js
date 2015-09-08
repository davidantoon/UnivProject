/**
 * Globals class managing cashed content
 * @class Globals
 */
function Globals(){
	this.CashedObjects = {};
    this.CurrentUser = {};
}
Globals.prototype = {
    get: function(id, type) {},
    set: function(obj) {},
    clear: function(clearUser) {},
    allObjectsaved: function() {},
    pop: function(id, type) {},
    getMinimized: function(callback) {},
    getRecentObjects: function(type){},
    noLockedItems:function(){},
    updateUsedObjects: function(workspace){},
    getAllObjectToJson: function(){}
}