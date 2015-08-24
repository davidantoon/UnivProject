<html>
 <head>
 <meta charset="utf-8">
  <title>PHP Test</title>
 </head>
 <body>

<?php 
	include 'app_config.php';
	$json = file_get_contents("test.json");
	//echo($json);

	// echo "<table>";
	// $jsonIterator = new RecursiveIteratorIterator(new RecursiveArrayIterator(json_decode($json, TRUE)), RecursiveIteratorIterator::SELF_FIRST);
	// foreach ($jsonIterator as $key => $val) {
	// 	echo "<tr>";
	//     if(is_array($val)) {
	//         echo "<td>" . "$key:\n" . "</td>";
	//     } else {
	//         echo "<td>" . "$key => $val\n" . "</td>";
	//     }
	//     echo "</tr>";
	// }
	// echo "</table>";





	 /*
	 * PHP SOAP - How to create a SOAP Server and a SOAP Client
	 */

	/*$options = array('location' => 'http://localhost:8888/webservice.php', 
	                  'uri' => 'http://localhost:8888/');
	//create an instante of the SOAPClient (the API will be available)
	$api = new SoapClient(NULL, $options);

	$result = $api->db_select("USERS");
	echo "<table>";
	$jsonIterator = new RecursiveIteratorIterator(new RecursiveArrayIterator($result), RecursiveIteratorIterator::SELF_FIRST);
	foreach ($jsonIterator as $key => $val) {
		echo "<tr>";
		if(is_array($val)) {
		    echo "<td>" . "$key:\n" . "</td>";
		} else {
		    echo "<td>" . "$key => $val\n" . "</td>";
		}
		echo "</tr>";
	}
	echo "</table>";
	echo "<br/>";
	echo "<br/>";
	echo "<br/>";
	echo json_encode($result);*/

	//echo 'geryes';

	
	// $tem = users::add_new_user('name', 'last_name', 'geryes1', 'asdads', 'aaa', 'ss', '1');
	// var_dump($tem);
	// $tem = users::add_new_user('name', 'last_name', 'geryes1', 'asdads', 'aaa', 'sss', '1');
	// var_dump($tem);
	debugLog::important_log("START");
