/**
 * UTILS class contain helper funtion
 * @class UTILS
 * @constructor
 */
function UTILS(){}
UTILS.prototype = {
	/**
	 * Convert Dynamic Object from <b>Server-Side</b> struct to <b>Client-Side</b>
	 * @param  {} serverObj
	 */
	objectServerToClient: function(serverObj){},
	/**
	 * Convert Delivery Object from <b>Server-Side</b> struct to <b>Client-Side</b>
	 * @param  {} serverObj
	 */
	deliveryServerToClient: function(serverObj){},
	/**
	 * Convert Kbit Object from <b>Server-Side</b> struct to <b>Client-Side</b>
	 * @param  {} serverObj
	 */
	kbitServerToClient: function(serverObj){},
	/**
	 * Convert Term Object from <b>Server-Side</b> struct to <b>Client-Side</b>
	 * @param  {} serverObj
	 */
	termServerToClient: function(serverObj){},
	/**
	 * Convert <b>Server-Side</b> date format to support <b>Client-Side</b>
	 * @param  {[type]} time 
	 */
	fromServerTime: function(time){},
	/**
	 * Convert Scope Object from <b>Server-Side</b> struct to <b>Client-Side</b>
	 * @param  {} serverObj
	 */
	ServerScopesToClient: function(serverObj){},
	/**
	 * Shows the toast massage.
	 * @param  {Strgin} title         the title of the massage
	 * @param  {Strgin} text          the context of the massage
	 * @param  {String} duration      the duration of the massage
	 * @param  {String} toastClass    the class of the massage
	 * @param  {String} forcePosition the position of the massage
	 */
	showToast: function(title, text, duration, toastClass, forcePosition){}
}