<?php
	
	// echo MyAPI2::hello2();
	echo 'Current PHP version: ' . phpversion();
	

	$options = array('location' => 'http://localhost:8888/mopdqwompoaskdqomdiasjdiowqe/server/webservice.php', 
	                  'uri' => 'http://localhost:8888/mopdqwompoaskdqomdiasjdiowqe/');
	//create an instante of the SOAPClient (the API will be available)
	$usersAPI = new SoapClient(NULL, $options);

	$result = $usersAPI->hello('DAVID&AMEER');
	// echo $result;
	echo json_encode($result);
?> 

