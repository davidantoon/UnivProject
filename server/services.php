<!DOCTYPE html>
<html lang="en" ng-app="IntelLearner">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- <link rel="icon" href="img/favicon.ico" type="image/x-icon"/> -->
  <!-- <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon"/> -->
  <title></title>
  
  <link rel="stylesheet" href="../css/app.css"> 
  <link rel="stylesheet" href="../css/bootstrap-datepicker3.css"> 
  <link rel="stylesheet" href="../css/onsenui.css">
  <link rel="stylesheet" href="../css/onsen-css-components-IntelProject.css">
  <link rel="stylesheet" href="../css/app.css">
  


<?php
	include 'app_config.php';
	
	// $temp = users::validate_username_password('rajibaba', 'my_password');

	$url= 'http://localhost:8888/mopdqwompoaskdqomdiasjdiowqe/server/webservice-content.php'; // url + file.php
	$token = 'IVnWfzOraxTbBfHyyqE4zxK4o73yUMGCI3zXCooNViZwyH568KbHhWLG3OfYBVBjZbhCzFqvYp2w77DfROW9KIQOx6M82ns1yJE8';

	// $method = 'DELIVERYsearchDelivery';
	$method = 'search';

	$data_to_transfer = $query = '{"searchtext":"Test3","elements":{"delivery":"false","d2k":"true","term":"true","scope":"true"},"field":{"title":"true","info":"false"}}';
	$data_to_transfer = array('searchtext'=>'5', 'elements' => array('delivery'=>'false','d2k'=>'true','term'=>'true','scope'=>'true'), "field"=> array('title'=>'true','info'=>'false'));




	$data = array('hash' => 'DAVIDGALIT', 'query' => $data_to_transfer, 'method'  => $method, 'withContent'=>true, 'token' => $token );
	// $data = array('method'  => 'getLanguages' );

	// use key 'http' even if you send the request to https://...
	$options = array(
	    'http' => array(
	        'method'  => "POST",
	        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
	        'content' => http_build_query($data),
	    ),
	);
	$context  = stream_context_create($options);
	$result = file_get_contents($url, false, $context);
?> 


</head>
<body ng-controller="MainCtrl">
<?php
	echo "<pre style='-webkit-user-select: initial;-moz-user-select: initial;-ms-user-select: initial;user-select: initial;' ng-init='david=". $result ."'>{{ david | json:4}}</pre>";
	echo "<script>console.log(". $result .")<"."/script>";
?>



 <script type="text/javascript" src="../js/angular/angular.js"></script>
  <script type="text/javascript" src="../js/onsenui.js"></script> 
  <script type="text/javascript" src="../js/jquery.js"></script>
  <script type="text/javascript" src="../js/jquery.maskedinput.js"></script>
  <script type="text/javascript" src="../js/firebase.js"></script>
  <script type="text/javascript" src="../js/angularfire.min.js"></script>
  <script type="text/javascript" src="../js/visible.js"></script>
  <script type="text/javascript" src="../js/serverapp.js"></script>

  </body>
</html>








