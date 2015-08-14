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

