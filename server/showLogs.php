<?php
// PHP File Tree Demo
// For documentation and updates, visit http://abeautifulsite.net/notebook.php?article=21

// Main function file
include("phpFileTree/php_file_tree.php");



?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
	<head>

		<title>CMS - log files</title>
		<style>
			/*div.floating-menu {position:fixed;background:#fff4c8;padding:5px;;width:250px;z-index:100;}*/
			/*div.floating-menu a, div.floating-menu h3 {display:block;margin:0 0.5em;}*/
						section {
			    width: 80%;
			    /*height: 200px;*/
			    background: aqua;
			    margin: auto;
			    padding: 10px;
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
		
		<!-- Makes the file tree(s) expand/collapsae dynamically -->
		<script src="phpFileTree/php_file_tree.js" type="text/javascript"></script>
		<script src="http://code.jquery.com/jquery-latest.min.js"></script>
		<script>
			$(document).ready(function(){
			    $("#hide").click(function(){
			        $('.trace').hide();
			    });
			    $("#show").click(function(){
			        $('.trace').show();
			    });
			    $("#hidedb").click(function(){
			        $('.db').hide();
			    });
			    $("#showdb").click(function(){
			        $('.db').show();
			    });

			});

			function showLogFile(u) {
			    $("#two").load(u);
			}
		</script>
	</head>

	<body bgcolor="#272822">
	
		<font color="#e6db70"><h1>Log files</h1></font>
		
		<hr />
		
		<div class="floating-menu" id="one">
		<button id="hide">Hide trace</button>
		<button id="show">Show trace</button>
		<button id="hidedb">Hide db</button>
		<button id="showdb">Show db</button>
		<hr>
		<?php
				
		// This displays a JavaScript alert stating which file the user clicked on
		$allowed = array("~log(\d+)~"); 
		echo php_file_tree("./logs", "javascript:showLogFile('[link]');", $allowed);
		
		?>
		</div>
		<div id="two">
			
		</div>
		
	</body>
	
</html>












