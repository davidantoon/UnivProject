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


	// add new language to term
	// add new term meaning to scope+term
	// add new term meaning language to scope+term

	// add term to scope
	public static function add_new_term($scopeUID, $term, $meaning, $lang, $user) {

		// add term to database
		$term = term::add_new_term($term, $lang, $user);
		if($term == null)
			return null;

		// extract termUID
		$termUID = $term[0]["UID"];
		// add term meaning to term and scope
		$term_meaning = scope::add_new_meaning_to_term($meaning, $termUID, $scopeUID, $lang, $user);
		
		// validate that the connection was successfully added
		if($term_meaning == null)
			return null;


	}

	// add new term with meaning to term in scope
	public static function add_new_meaning_to_term($meaning, $termUID, $scopeUID, $lang, $user) {
		
		// add new meaning
		$temp = term::add_meaning($meaning, $lang, $user);
		
		// validate the the term meaning was created successfully
		if($temp == null)
			return null;
		// extract term meaning UID
		$term_meaning_UID = $temp[0]["UID"];
		// connection term + meaning + scope
		$dbObj = new dbAPI();
		// get new UID
		$UID = $dbObj->get_latest_UID($dbObj->db_get_contentDB(), 'TERMS');
		$UID++;
		// add record to database
		$query = "INSERT INTO TERMS (UID, ID_TERM_MEAN, ID_SCOPE, ID_TERM_STRING, ENABLED, USER_ID, CREATION_DATE) VALUES (".
			$UID . ", '". $term_meaning_UID . "', '" . $scopeUID ."', '" . $termUID ."', 1, ". $user .",'". date("Y-m-d H:i:s") ."')";
		$dbObj->run_query($dbObj->db_get_contentDB(), $query);

		// returns an entity of recently added connection
		return scope::get_connection_by_UID($UID);
	}


	// returns a term + meaning + scope connection by its UID
	public static function get_connection_by_UID($UID) {

		$dbObj = new dbAPI();
		$query = "SELECT * FROM TERMS where UID = '" . $UID . "' AND ENABLED = '1'";
		$results = $dbObj->db_select_query($dbObj->db_get_contentDB(), $query);
		if(count($results) == 0)
			return null;

		return $results[0];	
	}



}


?>












