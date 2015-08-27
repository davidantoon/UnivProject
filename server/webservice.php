<?php 

/*
 * PHP SOAP - How to create a SOAP Server and a SOAP Client
 */
// require '../server.php';
//a basic API class

function __autoload($class) {
	include('app_config.php');
}

class serverAPI {
	public  function validateServerIdentity($hash) {
    	return $hash == 'DAVID&AMEER';
    }

    public static function setError($message) {
    	return array("Error"=>$message);
    }
}

// search kbits, deliveries
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
    	return serverAPI::validateServerIdentity($hash);
    }

    static function signUp($serverHash, $firstName, $lastName, $username, $password, $email, $profilePicture, $role = '') {
    	
    	if(serverAPI::validateServerIdentity($serverHash) == false)
    		return serverAPI::setError('Access Denied');
    	if($username == '') 
    		return serverAPI::setError('username is empty');
    	try {
	    	return users::add_new_user($firstName, $lastName, $username, $password, $email, $profilePicture, $role);
	    }
	    catch (Exception $e) {
		    return serverAPI::setError($e->getMessage());
		}
    }

    static function logIn($serverHash, $username, $password) {

    	if(serverAPI::validateServerIdentity($serverHash) == false)
    		return serverAPI::setError('Access Denied');
    	try {
	    	users::validate_username_password($username, $password);
	    }
	    catch (Exception $e) {
		    return serverAPI::setError($e->getMessage());
		}
    }

    static function validateToken($token) {
    	
    	return users::validate_token($token);
    }
}



// // ====================================================================
// // ====================================================================
// // 								terms
// // ====================================================================
// // ====================================================================
class termsAPI {

	static function searchTerms($serverHash, $Token, $searchWord, $searchFields, $lang = '') {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return serverAPI::setError('Access Denied');
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return serverAPI::setError('Expired Token');

    	try {
    		return scope::serach_scopes($searchWord, $searchFields, $lang);
    	}
	    catch (Exception $e) {
		    return serverAPI::setError($e->getMessage());
		}
	}

	static function addTermToTermRelation($serverHash, $Token, $firstUID, $secondUID, $isHier) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return serverAPI::setError('Access Denied');
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return serverAPI::setError('Expired Token');

    	try {
    		return term::add_relation_to_scope($firstUID, $secondUID, $isHier, $user["UID"]);
    	}
	    catch (Exception $e) {
		    return serverAPI::setError($e->getMessage());
		}
	}
	static function removeTermToTermRelation($serverHash, $Token, $firstUID, $secondUID) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return serverAPI::setError('Access Denied');
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return serverAPI::setError('Expired Token');

    	try {
    		return term::remove_relation($firstUID, $secondUID);
    	}
	    catch (Exception $e) {
		    return serverAPI::setError($e->getMessage());
		}
	}

	static function getRelatedTerms($serverHash, $Token, $termUID, $lang = '') {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return serverAPI::setError('Access Denied');
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return serverAPI::setError('Expired Token');

    	try {
    		return term::get_relations_of_term($termUID, $lang = '');
    	}
	    catch (Exception $e) {
		    return serverAPI::setError($e->getMessage());
		}
	}

	static function getAllTermsStrings($serverHash, $Token, $lang = '') {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return serverAPI::setError('Access Denied');
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return serverAPI::setError('Expired Token');

    	try {
    		return term::get_all_term_strings($lang);
    	}
	    catch (Exception $e) {
		    return serverAPI::setError($e->getMessage());
		}
	}
}



// // ====================================================================
// // ====================================================================
// // 								scopes
// // ====================================================================
// // ====================================================================
class scopesAPI {

	static function searchScopes($serverHash, $Token, $searchWord, $searchFields, $lang = '') {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return serverAPI::setError('Access Denied');
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return serverAPI::setError('Expired Token');

    	try {
    		return scope::serach_scopes($searchWord, $searchFields, $lang);
    	}
	    catch (Exception $e) {
		    return serverAPI::setError($e->getMessage());
		}
	}

	static function addScopeToScopeRelation($serverHash, $Token, $firstUID, $secondUID, $isHier) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return serverAPI::setError('Access Denied');
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return serverAPI::setError('Expired Token');

