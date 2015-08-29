<?php 

/*
 * PHP REST API
 */
// require '../server.php';
//a basic API class

// error codes:
// 0 => 'Unknown Error'),
// 1 => 'Success'), 
// 2 => 'HTTPS Required'), 
// 3 => 'Authentication Required'), 
// 4 => 'Authentication Failed'), 
// 5 => 'Invalid Request'), 
// 6 => 'Invalid Response Format') 


function __autoload($class) {
	require_once('app_config.php');
}

class serverAPI {
	public static function validateServerIdentity($hash) {
    	return $hash == 'DAVIDAMEER';
    }

    public static function setError($message) {
    	return array("Error"=>$message);
    }
}

// search queries
// test API
// publish to server


// ====================================================================
// ====================================================================
// 								users
// ====================================================================
// ====================================================================
class usersAPI {

    static function hello($hash) {
    	// return $hash;
    	// return Delivery::get_Delivery_by_UID(1039);
    	return json_encode(serverAPI::validateServerIdentity($hash));
    }

    static function signUp($serverHash, $firstName, $lastName, $username, $password, $email, $profilePicture, $role = '') {
    	
    	if(serverAPI::validateServerIdentity($serverHash) == false){
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	}
    	if($username == ''){
    		return array('ErrorCode' => 5, 'Message' => "Wrong Information");
    	}
    	try {
	    	return users::add_new_user($firstName, $lastName, $username, $password, $email, $profilePicture, $role);
	    }
	    catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
    }

    static function logIn($serverHash, $username, $password) {


    	if(serverAPI::validateServerIdentity($serverHash) == false){
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	}
    	try {
    		$UserData = users::validate_username_password($username, $password);
    		if($UserData == null){
    			return array('ErrorCode' => 5, 'Message' => "Wrong Information");
    		}else{
    			return $UserData;
    		}
	    }
	    catch (Exception $e) {
	    	return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
    }

    static function changePassword($serverHash, $Token, $password, $new_password) {

    	if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");
    	try {
    		return users::change_password($user["USERNAME"], $password, $new_password);
    	}
	    catch (Exception $e) {
			return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
    }

    static function updateUser($serverHash, $Token, $firstName, $lastName, $email, $profilePicture, $role = '') {

    	if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
	    	return array('ErrorCode' => 3, 'Message' => "Expired Token");
    	try {
    		return users::update_user($user["UID"], $firstName, $lastName, $email, $profilePicture, $role);
    	}
	    catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
    }

    static function validateToken($token) {
    	
    	return users::validate_token($token);
    }
}



// ====================================================================
// ====================================================================
// 								terms
// ====================================================================
// ====================================================================
class termsAPI {

	static function searchTerms($serverHash, $Token, $searchWord, $searchFields, $lang = '') {
		
		$searchFields = json_decode($searchFields);

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
	    	return array('ErrorCode' => 3, 'Message' => "Expired Token");
    	try {
    		return json_encode(scope::serach_scopes($searchWord, $searchFields, $lang));
    	}
	    catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
	}

	static function addTermToTermRelation($serverHash, $Token, $firstUID, $secondUID, $isHier) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");

    	try {
    		return json_encode(term::add_relation_to_scope($firstUID, $secondUID, $isHier, $user["UID"]));
    	}
	    catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
	}

	static function removeTermToTermRelation($serverHash, $Token, $firstUID, $secondUID) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");

    	try {
    		return json_encode(term::remove_relation($firstUID, $secondUID));
    	}
	    catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
	}

	static function getRelatedTerms($serverHash, $Token, $termUID, $lang = '') {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");

    	try {
    		return json_encode(term::get_relations_of_term($termUID, $lang = ''));
    	}
	    catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
	}

	static function getAllTermsStrings($serverHash, $Token, $lang = '') {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");

    	try {
    		return json_encode(term::get_all_term_strings($lang));
    	}
	    catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
	}
}




// ====================================================================
// ====================================================================
// 								scopes
// ====================================================================
// ====================================================================
class scopesAPI {

	static function searchScopes($serverHash, $Token, $searchWord, $searchFields, $lang = '') {

		$searchFields = json_decode($searchFields);

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");

    	try {
    		return json_encode(scope::serach_scopes($searchWord, $searchFields, $lang));
    	}
	    catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
	}

