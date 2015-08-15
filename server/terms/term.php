<?php

class term {
	
	


	// 1) add a new term with scope and meaning, if no scope selected create term with 'general scope' and 'general meaning'
	public static function add_new_term_with_scope_and_meaning($term_text, $lang, $user, $scope_text = '', $meaning_text = '') {

		// create single term
		$new_term = term::add_new_term($term_text, $lang, $user);
		
	}

	// add single term to term string
	public static function add_new_term($text, $lang, $user) {

		$dbObj = new dbAPI();
		// get new UID
		$UID = $dbObj->get_latest_UID($dbObj->db_get_contentDB(), 'TERM_STRING');
		$UID++;
		// add record to database
		$query = "INSERT INTO TERM_STRING (UID, TEXT, LANG, ENABLED, USER_ID, CREATION_DATE) VALUES (".
			$UID . ", '". $text . "', '" . $lang ."', 1, ". $user .",'". date("Y-m-d H:i:s") ."')";
		$dbObj->run_query($dbObj->db_get_contentDB(), $query);


		// returns an entity of recently added scope
		return term::get_term_by_UID($UID, $lang);
	}

	// return term by UID and language
	public static get_term_by_UID($UID, $lang) {
		
		$dbObj = new dbAPI();
		// validate user in database
		$query = "SELECT * FROM TERM_STRING where UID = '" . $UID . "' AND LANG = '" . $lang . "' AND ENABLED = '1'";
		$results = $dbObj->db_select_query($dbObj->db_get_contentDB(), $query);
		if(count($results) == 0)
			return null;

		return $results[0];	
	}

	// add language to term
	public static function add_new_language_to_term($UID, $text, $lang, $user) {

		// validate that there is no translation for the same language
		if(count(term::get_term_by_UID($UID, $lang)) > 0)
			return null;

		$dbObj = new dbAPI();
		// add record to database
		$query = "INSERT INTO TERM_STRING (UID, TEXT, LANG, ENABLED, USER_ID, CREATION_DATE) VALUES (".
			$UID . ", '". $text . "', '" . $lang ."', 1, ". $user .",'". date("Y-m-d H:i:s") ."')";
		$dbObj->run_query($dbObj->db_get_contentDB(), $query);

		// returns an entity of recently added term
		return term::get_term_by_UID($UID, $lang);
	}


	// add meaning
	public static function add_meaning($meaning, $lang, $user) {

		$dbObj = new dbAPI();
		// get new UID
		$UID = $dbObj->get_latest_UID($dbObj->db_get_contentDB(), 'TERM_MEAN');
		$UID++;
		// add record to database
		$query = "INSERT INTO TERM_MEAN (UID, TEXT, LANG, ENABLED, USER_ID, CREATION_DATE) VALUES (".
			$UID . ", '". $meaning . "', '" . $lang ."', 1, ". $user .",'". date("Y-m-d H:i:s") ."')";
		$dbObj->run_query($dbObj->db_get_contentDB(), $query);

		// returns an entity of recently added term meaning
		return term::get_term_meaning_by_UID($UID, $lang);
	}

	// return term meaning by UID and language
	public static get_term_meaning_by_UID($UID, $lang) {
		
		$dbObj = new dbAPI();
		// validate user in database
		$query = "SELECT * FROM TERM_MEAN where UID = '" . $UID . "' AND LANG = '" . $lang . "' AND ENABLED = '1'";
		$results = $dbObj->db_select_query($dbObj->db_get_contentDB(), $query);
		if(count($results) == 0)
			return null;

		return $results[0];	
	}
}
?>

















