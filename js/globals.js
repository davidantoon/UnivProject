app.value('Globals', {
	CashedObjects:{},
	get: function(id){
		return this.CashedObjects[id];
	},
	set: function(obj){
		this.CashedObjects[obj.id] = obj;
	},
	clear: function(){
		this.CashedObjects = {};
	},
	allObjectsaved: function(){
		var isSaved = 1;
		for(var i=0; i<this.CashedObjects.length; i++){
			isSaved *= ((this.CashedObjects[i].inProgress)?0:1);
		}
		return isSaved;
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
.value('ServerReq', "Not initialized");

