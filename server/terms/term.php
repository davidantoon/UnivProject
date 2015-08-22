<?php
debugLog::included_log("Term");

class term {
	
	


	// 1) add a new term with scope and meaning, if no scope selected create term with 'general scope' and 'general meaning'
	public static function add_new_term_with_scope_and_meaning($term_text, $lang, $user, $scope_UID = '', $meaning_text = '') {

		// create single term
		$new_term = term::add_new_term($term_text, $lang, $user);
		
		// get selected scope
		// check if there is specific scope
		if($scope_UID == '') {
			$scope_UID = '0'; // 0 means general scope
			// check if there is a general scope in database
			$selected_scope = scope::get_scope_by_UID(0);
			if($selected_scope == null) {
				// create new general scope record in database
				$selected_scope = scope::add_new_scope("General", "General scope", $user);
			}
		}
		else
			$selected_scope = scope::get_scope_by_UID($scope_UID);

		if($selected_scope == null){
			debugLog::debug_log("could not locate scope \"". $scope_UID ."\"");
			return null;
		}

		// check if a meaning is attached and add it to database
		if($meaning_text == '') {
			// create new general meaning
			$new_meaning = term::add_meaning("General", $lang, $user);
		}
		else // add specific meaning to database
			$new_meaning = term::add_meaning($meaning_text, $lang, $user);

		// add new connection record to TERMS table that creates relation between scope, term and meaning		
		$dbObj = new dbAPI();
		// get new UID
		$UID = $dbObj->get_latest_UID($dbObj->db_get_contentDB(), 'TERMS');
		$UID++;
		// add record to database
		$query = "INSERT INTO TERMS (UID, ID_TERM_MEAN, ID_SCOPE, ID_TERM_STRING, ENABLED, USER_ID, CREATION_DATE) VALUES (".
			$UID . ", '". $new_meaning["UID"] . "', '" . $selected_scope["UID"] ."', '" . $new_term["UID"] ."', 1, ". $user .",'". date("Y-m-d H:i:s") ."')";
		$dbObj->run_query($dbObj->db_get_contentDB(), $query);

		// returns an entity of recently added connection
		return term::get_connection_by_UID($UID);
	}


	// 2) add new meaning under new scope
	public static function add_new_meaning_under_new_scope($termUID, $lang, $user, $scope_text = '', $scope_desc, $meaning_text = '') {

		// get term
		$selected_term = term::get_term_by_UID($termUID, $lang);
		if($selected_term == null) {
			debugLog::debug_log("could not locate the term \"". $termUID ."\"");
			return null;
		}

		// create new scope
		$selected_scope = scope::add_new_scope($scope_text, $scope_desc, $user);
		if($selected_scope == null) {
			debugLog::debug_log("could not create the scope \"". $scope_text ."\", \"". $scope_desc ."\"");
			return null;
		}	
		
		// add meaning to database
		$new_meaning = term::add_meaning($meaning_text, $lang, $user);

		// add new connection record to TERMS table that creates relation between scope, term and meaning		
		$dbObj = new dbAPI();
		// get new UID
		$UID = $dbObj->get_latest_UID($dbObj->db_get_contentDB(), 'TERMS');
		$UID++;
		// add record to database
		$query = "INSERT INTO TERMS (UID, ID_TERM_MEAN, ID_SCOPE, ID_TERM_STRING, ENABLED, USER_ID, CREATION_DATE) VALUES (".
			$UID . ", '". $new_meaning["UID"] . "', '" . $selected_scope["UID"] ."', '" . $termUID ."', 1, ". $user .",'". date("Y-m-d H:i:s") ."')";
		$dbObj->run_query($dbObj->db_get_contentDB(), $query);

		// returns an entity of recently added connection
		return term::get_connection_by_UID($UID);
	}

	// 3) add new scope under specific meaining
	public static function add_new_scope_under_specific_meaning($termUID, $meaningUID, $user, $scope_text = '', $scope_desc) {

		// create new scope
		$new_scope = scope::add_new_scope($scope_text, $scope_desc, $user);
		if($new_scope == null) {
			debugLog::debug_log("could not create the scope \"". $scope_text ."\", \"". $scope_desc ."\"");
			return null;
		}	

		// add new connection record to TERMS table that creates relation between scope, term and meaning		
		$dbObj = new dbAPI();
		// get new UID
		$UID = $dbObj->get_latest_UID($dbObj->db_get_contentDB(), 'TERMS');
		$UID++;
		// add record to database
		$query = "INSERT INTO TERMS (UID, ID_TERM_MEAN, ID_SCOPE, ID_TERM_STRING, ENABLED, USER_ID, CREATION_DATE) VALUES (".
			$UID . ", '". $meaningUID . "', '" . $new_scope["UID"] ."', '" . $termUID ."', 1, ". $user .",'". date("Y-m-d H:i:s") ."')";
		$dbObj->run_query($dbObj->db_get_contentDB(), $query);

		// returns an entity of recently added connection
		return term::get_connection_by_UID($UID);
	}


