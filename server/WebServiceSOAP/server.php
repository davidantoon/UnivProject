<?php
 //call library  
 require_once ('lib/nusoap.php');  

return new soap_fault('Client','','Put Your Name!');  
 //using soap_server to create server object  
 $server = new soap_server; 

 //register a function that works on server  
 $server->register('get_message'); 

 // create the function  
 function get_message($your_name)  
 {  
   if(!$your_name){  
     return new soap_fault('Client','','Put Your Name!');  
   }  
   $result = "Welcome to ".$your_name .". Thanks for Your First Web Service Using PHP with SOAP";  
   return $result;  
 }  
 // create HTTP listener  
 $server->service($HTTP_RAW_POST_DATA);  
 exit();  
?> 

