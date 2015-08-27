	<html>
 <head>
 <meta charset="utf-8">
  <title>PHP Test</title>
 </head>
 <body>

<?php 
	include 'app_config.php';
	$dbObj = new dbAPI();

	$u = $dbObj->db_get_usersDB();
	$c = $dbObj->db_get_contentDB();
	$tempArr = array($u.'.KBIT_BASE', $u.'.KBIT_FRONT', $c.'.KBIT_BASE', $c.'.KBIT_FRONT',
		  $u.'.DELIVERY_BASE', $u.'.DELIVERY_FRONT', $c.'.DELIVERY_BASE', $c.'.DELIVERY_FRONT',
		  $u.'.R_LD2D', $u.'.R_LK2K', $c.'.R_LD2D', $c.'.R_LK2K',
		  $u.'.R_LD2T', $u.'.R_LK2T', $c.'.R_LD2T', $c.'.R_LK2T',
		  $u.'.R_LD2K', $c.'.R_LD2K',
		  $c.'.CONTENT_LOCK');
	dbAPI::delete_all($tempArr);

	debugLog::important_log("<i>[hello.php:testing]</i> add 4 new kbits");
	
	$kbitfront1 = array('FRONT_TYPE'=>'KBIT_FRONT', 'PATH'=>'http://google1.com');
	$kbitfront2 = array('FRONT_TYPE'=>'KBIT_FRONT', 'PATH'=>'http://google2.com');
	$kbitfront3 = array('FRONT_TYPE'=>'KBIT_FRONT', 'PATH'=>'http://google3.com');
	$kbitfront4 = array('FRONT_TYPE'=>'KBIT_FRONT', 'PATH'=>'http://google4.com');

	
	debugLog::log("<i>[hello.php:function]</i> Added kbit: " . dbAPI::print_json_s($kbit1 = Kbit::add_new_Kbit_in_edit_mode('Kbit 1', 'description 1', 1, $kbitfront1), 0));
	debugLog::log("<i>[hello.php:function]</i> Added kbit: " . dbAPI::print_json_s($kbit2 = Kbit::add_new_Kbit_in_edit_mode('Kbit 2', 'description 2', 1, $kbitfront2), 0));
	debugLog::log("<i>[hello.php:function]</i> Added kbit: " . dbAPI::print_json_s($kbit3 = Kbit::add_new_Kbit_in_edit_mode('Kbit 3', 'description 3', 1, $kbitfront3), 0));
	debugLog::log("<i>[hello.php:function]</i> Added kbit: " . dbAPI::print_json_s($kbit4 = Kbit::add_new_Kbit_in_edit_mode('Kbit 4', 'description 4', 1, $kbitfront4), 0));
	
	// if($kbit1 == null){
	// 	debugLog::important_log("<i>[hello.php:testing adding kbits]</i> error adding kbits");
	// 	return;
	// }

	debugLog::important_log("<i>[hello.php:testing]</i> publishing 4 recently added kbits");

	// debugLog::log("<i>[hello.php:testing publish kbit1]</i> result: ". dbAPI::print_json_s(Kbit::publish_changes($kbit1["UID"], 2), 0));
	debugLog::log("<i>[hello.php:testing publish kbit1]</i> result: ". dbAPI::print_json_s(Kbit::publish_changes($kbit1["UID"], 1), 0));
	debugLog::log("<i>[hello.php:testing publish kbit2]</i> result: ". dbAPI::print_json_s(Kbit::publish_changes($kbit2["UID"], 1), 0));
	debugLog::log("<i>[hello.php:testing publish kbit3]</i> result: ". dbAPI::print_json_s(Kbit::publish_changes($kbit3["UID"], 1), 0));
	debugLog::log("<i>[hello.php:testing publish kbit4]</i> result: ". dbAPI::print_json_s(Kbit::publish_changes($kbit4["UID"], 1), 0));



	debugLog::important_log("<i>[hello.php:testing]</i> editing 4 kbits");
	debugLog::log("<i>[hello.php:testing edit kbit1]</i> result: ". var_dump(Kbit::begin_editing_kbit($kbit1["UID"], 1)));
	debugLog::log("<i>[hello.php:testing edit kbit2]</i> result: ". var_dump(Kbit::begin_editing_kbit($kbit2["UID"], 1)));
	// debugLog::log("<i>[hello.php:testing edit kbit3]</i> result: ". var_dump(Kbit::begin_editing_kbit($kbit3["UID"], 2)));
	// debugLog::log("<i>[hello.php:testing edit kbit4]</i> result: ". var_dump(Kbit::begin_editing_kbit($kbit4["UID"], 1)));
	
// publish all
	debugLog::important_log("<i>[hello.php:PUBLISHING KBITS]</i> PUBLISHING KBITS");
	debugLog::important_log("");
	debugLog::log("<i>[hello.php:testing publish kbit1]</i> result: ". dbAPI::print_json_s(Kbit::publish_changes($kbit1["UID"], 1), 0));
	debugLog::log("<i>[hello.php:testing publish kbit3]</i> result: ". dbAPI::print_json_s(Kbit::publish_changes($kbit2["UID"], 2), 0));
	
	// re-edit
	debugLog::log("<i>[hello.php:testing edit kbit1]</i> result: ". var_dump(Kbit::begin_editing_kbit($kbit1["UID"], 1)));
	debugLog::log("<i>[hello.php:testing edit kbit1]</i> result: ". var_dump(Kbit::begin_editing_kbit($kbit2["UID"], 1)));

	// add relation between delivery and kbit
	// debugLog::log("<i>[hello.php:testing relation between delivery and kbit]</i> result: ". dbAPI::print_json_s(Delivery::add_Kbit_to_delivery($kbit1["UID"], $delivery1["UID"], 'NEEDED', 0, 1), 0));
	// debugLog::log("<i>[hello.php:testing relation between delivery and kbit]</i> result: ". dbAPI::print_json_s(Delivery::add_Kbit_to_delivery($kbit2["UID"], $delivery1["UID"], 'PROVIDED', 0, 1), 0));

	// edit kbit1
	debugLog::log("<i>[hello.php:testing updateing kbit1]</i> result: ". dbAPI::print_json_s(Kbit::add_new_edit_for_kbit($kbit1["UID"], 'new title for kbit 1', 'new description for kbit1', 1, $kbit1["FRONT_KBIT"], 'a'), 0));
	debugLog::log("<i>[hello.php:testing updateing kbit2]</i> result: ". dbAPI::print_json_s(Kbit::add_new_edit_for_kbit($kbit2["UID"], 'new title for kbit 2', 'new description for kbit2', 1, $kbit2["FRONT_KBIT"]), 0));
	// publish kbit1
	debugLog::log("<i>[hello.php:testing publish kbit1]</i> result: ". dbAPI::print_json_s(Kbit::publish_changes($kbit1["UID"], 1), 0));
	debugLog::log("<i>[hello.php:testing publish kbit1]</i> result: ". dbAPI::print_json_s(Kbit::publish_changes($kbit2["UID"], 1), 0));
?>

	 </body>
</html>


