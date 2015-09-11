
<?php 

/*
 * PHP REST API
 */


function __autoload($class) {
	require_once('app_config.php');
}

class serverAPI {
	public static function validateServerIdentity($hash) {
    	if($hash == 'DAVIDGALIT') {
    		try {
    			$temp = users::validate_username_password('Learner', 'davidGalitLearner');
    			if($temp == null) {
	    			debugLog::log("<i>[webrequest:validateServerIdentity]</i> ERROR: 'Could not validate the identity of requesting server'");
                }
	    		return $temp;
		    }
		    catch (Exception $e) {
		    	debugLog::log("<i>[webrequest:validateServerIdentity]</i> Unexpected error: '". $e->getMessage() ."'");
		    	return null;
			}
    	}
    }

    public static function setError($message) {
    	return array("Error"=>$message);
    }
}






/************************************************************************************************************************
*                                                                                                                       *
*  00000000000  000      00  00000000000  00000000000  000000000    00000000000      000         00000     00000000000  *
*      000      0000     00      000      000          000      00  000            000 000     000   000   000          *
*      000      00 00    00      000      000          000      00  000           000   000   000          000          *
*      000      00  000  00      000      00000000000  000000000    00000000000  000     000  00           00000000000  *
*      000      00    00 00      000      000          000 000      000          00000000000  000          000          *
*      000      00     0000      000      000          000   000    000          000     000   000   000   000          *
*  00000000000  00      000      000      00000000000  000     000  000          000     000     00000     00000000000  *
*                                                                                                                       *
************************************************************************************************************************/

class interfaceAPI {

	public static function search($hash, $query, $withContent = true) {

		debugLog::trace(__FILE__, __FUNCTION__, func_get_args());

		$user = serverAPI::validateServerIdentity($hash);
		if($user == null) {
			return array('ErrorCode' => 3, "Message" =>"Access denied, could not validate the identity of requesting server");
		}
        try {
		$temp = json_decode($query, true);
        }
        catch(Exception $e) {

        }
		if($temp == null)
			$temp = $query;
	

		// import search text
		$searchText = $temp["searchtext"];
		

		// import search fields
		$searchFields = array();
		if($temp["field"]["title"] == 'true')
			array_push($searchFields, 'TITLE');
		if($temp["field"]["info"] == 'true')
			array_push($searchFields, 'DESCRIPTION');

		$results = array();
        $results["DELIVERIES"] = array();

		// request data from classes
		if($temp["elements"]["delivery"] == 'true') {
			
			$where_sttmnt = implode(" LIKE '%". $searchText . "%' AND ", $searchFields) . " LIKE '%". $searchText . "%' ";
			$where_sttmnt = " (" . $where_sttmnt . ") ";			
			$results["DELIVERIES"] = $results["DELIVERIES"] + Delivery::serach_deliveries_BASE_FRONT_by_query($where_sttmnt, $user["UID"]);
        }
		if($temp["elements"]["term"] == 'true') {
			// search by terms
			$results["DELIVERIES"] = $results["DELIVERIES"] + Delivery::serach_deliveries_by_terms($searchText, $user["UID"]);
		}
		if($temp["elements"]["scope"] == 'true') {

			// $results["SCOPES"] = scope::serach_scopes2($searchText);
            $results["DELIVERIES"] = $results["DELIVERIES"] + Delivery::serach_deliveries_by_scopes($searchText, $user["UID"]);
		}

        // disable content when requested by the client
        if($withContent == false) {
            $tempArr = array();
            for($i=0; $i<count($results["DELIVERIES"]); $i++) {
                array_push($tempArr, array("UID" => $results["DELIVERIES"][$i]["UID"], "TITLE" => $results["DELIVERIES"][$i]["TITLE"], "DESCRIPTION" => $results["DELIVERIES"][$i]["DESCRIPTION"]));
            }
            return array("DELIVERIES" => $tempArr);
        }

		return $results;
	}

    public static function getDeliveryByUID($hash, $deliveryUID) {

        $user = serverAPI::validateServerIdentity($hash);
        if($user == null) {
            return array('ErrorCode' => 3, "Message" =>"Access denied, could not validate the identity of requesting server");
        }
        return Delivery::get_Delivery_details($deliveryUID, $user["UID"]);
    }


    public static function getTreeOfDelivery($hash, $deliveryUID) {

        $user = serverAPI::validateServerIdentity($hash);
        if($user == null) {
            return array('ErrorCode' => 3, "Message" =>"Access denied, could not validate the identity of requesting server");
        }
        return Delivery::get_tree_of_kbit($deliveryUID);
    }


	
	

	public static function getLanguages() {
        return term::get_languages();
    }
}


