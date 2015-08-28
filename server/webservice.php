<?php 

/*
 * PHP SOAP - How to create a SOAP Server and a SOAP Client
 */
// require '../server.php';
//a basic API class

// error codes:
// 100: validation error
// 101: wrong data
// 102: no data was found
// 403: access denied
// 4033: Token expired

function __autoload($class) {
	require_once('app_config.php');
}

class serverAPI {
	public  function validateServerIdentity($hash) {
    	return $hash == 'DAVID&AMEER';
    }

    public static function setError($message) {
    	return array("Error"=>$message);
    }
}

// save key value
// search queries
// build global interface
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
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	}
    	if($username == ''){
    		return new SoapFault("100", json_encode(serverAPI::setError('username is empty')));
    	}
    	try {
	    	return users::add_new_user($firstName, $lastName, $username, $password, $email, $profilePicture, $role);
	    }
	    catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
		}
    }

    static function logIn($serverHash, $username, $password) {

    	if(serverAPI::validateServerIdentity($serverHash) == false){
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	}
    	try {
    		$UserData = users::validate_username_password($username, $password);
    		if($UserData == null){
    			return new SoapFault("101", json_encode(serverAPI::setError('Wrong Information')));
    		}else{
    			return json_encode($UserData);
    		}
	    }
	    catch (Exception $e) {
	    	return new SoapFault("403", json_encode($e));
		}
    }

    static function changePassword($serverHash, $Token, $password, $new_password) {

    	if(serverAPI::validateServerIdentity($serverHash) == false)
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
	    	return new SoapFault("4033", json_encode(serverAPI::setError('Expired Token')));
    	try {
    		return json_encode(users::change_password($user["USERNAME"], $password, $new_password));
    	}
	    catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
		}
    }

    static function updateUser($serverHash, $Token, $firstName, $lastName, $email, $profilePicture, $role = '') {

    	if(serverAPI::validateServerIdentity($serverHash) == false)
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
	    	return new SoapFault("4033", json_encode(serverAPI::setError('Expired Token')));
    	try {
    		return json_encode(users::update_user($user["UID"], $firstName, $lastName, $email, $profilePicture, $role));
    	}
	    catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
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

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
	    	return new SoapFault("4033", json_encode(serverAPI::setError('Expired Token')));
    	try {
    		return json_encode(scope::serach_scopes($searchWord, $searchFields, $lang));
    	}
	    catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
		}
	}

	static function addTermToTermRelation($serverHash, $Token, $firstUID, $secondUID, $isHier) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return new SoapFault("4033", json_encode(serverAPI::setError('Expired Token')));

    	try {
    		return json_encode(term::add_relation_to_scope($firstUID, $secondUID, $isHier, $user["UID"]));
    	}
	    catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
		}
	}

	static function removeTermToTermRelation($serverHash, $Token, $firstUID, $secondUID) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return new SoapFault("4033", json_encode(serverAPI::setError('Expired Token')));

    	try {
    		return json_encode(term::remove_relation($firstUID, $secondUID));
    	}
	    catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
		}
	}

	static function getRelatedTerms($serverHash, $Token, $termUID, $lang = '') {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return new SoapFault("4033", json_encode(serverAPI::setError('Expired Token')));

    	try {
    		return json_encode(term::get_relations_of_term($termUID, $lang = ''));
    	}
	    catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
		}
	}

	static function getAllTermsStrings($serverHash, $Token, $lang = '') {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return new SoapFault("4033", json_encode(serverAPI::setError('Expired Token')));

    	try {
    		return json_encode(term::get_all_term_strings($lang));
    	}
	    catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
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

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return new SoapFault("4033", json_encode(serverAPI::setError('Expired Token')));

    	try {
    		return json_encode(scope::serach_scopes($searchWord, $searchFields, $lang));
    	}
	    catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
		}
	}

	static function addScopeToScopeRelation($serverHash, $Token, $firstUID, $secondUID, $isHier) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return new SoapFault("4033", json_encode(serverAPI::setError('Expired Token')));

    	try {
    		return json_encode(scope::add_relation_to_scope($firstUID, $secondUID, $isHier, $user["UID"]));
    	}
	    catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
		}
	}
	static function removeScopeToScopeRelation($serverHash, $Token, $firstUID, $secondUID) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return new SoapFault("4033", json_encode(serverAPI::setError('Expired Token')));

    	try {
    		return json_encode(scope::remove_relation($firstUID, $secondUID));
    	}
	    catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
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

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return new SoapFault("4033", json_encode(serverAPI::setError('Expired Token')));

    	try {
    		return json_encode(Kbit::serach_kbits($searchWord, $searchFields, $user["UID0"]));
    	}
	    catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
		}
	}


	static function addNew($serverHash, $Token, $title, $desc, $front) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return new SoapFault("4033", json_encode(serverAPI::setError('Expired Token')));

    	try {
	    	return json_encode(Kbit::add_new_Kbit_in_edit_mode($title, $desc, $user["UID"], $front));
    	}
	    catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
		}
	}


	static function beginEdit($serverHash, $Token, $kbitUID) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return new SoapFault("4033", json_encode(serverAPI::setError('Expired Token')));

    	try {
			return json_encode(Kbit::begin_editing_kbit($kbitUID, $user["UID"]));
		}
	    catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
		}
	}


	static function cancelEdit($serverHash, $Token, $kbitUID) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return new SoapFault("4033", json_encode(serverAPI::setError('Expired Token')));

    	try {
			return json_encode(Kbit::cancel_edited_kbit($kbitUID, $user["UID"]));
		}
		catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
		}
	}


	static function publish($serverHash, $Token, $kbitUID) {
		
		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return new SoapFault("4033", json_encode(serverAPI::setError('Expired Token')));

    	try {
			return json_encode(Kbit::publish_changes($kbitUID, $user["UID"]));
		}
		catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
		}
	}


	static function update($serverHash, $Token, $kbitUID, $title, $desc, $front) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return new SoapFault("4033", json_encode(serverAPI::setError('Expired Token')));

    	try {
			return json_encode(Kbit::add_new_edit_for_kbit($kbitUID, $title, $desc, $user["UID"], $front));
		}
		catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
		}
	}

	static function addRelatedKbit($serverHash, $Token, $firstUID, $secondUID, $isHier) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return new SoapFault("4033", json_encode(serverAPI::setError('Expired Token')));

    	try {
			return json_encode(Kbit::add_K2K_relation($firstUID, $secondUID, $isHier, $user["UID"]));
		}
		catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
		}
	}

	static function removeRelatedKbit($serverHash, $Token, $firstUID, $secondUID) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return new SoapFault("4033", json_encode(serverAPI::setError('Expired Token')));

    	try {
			return json_encode(Kbit::remove_K2K_relation($firstUID, $secondUID, $user["UID"]));
		}
		catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
		}
	}

	static function addTermByUID($serverHash, $Token, $kbitUID, $termUID, $linkType) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return new SoapFault("4033", json_encode(serverAPI::setError('Expired Token')));

    	try {
			return json_encode(Kbit::add_K2T_relation($kbitUID, $termUID, $linkType, $user["UID"]));
		}
		catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
		}
	}

	static function addTermByScopeUID($serverHash, $Token, $kbitUID, $scopeUID, $termStringText, $termMeaningText, $lang) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return new SoapFault("4033", json_encode(serverAPI::setError('Expired Token')));
    	try {
	    	$term = term::add_new_term_with_scope_and_meaning($termStringText, $lang, $user["UID"], $scopeUID, $termMeaningText);
	    	return json_encode(Kbit::add_K2T_relation($kbitUID, $term["UID"], $linkType, $user["UID"]));
	    }
	    catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
		}
	}

	static function addTermByTermUIDScopeUID($serverHash, $Token, $kbitUID, $scopeUID, $termUID, $termMeaningText, $lang) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return new SoapFault("4033", json_encode(serverAPI::setError('Expired Token')));
    	try {
	    	$term = term::add_sysnonym($scopeUID, $termUID, $termMeaningText, $lang, $user["UID"]);
	    	return json_encode(Kbit::add_K2T_relation($kbitUID, $term["UID"], $linkType, $user["UID"]));
	    }
	    catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
		}
	}

	static function addTerm($serverHash, $Token, $kbitUID, $scopeTitle, $scopeDesc, $termStringText, $termMeaningText, $lang) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return new SoapFault("4033", json_encode(serverAPI::setError('Expired Token')));
    	try {
    		$termString = term::add_new_term($termStringText, $lang, $user["UID"]);
	    	$term = term::add_new_meaning_under_new_scope($termString["UID"], $lang, $user["UID"], $scopeTitle, $scopeDesc, $termMeaningText);
	    	return json_encode(Kbit::add_K2T_relation($kbitUID, $term["UID"], $linkType, $user["UID"]));
	    }
	    catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
		}
	}

	static function removeTerm($serverHash, $Token, $kbitUID, $termUID, $linkType) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return new SoapFault("4033", json_encode(serverAPI::setError('Expired Token')));

    	try {
			return json_encode(Kbit::remove_term_from_Kbit($kbitUID, $termUID, $linkType, $user["UID"]));
		}
		catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
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

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return new SoapFault("4033", json_encode(serverAPI::setError('Expired Token')));

    	try {
    		return json_encode(Delivery::serach_deliveries($searchWord, $searchFields, $user["UID0"]));
    	}
	    catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
		}
	}


	static function addNew($serverHash, $Token, $title, $desc, $front) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return new SoapFault("4033", json_encode(serverAPI::setError('Expired Token')));

    	try {
	    	return json_encode(Delivery::add_new_Delivery_in_edit_mode($title, $desc, $user["UID"], $front));
    	}
	    catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
		}
	}


	static function beginEdit($serverHash, $Token, $deliveryUID) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return new SoapFault("4033", json_encode(serverAPI::setError('Expired Token')));

    	try {
			return json_encode(Delivery::begin_editing_Delivery($deliveryUID, $user["UID"]));
		}
	    catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
		}
	}


	static function cancelEdit($serverHash, $Token, $deliveryUID) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return new SoapFault("4033", json_encode(serverAPI::setError('Expired Token')));

    	try {
			return json_encode(Delivery::cancel_edited_Delivery($deliveryUID, $user["UID"]));
		}
		catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
		}
	}


	static function publish($serverHash, $Token, $deliveryUID) {
		
		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return new SoapFault("4033", json_encode(serverAPI::setError('Expired Token')));

    	try {
			return json_encode(Delivery::publish_changes($deliveryUID, $user["UID"]));
		}
		catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
		}
	}


	static function update($serverHash, $Token, $deliveryUID, $title, $desc, $front) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return new SoapFault("4033", json_encode(serverAPI::setError('Expired Token')));

    	try {
			return json_encode(Delivery::add_new_edit_for_Delivery($deliveryUID, $title, $desc, $user["UID"], $front));
		}
		catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
		}
	}

	static function addRelatedDelivery($serverHash, $Token, $firstUID, $secondUID, $isHier) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return new SoapFault("4033", json_encode(serverAPI::setError('Expired Token')));

    	try {
			return json_encode(Delivery::add_D2D_relation($firstUID, $secondUID, $isHier, $user["UID"]));
		}
		catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
		}
	}

	static function removeRelatedDelivery($serverHash, $Token, $firstUID, $secondUID) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return new SoapFault("4033", json_encode(serverAPI::setError('Expired Token')));

    	try {
			return json_encode(Delivery::remove_D2D_relation($firstUID, $secondUID, $user["UID"]));
		}
		catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
		}
	}

	static function addTermByUID($serverHash, $Token, $deliveryUID, $termUID, $linkType) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return new SoapFault("4033", json_encode(serverAPI::setError('Expired Token')));

    	try {
			return json_encode(Delivery::add_D2T_relation($deliveryUID, $termUID, $linkType, $user["UID"]));
		}
		catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
		}
	}

	static function addTermByScopeUID($serverHash, $Token, $deliveryUID, $scopeUID, $termStringText, $termMeaningText, $lang) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return new SoapFault("4033", json_encode(serverAPI::setError('Expired Token')));
    	try {
	    	$term = term::add_new_term_with_scope_and_meaning($termStringText, $lang, $user["UID"], $scopeUID, $termMeaningText);
	    	return json_encode(Delivery::add_D2T_relation($deliveryUID, $term["UID"], $linkType, $user["UID"]));
	    }
	    catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
		}
	}

	static function addTermByTermUIDScopeUID($serverHash, $Token, $deliveryUID, $scopeUID, $termUID, $termMeaningText, $lang) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return new SoapFault("4033", json_encode(serverAPI::setError('Expired Token')));
    	try {
	    	$term = term::add_sysnonym($scopeUID, $termUID, $termMeaningText, $lang, $user["UID"]);
	    	return json_encode(Delivery::add_D2T_relation($deliveryUID, $term["UID"], $linkType, $user["UID"]));
	    }
	    catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
		}
	}

	static function addTerm($serverHash, $Token, $deliveryUID, $scopeTitle, $scopeDesc, $termStringText, $termMeaningText, $lang) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return new SoapFault("4033", json_encode(serverAPI::setError('Expired Token')));
    	try {
    		$termString = term::add_new_term($termStringText, $lang, $user["UID"]);
	    	$term = term::add_new_meaning_under_new_scope($termString["UID"], $lang, $user["UID"], $scopeTitle, $scopeDesc, $termMeaningText);
	    	return json_encode(Delivery::add_D2T_relation($deliveryUID, $term["UID"], $linkType, $user["UID"]));
	    }
	    catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
		}
	}

	static function removeTerm($serverHash, $Token, $deliveryUID, $termUID, $linkType) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return new SoapFault("4033", json_encode(serverAPI::setError('Expired Token')));

    	try {
			return json_encode(Delivery::remove_term_from_Delivery($deliveryUID, $termUID, $linkType, $user["UID"]));
		}
		catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
		}
	}

	static function addRelatedKbit($serverHash, $Token, $KbitUID, $DeliveryUID, $linkType, $linkWeight) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return new SoapFault("4033", json_encode(serverAPI::setError('Expired Token')));

    	try {
			return json_encode(Delivery::add_Kbit_to_delivery($KbitUID, $DeliveryUID, $linkType, $linkWeight, $user["UID"]));
		}
		catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
		}
	}


	static function removeRelatedKbit($serverHash, $Token, $KbitUID, $DeliveryUID, $linkType, $linkWeight) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return new SoapFault("403", json_encode(serverAPI::setError('Access Denied')));
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return new SoapFault("4033", json_encode(serverAPI::setError('Expired Token')));

    	try {
			return json_encode(Delivery::remove_Kbit_from_delivery($KbitUID, $DeliveryUID, $linkType, $user["UID"]));
		}
		catch (Exception $e) {
		    return new SoapFault("403", json_encode($e));
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
	
	






	public static function hello($hash) {
		return usersAPI::hello($hash);
	}
}






 









    // search

//when in non-wsdl mode the uri option must be specified
// $options=array('uri'=>Configurator::get_webservice_URI());
$options=array('uri'=>'http://localhost:8888/mopdqwompoaskdqomdiasjdiowqe/server/');
//create a new SOAP server
$server = new SoapServer(NULL, $options);
//attach the API class to the SOAP Server
$server->setClass('interfaceAPI');
//start the SOAP requests handler
$server->handle();

?>


















