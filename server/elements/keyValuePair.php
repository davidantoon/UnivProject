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
		$temp = $results[0];
		$temp["OBJECT_VALUE"] = keyValuePair::getFileData($results[0]["OBJECT_VALUE"]);

		return $temp;//$results[0];	
	}


	private static function get_key_value_object($key, $user_UID) {

		debugLog::trace(__FILE__, __FUNCTION__, func_get_args());

		$dbObj = new dbAPI();
		// validate user in database
		$query = "SELECT * FROM KEY_VALUE_PAIR where OBJECT_KEY = '" . $key . "' AND USER_ID = '" . $user_UID . "'";
		$results = $dbObj->db_select_query($dbObj->db_get_usersDB(), $query);

		if(count($results) == 0)
			return null;
		$temp = $results[0];
		// $temp["OBJECT_VALUE"] = keyValuePair::getFileData($results[0]["OBJECT_VALUE"]);

		return $temp;//$results[0];	
	}

	public static function set_key_value_pair($key, $value, $user_UID) {

		debugLog::trace(__FILE__, __FUNCTION__, func_get_args());

		$dbObj = new dbAPI();
		$t = keyValuePair::get_key_value_object($key, $user_UID);
		debugLog::important_log("<i>[keyValuePair.php:ttttt]</i>". dbAPI::print_json_s($t, 0));
		
		if($t == null) {

			$value = keyValuePair::createFileWithData($user_UID . '_' . base_convert($key, 16, 10), $value);
			$query = "INSERT INTO KEY_VALUE_PAIR (OBJECT_KEY, OBJECT_VALUE, USER_ID, CREATION_DATE) VALUES ('". $key . "', '" . $value ."', ". $user_UID .",'". date("Y-m-d H:i:s") ."')";
			$dbObj->run_query($dbObj->db_get_usersDB(), $query);
		}
		else {
			keyValuePair::createActualFile($t["OBJECT_VALUE"], $value);
			// $query = "UPDATE KEY_VALUE_PAIR SET OBJECT_VALUE = '". $value ."' where OBJECT_KEY = '" . $key . "' AND USER_ID = ". $user_UID . " ";
		}

		// return keyValuePair::get_key_value_pair($key, $user_UID);
		return true;
	}


	public static function remove_key_value_pair($key, $user_UID) {

		debugLog::trace(__FILE__, __FUNCTION__, func_get_args());

		$dbObj = new dbAPI();
		$query = "DELETE FROM KEY_VALUE_PAIR where OBJECT_KEY = '" . $key . "' AND USER_ID = ". $user_UID . " ";
		$dbObj->run_query($dbObj->db_get_usersDB(), $query);
	}



	private static function createFileWithData($prefix, $data) {
		
		debugLog::trace(__FILE__, __FUNCTION__, func_get_args());
		try {
			$dir = 'elements/kvpData/';
			$file_name = $dir . $prefix . '_' . uniqid() . '.kvp';
			keyValuePair::createActualFile($file_name, $data);
			return $file_name;
		}
		catch(Exception $e){
			debugLog::important_log("<i>[keyValuePair.php:Exception]</i>". $e->getMessage());
			
		}
	}

	private static function createActualFile($file_name, $data) {
		file_put_contents($file_name, $data/*, FILE_APPEND*/);
	}

	private static function getFileData($file_name) {

		debugLog::trace(__FILE__, __FUNCTION__, func_get_args());

		return file_get_contents($file_name);
	}
}


?>
