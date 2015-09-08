function Log(){
    this.logs = [];
    this.classFilter = {};
}
Log.prototype = {
    Push: function(){},
    showFilter: function(Class, func){},
    hideFilter: function(Class, func){},
    clearFilter: function(){},
    // warning log
    i: function(){},

    // note log
    d: function(){},

    //error log
    e: function(){}
}