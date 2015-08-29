<?php
	include '../app_config.php';
?>
<html>
	<body>
		<style>
			div.floating-menu {position:fixed;background:#fff4c8;padding:5px;;width:130px;z-index:100;}
			div.floating-menu a, div.floating-menu h3 {display:block;margin:0 0.5em;}
		</style>
		<div class="floating-menu">
		<h3>Floating Menu</h3>
			<?php 
				$logs = debugLog::get_all_log_files();
				var_dump($logs);
				for($i = 0; $i < count($logs); $i++)
					echo '<a href="'. $logs[$i] .'">'. $logs[$i] .'</a>';
			?>
			<!-- <a href="http://www.quackit.com/css/">CSS</a>
			<a href="http://www.quackit.com/html/">HTML</a>
			<a href="http://www.quackit.com/javascript/">JavaScript</a>
			<a href="http://www.quackit.com/coldfusion/">ColdFusion</a>
			<a href="http://www.quackit.com/database/">Database</a> -->
		</div>
		<div>
			
		</div>
	</body>
</html>
