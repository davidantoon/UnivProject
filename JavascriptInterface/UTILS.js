/**
 * UTILS class contain helper funtion
 * @class UTILS
 * @constructor
 */
function UTILS(){}
UTILS.prototype = {
	objectServerToClient: function(serverObj){},
	deliveryServerToClient: function(serverObj){},
	kbitServerToClient: function(serverObj){},
	termServerToClient: function(serverObj){},
	fromServerTime: function(time){},
	defultFilters: function(){},
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