	// 4) edit meaning under specific scope
	public static function edit_meaning($relationUID, $new_meaning, $lang) {

		$rel = term::get_connection_by_UID($relationUID);
		if($rel == null) {
			debugLog::debug_log("[edit_meaning]: could not locate relation \"". $relationUID ."\"");
			return null;
		}
		// update meaning in database
		$dbObj = new dbAPI();
		$query = "UPDATE TERM_MEAN SET TEXT = '". $new_meaning ."' where UID = " . $rel["ID_TERM_MEAN"] .
		 " AND  lang = '" . $lang . "' ";
		$results = $dbObj->run_query($dbObj->db_get_contentDB(), $query);
		if($results) {
			// if success return new meaning
			return term::get_term_meaning_by_UID($rel["ID_TERM_MEAN"], $lang);
		}
		// on error, log and return null
		debugLog::debug_log("[edit_meaning]: could not update term meaning ". $relationUID);
		return null;
	}


	// 5) add synonyms to scope and term (hence, adding new meaning under specific scope)
	public static function add_sysnonym($scope_UID, $term_UID, $new_meaning, $lang, $user) {

		// check if a term exists
		if(term::get_term_by_UID($term_UID, $lang) == null) {

			debugLog::debug_log("could not locate the term '". $term_UID . "' with lang '". $lang . "'");
			return null;
		}
		// add new meaning/synonym
		$meaning = term::add_meaning($new_meaning, $lang, $user);

		// add new connection record to TERMS table that creates relation between scope, term and meaning		
		$dbObj = new dbAPI();
		// get new UID
		$UID = $dbObj->get_latest_UID($dbObj->db_get_contentDB(), 'TERMS');
		$UID++;
		// add record to database
		$query = "INSERT INTO TERMS (UID, ID_TERM_MEAN, ID_SCOPE, ID_TERM_STRING, ENABLED, USER_ID, CREATION_DATE) VALUES (".
			$UID . ", '". $meaning["UID"] . "', '" . $scope_UID ."', '" . $term_UID ."', 1, ". $user .",'". date("Y-m-d H:i:s") ."')";
		$dbObj->run_query($dbObj->db_get_contentDB(), $query);

		// returns an entity of recently added connection
		return term::get_connection_by_UID($UID);

		return null;
	}

	// 6) add new language to term
	public static function add_translation_to_term($term_UID, $text, $lang, $user) {

		// check if a term exists
		if(term::get_term_by_UID($term_UID) == null) {

			debugLog::debug_log("could not locate the term '". $term_UID . "'");
			return null;
		}

		if(term::get_term_by_UID($term_UID, $lang) != null) {

			debugLog::debug_log("adding translation to term ('". $term_UID . "') with already existing language ('". $lang . "') is prohibited");
			return null;
		}

		$dbObj = new dbAPI();
		// add record to database
		$query = "INSERT INTO TERM_STRING (UID, TEXT, LANG, ENABLED, USER_ID, CREATION_DATE) VALUES (".
			$term_UID . ", '". $text . "', '" . $lang ."', 1, ". $user .",'". date("Y-m-d H:i:s") ."')";
		$dbObj->run_query($dbObj->db_get_contentDB(), $query);


		// returns an entity of recently added scope
		return term::get_term_by_UID($term_UID, $lang);
	}