    	try {
    		return scope::add_relation_to_scope($firstUID, $secondUID, $isHier, $user["UID"]);
    	}
	    catch (Exception $e) {
		    return serverAPI::setError($e->getMessage());
		}
	}
	static function removeScopeToScopeRelation($serverHash, $Token, $firstUID, $secondUID) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return serverAPI::setError('Access Denied');
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return serverAPI::setError('Expired Token');

    	try {
    		return scope::remove_relation($firstUID, $secondUID);
    	}
	    catch (Exception $e) {
		    return serverAPI::setError($e->getMessage());
		}
	}
}



// // ====================================================================
// // ====================================================================
// // 								Kbits
// // ====================================================================
// // ====================================================================
class Kbit {

	static function searchKbits($serverHash, $Token, $searchWord, $searchFields, $lang = '') {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return serverAPI::setError('Access Denied');
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return serverAPI::setError('Expired Token');

    	try {
    		return scope::serach_scopes($searchWord, $searchFields, $lang);
    	}
	    catch (Exception $e) {
		    return serverAPI::setError($e->getMessage());
		}
	}


	static function addNew($serverHash, $Token, $title, $desc, $front) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return serverAPI::setError('Access Denied');
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return serverAPI::setError('Expired Token');

    	try {
	    	return Kbit::add_new_Kbit_in_edit_mode($title, $desc, $user["UID"], $front);
    	}
	    catch (Exception $e) {
		    return serverAPI::setError($e->getMessage());
		}
	}


	static function beginEdit($serverHash, $Token, $kbitUID) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return serverAPI::setError('Access Denied');
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return serverAPI::setError('Expired Token');

    	try {
			return Kbit::begin_editing_kbit($kbitUID, $user["UID"]);
		}
	    catch (Exception $e) {
		    return serverAPI::setError($e->getMessage());
		}
	}


	static function cancelEdit($serverHash, $Token, $kbitUID) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return serverAPI::setError('Access Denied');
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return serverAPI::setError('Expired Token');

    	try {
			return Kbit::cancel_edited_kbit($kbitUID, $user["UID"]);
		}
		catch (Exception $e) {
		    return serverAPI::setError($e->getMessage());
		}
	}


	static function publish($serverHash, $Token, $kbitUID) {
		
		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return serverAPI::setError('Access Denied');
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return serverAPI::setError('Expired Token');

    	try {
			return Kbit::publish_changes($kbitUID, $user["UID"]);
		}
		catch (Exception $e) {
		    return serverAPI::setError($e->getMessage());
		}
	}


	static function update($serverHash, $Token, $kbitUID, $title, $desc, $front) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return serverAPI::setError('Access Denied');
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return serverAPI::setError('Expired Token');

    	try {
			return Kbit::add_new_edit_for_kbit($kbitUID, $title, $desc, $user["UID"], $front);
		}
		catch (Exception $e) {
		    return serverAPI::setError($e->getMessage());
		}
	}

	static function addRelatedKbit($serverHash, $Token, $firstUID, $secondUID, $isHier) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return serverAPI::setError('Access Denied');
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return serverAPI::setError('Expired Token');

    	try {
			return Kbit::add_K2K_relation($firstUID, $secondUID, $isHier, $user["UID"]);
		}
		catch (Exception $e) {
		    return serverAPI::setError($e->getMessage());
		}
	}

	static function removeRelatedKbit($serverHash, $Token, $firstUID, $secondUID) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return serverAPI::setError('Access Denied');
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return serverAPI::setError('Expired Token');

    	try {
			return Kbit::remove_K2K_relation($firstUID, $secondUID, $user["UID"]);
		}
		catch (Exception $e) {
		    return serverAPI::setError($e->getMessage());
		}
	}

	static function addTermByUID($serverHash, $Token, $kbitUID, $termUID, $linkType) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return serverAPI::setError('Access Denied');
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return serverAPI::setError('Expired Token');

    	try {
			return Kbit::add_K2T_relation($kbitUID, $termUID, $linkType, $user["UID"]);
		}
		catch (Exception $e) {
		    return serverAPI::setError($e->getMessage());
		}
	}

	static function addTermByScopeUID($serverHash, $Token, $kbitUID, $scopeUID, $termStringText, $termMeaningText, $lang) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return serverAPI::setError('Access Denied');
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return serverAPI::setError('Expired Token');
    	try {
	    	$term = term::add_new_term_with_scope_and_meaning($termStringText, $lang, $user["UID"], $scopeUID, $termMeaningText);
	    	return Kbit::add_K2T_relation($kbitUID, $term["UID"], $linkType, $user["UID"]);
	    }
	    catch (Exception $e) {
		    return serverAPI::setError($e->getMessage());
		}
	}

	static function addTermByTermUIDScopeUID($serverHash, $Token, $kbitUID, $scopeUID, $termUID, $termMeaningText, $lang) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return serverAPI::setError('Access Denied');
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return serverAPI::setError('Expired Token');
    	try {
	    	$term = term::add_sysnonym($scopeUID, $termUID, $termMeaningText, $lang, $user["UID"]);
	    	return Kbit::add_K2T_relation($kbitUID, $term["UID"], $linkType, $user["UID"]);
	    }
	    catch (Exception $e) {
		    return serverAPI::setError($e->getMessage());
		}
	}

	static function addTerm($serverHash, $Token, $kbitUID, $scopeTitle, $scopeDesc, $termStringText, $termMeaningText, $lang) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return serverAPI::setError('Access Denied');
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return serverAPI::setError('Expired Token');
    	try {
    		$termString = term::add_new_term($termStringText, $lang, $user["UID"]);
	    	$term = term::add_new_meaning_under_new_scope($termString["UID"], $lang, $user["UID"], $scopeTitle, $scopeDesc, $termMeaningText);
	    	return Kbit::add_K2T_relation($kbitUID, $term["UID"], $linkType, $user["UID"]);
	    }
	    catch (Exception $e) {
		    return serverAPI::setError($e->getMessage());
		}
	}

	static function removeTerm($serverHash, $Token, $kbitUID, $termUID, $linkType) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return serverAPI::setError('Access Denied');
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return serverAPI::setError('Expired Token');

    	try {
			return Kbit::remove_term_from_Kbit($kbitUID, $termUID, $linkType, $user["UID"]);
		}
		catch (Exception $e) {
		    return serverAPI::setError($e->getMessage());
		}
	}

	// add terms when adding new kbit
	// add terms when editing kbit
	// there are more than one way to build a term:
		// 1) select scope then term string (full term)  -- DONE
		// 2) select scope then create new term string -- DONE
		// 3) select scope select term add new meaning (sysnonim)   -- DONE
}


