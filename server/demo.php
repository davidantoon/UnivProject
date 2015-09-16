<html>
 <head>
 <meta charset="utf-8">
  <title>PHP Test</title>
 </head>
 <body>

<?php 
	include 'app_config.php';
	debugLog::important_log("START");
	$dbObj = new dbAPI();



	debugLog::important_log("<pre>			/*********************************************************************************************************************************
			*                                                                                             									*
			*  0000000	 0000000    00000000000     00000     00000000000  000      00  00000000000  00000000000  000      00     00000     *
			*  000   000     000   00   000           000   000   000          0000     00      000          000      0000     00   000   000   *
			*  000   000     000   00   000           00          000          00 00    00      000          000      00 00    00  000          *
			*  0000000	 0000000    00000000000    0000000    00000000000  00  000  00      000          000      00  000  00  00   000000  *
			*  000		 000  00    000                  00   000          00    00 00      000          000      00    00 00  000     00   *
			*  000		 000   00   000           000   000   000          00     0000      000          000      00     0000   000   000   *
			*  000		 000	00  00000000000     00000     00000000000  00      000      000      00000000000  00      000     00000     *
			*                                                                                           									*
			*********************************************************************************************************************************/</pre>");
	
	$requested_step = $_GET['step'];

	if($requested_step == 0) {
		// create users
		debugLog::log("<i>[". __FILE__ ."]</i> adding users");
		$geryes = 'geryes'.date("Y.m.d.s");
		$anton = 'anton'.date("Y.m.d.s");
		users::add_new_user('geryes_1', 'moussa_1', $geryes, '1', 'geryes_1@gmail.com', '', '1');
		users::add_new_user('anton_1', 'anton_1', $anton, '1', 'anton_1@gmail.com', '', '1');
		
		$geryes = users::validate_username_password($geryes, '1');
		$anton = users::validate_username_password($anton, '1');
		
		debugLog::important_log("<i>[". __FILE__ . "]</i> user id for geryes: ". $geryes["UID"]);
		debugLog::important_log("<i>[". __FILE__ . "]</i> user id for anton: ". $anton["UID"]);
		return;
	}

	$current_user = $_GET['user'];

	if($requested_step == 1) {
		// creating deliveries
		debugLog::log("<i>[". __FILE__ ."]</i>  adding Deliveries");
		$deliveryfrontG = array('FRONT_TYPE'=>'DELIVERY_FRONT', 'PATH'=>'http://demo-link.com');
		debugLog::log("<i>[hello.php:function]</i> Add delivery result: " . dbAPI::print_json_s($deliveryG = Delivery::add_new_Delivery_in_edit_mode('Demo delivery', 'Demo delivery description ', $current_user, $deliveryfrontG), 0));	
		// publishing delivery
		debugLog::log("<i>[hello.php:Publishing deliveries]</i> result: ". dbAPI::print_json_s(Delivery::publish_changes($deliveryG["UID"], $current_user), 0));
		return;
	}

	$current_delivery = $_GET['delivery'];

	if($requested_step == 2) {

		debugLog::log("<i>[hello.php:request begin edit delivery]</i> result: ". dbAPI::print_json_s(Delivery::begin_editing_Delivery($current_delivery, $current_user), 0));
		return;
	}

	if($requested_step == 3) {
		debugLog::log("<i>[hello.php:request begin edit delivery]</i> result: ". dbAPI::print_json_s(Delivery::begin_editing_Delivery($current_delivery, $current_user), 0));
		return;
	}

	if($requested_step == 4) {
		// publishing delivery
		debugLog::log("<i>[hello.php:Publishing deliveries]</i> result: ". dbAPI::print_json_s(Delivery::publish_changes($current_delivery, $current_user), 0));
		return;	
	}

	debugLog::important_log("DONE");

	
?>

 </body>
</html>













