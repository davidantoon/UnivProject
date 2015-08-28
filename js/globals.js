(function(angular) {
    // 'use strict';
	angular.module('IntelLearner').value('Globals', {
		CashedObjects:{},
		get: function(id, type){
			return this.CashedObjects[type+id];
		},
		set: function(obj){
			this.CashedObjects[obj.type+obj.id] = obj;
		},
		clear: function(){
			this.CashedObjects = {};
		},
		allObjectsaved: function(){
			console.warn("allObjectsaved not implemented!");
			return true;
			// var isSaved = 1;
			// for(var i=0; i<this.CashedObjects.length; i++){
			// 	isSaved *= ((this.CashedObjects[i].inProgress)?0:1);
			// }
			// return isSaved;
		},
		pop: function(id, type){
			var tempObj = this.CashedObjects[type+id];
			delete this.CashedObjects[type+id];
			return tempObj;
		},
		getMinimized: function(callback){
			var dataToRetrun = [];
			var CashedObjectsKeys =  Object.keys(this.CashedObjects);
			for(var i=0; i<CashedObjectsKeys.length; i++){
				dataToRetrun.push({
					"id": this.CashedObjects[CashedObjectsKeys[i]].id,
					"type": this.CashedObjects[CashedObjectsKeys[i]].type,
					"lastModified": this.CashedObjects[CashedObjectsKeys[i]].lastModified,
				});
			}
			callback(dataToRetrun);
		}
	})
	.value('TypeOf', {
		init: function(){
			Number.prototype.objectType = "number";
			Array.prototype.objectType = "array";
			String.prototype.objectType = "string";
			(function(){}).prototype.objectType = "function";
		},	
		get: function(obj){
			return obj.objectType;
		}
	})
	.value('ServerReq', "Not initialized")
	.value('Soap', {
		protocol: "http",
		ip: "31.154.164.129",
		port: "8888",
		baseUrl: "/mopdqwompoaskdqomdiasjdiowqe/server/webservice.php/",

   
		logIn: "USERsignUp",
		signUp: "USERlogIn",
		changePassword: "USERchangePassword",
		updateUser: "USERupdateUser",
		connectToServer: function(data, method, callback){
			//data.serverHash = gethash();
			data.serverHash = "DAVID&AMEER";
			$.soap({
			    //url: 'http://testserver-radjybaba.rhcloud.com/webservice.php/',
			    url: this.protocol + "://" + this.ip + ":" + this.port + this.baseUrl,
			    method: method,

			    data: data,

			    success: function (soapResponse) {
			    	console.log("soap success");
			        callback(JSON.parse(soapResponse.toJSON().Body[Object.keys(soapResponse.toJSON().Body)[0]][Object.keys(soapResponse.toJSON().Body[Object.keys(soapResponse.toJSON().Body)[0]])]));
			    },
			    error: function (soapResponse) {
			       console.log(soapResponse.toJSON());
			       //callback(null, JSON.parse(soapResponse.toJSON().Body[Object.keys(soapResponse.toJSON().Body)][Object.keys(soapResponse.toJSON().Body[Object.keys(soapResponse.toJSON().Body)])[1]]));
			    }
			});
		}
	});
})(window.angular);
