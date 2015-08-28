<?php

debugLog::included_log("searchQueries");

class searchQueries {


	public static function get_searchable_tables() {

		$dbObj = new dbAPI();
		// validate user in database
		$query = " SELECT * FROM SQL_SELECT_CONFIG ";
		$results = $dbObj->db_select_query($dbObj->db_get_usersDB(), $query);
		if(count($results) == 0)
			return null;

		return $results[0];	
	}

	

	public static function get_user_queries($user_UID) {

		$dbObj = new dbAPI();
		$query = "SELECT * FROM SQL_TEMPLATES where USER_ID = '" . $user_UID . "'";
		$results = $dbObj->db_select_query($dbObj->db_get_usersDB(), $query);
		if(count($results) == 0)
			return array();

		return $results;	
	}

	public static function get_query_by_id($query_id) {

		$dbObj = new dbAPI();
		$query = "SELECT * FROM SQL_TEMPLATES where id = '" . $query_id . "'";
		$results = $dbObj->db_select_query($dbObj->db_get_usersDB(), $query);
		if(count($results) == 0)
			return null;

		return $results[0];	
	}



	public static function save_new_user_query($query_text, $table_name, $query_name, $user_UID) {

		// check if table is searchable
		$arr = searchQueries::get_searchable_tables();
		$contains = false;
		
		for($i = 0; $i < count($arr); $i++)
			if(strtoupper($arr[$i]["TABLE_NAME"]) == strtoupper($table_name))
				$contains = true;

		if($contains == false)
			return false;

		$dbObj = new dbAPI();
		$query = "INSERT INTO SQL_TEMPLATES (USER_ID, QUERY_TEXT, QUERY_NAME, TABLE_NAME) VALUES (". $user_UID . ", '" . $query_text ."', '". $query_name ."', '". $table_name ."')";
		$dbObj->run_query($dbObj->db_get_usersDB(), $query);
		return searchQueries::get_key_value_pair($key, $user_UID);
	}




	public static function update_user_query($query_id, $query_text, $query_name, $user_UID) {

		$query = " UPDATE SQL_TEMPLATES SET QUERY_TEXT = '". $query_text ."', QUERY_NAME = '" . $query_name . "' where  USER_ID = ". $user_UID ." AND id = ". $query_id ." ";
		$dbObj->run_query($dbObj->db_get_usersDB(), $query);
		return searchQueries::get_key_value_pair($key, $user_UID);
	}



	public static function remove_query($key, $user_UID) {

		$dbObj = new dbAPI();
		$query = "DELETE FROM SQL_TEMPLATES  where  USER_ID = ". $user_UID ." AND id = ". $query_id ." ";
		$dbObj->run_query($dbObj->db_get_usersDB(), $query);
		return true;
	}



	public static function run_query($query_id, $user) {

		$query = searchQueries::get_query_by_id($query_id);
		if($query == null)
			return array();

		if($query["TABLE_NAME"] == 'DELIVERY_BASE')
			return Delivery::serach_deliveries_by_query($query["QUERY_TEXT"], $user);
		if($query["TABLE_NAME"] == 'KBIT_BASE')
			return Kbit::serach_kbits_by_query($query["QUERY_TEXT"], $user);
	}

}

?>





