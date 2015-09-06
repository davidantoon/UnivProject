	<html ng-app="IntelLearner">
 <head>
 <meta charset="utf-8">
  <title>PHP Test</title>
 <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- <link rel="icon" href="img/favicon.ico" type="image/x-icon"/> -->
  <!-- <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon"/> -->
  
  <link rel="stylesheet" href="../css/app.css"> 
  <link rel="stylesheet" href="../css/bootstrap-datepicker3.css"> 
  <link rel="stylesheet" href="../css/onsenui.css">
  <link rel="stylesheet" href="../css/onsen-css-components-IntelProject.css">
  <link rel="stylesheet" href="../css/app.css">

		</head>
 <body ng-controller="MainCtrl">

 
<?php 
	include 'app_config.php';
// 	$dbObj = new dbAPI();

// 	$u = $dbObj->db_get_usersDB();
// 	$c = $dbObj->db_get_contentDB();
// 	$tempArr = array($u.'.KBIT_BASE', $u.'.KBIT_FRONT', $c.'.KBIT_BASE', $c.'.KBIT_FRONT',
// 		  $u.'.DELIVERY_BASE', $u.'.DELIVERY_FRONT', $c.'.DELIVERY_BASE', $c.'.DELIVERY_FRONT',
// 		  $u.'.R_LD2D', $u.'.R_LK2K', $c.'.R_LD2D', $c.'.R_LK2K',
// 		  $u.'.R_LD2T', $u.'.R_LK2T', $c.'.R_LD2T', $c.'.R_LK2T',
// 		  $u.'.R_LD2K', $c.'.R_LD2K',
// 		  $c.'.CONTENT_LOCK');
// 	dbAPI::delete_all($tempArr);

// 	debugLog::important_log("<i>[hello.php:testing]</i> add 4 new Delivery");
	
// 	$deliveryfront1 = array('FRONT_TYPE'=>'DELIVERY_FRONT', 'PATH'=>'http://google1.com');
// 	$deliveryfront2 = array('FRONT_TYPE'=>'DELIVERY_FRONT', 'PATH'=>'http://google2.com');
// 	$deliveryfront3 = array('FRONT_TYPE'=>'DELIVERY_FRONT', 'PATH'=>'http://google3.com');
// 	$deliveryfront4 = array('FRONT_TYPE'=>'DELIVERY_FRONT', 'PATH'=>'http://google4.com');

	
// 	debugLog::log("<i>[hello.php:function]</i> Added delivery: " . dbAPI::print_json_s($delivery1 = Delivery::add_new_Delivery_in_edit_mode('Delivery 1', 'description 1', 1, $deliveryfront1), 0));
// 	debugLog::log("<i>[hello.php:function]</i> Added delivery: " . dbAPI::print_json_s($delivery2 = Delivery::add_new_Delivery_in_edit_mode('Delivery 2', 'description 2', 1, $deliveryfront2), 0));
// 	debugLog::log("<i>[hello.php:function]</i> Added delivery: " . dbAPI::print_json_s($delivery3 = Delivery::add_new_Delivery_in_edit_mode('Delivery 3', 'description 3', 1, $deliveryfront3), 0));
// 	debugLog::log("<i>[hello.php:function]</i> Added delivery: " . dbAPI::print_json_s($delivery4 = Delivery::add_new_Delivery_in_edit_mode('Delivery 4', 'description 4', 1, $deliveryfront4), 0));
	
// 	// if($delivery1 == null){
// 	// 	debugLog::important_log("<i>[hello.php:testing adding Delivery]</i> error adding Delivery");
// 	// 	return;
// 	// }

// 	debugLog::important_log("<i>[hello.php:testing]</i> publishing 4 recently added Delivery");

// 	// debugLog::log("<i>[hello.php:testing publish delivery1]</i> result: ". dbAPI::print_json_s(Delivery::publish_changes($delivery1["UID"], 2), 0));
// 	debugLog::log("<i>[hello.php:testing publish delivery1]</i> result: ". dbAPI::print_json_s(Delivery::publish_changes($delivery1["UID"], 1), 0));
// 	debugLog::log("<i>[hello.php:testing publish delivery2]</i> result: ". dbAPI::print_json_s(Delivery::publish_changes($delivery2["UID"], 1), 0));
// 	debugLog::log("<i>[hello.php:testing publish delivery3]</i> result: ". dbAPI::print_json_s(Delivery::publish_changes($delivery3["UID"], 1), 0));
// 	debugLog::log("<i>[hello.php:testing publish delivery4]</i> result: ". dbAPI::print_json_s(Delivery::publish_changes($delivery4["UID"], 1), 0));