	static function addScopeToScopeRelation($serverHash, $Token, $firstUID, $secondUID, $isHier) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");

    	try {
    		return json_encode(scope::add_relation_to_scope($firstUID, $secondUID, $isHier, $user["UID"]));
    	}
	    catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
	}
	static function removeScopeToScopeRelation($serverHash, $Token, $firstUID, $secondUID) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");

    	try {
    		return json_encode(scope::remove_relation($firstUID, $secondUID));
    	}
	    catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
	}
}




// ====================================================================
// ====================================================================
// 								Kbits
// ====================================================================
// ====================================================================
class KbitAPI {

	static function searchKbits($serverHash, $Token, $searchWord, $searchFields) {

		$searchFields = json_decode($searchFields);

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");

    	try {
    		return json_encode(Kbit::serach_kbits($searchWord, $searchFields, $user["UID0"]));
    	}
	    catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
	}


	static function addNew($serverHash, $Token, $title, $desc, $front) {

		$front = json_decode($front);

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");

    	try {
	    	return json_encode(Kbit::add_new_Kbit_in_edit_mode($title, $desc, $user["UID"], $front));
    	}
	    catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
	}


	static function beginEdit($serverHash, $Token, $kbitUID) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");

    	try {
			return json_encode(Kbit::begin_editing_kbit($kbitUID, $user["UID"]));
		}
	    catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
	}


	static function cancelEdit($serverHash, $Token, $kbitUID) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");

    	try {
			return json_encode(Kbit::cancel_edited_kbit($kbitUID, $user["UID"]));
		}
		catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
	}


	static function publish($serverHash, $Token, $kbitUID) {
		
		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");

    	try {
			return json_encode(Kbit::publish_changes($kbitUID, $user["UID"]));
		}
		catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
	}


	static function update($serverHash, $Token, $kbitUID, $title, $desc, $front) {

		$front = json_decode($front);

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");

    	try {
			return json_encode(Kbit::add_new_edit_for_kbit($kbitUID, $title, $desc, $user["UID"], $front));
		}
		catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
	}

	static function addRelatedKbit($serverHash, $Token, $firstUID, $secondUID, $isHier) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");

    	try {
			return json_encode(Kbit::add_K2K_relation($firstUID, $secondUID, $isHier, $user["UID"]));
		}
		catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
	}

	static function removeRelatedKbit($serverHash, $Token, $firstUID, $secondUID) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");

    	try {
			return json_encode(Kbit::remove_K2K_relation($firstUID, $secondUID, $user["UID"]));
		}
		catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
	}

	static function addTermByUID($serverHash, $Token, $kbitUID, $termUID, $linkType) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");

    	try {
			return json_encode(Kbit::add_K2T_relation($kbitUID, $termUID, $linkType, $user["UID"]));
		}
		catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
	}

	static function addTermByScopeUID($serverHash, $Token, $kbitUID, $scopeUID, $termStringText, $termMeaningText, $lang) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");
    	try {
	    	$term = term::add_new_term_with_scope_and_meaning($termStringText, $lang, $user["UID"], $scopeUID, $termMeaningText);
	    	return json_encode(Kbit::add_K2T_relation($kbitUID, $term["UID"], $linkType, $user["UID"]));
	    }
	    catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
	}

	static function addTermByTermUIDScopeUID($serverHash, $Token, $kbitUID, $scopeUID, $termUID, $termMeaningText, $lang) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");
    	try {
	    	$term = term::add_sysnonym($scopeUID, $termUID, $termMeaningText, $lang, $user["UID"]);
	    	return json_encode(Kbit::add_K2T_relation($kbitUID, $term["UID"], $linkType, $user["UID"]));
	    }
	    catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
	}

	static function addTerm($serverHash, $Token, $kbitUID, $scopeTitle, $scopeDesc, $termStringText, $termMeaningText, $lang) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");
    	try {
    		$termString = term::add_new_term($termStringText, $lang, $user["UID"]);
	    	$term = term::add_new_meaning_under_new_scope($termString["UID"], $lang, $user["UID"], $scopeTitle, $scopeDesc, $termMeaningText);
	    	return json_encode(Kbit::add_K2T_relation($kbitUID, $term["UID"], $linkType, $user["UID"]));
	    }
	    catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
	}

	static function removeTerm($serverHash, $Token, $kbitUID, $termUID, $linkType) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");

    	try {
			return json_encode(Kbit::remove_term_from_Kbit($kbitUID, $termUID, $linkType, $user["UID"]));
		}
		catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
	}

}



