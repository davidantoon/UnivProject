/**
 * Server class managing server requests
 * @class Server
 * @constructor
 * @param {[type]} protocol [description]
 * @param {[type]} ip       [description]
 * @param {[type]} port     [description]
 * @param {[type]} baseUrl  [description]
 */
function Server(protocol, ip, port, baseUrl){
    /**
     * Holding Server protocol 
     * @protected
     */
    this.protocol;
    /**
     * Holding Server ip 
     * @protected
     */
    this.ip;
    /**
     * Holding Server port 
     * @protected
     */
    this.port;
    /**
     * Holding Server base url 
     * @protected
     */
    this.baseUrl;
}

/**
 * Server login function
 */
Server.logIn = "USERlogIn";
/**
 * Server signUp function
 */
Server.signUp = "USERsignUp";
/**
 * Server changePassword function
 */
Server.changePassword = "USERchangePassword";
/**
 * Server updateUser function
 */
Server.updateUser = "USERupdateUser";
/**
 * Server KBITremoveTerm function
 */
Server.KBITremoveTerm = "KBITremoveTerm";
/**
 * Server KBITaddTermByUID function
 */
Server.KBITaddTermByUID = "KBITaddTermByUID";
/**
 * Server KVPsetKeyValuePair function
 */
Server.KVPsetKeyValuePair = "KVPsetKeyValuePair";
/**
 * Server KVPgetKeyValuePair function
 */
Server.KVPgetKeyValuePair = "KVPgetKeyValuePair";
/**
 * Server TERMsearchTerms function
 */
Server.TERMsearchTerms = "TERMsearchTerms";
/**
 * Server DELIVERYsearchDelivery function
 */
Server.DELIVERYsearchDelivery = "DELIVERYsearchDelivery";
/**
 * Server KBITsearchKbits function
 */
Server.KBITsearchKbits = "KBITsearchKbits";
/**
 * Server TERMremoveTermToTermRelation function
 */
Server.TERMremoveTermToTermRelation = "TERMremoveTermToTermRelation";
/**
 * Server TERMgetAllTermsStrings function
 */
Server.TERMgetAllTermsStrings = "TERMgetAllTermsStrings";
/**
 * Server TERMgetRelatedTerms function
 */
Server.TERMgetRelatedTerms = "TERMgetRelatedTerms";
/**
 * Server TERMaddTermToTermRelation function
 */
Server.TERMaddTermToTermRelation = "TERMaddTermToTermRelation";
/**
 * Server KBITbeginEdit function
 */
Server.KBITbeginEdit = "KBITbeginEdit";
/**
 * Server KBITcancelEdit function
 */
Server.KBITcancelEdit = "KBITcancelEdit";
/**
 * Server KBITaddRelatedKbit function
 */
Server.KBITaddRelatedKbit = "KBITaddRelatedKbit";
/**
 * Server KBITremoveRelatedKbit function
 */
Server.KBITremoveRelatedKbit = "KBITremoveRelatedKbit";
/**
 * Server KBITupdateFullKbit function
 */
Server.KBITupdateFullKbit = "KBITupdateFullKbit";
/**
 * Server DELIVERYaddNew function
 */
Server.DELIVERYaddNew = "DELIVERYaddNew";
/**
 * Server DELIVERYbeginEdit function
 */
Server.DELIVERYbeginEdit = "DELIVERYbeginEdit";
/**
 * Server DELIVERYcancelEdit function
 */
Server.DELIVERYcancelEdit = "DELIVERYcancelEdit";
/**
 * Server DELIVERYpublish function
 */
Server.DELIVERYpublish = "DELIVERYpublish";
/**
 * Server DELIVERYupdate function
 */
Server.DELIVERYupdate = "DELIVERYupdate";
/**
 * Server DELIVERYaddRelatedDelivery function
 */
Server.DELIVERYaddRelatedDelivery = "DELIVERYaddRelatedDelivery";
/**
 * Server DELIVERYremoveRelatedDelivery function
 */
Server.DELIVERYremoveRelatedDelivery = "DELIVERYremoveRelatedDelivery";
/**
 * Server DELIVERYaddTermByUID function
 */
Server.DELIVERYaddTermByUID = "DELIVERYaddTermByUID";
/**
 * Server DELIVERYremoveTerm function
 */
Server.DELIVERYremoveTerm = "DELIVERYremoveTerm";
/**
 * Server DELIVERYaddRelatedKbit function
 */
Server.DELIVERYaddRelatedKbit = "DELIVERYaddRelatedKbit";
/**
 * Server DELIVERYremoveRelatedKbit function
 */
Server.DELIVERYremoveRelatedKbit = "DELIVERYremoveRelatedKbit";
/**
 * Server USERlogout function
 */
Server.USERlogout = "USERlogout";
/**
 * Server USERvalidateToken function
 */
Server.USERvalidateToken = "USERvalidateToken";
/**
 * Server USERsaveProfilePicture function
 */
Server.USERsaveProfilePicture = "USERsaveProfilePicture";
/**
 * Server DELIVERYupdateFullDelivery function
 */
Server.DELIVERYupdateFullDelivery = "DELIVERYupdateFullDelivery";
/**
 * Server getLanguages function
 */
Server.getLanguages = "getLanguages";
/**
 * Server REFRESHERgetData function
 */
Server.REFRESHERgetData = "REFRESHERgetData";
/**
 * Server SCOPEsearchScopes function
 */
Server.SCOPEsearchScopes = "SCOPEsearchScopes";

Server.prototype = {

    connectToServer: function(data, method, Globals, callback) {},
    /**
     * Search element in server
     * @param  {object}   dataToSearch 
     * @param  {Function} callback     
    search: function(dataToSearch, callback){},

    /**
     * Saves NEW ELEMTN to server
     * @param {object}   obj   
     * @param {Function} callback 
     */
    saveElement: function(obj, callback){},

    /**
     * Gets element from server by ID<br> <b>Return</b> {object} returns the objects we asked for
     * @param  {Number}   objID    the ID of the object
     * @param  {Function} callback callback Function
     */
    getElementByID: function(objID, callback){},

    /**
     * Gets the steps from server.<br> <b>Return</b> {json} steps
     * @param  {callback} callback callback function
     */
    getSteps: function(callback){},

    /**
     * Save the steps in server
     * @param {Function} callback callback function
     */
    setSteps: function(steps, callback){},

    /**
     * Gets objects from server <br> <b>Return</b> updated object from server
     * @param  {Array}   objectsArray
     * @param  {Function} callback
     */
    getFromServer: function(objectsArray, callback){},

    /**
     * Gets all terms from server
     * @param  {Function} callback callback function
     */
    getAllTerms: function(callback){}
}