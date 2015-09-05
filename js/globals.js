(function(angular) {
    // 'use strict';
    angular.module('IntelLearner').value('Globals', {
        CashedObjects: {},
        CurrentUser: {},
        get: function(id, type) {
            return this.CashedObjects[type + id];
        },
        set: function(obj) {
            this.CashedObjects[obj.type + obj.id] = obj;
        },
        clear: function() {
            this.CashedObjects = {};
            this.CurrentUser = {};
        },
        allObjectsaved: function() {
            console.warn("allObjectsaved not implemented!");
            return true;
            // var isSaved = 1;
            // for(var i=0; i<this.CashedObjects.length; i++){
            // 	isSaved *= ((this.CashedObjects[i].inProgress)?0:1);
            // }
            // return isSaved;
        },
        pop: function(id, type) {
            var tempObj = this.CashedObjects[type + id];
            delete this.CashedObjects[type + id];
            return tempObj;
        },
        getMinimized: function(callback) {
            if (this.CurrentUser.id != undefined) {
                var dataToRetrun = [];
                var CashedObjectsKeys = Object.keys(this.CashedObjects);
                for (var i = 0; i < CashedObjectsKeys.length; i++) {
                    if (this.CashedObjects[CashedObjectsKeys[i]].inProgress == false && this.CashedObjects[CashedObjectsKeys[i]].locked &&  this.CashedObjects[CashedObjectsKeys[i]].lockedBy.id != this.CurrentUser.id) {
                        dataToRetrun.push({
                            "id": this.CashedObjects[CashedObjectsKeys[i]].id,
                            "type": this.CashedObjects[CashedObjectsKeys[i]].type,
                            "lastModified": this.CashedObjects[CashedObjectsKeys[i]].lastModified,
                        });
                    }
                }
                callback(dataToRetrun);
            } else {
                callback([]);
            }
        },
        getRecentObjects: function(type){
            if (this.CurrentUser.id != undefined) {
                var dataToRetrun = [];
                var CashedObjectsKeys = Object.keys(this.CashedObjects);
                for (var i = 0; i < CashedObjectsKeys.length; i++) {
                    if(this.CashedObjects[CashedObjectsKeys[i]].type == type){
                        dataToRetrun.push(this.CashedObjects[CashedObjectsKeys[i]]);
                    }
                }
                return dataToRetrun;
            }else{
                return [];
            }
        },

        noLockedItemrs:function(){
            if(CashedObjects){
                for(var i=0; i< CashedObjects.length; i++){
                    if(CashedObjects[i].locked)
                        return false;
                }
            }
            return true;
        }
    })
    .value('TypeOf', {
        init: function() {
            Number.prototype.objectType = "number";
            Array.prototype.objectType = "array";
            String.prototype.objectType = "string";
            (function() {}).prototype.objectType = "function";
        },
        get: function(obj) {
            return obj.objectType;
        }
    })
    .value('ServerReq', "Not initialized")
    .value('$httpR', {

        protocol: "http",
        ip: "109.160.241.160",
        port: "8888",
        baseUrl: "/mopdqwompoaskdqomdiasjdiowqe/server/webservice.php/",

        // API function
        logIn: "USERlogIn",
        signUp: "USERsignUp",
        changePassword: "USERchangePassword",
        updateUser: "USERupdateUser",
        KBITremoveTerm: "KBITremoveTerm",
        KBITaddTermByUID: "KBITaddTermByUID",
        KVPsetKeyValuePair: "KVPsetKeyValuePair",
        KVPgetKeyValuePair: "KVPgetKeyValuePair",
        TERMsearchTerms: "TERMsearchTerms",
        DELIVERYsearchDelivery: "DELIVERYsearchDelivery",
        KBITsearchKbits: "KBITsearchKbits",
        TERMremoveTermToTermRelation: "TERMremoveTermToTermRelation",
        TERMgetAllTermsStrings: "TERMgetAllTermsStrings",
        TERMgetRelatedTerms: "TERMgetRelatedTerms",
        TERMaddTermToTermRelation: "TERMaddTermToTermRelation",
        KBITbeginEdit: "KBITbeginEdit",
        KBITcancelEdit: "KBITcancelEdit",
        KBITaddRelatedKbit: "KBITaddRelatedKbit",
        KBITremoveRelatedKbit: "KBITremoveRelatedKbit",
        DELIVERYbeginEdit: "DELIVERYbeginEdit",
        DELIVERYcancelEdit: "DELIVERYcancelEdit",
        DELIVERYpublish: "DELIVERYpublish",
        DELIVERYupdate: "DELIVERYupdate",
        DELIVERYaddRelatedDelivery: "DELIVERYaddRelatedDelivery",
        DELIVERYremoveRelatedDelivery: "DELIVERYremoveRelatedDelivery",
        DELIVERYaddTermByUID: "DELIVERYaddTermByUID",
        DELIVERYremoveTerm: "DELIVERYremoveTerm",
        DELIVERYaddRelatedKbit: "DELIVERYaddRelatedKbit",
        DELIVERYremoveRelatedKbit: "DELIVERYremoveRelatedKbit",
        USERlogout: "USERlogout",
        USERvalidateToken: "USERvalidateToken",
        DELIVERYaddNew: "DELIVERYaddNew",
        USERsaveProfilePicture: "USERsaveProfilePicture",

        



        connectToServer: function(data, method, Globals, callback) {

            data.serverHash = "DAVIDAMEER";
            data.method = method;
            data.format = "json";
            if(Globals.CurrentUser && Globals.CurrentUser.id){
                data.Token = Globals.CurrentUser.token;
            }
            $.ajax({
                // url: "http://testserver-radjybaba.rhcloud.com/webservice.php/",
                url: this.protocol+"://"+this.ip+":"+this.port+this.baseUrl,
                data: data,
                method: "POST",
                header:{
                    "Access-Control-Allow-Origin": "http://"+this.ip+":8888"
                },
                xhrFields: {
                    withCredentials: true
                },
                crossDomain : true,
                timeout: 10000,
                success: function(success) {
                    console.log(success);
                    if (success.status == 200)
                        callback(success.data, null);
                    else{
                    
                        if(success.status == 401){
                            ngScope.logout();
                            callback(null, error); 
                        }else{
                            console.error(success);
                            callback(null, success);
                        }
                    }
                },
                error: function(error) {
                
                    if(error.status == 401){
                        ngScope.logout();
                        callback(null, error); 
                    }else{
                        console.error(error);
                        callback(null, error); 
                    }
                }
            });
        }
    }).value('checkChangesInStepsAffectsOnlyNewData', function(content, after, before){

        /**********************************************************************************************************************/
        /* Get all changed values stored in object {changes:"status", value}, Modified by David to support this application. */
        /**********************************************************************************************************************/
        function diff(a, b) {
            if (a === b) {
                return {
                    changed: 'equal',
                    value: a
                }
            }
            var value = {};
            var equal = true;
            for (var key in a) {
                if (key in b) {
                    if (a[key] === b[key]) {} else {
                        var typeA = typeof a[key];
                        var typeB = typeof b[key];
                        if (a[key] && b[key] && (typeA == 'object' || typeA == 'function') && (typeB == 'object' || typeB == 'function')) {
                            var valueDiff = diff(a[key], b[key]);
                            if (valueDiff.changed == 'equal') {} else {
                                if(Object.keys(valueDiff.value) && Object.keys(valueDiff.value)[0] == "$$hashKey"){}
                                else
                                    if(key == "content"){
                                        var foundContent=false;
                                        for(var i=0; i<Object.keys(valueDiff.value).length; i++){
                                            if(Object.keys(valueDiff.value)[i]=="newData" || Object.keys(valueDiff.value)[i]=="progressWizard"){
                                                foundContent = true;
                                            }
                                        }
                                        if(foundContent){
                                            valueDiff.contentId = a.content.id;
                                            valueDiff.contentType = a.content.type;
                                            equal = false;
                                            value[key] = valueDiff;
                                        }else{
                                            equal = false;
                                            value[key] = valueDiff;    
                                        }
                                    }else if(key == "dataHolding"){
                                        if(valueDiff && valueDiff.value && valueDiff.value.results && valueDiff.value.results.value){
                                            if(Object.keys(valueDiff.value.results.value).length != undefined && Object.keys(valueDiff.value.results.value).length > 0){
                                                var mm = Object.keys(valueDiff.value.results.value);
                                                var mm1 = mm[0];
                                                var ss = a.dataHolding.results;
                                                var ss1 = ss[mm1];
                                                if(ss1 && ss1.id && ss1.type){
                                                    valueDiff.contentId = ss1.id;
                                                    valueDiff.contentType = ss1.type;
                                                }
                                            }
                                        }
                                        equal = false;
                                        value[key] = valueDiff;
                                    }else{
                                        equal = false;
                                        value[key] = valueDiff;
                                    }
                            }
                        } else {
                            equal = false;
                            value[key] = {
                                changed: 'primitive change',
                                removed: a[key],
                                added: b[key]
                            }
                        }
                    }
                } else {
                    equal = false;
                    value[key] = {
                        changed: 'removed',
                        value: a[key]
                    }
                }
            }
            for (key in b) {
                if (!(key in a)) {
                    equal = false;
                    value[key] = {
                        changed: 'added',
                        value: b[key]
                    }
                }
            }
            if (equal) {
                return {
                    changed: 'equal',
                    value: a
                }
            } else {
                return {
                    changed: 'object change',
                    value: value
                }
            }
        }
        
        /*************************************************************************/
        /* Get All changed pathes, Modified by David to support this application */
        /*************************************************************************/
        function objectToPaths(data) {
            var validId = /^[a-z_$][a-z0-9_$]*$/i;
            var result = [];
            doIt(data, "");
            return result;

            function doIt(data, s) {
                if (data && typeof data === "object") {
                    if (Array.isArray(data)) {
                        for (var i = 0; i < data.length; i++) {
                            doIt(data[i], s + "[" + i + "]");
                        }
                    } else {
                        for (var p in data) {
                            if (validId.test(p)) {
                                if(p != "$$hashKey"){
                                    if(p != "changed" && p != "removed" && p != "added" && p != "contentType" && p != "contentId"){
                                        if(data.contentId){
                                            doIt(data[p], s + "." + p+"(id="+data.contentId+"&type="+data.contentType+")");
                                        }
                                        else{
                                            doIt(data[p], s + "." + p);
                                        }
                                    }
                                    else {
                                        doIt(data[p], s);
                                    }
                                }
                            } else {
                                doIt(data[p], s + "[\"" + p + "\"]");
                            }
                        }
                    }
                } else {
                    if (data == "primitive change" || data == "added" || data == "removed"){
                        result.push(s);
                    }
                }
            }
        }

        /**************************************************************************/
        /* Get unique array values, Modified by David. Support only string values */
        /**************************************************************************/
        function getUniqueStringValues(array){var flags = {};var unique = [];for( i=0; i< array.length; i++) {if( flags[array[i]]) continue;flags[array[i]] = true;unique.push(array[i]);} return unique;}

        var diffData = diff(before, after);
        if(diffData.changed == "equal")
            return true;
        diffData = objectToPaths(diffData);
        diffData = getUniqueStringValues(diffData);
        for(var i=0; i<diffData.length; i++){
            var s = diffData[i];
            if(s.indexOf("(id=") != -1 && s.indexOf("&type=") != -1){
                var contentId = (s.substring(s.indexOf('(id=')+4)).substring(0,(s.substring(s.indexOf('(id=')+4)).indexOf('&'));
                var contentType = (s.substring(s.indexOf('&type=')+6)).substring(0,(s.substring(s.indexOf('&type=')+6)).indexOf(')'));
                if(content.id != contentId || content.type != contentType){
                    return false;
                }
            }else{
                return false;
            }
        }
        return true;

    });
})(window.angular);