// ====================================================================
// ====================================================================
// 								Deliveries
// ====================================================================
// ====================================================================
class DeliveryAPI {


	static function searchDelivery($serverHash, $Token, $searchWord, $searchFields) {
		

		$searchFields = json_decode($searchFields);

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");

    	try {
    		return json_encode(Delivery::serach_deliveries($searchWord, $searchFields, $user["UID"]));
    	}
	    catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
	}


	static function addNew($serverHash, $Token, $title, $desc, $front) {

		$front = json_decode($front);

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");

    	try {
	    	return json_encode(Delivery::add_new_Delivery_in_edit_mode($title, $desc, $user["UID"], $front));
    	}
	    catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
	}


	static function beginEdit($serverHash, $Token, $deliveryUID) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");

    	try {
			return json_encode(Delivery::begin_editing_Delivery($deliveryUID, $user["UID"]));
		}
	    catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
	}


	static function cancelEdit($serverHash, $Token, $deliveryUID) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");

    	try {
			return json_encode(Delivery::cancel_edited_Delivery($deliveryUID, $user["UID"]));
		}
		catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
	}


	static function publish($serverHash, $Token, $deliveryUID) {
		
		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");

    	try {
			return json_encode(Delivery::publish_changes($deliveryUID, $user["UID"]));
		}
		catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
	}


	static function update($serverHash, $Token, $deliveryUID, $title, $desc, $front) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");

    	try {
			return json_encode(Delivery::add_new_edit_for_Delivery($deliveryUID, $title, $desc, $user["UID"], $front));
		}
		catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
	}

	static function addRelatedDelivery($serverHash, $Token, $firstUID, $secondUID, $isHier) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");

    	try {
			return json_encode(Delivery::add_D2D_relation($firstUID, $secondUID, $isHier, $user["UID"]));
		}
		catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
	}

	static function removeRelatedDelivery($serverHash, $Token, $firstUID, $secondUID) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");

    	try {
			return json_encode(Delivery::remove_D2D_relation($firstUID, $secondUID, $user["UID"]));
		}
		catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
	}

	static function addTermByUID($serverHash, $Token, $deliveryUID, $termUID, $linkType) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");

    	try {
			return json_encode(Delivery::add_D2T_relation($deliveryUID, $termUID, $linkType, $user["UID"]));
		}
		catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
	}

	static function addTermByScopeUID($serverHash, $Token, $deliveryUID, $scopeUID, $termStringText, $termMeaningText, $lang) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");
    	try {
	    	$term = term::add_new_term_with_scope_and_meaning($termStringText, $lang, $user["UID"], $scopeUID, $termMeaningText);
	    	return json_encode(Delivery::add_D2T_relation($deliveryUID, $term["UID"], $linkType, $user["UID"]));
	    }
	    catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
	}

	static function addTermByTermUIDScopeUID($serverHash, $Token, $deliveryUID, $scopeUID, $termUID, $termMeaningText, $lang) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");
    	try {
	    	$term = term::add_sysnonym($scopeUID, $termUID, $termMeaningText, $lang, $user["UID"]);
	    	return json_encode(Delivery::add_D2T_relation($deliveryUID, $term["UID"], $linkType, $user["UID"]));
	    }
	    catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
	}

	static function addTerm($serverHash, $Token, $deliveryUID, $scopeTitle, $scopeDesc, $termStringText, $termMeaningText, $lang) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");
    	try {
    		$termString = term::add_new_term($termStringText, $lang, $user["UID"]);
	    	$term = term::add_new_meaning_under_new_scope($termString["UID"], $lang, $user["UID"], $scopeTitle, $scopeDesc, $termMeaningText);
	    	return json_encode(Delivery::add_D2T_relation($deliveryUID, $term["UID"], $linkType, $user["UID"]));
	    }
	    catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
	}

	static function removeTerm($serverHash, $Token, $deliveryUID, $termUID, $linkType) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");

    	try {
			return json_encode(Delivery::remove_term_from_Delivery($deliveryUID, $termUID, $linkType, $user["UID"]));
		}
		catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
	}

	static function addRelatedKbit($serverHash, $Token, $KbitUID, $DeliveryUID, $linkType, $linkWeight) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");

    	try {
			return json_encode(Delivery::add_Kbit_to_delivery($KbitUID, $DeliveryUID, $linkType, $linkWeight, $user["UID"]));
		}
		catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
	}


	static function removeRelatedKbit($serverHash, $Token, $KbitUID, $DeliveryUID, $linkType, $linkWeight) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");

    	try {
			return json_encode(Delivery::remove_Kbit_from_delivery($KbitUID, $DeliveryUID, $linkType, $user["UID"]));
		}
		catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}
	}
}



