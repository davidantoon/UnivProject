<?php
/*
 * PHP database connector
 */

//a basic API for database connector
debugLog::included_log("Users");
// include 'DBobject.php';

class users {
     
	public $id;
	public $UID;
	public $first_name;
	public $last_name;
	public $username;
	private $password;
	public $email;
	public $creation_date;
	public $profile_picture;
	public $role;

	// add new user
	public static function add_new_user($first_name, $last_name, $username, $password, $email, $profile_picture, $role) {

		if(!users::is_username_available($username))
			return false;
		$dbObj = new dbAPI();

		$UID = $dbObj->get_latest_UID($dbObj->db_get_usersDB(), 'users');
		$UID++;

		$query = "INSERT INTO users (UID, FIRST_NAME, LAST_NAME, USERNAME, PASSWORD, EMAIL, PROFILE_PICTURE, ROLE, CREATION_DATE) VALUES (". $UID . ", '". $first_name . "', '" . $last_name ."', '". $username ."', '". $password ."', '". $email ."', '". $profile_picture . "', ". $role .",'". date("Y-m-d H:i:s") ."')";

		$dbObj->run_query($dbObj->db_get_usersDB(), $query);

		return true;
	}

	// is available user by username
	private static function is_username_available($username) {
		echo $username;
		$dbObj = new dbAPI();
		$query = "SELECT count(USERNAME) AS count_user FROM users where USERNAME = '" . $username . "'";
		$results = $dbObj->db_select_query($dbObj->db_get_usersDB(), $query);
		if($results[0]["count_user"] > 0)
			return false;
		return true;	
	}

	// update user

	// validate username and password
	public static function validate_username_password($username, $password) {

		$dbObj = new dbAPI();
		// validate user in database
		$query = "SELECT * FROM users where USERNAME = '" . $username . "' AND PASSWORD = '" . $password . "'";
		$results = $dbObj->db_select_query($dbObj->db_get_usersDB(), $query);
		if(count($results) == 0)
			return null;
		// create token if user logged in
		$token = users::create_new_token($username);
		// // update token and hide password in returned value
		$results[0]["token"] = $token;
		$results[0]["PASSWORD"] = '*********';

		return $results[0];	
	}

	// // change password
	public static function change_password($username, $password, $new_password) {

		// validate user existance
		$tempUser = users::validate_username_password($username, $password);
		if($tempUser == null)
			return null;

		// update user's password in database
		$dbObj = new dbAPI();
		$query = "UPDATE users SET PASSWORD = '". $new_password ."' where USERNAME = '" . $username . "'";
		$results = $dbObj->run_query($dbObj->db_get_usersDB(), $query);
		if($results) {
			// create a new token to invalidate old tokens
			return users::validate_username_password($username, $new_password);
		}

		debugLog::debug_log("change password for user: ". $username ." has failed");
		return null;
	}

	// validate token
	public static function validate_token($token) {

		$dbObj = new dbAPI();
		$query = "SELECT * FROM users where TOKEN = '" . $token . "'";
		$results = $dbObj->db_select_query($dbObj->db_get_usersDB(), $query);
		if(count($results) == 0)
			return null;
		$results[0]["PASSWORD"] = '*********';
		return $results[0];	
	}

	// // log out user by removing token
	public static function log_out($username) {

		$dbObj = new dbAPI();
		$query = "UPDATE users SET TOKEN = '' where USERNAME = '" . $username . "'";
		$results = $dbObj->run_query($dbObj->db_get_usersDB(), $query);
		if($results)
			return true;
		debugLog::debug_log("logout for user: ". $username ." has failed");
		return false;
	}

	// generates a new token for logged in user
	private static function create_new_token($username) {

		try {
			$token = users::generateRandomString();
			$dbObj = new dbAPI();
			$query = "UPDATE users SET TOKEN = '". $token ."' where USERNAME = '" . $username . "'";
			$results = $dbObj->run_query($dbObj->db_get_usersDB(), $query);
			if($results){
				echo $results;
				return $token;
			}
			debugLog::debug_log("create token for user: ". $username ." has failed");
			return null;
		} catch (Exception $e) {
		    echo 'Caught exception: ',  $e->getMessage(), "\n";
		}
	}

	// generates tokens
	private static function generateRandomString($length = 100) {
	    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	    $charactersLength = strlen($characters);
	    $randomString = '';
	    for ($i = 0; $i < $length; $i++) {
	        $randomString .= $characters[rand(0, $charactersLength - 1)];
	    }
	    return $randomString;
	}


}

?>




















