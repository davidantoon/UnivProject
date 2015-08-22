<html>
 <head>
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

	debugLog::important_log("<i>[hello.php:test]</i> " . dbAPI::print_json_s($arr ,0));
	

	debugLog::important_log("<i>[hello.php:test]</i> implement relations for kbit");
	debugLog::important_log("<i>[hello.php:test]</i> implement delivery");
	debugLog::important_log("<i>[hello.php:test]</i> design and implement getters");
	
	
	
	debugLog::important_log("DONE");
?>

 </body>
</html>













