<?php
/*
 * PHP SOAP - How to create a SOAP Server and a SOAP Client
 */

//a basic API class
class MyAPI {
    function hello() {
        return "getyesssss";
    }
    function geryes($x, $y)
    {
    	
    	$json = file_get_contents("test.json");
    	$age = array("Peter"=>"35", "Ben"=>"37", "Joe"=>"43");
    	return $age;
    }

    function db_select($tableName)
    {
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
$options=array('uri'=>'http://localhost:8888/');
//create a new SOAP server
$server = new SoapServer(NULL,$options);
//attach the API class to the SOAP Server
$server->setClass('MyAPI');
//start the SOAP requests handler
$server->handle();
?>
