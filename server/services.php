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
	$token = '7Qpv7KBEZVk3t67TARQqcEBITdZKb9EiZ3O7OpLOl6ROdZHORye4dQM63MQeVuxVyl2nLOb6V3V83CWUbbYo1Ku4xljsQRnodqLY';

	// $method = 'DELIVERYsearchDelivery';
	$method = 'search';

	// $data_to_transfer = $query = '{"searchtext":"Test3","elements":{"delivery":"false","d2k":"true","term":"true","scope":"true"},"field":{"title":"true","info":"false"}}';
	
	$data_to_transfer = array('searchtext'=>'4', 'elements' => array('delivery'=>'false','term'=>'true','scope'=>'true'), "field"=> array('title'=>'true','info'=>'false'));
	$data = array('hash' => 'DAVIDGALIT', 'query' => $data_to_transfer, 'withContent' => true, 'method'  => $method, 'token' => $token );
	
	// $data = array('hash' => 'DAVIDGALIT', 'deliveryUID' => "1", 'method'  => 'getTreeOfDelivery');
	// getTreeOfDelivery($hash, $deliveryUID)
	// getDeliveryByUID($hash, $deliveryUID)



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








