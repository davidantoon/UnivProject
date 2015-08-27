<?php  

require_once ('app_config.php');
require_once ('lib/nusoap.php');  
echo "1";
//Give it value at parameter  
$param = array( 'your_name' => 'Monotosh Roy');     
echo "2";
//Create object that referer a web services  
try{
	$client = new soapclient('http://localhost:8888/mopdqwompoaskdqomdiasjdiowqe/server/server.php');      
}
catch(Exception $e) {
  debugLog::important_log("<i>[client.php:function]</i> ERROR:  ". $e->getMessage());
}
echo "3";
//Call a function at server and send parameters too  
$response = $client->call('get_message',$param);      
echo "4";
 //Process result  
if($client->fault)  
 {  
   echo "FAULT: <p>Code: (".$client->faultcode."</p>";  

   echo "String: ".$client->faultstring;  
 }  
 else 
 {  
   echo $response;  
 }  
 echo "5";
?> 