// ====================================================================
// ====================================================================
// 								keyValuePair
// ====================================================================
// ====================================================================
class keyValuePairAPI {

	static function remove_key_value_pair($serverHash, $Token, $key) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");

    	try {
			return json_encode(keyValuePair::remove_key_value_pair($key, $user["UID"]));
		}
		catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}

	}
	static function set_key_value_pair($serverHash, $Token, $key, $value) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");

    	try {
			return json_encode(keyValuePair::set_key_value_pair($key, $value, $user["UID"]));
		}
		catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}

	}
	static function get_key_value_pair($serverHash, $Token, $key) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");

    	try {
			return json_encode(keyValuePair::get_key_value_pair($key, $user["UID"]));
		}
		catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}

	}


}


// ====================================================================
// ====================================================================
// 								searchableQueries
// ====================================================================
// ====================================================================
class searchableQueriesAPI {
	
	public static function runQuery($serverHash, $Token, $queryID) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");

    	try {
			return json_encode(searchQueries::run_query($queryID, $user["UID"]));
		}
		catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}

	}
	public static function removeQuery($serverHash, $Token, $key) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");

    	try {
			return json_encode(searchQueries::remove_query($key, $user["UID"]));
		}
		catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}

	}
	public static function updateQuery($serverHash, $Token, $queryID, $text, $name) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");

    	try {
			return json_encode(searchQueries::update_user_query($queryID, $text, $name, $user["UID"]));
		}
		catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}

	}
	public static function saveNewQuery($serverHash, $Token, $tableName, $queryName, $text) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");

    	try {
			return json_encode(searchQueries::save_new_user_query($text, $tableName, $queryName, $user["UID"]));
		}
		catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}

	}
	public static function getUserQueries($serverHash, $Token) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");

    	try {
			return json_encode(searchQueries::get_user_queries($user["UID"]));
		}
		catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}

	}
	public static function getSearchableTables($serverHash, $Token) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return array('ErrorCode' => 4, 'Message' => "Invalid serverHash : ".$serverHash);
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return array('ErrorCode' => 3, 'Message' => "Expired Token");

    	try {
			return json_encode(searchQueries::get_searchable_tables());
		}
		catch (Exception $e) {
		    return array('ErrorCode' => 0, 'Message' => "Unknown Error");
		}

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


// ====================================================================
// ====================================================================
// 								users
// ====================================================================
// ====================================================================
	
	public static function USERsignUp($serverHash, $firstName, $lastName, $username, $password, $email, $profilePicture, $role = '') {
		return usersAPI::signUp($serverHash, $firstName, $lastName, $username, $password, $email, $profilePicture, $role = '');
	}
	public static function USERlogIn($serverHash, $username, $password) {
		return usersAPI::logIn($serverHash, $username, $password);
	}
	public static function USERchangePassword($serverHash, $Token, $password, $new_password) {
		return usersAPI::changePassword($serverHash, $Token, $password, $new_password);
	}
	public static function USERupdateUser($serverHash, $Token, $firstName, $lastName, $email, $profilePicture, $role = '') {
		return usersAPI::updateUser($serverHash, $Token, $firstName, $lastName, $email, $profilePicture, $role = '');
	}




