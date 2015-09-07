// Compress Strings
var my_lzma = new LZMA("js/lzma/lzma_worker.js");
function strCompress(str, callback){
	my_lzma.compress(str, 1, function(e){
		callback(JSON.stringify(e));
	}, function(percent){
		ngScope.Log.d("LZMA","strCompress","Compressing..." + Math.round(percent * 100) + "%");
	});
}

function strDecompress(str, callback){
	my_lzma.decompress(JSON.parse(str), function(strDeco){
		callback(strDeco);
	}, function(percent){
		ngScope.Log.d("LZMA","strDecompress","Decompressing..." + Math.round(percent * 100) + "%");
	});
}