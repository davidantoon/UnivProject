<?php

	
	// echo MyAPI2::hello2();
	// echo 'Current PHP version: ' . phpversion();
	

	// $options = array('location' => 'http://localhost:8888/mopdqwompoaskdqomdiasjdiowqe/server/webservice.php', 
	//                   'uri' => 'http://localhost:8888/mopdqwompoaskdqomdiasjdiowqe/');

	// // $options = array('location' => 'http://testserver-radjybaba.rhcloud.com/webservice.php', 
	// //                   'uri' => 'http://testserver-radjybaba.rhcloud.com');

	// //create an instante of the SOAPClient (the API will be available)
	// $usersAPI = new SoapClient(NULL, $options);

	// $result = $usersAPI->hello('DAVID&AMEER');
	// $result = $usersAPI->DELIVERYsearchDelivery('DAVID&AMEER', 'kJwYvwzsyPLAF6wb09zggLvRnobKGOz1y503BzvaphK5nhgoqQEHCay0yKKfzjg7phb1QHcgYXlleBJFsnm4yV46FPmf8DmyUxzL', '', array('UID'));
	// // echo $result;
	// echo json_encode($result);
	// 
	

	// $url = 'http://localhost:8888/mopdqwompoaskdqomdiasjdiowqe/server/webservice.php'; // url + file.php
	// $data = array('serverHash' => 'DAVID&AMEER', 'username' => 'antoon91', 'password' => 'pass5');

	// // use key 'http' even if you send the request to https://...
	// $options = array(
	//     'http' => array(
	//         'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
	//         'method'  => 'POST',
	//         'content' => http_build_query($data),
	//     ),
	// );
	// $context  = stream_context_create($options);
	// $result = file_get_contents($url, false, $context);
	// var_dump($result);





	include 'app_config.php';
	
	var_dump(debugLog::get_all_log_files());



	// $url= 'http://localhost:8888/mopdqwompoaskdqomdiasjdiowqe/server/webservice.php'; // url + file.php
	// $data = array('serverHash' => 'DAVIDAMEER', 'username' => 'antoon91', 'password' => '1234' , 'method'  => "USERlogIn" );

	// // use key 'http' even if you send the request to https://...
	// $options = array(
	//     'http' => array(
	//         'method'  => "POST",
	//         'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
	//         'content' => http_build_query($data),
	//     ),
	// );
	// $context  = stream_context_create($options);
	// $result = file_get_contents($url, false, $context);
	// var_dump($result);
?> 