// ====================================================================
// ====================================================================
// 								terms
// ====================================================================
// ====================================================================
	
	public static function TERMsearchTerms($serverHash, $Token, $searchWord, $searchFields, $lang = '') {
		return termsAPI::searchTerms($serverHash, $Token, $searchWord, $searchFields, $lang = '');
	}
	public static function TERMaddTermToTermRelation($serverHash, $Token, $firstUID, $secondUID, $isHier) {
		return termsAPI::addTermToTermRelation($serverHash, $Token, $firstUID, $secondUID, $isHier);
	}
	public static function TERMremoveTermToTermRelation($serverHash, $Token, $firstUID, $secondUID) {
		return termsAPI::removeTermToTermRelation($serverHash, $Token, $firstUID, $secondUID);
	}
	public static function TERMgetRelatedTerms($serverHash, $Token, $termUID, $lang = '') {
		return termsAPI::getRelatedTerms($serverHash, $Token, $termUID, $lang = '');
	}
	public static function TERMgetAllTermsStrings($serverHash, $Token, $lang = '') {
		return termsAPI::getAllTermsStrings($serverHash, $Token, $lang = '');
	}
	

	

// ====================================================================
// ====================================================================
// 								scopes
// ====================================================================
// ====================================================================

	public static function SCOPEsearchScopes($serverHash, $Token, $searchWord, $searchFields, $lang = '') {
		return scopesAPI::searchScopes($serverHash, $Token, $searchWord, $searchFields, $lang = '');
	}
	public static function SCOPEaddScopeToScopeRelation($serverHash, $Token, $firstUID, $secondUID, $isHier) {
		return scopesAPI::addScopeToScopeRelation($serverHash, $Token, $firstUID, $secondUID, $isHier);
	}
	public static function SCOPEremoveScopeToScopeRelation($serverHash, $Token, $firstUID, $secondUID) {
		return scopesAPI::removeScopeToScopeRelation($serverHash, $Token, $firstUID, $secondUID);
	}





// ====================================================================
// ====================================================================
// 								Kbits
// ====================================================================
// ====================================================================

	public static function KBITsearchKbits($serverHash, $Token, $searchWord, $searchFields) {
		return KbitAPI::searchKbits($serverHash, $Token, $searchWord, $searchFields);
	}
	public static function KBITaddNew($serverHash, $Token, $title, $desc, $front) {
		return KbitAPI::addNew($serverHash, $Token, $title, $desc, $front);
	}
	public static function KBITbeginEdit($serverHash, $Token, $kbitUID) {
		return KbitAPI::beginEdit($serverHash, $Token, $kbitUID);
	}
	public static function KBITcancelEdit($serverHash, $Token, $kbitUID) {
		return KbitAPI::cancelEdit($serverHash, $Token, $kbitUID);
	}
	public static function KBITpublish($serverHash, $Token, $kbitUID) {
		return KbitAPI::publish($serverHash, $Token, $kbitUID);
	}
	public static function KBITupdate($serverHash, $Token, $kbitUID, $title, $desc, $front) {
		return KbitAPI::update($serverHash, $Token, $kbitUID, $title, $desc, $front);
	}
	public static function KBITaddRelatedKbit($serverHash, $Token, $firstUID, $secondUID, $isHier) {
		return KbitAPI::addRelatedKbit($serverHash, $Token, $firstUID, $secondUID, $isHier);
	}
	public static function KBITremoveRelatedKbit($serverHash, $Token, $firstUID, $secondUID) {
		return KbitAPI::removeRelatedKbit($serverHash, $Token, $firstUID, $secondUID);
	}
	public static function KBITaddTermByUID($serverHash, $Token, $kbitUID, $termUID, $linkType) {
		return KbitAPI::addTermByUID($serverHash, $Token, $kbitUID, $termUID, $linkType);
	}
	public static function KBITaddTermByScopeUID($serverHash, $Token, $kbitUID, $scopeUID, $termStringText, $termMeaningText, $lang) {
		return KbitAPI::addTermByScopeUID($serverHash, $Token, $kbitUID, $scopeUID, $termStringText, $termMeaningText, $lang);
	}
	public static function KBITaddTermByTermUIDScopeUID($serverHash, $Token, $kbitUID, $scopeUID, $termUID, $termMeaningText, $lang) {
		return KbitAPI::addTermByTermUIDScopeUID($serverHash, $Token, $kbitUID, $scopeUID, $termUID, $termMeaningText, $lang);
	}
	public static function KBITaddTerm($serverHash, $Token, $kbitUID, $scopeTitle, $scopeDesc, $termStringText, $termMeaningText, $lang) {
		return KbitAPI::addTerm($serverHash, $Token, $kbitUID, $scopeTitle, $scopeDesc, $termStringText, $termMeaningText, $lang);
	}
	public static function KBITremoveTerm($serverHash, $Token, $kbitUID, $termUID, $linkType) {
		return KbitAPI::removeTerm($serverHash, $Token, $kbitUID, $termUID, $linkType);
	}





