<?php
	
	// echo MyAPI2::hello2();
	echo 'Current PHP version: ' . phpversion();
	

	$options = array('location' => 'http://localhost:8888/mopdqwompoaskdqomdiasjdiowqe/server/webservice.php', 
	                  'uri' => 'http://localhost:8888/mopdqwompoaskdqomdiasjdiowqe/');

	// $options = array('location' => 'http://testserver-radjybaba.rhcloud.com/webservice.php', 
	//                   'uri' => 'http://testserver-radjybaba.rhcloud.com');

	//create an instante of the SOAPClient (the API will be available)
	$usersAPI = new SoapClient(NULL, $options);

	$result = $usersAPI->hello('DAVID&AMEER');
	// echo $result;
	echo json_encode($result);
?> 