// 	debugLog::important_log("<i>[hello.php:testing]</i> editing 4 Delivery");
// 	debugLog::log("<i>[hello.php:testing edit delivery1]</i> result: ". var_dump(Delivery::begin_editing_Delivery($delivery1["UID"], 1)));
// 	debugLog::log("<i>[hello.php:testing edit delivery2]</i> result: ". var_dump(Delivery::begin_editing_Delivery($delivery2["UID"], 1)));
// 	// debugLog::log("<i>[hello.php:testing edit delivery3]</i> result: ". var_dump(Delivery::begin_editing_Delivery($delivery3["UID"], 2)));
// 	// debugLog::log("<i>[hello.php:testing edit delivery4]</i> result: ". var_dump(Delivery::begin_editing_Delivery($delivery4["UID"], 1)));
	
// // publish all
// 	debugLog::important_log("<i>[hello.php:PUBLISHING KBITS]</i> PUBLISHING KBITS");
// 	debugLog::important_log("");
// 	debugLog::log("<i>[hello.php:testing publish delivery1]</i> result: ". dbAPI::print_json_s(Delivery::publish_changes($delivery1["UID"], 1), 0));
// 	debugLog::log("<i>[hello.php:testing publish delivery3]</i> result: ". dbAPI::print_json_s(Delivery::publish_changes($delivery2["UID"], 2), 0));
	
// 	// re-edit
// 	debugLog::log("<i>[hello.php:testing edit delivery1]</i> result: ". var_dump(Delivery::begin_editing_Delivery($delivery1["UID"], 1)));
// 	debugLog::log("<i>[hello.php:testing edit delivery1]</i> result: ". var_dump(Delivery::begin_editing_Delivery($delivery2["UID"], 1)));

// 	// add relation between delivery and delivery
// 	// debugLog::log("<i>[hello.php:testing relation between delivery and delivery]</i> result: ". dbAPI::print_json_s(Delivery::add_Kbit_to_delivery($delivery1["UID"], $delivery1["UID"], 'NEEDED', 0, 1), 0));
// 	// debugLog::log("<i>[hello.php:testing relation between delivery and delivery]</i> result: ". dbAPI::print_json_s(Delivery::add_Kbit_to_delivery($delivery2["UID"], $delivery1["UID"], 'PROVIDED', 0, 1), 0));

// 	// edit delivery1
// 	debugLog::important_log("<i>[test-delivery.php:editttttt++++++++++++++++++++++++]</i> LogMessage");
	
// 	debugLog::log("<i>[hello.php:testing updateing delivery1]</i> result: ". dbAPI::print_json_s(Delivery::add_new_edit_for_Delivery($delivery1["UID"], 'new title for kbit 1', 'new description for delivery1', 1, $delivery1["FRONT_DELIVERY"], 'a'), 0));
// 	debugLog::log("<i>[hello.php:testing updateing delivery2]</i> result: ". dbAPI::print_json_s(Delivery::add_new_edit_for_Delivery($delivery2["UID"], 'new title for kbit 2', 'new description for delivery2', 1, $delivery2["FRONT_DELIVERY"]), 0));
// 	// publish delivery1
// 	debugLog::log("<i>[hello.php:testing publish delivery1]</i> result: ". dbAPI::print_json_s(Delivery::publish_changes($delivery1["UID"], 1), 0));
// 	debugLog::log("<i>[hello.php:testing publish delivery1]</i> result: ". dbAPI::print_json_s(Delivery::publish_changes($delivery2["UID"], 1), 0));
// 	// 
// 	// 
	

	// $result = json_encode(D2KRelation::get_deliveries_relations_tree());
	debugLog::important_log("<i>[". __FILE__ .":". __FUNCTION__ ."]</i> looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooog");
	
	// $result = json_encode(D2KRelation::get_delivery_relations_tree(1919));
	

	echo "<pre style='-webkit-user-select: initial;-moz-user-select: initial;-ms-user-select: initial;user-select: initial;' ng-init='david=". $result ."'>{{ david | json:4}}</pre>";
	echo "<script>console.log(". $result .")<"."/script>";
	// debugLog::important_log("<i>[testing tree]</i>: " . dbAPI::print_json_s(D2KRelation::get_deliveries_relations_tree(), 0));
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