// ====================================================================
// ====================================================================
// 								Deliveries
// ====================================================================
// ====================================================================

	public static function DELIVERYsearchDelivery($serverHash, $Token, $searchWord, $searchFields) {
		return DeliveryAPI::searchDelivery($serverHash, $Token, $searchWord, $searchFields);
	}
	public static function DELIVERYaddNew($serverHash, $Token, $title, $desc, $front) {
		return DeliveryAPI::addNew($serverHash, $Token, $title, $desc, $front);
	}
	public static function DELIVERYbeginEdit($serverHash, $Token, $deliveryUID) {
		return DeliveryAPI::beginEdit($serverHash, $Token, $deliveryUID);
	}
	public static function DELIVERYcancelEdit($serverHash, $Token, $deliveryUID) {
		return DeliveryAPI::cancelEdit($serverHash, $Token, $deliveryUID);
	}
	public static function DELIVERYpublish($serverHash, $Token, $deliveryUID) {
		return DeliveryAPI::publish($serverHash, $Token, $deliveryUID);
	}
	public static function DELIVERYupdate($serverHash, $Token, $deliveryUID, $title, $desc, $front) {
		return DeliveryAPI::update($serverHash, $Token, $deliveryUID, $title, $desc, $front);
	}
	public static function DELIVERYaddRelatedDelivery($serverHash, $Token, $firstUID, $secondUID, $isHier) {
		return DeliveryAPI::addRelatedDelivery($serverHash, $Token, $firstUID, $secondUID, $isHier);
	}
	public static function DELIVERYremoveRelatedDelivery($serverHash, $Token, $firstUID, $secondUID) {
		return DeliveryAPI::removeRelatedDelivery($serverHash, $Token, $firstUID, $secondUID);
	}
	public static function DELIVERYaddTermByUID($serverHash, $Token, $deliveryUID, $termUID, $linkType) {
		return DeliveryAPI::addTermByUID($serverHash, $Token, $deliveryUID, $termUID, $linkType);
	}
	public static function DELIVERYaddTermByScopeUID($serverHash, $Token, $deliveryUID, $scopeUID, $termStringText, $termMeaningText, $lang) {
		return DeliveryAPI::addTermByScopeUID($serverHash, $Token, $deliveryUID, $scopeUID, $termStringText, $termMeaningText, $lang);
	}
	public static function DELIVERYaddTermByTermUIDScopeUID($serverHash, $Token, $deliveryUID, $scopeUID, $termUID, $termMeaningText, $lang) {
		return DeliveryAPI::addTermByTermUIDScopeUID($serverHash, $Token, $deliveryUID, $scopeUID, $termUID, $termMeaningText, $lang);
	}
	public static function DELIVERYaddTerm($serverHash, $Token, $deliveryUID, $scopeTitle, $scopeDesc, $termStringText, $termMeaningText, $lang) {
		return DeliveryAPI::addTerm($serverHash, $Token, $deliveryUID, $scopeTitle, $scopeDesc, $termStringText, $termMeaningText, $lang);
	}
	public static function DELIVERYremoveTerm($serverHash, $Token, $deliveryUID, $termUID, $linkType) {
		return DeliveryAPI::removeTerm($serverHash, $Token, $deliveryUID, $termUID, $linkType);
	}
	public static function DELIVERYaddRelatedKbit($serverHash, $Token, $KbitUID, $DeliveryUID, $linkType, $linkWeight) {
		return DeliveryAPI::addRelatedKbit($serverHash, $Token, $KbitUID, $DeliveryUID, $linkType, $linkWeight);
	}
	public static function DELIVERYremoveRelatedKbit($serverHash, $Token, $KbitUID, $DeliveryUID, $linkType, $linkWeight) {
		return DeliveryAPI::removeRelatedKbit($serverHash, $Token, $KbitUID, $DeliveryUID, $linkType, $linkWeight);
	}
	
	