// "searchtext": "Test3",
//     "elements": {
//         "delivery": "false",
//         "d2k": "true",  -- canceled
//         "term": "true",
//         "scope": "true"
//     },
//     "field": {
//         "title": "true",
//         "info": "false"
//     }
 



 
function deliver_response($format, $api_response)
{
    ob_start();
    $http_response_code = array(
        200 => 'OK',
        400 => 'Bad Request',
        401 => 'Unauthorized',
        403 => 'Forbidden',
        404 => 'Not Found',
        405 => 'Wrong Information'
    );
    header('HTTP/1.1 ' . $api_response['status'] . ' ' . $http_response_code[$api_response['status']]);
    if (strcasecmp($format, 'json') == 0) {
        header('Content-Type: application/json; charset=utf-8');
        $json_response = json_encode($api_response);
        ob_end_clean();
        echo $json_response;
    } elseif (strcasecmp($format, 'xml') == 0) {
        header('Content-Type: application/xml; charset=utf-8');
        $xml_response = '<?xml version="1.0" encoding="UTF-8"?>' . "\n" . '<response>' . "\n" . "\t" . '<code>' . $api_response['code'] . '</code>' . "\n" . "\t" . '<data>' . $api_response['data'] . '</data>' . "\n" . '</response>';
        ob_end_clean();
        echo $xml_response;
    } else {
        header('Content-Type: text/html; charset=utf-8');
        ob_end_clean();
        echo $api_response['data'];
    }
    exit;
}


$api_response_code = array( 
	0 => array('HTTP Response' => 400, 'Message' => 'Unknown Error'),
	1 => array('HTTP Response' => 200, 'Message' => 'Success'), 
	2 => array('HTTP Response' => 403, 'Message' => 'HTTPS Required'), 
	3 => array('HTTP Response' => 401, 'Message' => 'Authentication Required'), 
	4 => array('HTTP Response' => 401, 'Message' => 'Authentication Failed'), 
	5 => array('HTTP Response' => 405, 'Message' => 'Wrong Information'), 
	6 => array('HTTP Response' => 400, 'Message' => 'Invalid Response Format'),
	7 => array('HTTP Response' => 405, 'Message' => 'Required parameter(s)'),
	8 => array('HTTP Response' => 405, 'Message' => 'Method does not exist')
);










ob_start();
        $response['code']        = 0;
        $response['status']      = 500;
        $response['data']        = array('ErrorCode' => 0, "Message" =>"Unexpected error: ");

try {
    $rArray = array_change_key_case($_REQUEST, CASE_LOWER);
    $method = $rArray["method"];

    debugLog::api_log(print_r($_REQUEST, true));
    
    if (method_exists('interfaceAPI', $method)) {

    	 $ref = new ReflectionMethod('interfaceAPI', $method);
    	 $params = $ref->getParameters();
    	 $pCount = count($params);
    	 $pArray = array();
    	 $paramStr = "";
    	 
    	 $i = 0;
    	 
    	foreach ($params as $param) {

    		$pArray[strtolower($param->getName())] = null;
    		$paramStr .= $param->getName();
    		if ($i != $pCount-1)  {
    			$paramStr .= ", ";
    		}
    		$i++;
    	}

    	foreach ($pArray as $key => $val) {

    		$pArray[strtolower($key)] = $rArray[strtolower($key)];
    	}
        
    	if (count($pArray) == $pCount && !in_array(null, $pArray)) {

    		$response['data'] = call_user_func_array(array('interfaceAPI', $method), $pArray);    		
    	}
    	else {

    		$response['code']        = 7;
    		$response['status']      = 405;
    		$response['data']        = array('ErrorCode' => 7, "Message" => "Required parameter(s) for ". $method .": ". $paramStr);
    	}
    }
    else {
    		$response['code']        = 8;
    		$response['status']      = 405;
    		$response['data']        = array('ErrorCode' => 0, "Message" => "The method " . $method . " does not exist.");
    }



    if(is_null($response['data']['ErrorCode'])){
        $response['code']   = 1;
        $response['status'] = $api_response_code[$response['code']]['HTTP Response'];
    }else{
    	$response['code']   = $response['data']['ErrorCode'];
        $response['status'] = $api_response_code[$response['code']]['HTTP Response'];
    }
    // debugLog::important_log("<i>[webservice-content.php:]</i> ". dbAPI::print_json_s($response, 0));
}
catch (Exception $e) {

        $response['code']        = 0;
        $response['status']      = 400;
        $response['data']        = array('ErrorCode' => 0, "Message" =>"Unexpected error: ");//. $randomErrorCode);
}



ob_end_clean();
deliver_response(/*$_GET['format']*/'json', $response);


?>
