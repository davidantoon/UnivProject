// Compress Strings
var my_lzma = new LZMA("js/lzma/lzma_worker.js");
function strCompress(str, callback){
	// console.groupCollapsed("Compressing");
	// console.time("Compressing Time");
	// console.groupCollapsed("Percent");
	my_lzma.compress(str, 1, function(e){
		// console.groupEnd();
		// console.timeEnd("Compressing Time");
		// console.log("DONE");
		// console.groupEnd();
		callback(JSON.stringify(e));
	}, function(percent){
		console.log("Compressing..." + Math.round(percent * 100) + "%");
	});
}

function strDecompress(str, callback){
	// console.groupCollapsed("Decompressing");
	// console.time("Decompressing Time");
	// console.groupCollapsed("Percent");
	my_lzma.decompress(JSON.parse(str), function(strDeco){
		// console.groupEnd();
		// console.timeEnd("Decompressing Time");
		// console.log("DONE");
		// console.groupEnd();
		callback(strDeco);
	}, function(percent){
		console.log("Decompressing..." + Math.round(percent * 100) + "%");
	});
}