// ====================================================================
// ====================================================================
// 								keyValuePair
// ====================================================================
// ====================================================================

	public static function KVPremoveKeyValuePair($serverHash, $Token, $key) {
		return keyValuePairAPI::remove_key_value_pair($serverHash, $Token, $key);
	}
	public static function KVPsetKeyValuePair($serverHash, $Token, $key, $value) {
		return keyValuePairAPI::set_key_value_pair($serverHash, $Token, $key, $value);
	}
	public static function KVPgetKeyValuePair($serverHash, $Token, $key) {
		return keyValuePairAPI::get_key_value_pair($serverHash, $Token, $key);
	}






// ====================================================================
// ====================================================================
// 								searchableQueries
// ====================================================================
// ====================================================================

	public static function runQuery($serverHash, $Token, $queryID) {
		return searchableQueriesAPI::runQuery($serverHash, $Token, $queryID);
	}
	public static function removeQuery($serverHash, $Token, $key) {
		return searchableQueriesAPI::removeQuery($serverHash, $Token, $key);
	}
	public static function updateQuery($serverHash, $Token, $queryID, $text, $name) {
		return searchableQueriesAPI::updateQuery($serverHash, $Token, $queryID, $text, $name);
	}
	public static function saveNewQuery($serverHash, $Token, $tableName, $queryName, $text) {
		return searchableQueriesAPI::saveNewQuery($serverHash, $Token, $tableName, $queryName, $text);
	}
	public static function getUserQueries($serverHash, $Token) {
		return searchableQueriesAPI::getUserQueries($serverHash, $Token);
	}
	public static function getSearchableTables($serverHash, $Token) {
		return searchableQueriesAPI::getSearchableTables($serverHash, $Token);
	}






	public static function hello($hash) {
		return usersAPI::hello($hash);
	}
}






 
function deliver_response($format, $api_response)
{
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
        echo $json_response;
    } elseif (strcasecmp($format, 'xml') == 0) {
        header('Content-Type: application/xml; charset=utf-8');
        $xml_response = '<?xml version="1.0" encoding="UTF-8"?>' . "\n" . '<response>' . "\n" . "\t" . '<code>' . $api_response['code'] . '</code>' . "\n" . "\t" . '<data>' . $api_response['data'] . '</data>' . "\n" . '</response>';
        echo $xml_response;
    } else {
        header('Content-Type: text/html; charset=utf-8');
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

try {
    $rArray = array_change_key_case($_REQUEST, CASE_LOWER);
    $method = $rArray["method"];
     
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
    		$response['data']        = array('ErrorCode' => 0, "Message" => "Required parameter(s) for ". $method .": ". $paramStr);
    	}
    }
    else {
    		$response['code']        = 8;
    		$response['status']      = 405;
    		$response['data']        = array('ErrorCode' => 0, "Message" => "The method " . $method . " does not exist.");
    }

    ob_end_clean();


    if(is_null($response['data']['ErrorCode'])){
        $response['code']   = 1;
        $response['status'] = $api_response_code[$response['code']]['HTTP Response'];
    }else{
    	$response['code']   = $response['data']['ErrorCode'];
        $response['status'] = $api_response_code[$response['code']]['HTTP Response'];
    }
}
catch (Exception $e) {
        $response['code']        = 0;
        $response['status']      = 400;
        $response['data']        = array('ErrorCode' => 0, "Message" =>$e->getMessage());
}







deliver_response(/*$_GET['format']*/'json', $response);


?>


















