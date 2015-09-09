/**
 * Log class managing logs
 * @class Log
 */
function Log(){
    /**
     * Holding logs
     * @memberOf Server
     */
    this.logs;
    /**
     * Holding class filter
     * @memberOf Server
     */
    this.classFilter;
}
Log.prototype = {
    /**
     * Pushes log into logs array
     */
    Push: function(){},
    /**
     * Show logs filter by class
     * @param  {Sting} Class
     * @param  {Function} func
     */
    showFilter: function(Class, func){},
    /**
     * hide logs filte by class
     * @param  {Sting} Class
     * @param  {Function} func
     */
    hideFilter: function(Class, func){},
    /**
     * Cleares filter
     */
    clearFilter: function(){},
    /**
     * Creating a warning log
     */
    i: function(){},

    /**
     * Creating a note log
     */
    d: function(){},

    /**
     * Creating error log
     */
    e: function(){}
}