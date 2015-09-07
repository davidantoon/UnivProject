<?php
// PHP File Tree Demo
// For documentation and updates, visit http://abeautifulsite.net/notebook.php?article=21

// Main function file
include("phpFileTree/php_file_tree.php");



?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
	<head>

		<title>CMS - Repository files</title>
		<style>
				.floating-menu {
			    width: 80%;
			    /*height: 200px;*/
			    background: aqua;
			    margin: auto;
			    padding: 10px;
			    position: absolute;
			    height: 88%;
			    overflow: scroll;
			}
			div#one {
				position:fixed;background:#fff4c8;
			    width: 15%;
			    /*height: 200px;*/
			    /*background: red;*/
			    float: left;
			}
			div#two {
			    margin-left: 17%;
			    height: 200px;
			    /*background: black;*/
			}
		</style>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
		<link href="phpFileTree/styles/default/default.css" rel="stylesheet" type="text/css" media="screen" />
		<link rel="stylesheet" type="text/css" href="phpFileTree/jquery.snippet.css" />

		<!-- Makes the file tree(s) expand/collapsae dynamically -->
		<script src="phpFileTree/php_file_tree.js" type="text/javascript"></script>
		<script src="http://code.jquery.com/jquery-latest.min.js"></script>
		<script type="text/javascript" src="phpFileTree/jquery.snippet.js"></script>
		
		<script>

			function showLogFile(u) {

			    $.ajax({
				  url:"http://localhost:8888/mopdqwompoaskdqomdiasjdiowqe/server/webservice.php",
				  method:"POST",
				  timeout:5000,
				  data:{
				    "method":"getFileContent",
				    "fileURL":u
				  },
				  success:function(e){
				  	// $("#phpCode").innerHTML = "<p>geryes abo elsex </p> ";
				  	$('#phpCode .data').remove();
				  	var x = $('<pre class="data">'+e.data+'</pre>');
				  	$("#phpCode").append(x);
				    $("#phpCode .data").snippet("php",{style:"golden"});
				    console.log(e.data);
				  },
				  error:function(err){
				    console.error(err);
				  }
				});

			}

		</script>
	</head>

	<body bgcolor="#272822">
	
		<font color="#e6db70"><h1>Repository</h1></font>
		
		<hr />
		<div class="floating-menu" id="one">
		<h2>. /</h2>
		<hr>
		<?php
				
		// This displays a JavaScript alert stating which file the user clicked on
		// $allowed = array("~php~"); 
		// echo php_file_tree("./", "javascript:showLogFile('[link]');", $allowed);
		echo php_file_tree("./", "javascript:showLogFile('[link]');");
		?>
		</div>
		<div id="two">
			<div id="phpCode">
				<pre class="data">
				&lt;?php
					$url = 'http://testserver-radjybaba.rhcloud.com/webservice-content.php';
					$method = 'search';
					$data_to_transfer = array('searchtext'=>'term', 'elements'=>array('delivery'=>'false','term'=>'true','scope'=>false), "field"=> array('title'=>'true','info'=>'false'));
					$data = array('hash' => 'DAVIDGALIT', 'query' => $data_to_transfer, 'withContent' => true, 'method'  => $method);
					$options = array('http' => array('method'  => "POST", 'header'  => "Content-type: application/x-www-form-urlencoded\r\n", 'content' => http_build_query($data)));
					$context  = stream_context_create($options);
					$result = file_get_contents($url, false, $context);
					?&gt;
				</pre>
			</div>
		</div>
		
	</body>
	
</html>