// $temp = scope::add_new_scope('title 1', 'description asdasdasd', '2');
	$dbObj = new dbAPI();
	 // $temp = scope::get_scope_by_UID(1);
	 // echo $dbObj->print_json($temp);
	// print_r($dbObj->run_query($dbObj->db_get_usersDB(), "select * from users"));
	// echo $temp;
	// $temp = users::validate_username_password('antoon91', 'pass35');
	// echo "1:   "; echo $dbObj->print_json($temp);
	// // $temp = users::log_out('antoon91');
	// $temp = users::change_password('antoon91', 'pass35', 'pass5');
	// echo "2:   "; echo $dbObj->print_json($temp);
	// echo "<br>";
	// $temp = users::validate_token('ZqnM8meaBokhTupMaWa27ro9rmJdT35StsFBOTMpi6GbB6XM28Pazdj0z3es6jlzM0bAUY0c4HoFNmsQuh13uk33niwuCR4oSfZM');
	// echo $dbObj->print_json($temp);
	// $temp = users::validate_username_password('antoon91', 'pass3');
	// echo $dbObj->print_json($temp);
	// var_dump($tem);
	// echo $dbObj->get_latest_UID($dbObj->db_get_usersDB(), 'users');

	// $dbObj->db_update('11es');
	// echo $temp2 . '<br>';

 //    $dbObj->print_table($results);
 //    $dbObj->print_json($results);


	/*==============================================================
	================================================================
	====================== Testing terms ===========================
	================================================================
	==============================================================*/
	//add_new_term_with_scope_and_meaning($term_text, $lang, $user, $scope_UID = '', $meaning_text = '') 
	// -- $ter = term::add_new_term_with_scope_and_meaning("C++", "en", 2); 
	// -- $ter = term::add_new_term_with_scope_and_meaning("C#", "en", 2, "0");
	// -- $ter = term::add_new_term_with_scope_and_meaning("C#", "en", 2, "0", "C kteer sharp");

	//add_new_meaning_under_new_scope($termUID, $lang, $user, $scope_text = '', $scope_desc, $meaning_text = '')
	// $ter = term::add_new_meaning_under_new_scope('1', 'en', '2', 'OOP', 'Object Oriented Programming', 'جريس واكل الجو');

	// public static function add_new_scope_under_specific_meaning($termUID, $meaningUID, $user, $scope_text = '', $scope_desc)
	// $ter = term::add_new_scope_under_specific_meaning('2', '3', '2', 'Java', 'Java like language');

	// public static function edit_meaning($relationUID, $new_meaning, $lang)
	// $ter = term::edit_meaning('4', 'arabic shit shit' . date("d-m-y h:i:s") , 'en');

	// public static function add_sysnonym($scope_UID, $term_UID, $new_meaning, $lang, $user)
	// $ter = term::add_sysnonym('4', 2, 'arabic shit shit' . date("d-m-y h:i:s"), 'en', 2);
	// $ter = term::add_sysnonym('4', 3, 'arabic shit shit' . date("d-m-y h:i:s"), 'ar', 3); ==> should fail

	// public static function add_translation_to_term($term_UID, $text, $lang, $user)
	// $ter = term::add_translation_to_term(2, 'arabicccc', 'ar', 2);

	// public static function add_translation_to_term_meaning($meaning_UID, $text, $lang, $user)
	// $ter = term::add_translation_to_term_meaning(5, "meaning in arabic", 'ch', 1);
	// $dbObj->print_json($ter);


	// add_relation_to_scope($parent_scope_UID, $child_scope_UID, $is_hier);
	// debugLog::important_log(dbAPI::print_json_s(scope::add_relation_to_scope(1, 1, 0, 2), 0));

	// debugLog::important_log(dbAPI::print_json_s(scope::get_scope_by_UID_with_relations(4, 'ar'), 0));

	
	// debugLog::important_log(dbAPI::print_json_s(term::add_relation_to_terms(1, 2, 0, 2), 0));	
	// debugLog::important_log(dbAPI::print_json_s(term::get_relations_of_term(1, 'en'), 0));
	// debugLog::important_log(dbAPI::print_json_s(term::get_term_by_UID_with_relations(2), 0));
	//
	/*==============================================================
	================================================================*/

	$u = $dbObj->db_get_usersDB();
	$c = $dbObj->db_get_contentDB();
	$tempArr = array($u.'.KBIT_BASE', $u.'.KBIT_FRONT', $c.'.KBIT_BASE', $c.'.KBIT_FRONT',
		  $u.'.DELIVERY_BASE', $u.'.DELIVERY_FRONT', $c.'.DELIVERY_BASE', $c.'.DELIVERY_FRONT',
		  $u.'.R_LD2D', $u.'.R_LK2K', $c.'.R_LD2D', $c.'.R_LK2K',
		  $u.'.R_LD2T', $u.'.R_LK2T', $c.'.R_LD2T', $c.'.R_LK2T',
		  $u.'.R_LD2K', $c.'.R_LD2K',
		  $c.'.CONTENT_LOCK');
	dbAPI::delete_all($tempArr);



	$front = array('FRONT_TYPE'=>'KBIT_FRONT', 'PATH'=>'http://google.com');
	// debugLog::important_log(dbAPI::print_json_s(Kbit::add_new_Kbit_in_edit_mode("first kbit title (base)", "first Kbit description (base)", 2, $front), 0));
	// Kbit::begin_editing_kbit(1, 1);
	// Kbit::publish_changes(1,1);
	// Lock::acquire_lock(2, 'abc', 3);
	// Lock::release_lock(2, 'abc', 3);
	// Kbit::cancel_edited_kbit(1, 1);
	// 

	$arr = array("column_name"=>'DELIVERY_BASE_ID', "value"=>5);
	// $arr["column_name"] = 'DELIVERY_BASE_ID';
	// $arr["value"] = '20';

	// debugLog::important_log("<i>[hello.php:test]</i> " . dbAPI::print_json_s($arr ,0));
	

	debugLog::important_log("<i>[hello.php:testing]</i> add 4 new deliveries");
	
	$deliveryfront1 = array('FRONT_TYPE'=>'DELIVERY_FRONT', 'PATH'=>'http://youtube1.com');
	$deliveryfront2 = array('FRONT_TYPE'=>'DELIVERY_FRONT', 'PATH'=>'http://youtube2.com');
	$deliveryfront3 = array('FRONT_TYPE'=>'DELIVERY_FRONT', 'PATH'=>'http://youtube3.com');
	$deliveryfront4 = array('FRONT_TYPE'=>'DELIVERY_FRONT', 'PATH'=>'http://youtube4.com');

	
	debugLog::log("<i>[hello.php:function]</i> Added delivery: " . dbAPI::print_json_s($delivery1 = Delivery::add_new_Delivery_in_edit_mode('Delivery 1', 'description 1', 1, $deliveryfront1), 0));
	debugLog::log("<i>[hello.php:function]</i> Added delivery: " . dbAPI::print_json_s($delivery2 = Delivery::add_new_Delivery_in_edit_mode('Delivery 2', 'description 2', 1, $deliveryfront2), 0));
	debugLog::log("<i>[hello.php:function]</i> Added delivery: " . dbAPI::print_json_s($delivery3 = Delivery::add_new_Delivery_in_edit_mode('Delivery 3', 'description 3', 1, $deliveryfront3), 0));
	debugLog::log("<i>[hello.php:function]</i> Added delivery: " . dbAPI::print_json_s($delivery4 = Delivery::add_new_Delivery_in_edit_mode('Delivery 4', 'description 4', 1, $deliveryfront4), 0));
	
	if($delivery1 == null){
		debugLog::important_log("<i>[hello.php:testing adding deliveries]</i> error adding deliveries");
		return;
	}

	debugLog::important_log("<i>[hello.php:testing]</i> publishing 4 recently added deliveries");

	debugLog::log("<i>[hello.php:testing publish delivery1]</i> result: ". dbAPI::print_json_s(Delivery::publish_changes($delivery1["UID"], 2), 0));
	debugLog::log("<i>[hello.php:testing publish delivery1]</i> result: ". dbAPI::print_json_s(Delivery::publish_changes($delivery1["UID"], 1), 0));
	debugLog::log("<i>[hello.php:testing publish delivery2]</i> result: ". dbAPI::print_json_s(Delivery::publish_changes($delivery2["UID"], 1), 0));
	debugLog::log("<i>[hello.php:testing publish delivery3]</i> result: ". dbAPI::print_json_s(Delivery::publish_changes($delivery3["UID"], 1), 0));
	debugLog::log("<i>[hello.php:testing publish delivery4]</i> result: ". dbAPI::print_json_s(Delivery::publish_changes($delivery4["UID"], 1), 0));



	debugLog::important_log("<i>[hello.php:testing]</i> editing 4 deliveries");
	debugLog::log("<i>[hello.php:testing edit delivery1]</i> result: ". var_dump(Delivery::begin_editing_Delivery($delivery1["UID"], 1)));
	debugLog::log("<i>[hello.php:testing edit delivery2]</i> result: ". var_dump(Delivery::begin_editing_Delivery($delivery2["UID"], 2)));
	// debugLog::log("<i>[hello.php:testing edit delivery3]</i> result: ". var_dump(Delivery::begin_editing_Delivery($delivery3["UID"], 1)));
	// debugLog::log("<i>[hello.php:testing edit delivery4]</i> result: ". var_dump(Delivery::begin_editing_Delivery($delivery4["UID"], 1)));
	

	debugLog::important_log("<i>[hello.php:testing]</i> testing delivery relations D2D");


	debugLog::log("<i>[hello.php:testing relation D2D delivery1=>2 user 1]</i> result: ". dbAPI::print_json_s(Delivery::add_D2D_relation($delivery1["UID"], $delivery2["UID"], true, 1), 0)); // fails
	debugLog::log("<i>[hello.php:testing relation D2D delivery1=>2 user 2]</i> result: ". dbAPI::print_json_s(Delivery::add_D2D_relation($delivery1["UID"], $delivery2["UID"], true, 2), 0)); // fails
	debugLog::log("<i>[hello.php:testing relation D2D delivery1=>2]</i> result: ". dbAPI::print_json_s(Delivery::add_D2D_relation($delivery3["UID"], $delivery4["UID"], true, 1), 0)); // fails
	debugLog::log("<i>[hello.php:testing relation D2D delivery1=>2]</i> result: ". dbAPI::print_json_s(Delivery::add_D2D_relation($delivery1["UID"], $delivery3["UID"], true, 1), 0)); // succeed







	debugLog::important_log("<i>[hello.php:testing]</i> add 4 new kbits");
	
	$kbitfront1 = array('FRONT_TYPE'=>'KBIT_FRONT', 'PATH'=>'http://google1.com');
	$kbitfront2 = array('FRONT_TYPE'=>'KBIT_FRONT', 'PATH'=>'http://google2.com');
	$kbitfront3 = array('FRONT_TYPE'=>'KBIT_FRONT', 'PATH'=>'http://google3.com');
	$kbitfront4 = array('FRONT_TYPE'=>'KBIT_FRONT', 'PATH'=>'http://google4.com');

	
	debugLog::log("<i>[hello.php:function]</i> Added kbit: " . dbAPI::print_json_s($kbit1 = Kbit::add_new_Kbit_in_edit_mode('Kbit 1', 'description 1', 1, $kbitfront1), 0));
	debugLog::log("<i>[hello.php:function]</i> Added kbit: " . dbAPI::print_json_s($kbit2 = Kbit::add_new_Kbit_in_edit_mode('Kbit 2', 'description 2', 1, $kbitfront2), 0));
	debugLog::log("<i>[hello.php:function]</i> Added kbit: " . dbAPI::print_json_s($kbit3 = Kbit::add_new_Kbit_in_edit_mode('Kbit 3', 'description 3', 1, $kbitfront3), 0));
	debugLog::log("<i>[hello.php:function]</i> Added kbit: " . dbAPI::print_json_s($kbit4 = Kbit::add_new_Kbit_in_edit_mode('Kbit 4', 'description 4', 1, $kbitfront4), 0));
	
	if($kbit1 == null){
		debugLog::important_log("<i>[hello.php:testing adding kbits]</i> error adding kbits");
		return;
	}

	debugLog::important_log("<i>[hello.php:testing]</i> publishing 4 recently added kbits");

	debugLog::log("<i>[hello.php:testing publish kbit1]</i> result: ". dbAPI::print_json_s(Kbit::publish_changes($kbit1["UID"], 2), 0));
	debugLog::log("<i>[hello.php:testing publish kbit1]</i> result: ". dbAPI::print_json_s(Kbit::publish_changes($kbit1["UID"], 1), 0));
	debugLog::log("<i>[hello.php:testing publish kbit2]</i> result: ". dbAPI::print_json_s(Kbit::publish_changes($kbit2["UID"], 1), 0));
	debugLog::log("<i>[hello.php:testing publish kbit3]</i> result: ". dbAPI::print_json_s(Kbit::publish_changes($kbit3["UID"], 1), 0));
	debugLog::log("<i>[hello.php:testing publish kbit4]</i> result: ". dbAPI::print_json_s(Kbit::publish_changes($kbit4["UID"], 1), 0));



	debugLog::important_log("<i>[hello.php:testing]</i> editing 4 kbits");
	debugLog::log("<i>[hello.php:testing edit kbit1]</i> result: ". var_dump(Kbit::begin_editing_kbit($kbit1["UID"], 1)));
	// debugLog::log("<i>[hello.php:testing edit kbit2]</i> result: ". var_dump(Kbit::begin_editing_kbit($kbit2["UID"], 1)));
	debugLog::log("<i>[hello.php:testing edit kbit3]</i> result: ". var_dump(Kbit::begin_editing_kbit($kbit3["UID"], 2)));
	// debugLog::log("<i>[hello.php:testing edit kbit4]</i> result: ". var_dump(Kbit::begin_editing_kbit($kbit4["UID"], 1)));
	


	debugLog::important_log("<i>[hello.php:testing]</i> testing kbits relations K2K");

	debugLog::log("<i>[hello.php:testing relation K2K KBIT1=>2 user 1]</i> result: ". dbAPI::print_json_s(Kbit::add_K2K_relation($kbit1["UID"], $kbit2["UID"], true, 1), 0)); // succeeds
	debugLog::log("<i>[hello.php:testing relation K2K KBIT1=>2 user 2]</i> result: ". dbAPI::print_json_s(Kbit::add_K2K_relation($kbit1["UID"], $kbit2["UID"], true, 2), 0)); // fails
	debugLog::log("<i>[hello.php:testing relation K2K KBIT1=>2]</i> result: ". dbAPI::print_json_s(Kbit::add_K2K_relation($kbit3["UID"], $kbit4["UID"], true, 1), 0)); // fails
	debugLog::log("<i>[hello.php:testing relation K2K KBIT1=>2]</i> result: ". dbAPI::print_json_s(Kbit::add_K2K_relation($kbit1["UID"], $kbit3["UID"], true, 1), 0)); // fails





	// terms
	// 
	debugLog::important_log("<i>[hello.php:testing]</i> testing kbits relations with terms K2T");
																									 
	debugLog::log("<i>[hello.php:testing relation K2T KBIT]</i> result: ". dbAPI::print_json_s(Kbit::add_K2T_relation($kbit1["UID"], 1, 'link type', 1), 0)); // succeeds
	debugLog::log("<i>[hello.php:testing relation K2T KBIT]</i> result: ". dbAPI::print_json_s(Kbit::add_K2T_relation($kbit1["UID"], 2, 'link type33333', 1), 0)); // succeeds
	debugLog::log("<i>[hello.php:testing relation K2T KBIT]</i> result: ". dbAPI::print_json_s(Kbit::add_K2T_relation($kbit1["UID"], 3, 'true', 2), 0)); // fails

	debugLog::log("<i>[hello.php:testing get K2T KBIT]</i> result: ". dbAPI::print_json_s(Kbit::get_terms_of_Kbit($kbit1["UID"], 1), 0));
	debugLog::log("<i>[hello.php:testing get K2T KBIT with lang]</i> result: ". dbAPI::print_json_s(Kbit::get_terms_of_Kbit($kbit1["UID"], 1, 'en'), 0));


	debugLog::log("<i>[hello.php:testing get K2T KBIT  remove]</i> result: ". dbAPI::print_json_s(Kbit::remove_term_from_Kbit($kbit1["UID"], 1, 'link type1', 1), 0)); // fails
	debugLog::log("<i>[hello.php:testing get K2T KBIT  remove]</i> result: ". dbAPI::print_json_s(Kbit::remove_term_from_Kbit($kbit1["UID"], 1, 'link type', 2), 0)); // fails
	debugLog::log("<i>[hello.php:testing get K2T KBIT  remove]</i> result: ". dbAPI::print_json_s(Kbit::remove_term_from_Kbit($kbit1["UID"], 1, 'link type', 1), 0)); // succeeds

	debugLog::log("<i>[hello.php:testing get K2T KBIT after remove]</i> result: ". dbAPI::print_json_s(Kbit::get_terms_of_Kbit($kbit1["UID"], 1), 0));




	debugLog::important_log("<i>[hello.php:testing]</i> testing deliveries relations with terms D2T");
																									 
	debugLog::log("<i>[hello.php:testing relation D2T DELIVERY]</i> result: ". dbAPI::print_json_s(Delivery::add_D2T_relation($delivery1["UID"], 1, 'link type', 1), 0)); // succeeds
	debugLog::log("<i>[hello.php:testing relation D2T DELIVERY]</i> result: ". dbAPI::print_json_s(Delivery::add_D2T_relation($delivery1["UID"], 2, 'true', 1), 0)); // fails

	debugLog::log("<i>[hello.php:testing get D2T DELIVERY]</i> result: ". dbAPI::print_json_s(Delivery::get_terms_of_Delivery($delivery1["UID"], 1), 0));
	debugLog::log("<i>[hello.php:testing get D2T DELIVERY with lang]</i> result: ". dbAPI::print_json_s(Delivery::get_terms_of_Delivery($delivery1["UID"], 1, 'en'), 0));

	debugLog::log("<i>[hello.php:testing get D2T DELIVERY  remove]</i> result: ". dbAPI::print_json_s(Delivery::remove_term_from_Delivery($delivery1["UID"], 1, 'link tddype1', 1), 0)); // fails
	debugLog::log("<i>[hello.php:testing get D2T DELIVERY  remove]</i> result: ". dbAPI::print_json_s(Delivery::remove_term_from_Delivery($delivery1["UID"], 1, 'link ddtype', 2), 0)); // fails
	debugLog::log("<i>[hello.php:testing get D2T DELIVERY  remove]</i> result: ". dbAPI::print_json_s(Delivery::remove_term_from_Delivery($delivery1["UID"], 1, 'link type', 1), 0)); // succeeds

	debugLog::log("<i>[hello.php:testing get D2T DELIVERY after remove]</i> result: ". dbAPI::print_json_s(Delivery::get_terms_of_Delivery($delivery1["UID"], 1), 0));




	// publish all
	debugLog::important_log("<i>[hello.php:PUBLISHING KBITS]</i> PUBLISHING KBITS");
	debugLog::important_log("");
	debugLog::log("<i>[hello.php:testing publish kbit1]</i> result: ". dbAPI::print_json_s(Kbit::publish_changes($kbit1["UID"], 1), 0));
	debugLog::log("<i>[hello.php:testing publish kbit3]</i> result: ". dbAPI::print_json_s(Kbit::publish_changes($kbit3["UID"], 2), 0));
	debugLog::important_log("<i>[hello.php:PUBLISHING DELIVERIES]</i> PUBLISHING DELIVERIES");
	debugLog::important_log("");
	debugLog::log("<i>[hello.php:testing publish delivery1]</i> result: ". dbAPI::print_json_s(Delivery::publish_changes($delivery1["UID"], 1), 0));
	debugLog::log("<i>[hello.php:testing publish delivery2]</i> result: ". dbAPI::print_json_s(Delivery::publish_changes($delivery2["UID"], 2), 0));

	// all published
	// pull again required to edit
	debugLog::important_log("<i>[hello.php:testing]</i> testing deliveries relations with kbits D2K");

	// re-edit
	debugLog::log("<i>[hello.php:testing edit kbit1]</i> result: ". var_dump(Kbit::begin_editing_kbit($kbit1["UID"], 1)));
	debugLog::log("<i>[hello.php:testing edit kbit1]</i> result: ". var_dump(Kbit::begin_editing_kbit($kbit2["UID"], 1)));
	debugLog::log("<i>[hello.php:testing edit delivery1]</i> result: ". var_dump(Delivery::begin_editing_Delivery($delivery1["UID"], 1)));

	// add relation between delivery and kbit
	debugLog::log("<i>[hello.php:testing relation between delivery and kbit]</i> result: ". dbAPI::print_json_s(Delivery::add_Kbit_to_delivery($kbit1["UID"], $delivery1["UID"], 'NEEDED', 0, 1), 0));
	debugLog::log("<i>[hello.php:testing relation between delivery and kbit]</i> result: ". dbAPI::print_json_s(Delivery::add_Kbit_to_delivery($kbit2["UID"], $delivery1["UID"], 'PROVIDED', 0, 1), 0));

	// edit kbit1
	debugLog::log("<i>[hello.php:testing updateing kbit1]</i> result: ". dbAPI::print_json_s(Kbit::add_new_edit_for_kbit($kbit1["UID"], 'new title for kbit 1', 'new description for kbit1', 1, $kbit1["FRONT_KBIT"]), 0));
	debugLog::log("<i>[hello.php:testing updateing kbit2]</i> result: ". dbAPI::print_json_s(Kbit::add_new_edit_for_kbit($kbit2["UID"], 'new title for kbit 2', 'new description for kbit2', 1, $kbit2["FRONT_KBIT"]), 0));
	// publish kbit1
	// debugLog::log("<i>[hello.php:testing publish kbit1]</i> result: ". dbAPI::print_json_s(Kbit::publish_changes($kbit1["UID"], 1), 0));
	// debugLog::log("<i>[hello.php:testing publish kbit1]</i> result: ". dbAPI::print_json_s(Kbit::publish_changes($kbit2["UID"], 1), 0));
	
	// get kbits of delivery
	debugLog::log("<i>[hello.php:testing get kbits of delivery]</i> result: ". dbAPI::print_json_s(Delivery::get_Kbit_of_delivery($delivery1["UID"], 1), 0));

	debugLog::important_log("DONE");

	debugLog::important_log("<BR><b> - FIX REVISION <br>  - ONLY THE LAST TO BE PUBLISHED UPDATES THE RELATION RECORD</b>");
	
?>

 </body>
</html>













