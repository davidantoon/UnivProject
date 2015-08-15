<?php  

require_once ('lib/nusoap.php');  
echo "1";
//Give it value at parameter  
$param = array( 'your_name' => 'Monotosh Roy');     
echo "2";
//Create object that referer a web services  
$client = new soapclient('http://localhost:8888/WebServiceSOAP/server.php');      
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

