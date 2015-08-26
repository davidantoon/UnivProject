<?php 


include '/mopdqwompoaskdqomdiasjdiowqe/server/server.php';

/*
 * PHP SOAP - How to create a SOAP Server and a SOAP Client
 */
// require '../server.php';
//a basic API class

function __autoload($class) {
	include('app_config.php');
}

class MyAPI {



    function hello2() {
        return $_SERVER['PHP_SELF'];
        // return Kbit::tempFunction('aa');
    }

    function hello() {
    	return Delivery::get_Delivery_by_UID(1039);
    }

    function geryes($x, $y)
    {
    	
    	$json = file_get_contents("test.json");
    	$age = array("Peter"=>"35", "Ben"=>"37", "Joe"=>"43");
    	return $age;
    }

    function db_select($tableName)
    {
    	return 'sadasdasd';
    	$user = 'root';
		$password = 'root';
		$db = 'CMS_USERSdb';
		$host = 'localhost';
		
		// Create connection
		$conn = new mysqli($host, $user, $password, $db);

		// Check connection
		if ($conn->connect_error) {
		    die("Connection failed: " . $conn->connect_error);
		} 

		$sql = "SELECT * FROM " . $tableName;
		$result = $conn->query($sql);

		$results = array();

		while($row = $result->fetch_assoc()) {
		         $results[] = $row;
	    }

		$conn->close();
	    return $results;
    }

}

//when in non-wsdl mode the uri option must be specified
// $options=array('uri'=>Configurator::get_webservice_URI());
$options=array('uri'=>'http://localhost:8888/mopdqwompoaskdqomdiasjdiowqe/server/');
//create a new SOAP server
$server = new SoapServer(NULL, $options);
//attach the API class to the SOAP Server
$server->setClass('MyAPI');
//start the SOAP requests handler
$server->handle();

// var_dump($options);	
// 
// require 'app_config.php';
?>
