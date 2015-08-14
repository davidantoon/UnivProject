app.value('Globals', {
	"CashedObjects":[], 
	"CashedKbits":[]
})
.value('TypeOf', {
	init: function(){
		Number.prototype.objectType = "number";
		Array.prototype.objectType = "array";
		String.prototype.objectType = "string";
		(function(){}).prototype.objectType = "Function";
	},	
	get: function(obj){
		return obj.objectType;
	}
});

