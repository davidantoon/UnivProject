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
	public static function validateServerIdentity($hash) {
    	return $hash == 'DAVID&AMEER';
    }

    public static function setError($message) {
    	return array("Error"=>$message);
    }
}



// ====================================================================
// ====================================================================
// 								users
// ====================================================================
// ====================================================================
class usersAPI {

    function hello($hash) {
    	// return Delivery::get_Delivery_by_UID(1039);
    	return serverAPI::validateServerIdentity($hash);
    }

    function signUp($serverHash, $firstName, $lastName, $username, $password, $email, $profilePicture, $role = '') {
    	
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

    function logIn($serverHash, $username, $password) {

    	if(serverAPI::validateServerIdentity($serverHash) == false)
    		return serverAPI::setError('Access Denied');
    	try {
	    	users::validate_username_password($username, $password);
	    }
	    catch (Exception $e) {
		    return serverAPI::setError($e->getMessage());
		}
    }

    function static validateToken($token) {
    	
    	return users::validate_token($token);
    }
}



// ====================================================================
// ====================================================================
// 								terms
// ====================================================================
// ====================================================================
class termsAPI {

    // function addNewTerm($serverHash, $Token, $termString, $lang, $scopeUID, $meaning) {

    	
    // 	if(serverAPI::validateServerIdentity($serverHash) == false)
    // 		return serverAPI::setError('Access Denied');
    // 	$user = usersAPI::validateToken($Token);
    // 	if($user == null)
    // 		return serverAPI::setError('Expired Token');
    	
    // 	try {
	   //  	return term::add_new_term_with_scope_and_meaning($termString, $lang, $user["UID"], $scopeUID, $meaning);
	   //  }
	   //  catch(Exception $e) {
	   //  	return serverAPI::setError($e->getMessage());
	   //  }
    // }


    // function addNewTermMeaning($serverHash, $Token, $termStringID, $lang, $scopeUID, $meaning) {
    	
    // 	if(serverAPI::validateServerIdentity($serverHash) == false)
    // 		return serverAPI::setError('Access Denied');
    // 	$user = usersAPI::validateToken($Token);
    // 	if($user == null)
    // 		return serverAPI::setError('Expired Token');

    // 	return term::add_new_meaning_under_new_scope($termStringID, $lang, $user["UID"], $scope_text = '', $scope_desc, $meaning_text = '');
    // }
    // function getAllTerms()
    // function searchTerms()
    // function addTermToTermRelation()
}



// ====================================================================
// ====================================================================
// 								scopes
// ====================================================================
// ====================================================================
// class scopesAPI {

// 	function addNewScope()
// 	function getAllScopes()
// 	function searchScopes()
// 	function addScopeToScopeRelation()
// }



// ====================================================================
// ====================================================================
// 								Kbits
// ====================================================================
// ====================================================================
class Kbit {

	function addNew($serverHash, $Token, $title, $desc, $front) {

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


	function beginEdit($serverHash, $Token, $kbitUID) {

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


	function cancelEdit($serverHash, $Token, $kbitUID) {

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


	function publish($serverHash, $Token, $kbitUID) {
		
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


	function update($serverHash, $Token, $kbitUID, $title, $desc, $front) {

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

	function addRelatedKbit($serverHash, $Token, $firstUID, $secondUID, $isHier) {

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

	function removeRelatedKbit($serverHash, $Token, $firstUID, $secondUID) {

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

	function addTerm($serverHash, $Token, $kbitUID, $termUID, $linkType) {

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

	function removeTerm($serverHash, $Token, $kbitUID, $termUID, $linkType) {

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
		// 1) select scope then term string (full term)
		// 2) select scope then create new term string
		// 3) select scope select term add new meaning (sysnonim)
}


// ====================================================================
// ====================================================================
// 								Deliveries
// ====================================================================
// ====================================================================
class Delivery {

	// function addNewDelivery($serverHash, $Token)
	// function beginEdit($serverHash, $Token)
	// function cancelEdit($serverHash, $Token)
	// function publish($serverHash, $Token)
	// function update($serverHash, $Token)
	// function addTerm($serverHash, $Token)
	// function addRelatedDelivery($serverHash, $Token)
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


