// // ====================================================================
// // ====================================================================
// // 								Deliveries
// // ====================================================================
// // ====================================================================
class Delivery {

	static function addNew($serverHash, $Token, $title, $desc, $front) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return serverAPI::setError('Access Denied');
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return serverAPI::setError('Expired Token');

    	try {
	    	return Delivery::add_new_Delivery_in_edit_mode($title, $desc, $user["UID"], $front);
    	}
	    catch (Exception $e) {
		    return serverAPI::setError($e->getMessage());
		}
	}


	static function beginEdit($serverHash, $Token, $deliveryUID) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return serverAPI::setError('Access Denied');
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return serverAPI::setError('Expired Token');

    	try {
			return Delivery::begin_editing_Delivery($deliveryUID, $user["UID"]);
		}
	    catch (Exception $e) {
		    return serverAPI::setError($e->getMessage());
		}
	}


	static function cancelEdit($serverHash, $Token, $deliveryUID) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return serverAPI::setError('Access Denied');
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return serverAPI::setError('Expired Token');

    	try {
			return Delivery::cancel_edited_Delivery($deliveryUID, $user["UID"]);
		}
		catch (Exception $e) {
		    return serverAPI::setError($e->getMessage());
		}
	}


	static function publish($serverHash, $Token, $deliveryUID) {
		
		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return serverAPI::setError('Access Denied');
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return serverAPI::setError('Expired Token');

    	try {
			return Delivery::publish_changes($deliveryUID, $user["UID"]);
		}
		catch (Exception $e) {
		    return serverAPI::setError($e->getMessage());
		}
	}


	static function update($serverHash, $Token, $deliveryUID, $title, $desc, $front) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return serverAPI::setError('Access Denied');
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return serverAPI::setError('Expired Token');

    	try {
			return Delivery::add_new_edit_for_Delivery($deliveryUID, $title, $desc, $user["UID"], $front);
		}
		catch (Exception $e) {
		    return serverAPI::setError($e->getMessage());
		}
	}

	static function addRelatedDelivery($serverHash, $Token, $firstUID, $secondUID, $isHier) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return serverAPI::setError('Access Denied');
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return serverAPI::setError('Expired Token');

    	try {
			return Delivery::add_D2D_relation($firstUID, $secondUID, $isHier, $user["UID"]);
		}
		catch (Exception $e) {
		    return serverAPI::setError($e->getMessage());
		}
	}

	static function removeRelatedDelivery($serverHash, $Token, $firstUID, $secondUID) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return serverAPI::setError('Access Denied');
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return serverAPI::setError('Expired Token');

    	try {
			return Delivery::remove_D2D_relation($firstUID, $secondUID, $user["UID"]);
		}
		catch (Exception $e) {
		    return serverAPI::setError($e->getMessage());
		}
	}

	static function addTermByUID($serverHash, $Token, $deliveryUID, $termUID, $linkType) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return serverAPI::setError('Access Denied');
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return serverAPI::setError('Expired Token');

    	try {
			return Delivery::add_D2T_relation($deliveryUID, $termUID, $linkType, $user["UID"]);
		}
		catch (Exception $e) {
		    return serverAPI::setError($e->getMessage());
		}
	}

	static function addTermByScopeUID($serverHash, $Token, $deliveryUID, $scopeUID, $termStringText, $termMeaningText, $lang) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return serverAPI::setError('Access Denied');
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return serverAPI::setError('Expired Token');
    	try {
	    	$term = term::add_new_term_with_scope_and_meaning($termStringText, $lang, $user["UID"], $scopeUID, $termMeaningText);
	    	return Delivery::add_D2T_relation($deliveryUID, $term["UID"], $linkType, $user["UID"]);
	    }
	    catch (Exception $e) {
		    return serverAPI::setError($e->getMessage());
		}
	}

	static function addTermByTermUIDScopeUID($serverHash, $Token, $deliveryUID, $scopeUID, $termUID, $termMeaningText, $lang) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return serverAPI::setError('Access Denied');
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return serverAPI::setError('Expired Token');
    	try {
	    	$term = term::add_sysnonym($scopeUID, $termUID, $termMeaningText, $lang, $user["UID"]);
	    	return Delivery::add_D2T_relation($deliveryUID, $term["UID"], $linkType, $user["UID"]);
	    }
	    catch (Exception $e) {
		    return serverAPI::setError($e->getMessage());
		}
	}

	static function addTerm($serverHash, $Token, $deliveryUID, $scopeTitle, $scopeDesc, $termStringText, $termMeaningText, $lang) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return serverAPI::setError('Access Denied');
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return serverAPI::setError('Expired Token');
    	try {
    		$termString = term::add_new_term($termStringText, $lang, $user["UID"]);
	    	$term = term::add_new_meaning_under_new_scope($termString["UID"], $lang, $user["UID"], $scopeTitle, $scopeDesc, $termMeaningText);
	    	return Delivery::add_D2T_relation($deliveryUID, $term["UID"], $linkType, $user["UID"]);
	    }
	    catch (Exception $e) {
		    return serverAPI::setError($e->getMessage());
		}
	}

	static function removeTerm($serverHash, $Token, $deliveryUID, $termUID, $linkType) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return serverAPI::setError('Access Denied');
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return serverAPI::setError('Expired Token');

    	try {
			return Delivery::remove_term_from_Delivery($deliveryUID, $termUID, $linkType, $user["UID"]);
		}
		catch (Exception $e) {
		    return serverAPI::setError($e->getMessage());
		}
	}

	static function addRelatedKbit($serverHash, $Token, $KbitUID, $DeliveryUID, $linkType, $linkWeight) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return serverAPI::setError('Access Denied');
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return serverAPI::setError('Expired Token');

    	try {
			return Delivery::add_Kbit_to_delivery($KbitUID, $DeliveryUID, $linkType, $linkWeight, $user["UID"]);
		}
		catch (Exception $e) {
		    return serverAPI::setError($e->getMessage());
		}
	}


	static function removeRelatedKbit($serverHash, $Token, $KbitUID, $DeliveryUID, $linkType, $linkWeight) {

		if(serverAPI::validateServerIdentity($serverHash) == false)
    		return serverAPI::setError('Access Denied');
    	$user = usersAPI::validateToken($Token);
    	if($user == null)
    		return serverAPI::setError('Expired Token');

    	try {
			return Delivery::remove_Kbit_from_delivery($KbitUID, $DeliveryUID, $linkType, $user["UID"]);
		}
		catch (Exception $e) {
		    return serverAPI::setError($e->getMessage());
		}
	}
}


    // search

//when in non-wsdl mode the uri option must be specified
// $options=array('uri'=>Configurator::get_webservice_URI());
$options=array('uri'=>'http://localhost:8888/mopdqwompoaskdqomdiasjdiowqe/server/');
//create a new SOAP server
$server = new SoapServer(NULL, $options);
//attach the API class to the SOAP Server
$server->setClass('usersAPI');
//start the SOAP requests handler
$server->handle();

?>


















