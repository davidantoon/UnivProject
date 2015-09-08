/**
 * Server class managing server requests
 * @class Server
 */
function Server(protocol, ip, port, baseUrl){
    this.protocol;
    this.ip;
    this.port;
    this.baseUrl;
}

Server.logIn = "USERlogIn";
Server.signUp = "USERsignUp";
Server.changePassword = "USERchangePassword";
Server.updateUser = "USERupdateUser";
Server.KBITremoveTerm = "KBITremoveTerm";
Server.KBITaddTermByUID = "KBITaddTermByUID";
Server.KVPsetKeyValuePair = "KVPsetKeyValuePair";
Server.KVPgetKeyValuePair = "KVPgetKeyValuePair";
Server.TERMsearchTerms = "TERMsearchTerms";
Server.DELIVERYsearchDelivery = "DELIVERYsearchDelivery";
Server.KBITsearchKbits = "KBITsearchKbits";
Server.TERMremoveTermToTermRelation = "TERMremoveTermToTermRelation";
Server.TERMgetAllTermsStrings = "TERMgetAllTermsStrings";
Server.TERMgetRelatedTerms = "TERMgetRelatedTerms";
Server.TERMaddTermToTermRelation = "TERMaddTermToTermRelation";
Server.KBITbeginEdit = "KBITbeginEdit";
Server.KBITcancelEdit = "KBITcancelEdit";
Server.KBITaddRelatedKbit = "KBITaddRelatedKbit";
Server.KBITremoveRelatedKbit = "KBITremoveRelatedKbit";
Server.KBITupdateFullKbit = "KBITupdateFullKbit";
Server.DELIVERYaddNew = "DELIVERYaddNew";
Server.DELIVERYbeginEdit = "DELIVERYbeginEdit";
Server.DELIVERYcancelEdit = "DELIVERYcancelEdit";
Server.DELIVERYpublish = "DELIVERYpublish";
Server.DELIVERYupdate = "DELIVERYupdate";
Server.DELIVERYaddRelatedDelivery = "DELIVERYaddRelatedDelivery";
Server.DELIVERYremoveRelatedDelivery = "DELIVERYremoveRelatedDelivery";
Server.DELIVERYaddTermByUID = "DELIVERYaddTermByUID";
Server.DELIVERYremoveTerm = "DELIVERYremoveTerm";
Server.DELIVERYaddRelatedKbit = "DELIVERYaddRelatedKbit";
Server.DELIVERYremoveRelatedKbit = "DELIVERYremoveRelatedKbit";
Server.USERlogout = "USERlogout";
Server.USERvalidateToken = "USERvalidateToken";
Server.USERsaveProfilePicture = "USERsaveProfilePicture";
Server.DELIVERYupdateFullDelivery = "DELIVERYupdateFullDelivery";
Server.getLanguages = "getLanguages";
Server.REFRESHERgetData = "REFRESHERgetData";
Server.SCOPEsearchScopes = "SCOPEsearchScopes";

Server.prototype = {

    connectToServer: function(data, method, Globals, callback) {}
    /**
     * Search element in server
     * @param  {object}   dataToSearch Object contains the data we want to search
     * @param  {Function} callback     callback function
     */
    search: function(dataToSearch, callback){},

    /**
     * Saves NEW ELEMTN !!! to server
     * @param {object}   obj      object we are going to save
     * @param {Function} callback callback function
     */
    
    // delivery , settings, kbits,steps, 
    saveElement: function(obj, callback){},

    /**
     * Gets element from server by ID
     * @param  {Number}   objID    the ID of the object
     * @param  {Function} callback callback Function
     * @return {object}            returns the objects we asked for
     */
    getElementByID: function(objID, callback){},

    /**
     * Gets the steps from server.
     * @param  {callback} callback callback function
     * @return {json}              steps
     */
    getSteps: function(callback){},

    /**
     * Save the steps in server
     * @param {Function} callback callback function
     */
    setSteps: function(steps, callback){},

    getFromServer: function(objectsArray, callback){},

    /**
     * Gets all terms from server
     * @param  {Function} callback callback function
     */
    getAllTerms: function(callback){}
}