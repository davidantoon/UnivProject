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
echo "aa";
// $temp = scope::add_new_scope('title 1', 'description asdasdasd', '2');
echo "string";
	$dbObj = new dbAPI();
	 $temp = scope::get_scope_by_UID(1);
	 echo $dbObj->print_json($temp);
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
	$dbObj = new dbAPI();
	// echo $dbObj->get_latest_UID($dbObj->db_get_usersDB(), 'users');

	// $dbObj->db_update('11es');
	// echo $temp2 . '<br>';

 //    $dbObj->print_table($results);
 //    $dbObj->print_json($results);
	echo 'aa2';

	
?>

 </body>
</html>













