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
            if (CurrentUser.id != undefined) {
                var dataToRetrun = [];
                var CashedObjectsKeys = Object.keys(this.CashedObjects);
                for (var i = 0; i < CashedObjectsKeys.length; i++) {
                    if (this.CashedObjects[CashedObjectsKeys[i]].inProgress != true && this.CashedObjects[CashedObjectsKeys[i]].lockedBy.id == CurrentUser.id) {
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
            ip: "31.154.164.129",
            port: "8888",
            baseUrl: "/mopdqwompoaskdqomdiasjdiowqe/server/webservice.php/",


            logIn: "USERlogIn",
            signUp: "USERsignUp",
            changePassword: "USERchangePassword",
            updateUser: "USERupdateUser",
            connectToServer: function(data, method, callback) {
                //data.serverHash = gethash();
                data.serverHash = "DAVIDAMEER";
                data.method = method;
                data.format = "json";
                //console.log( this.protocol + "://" + this.ip + ":" + this.port + this.baseUrl + "?" + "method="+method +"&format=json");

                $.ajax({
                    url: "http://testserver-radjybaba.rhcloud.com/webservice.php/",
                    data: data,
                    method: "POST",
                    success: function(success) {
                        console.log(success);
                        if (success.status == 200)
                            callback(success.data, null);
                        else
                            callback(null, success);
                    },
                    error: function(error) {
                        callback(null, JSON.parse(error.responseText).data.Message);
                    }
                });
            }
        });
})(window.angular);