	// 7) add new language to term meaning
	public static function add_translation_to_term_meaning($meaning_UID, $text, $lang, $user) {

		// check if a term meaning exists
		if(term::get_term_meaning_by_UID($meaning_UID) == null) {

			debugLog::debug_log("could not locate the term meaning '". $meaning_UID . "'");
			return null;
		}
		// check if the same translation exists
		if(term::get_term_meaning_by_UID($meaning_UID, $lang) != null) {

			debugLog::debug_log("adding translation to term meaning ('". $meaning_UID . "') with already existing language ('". $lang . "') is prohibited");
			return null;
		}

		$dbObj = new dbAPI();

		// add record to database
		$query = "INSERT INTO TERM_MEAN (UID, TEXT, LANG, ENABLED, USER_ID, CREATION_DATE) VALUES (".
			$meaning_UID . ", '". $text . "', '" . $lang ."', 1, ". $user .",'". date("Y-m-d H:i:s") ."')";
		$dbObj->run_query($dbObj->db_get_contentDB(), $query);


		// returns an entity of recently added scope
		return term::get_term_meaning_by_UID($meaning_UID, $lang);
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
	public static function get_term_by_UID($UID, $lang = '') {
		
		$dbObj = new dbAPI();
		// validate user in database
		$query = "SELECT * FROM TERM_STRING where UID = '" . $UID . "' AND LANG = '" . $lang . "' AND ENABLED = '1'";
		if($lang == '')
			$query = "SELECT * FROM TERM_STRING where UID = '" . $UID . "' AND ENABLED = '1'";
		$results = $dbObj->db_select_query($dbObj->db_get_contentDB(), $query);
		if(count($results) == 0)
			return null;

		$selected_term = $results[0];

		if($lang != '')
			return $selected_term;

		// get term's other languages
		$other_langs = term::get_term_by_UID_in_all_languages($UID);
		if(count($other_langs) > 1) {
			for($i=0; $i<count($other_langs); $i++) {
				if($other_langs[$i] == $selected_term) {
					unset($other_langs[$i]);
				}
			}
			$selected_term["other_langs"] = array();
			$selected_term["other_langs"] = array_merge($selected_term["other_langs"], $other_langs);
		}
		return $selected_term;
	}

	// return term by UID in all languages language
	private static function get_term_by_UID_in_all_languages($UID) {
		
		$dbObj = new dbAPI();
		// validate user in database
		$query = "SELECT * FROM TERM_STRING where UID = '" . $UID . "' AND ENABLED = '1'";
		$results = $dbObj->db_select_query($dbObj->db_get_contentDB(), $query);
		return $results;
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
	public static function get_term_meaning_by_UID($UID, $lang = '') {
		
		$dbObj = new dbAPI();
		// validate user in database
		$query = "SELECT * FROM TERM_MEAN where UID = '" . $UID . "' AND LANG = '" . $lang . "' AND ENABLED = '1'";
		if($lang == '')
			$query = "SELECT * FROM TERM_MEAN where UID = '" . $UID . "' AND ENABLED = '1'";
		$results = $dbObj->db_select_query($dbObj->db_get_contentDB(), $query);
		if(count($results) == 0)
			return null;

		$selected_meaning = $results[0];

		if($lang != '')
			return $selected_meaning;

		// get other languages
		$other_langs = term::get_term_meaning_by_UID_in_all_languages($UID);
		if(count($other_langs) > 1) {
			for($i=0; $i<count($other_langs); $i++) {
				if($other_langs[$i] == $selected_meaning) {
					unset($other_langs[$i]);
				}
			}
			$selected_meaning["other_langs"] = array();
			$selected_meaning["other_langs"] = array_merge($selected_meaning["other_langs"], $other_langs);
		}

		return $selected_meaning;
	}


	// return term meaning by UID in all languages
	private static function get_term_meaning_by_UID_in_all_languages($UID) {
		
		$dbObj = new dbAPI();
		// validate user in database
		$query = "SELECT * FROM TERM_MEAN where UID = '" . $UID . "' AND ENABLED = '1'";
		$results = $dbObj->db_select_query($dbObj->db_get_contentDB(), $query);
		return $results;
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





	// relate term to another
	public static function add_relation_to_terms($parent_term_UID, $child_term_UID, $is_hier, $user) {
		// create relation between two terms
		if(refRelation::add_relation_to_object($parent_term_UID, $child_term_UID, $is_hier, $user, 'R_Lt2t') == null) {
			debugLog::log("parent term (". $parent_term_UID .") and child (". $child_term_UID .") term cannot be the same");
			return null;
		}
		// return recently created relation
		return refRelation::get_objects_relation($parent_term_UID, $child_term_UID, 'R_Lt2t');
	}



	// remove relation
	public static function remove_relation($parent_term_UID, $child_term_UID) {

		refRelation::remove_relation($parent_term_UID, $child_term_UID, 'R_Lt2t');
	}

	// returns related terms
	public static function get_relations_of_term($term_UID, $lang = '') {

		return refRelation::get_relations_of_object($term_UID, 'R_Lt2t', 'term::get_term_by_UID', $lang);
	}

	// get related terms
	public static function get_term_by_UID_with_relations($UID, $lang = '') {

		// check if term exists
		$term = term::get_term_by_UID($UID, $lang);
		if($term == null)
			return null;
		// add related terms to term
		$term["RELATED_TERMS"] = term::get_relations_of_term($UID, $lang);

		// add term's scopes
		$term["SCOPES"] = term::get_scopes_of_term($UID, $lang);
		return $term;
	}


	// // get term by UID and scope with meaning
	// public static function get_term_by_UID_with_meanings($UID, $scope_UID, $lang = '') {

	// 	// check if term exists
	// 	$term = term::get_term_by_UID($UID, $lang);
	// 	if($term == null)
	// 		return null;
		
	// 	// add meanings of term by scope
	// 	$term["MEANING"] = term::get_scopes_of_term($UID, $lang);

	// 	// add related terms to term
	// 	$term["RELATED_TERMS"] = term::get_relations_of_term($UID, $lang);

	// 	return $term;
	// }


	public static function get_scopes_of_term($term_UID, $lang = '') {

		$scopes = array();

		// extract scope terms relations
		$dbObj = new dbAPI();
		$query = "SELECT * FROM TERMS where ENABLED = 1 AND ( ID_TERM_STRING = " . $term_UID .  ")";
		$scopes_related = $dbObj->db_select_query($dbObj->db_get_contentDB(), $query);

		if($scopes_related == null)
			return null;
		// get scopes and meanings details
		for($i=0; $i<count($scopes_related); $i++) {
			$curr_scope = scope::get_scope_by_UID($scopes_related[$i]["ID_SCOPE"], $lang);
			$curr_meaning = term::get_term_meaning_by_UID($scopes_related[$i]["ID_TERM_MEAN"], $lang);
			if($curr_scope != null) {
				array_push($scopes, array('scope'=>$curr_scope, 'meaning'=>$curr_meaning));
			}
		}

		return $scopes;
	}

	
}
?>

















