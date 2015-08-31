<?php

debugLog::included_log("keyValuePair");

class keyValuePair {

	public static function get_key_value_pair($key, $user_UID) {

		debugLog::trace(__FILE__, __FUNCTION__, func_get_args());

		$dbObj = new dbAPI();
		// validate user in database
		$query = "SELECT * FROM KEY_VALUE_PAIR where OBJECT_KEY = '" . $key . "' AND USER_ID = '" . $user_UID . "'";
		$results = $dbObj->db_select_query($dbObj->db_get_usersDB(), $query);
		if(count($results) == 0)
			return null;

		return $results[0];	
	}


	public static function set_key_value_pair($key, $value, $user_UID) {

		debugLog::trace(__FILE__, __FUNCTION__, func_get_args());

		$dbObj = new dbAPI();
		if(keyValuePair::get_key_value_pair($key, $user_UID) == null) {
			$query = "INSERT INTO KEY_VALUE_PAIR (OBJECT_KEY, OBJECT_VALUE, USER_ID, CREATION_DATE) VALUES ('". $key . "', '" . $value ."', ". $user_UID .",'". date("Y-m-d H:i:s") ."')";
		}
		else {
			$query = "UPDATE KEY_VALUE_PAIR SET OBJECT_VALUE = '". $value ."' where OBJECT_KEY = '" . $key . "' AND USER_ID = ". $user_UID . " ";
		}
		$dbObj->run_query($dbObj->db_get_usersDB(), $query);
		return keyValuePair::get_key_value_pair($key, $user_UID);
	}


	public static function remove_key_value_pair($key, $user_UID) {

		debugLog::trace(__FILE__, __FUNCTION__, func_get_args());

		$dbObj = new dbAPI();
		$query = "DELETE FROM KEY_VALUE_PAIR where OBJECT_KEY = '" . $key . "' AND USER_ID = ". $user_UID . " ";
		$dbObj->run_query($dbObj->db_get_usersDB(), $query);
	}
}


?>
