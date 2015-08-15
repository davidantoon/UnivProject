<?php
echo 'Scope included successfuly <hr>';
class scope {

	// add new scope
	public static function add_new_scope($title, $description, $user) {
		
		$dbObj = new dbAPI();
		// get new UID
		$UID = $dbObj->get_latest_UID($dbObj->db_get_contentDB(), 'scope');
		$UID++;
		// add record to database
		$query = "INSERT INTO scope (UID, TITLE, DESCRIPTION, ENABLED, USER_ID, CREATION_DATE) VALUES (".
			$UID . ", '". $title . "', '" . $description ."', 1, ". $user .",'". date("Y-m-d H:i:s") ."')";
		$dbObj->run_query($dbObj->db_get_contentDB(), $query);

		// returns an entity of recently added scope
		return scope::get_scope_by_UID($UID);
	}

	// returns a scope by its UID
	public static function get_scope_by_UID($UID) {

		$dbObj = new dbAPI();
		// validate user in database
		$query = "SELECT * FROM scope where UID = '" . $UID . "' AND ENABLED = '1'";
		$results = $dbObj->db_select_query($dbObj->db_get_contentDB(), $query);
		if(count($results) == 0)
			return null;

		return $results[0];	
	}

	// return a list of terms under selected scope
	public static function get_all_terms_of_scope($scope_UID) {

	}


}


?>












