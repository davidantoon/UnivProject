<?php
debugLog::included_log("Scope");

class scope {

	// add new scope
	public static function add_new_scope($title, $description, $user) {

		debugLog::trace(__FILE__, __FUNCTION__, func_get_args());
		
		$dbObj = new dbAPI();
		// get new UID
		$UID = $dbObj->get_latest_UID($dbObj->db_get_contentDB(), 'SCOPE');
		$UID++;
		// add record to database
		$query = "INSERT INTO SCOPE (UID, TITLE, DESCRIPTION, ENABLED, USER_ID, CREATION_DATE) VALUES (".
			$UID . ", '". $title . "', '" . $description ."', 1, ". $user .",'". date("Y-m-d H:i:s") ."')";
		$dbObj->run_query($dbObj->db_get_contentDB(), $query);

		// returns an entity of recently added scope
		return scope::get_scope_by_UID($UID);
	}

	// returns a scope by its UID
	public static function get_scope_by_UID($UID) {

		debugLog::trace(__FILE__, __FUNCTION__, func_get_args());

		$dbObj = new dbAPI();
		$query = "SELECT * FROM SCOPE where UID = '" . $UID . "' AND ENABLED = '1'";
		$results = $dbObj->db_select_query($dbObj->db_get_contentDB(), $query);
		if(count($results) == 0)
			return null;

		return $results[0];	
	}
	

	public static function get_scope_with_relations($Scope, $lang = '') {

		debugLog::trace(__FILE__, __FUNCTION__, func_get_args());

		// check if scope exists
		if($Scope == null)
			return null;

		// add related scopes to scope object
		$Scope["RELATED_SCOPES"] = scope::get_relations_of_scope($Scope["UID"]);

		$Scope["TERMS"] = scope::get_terms_of_scope($Scope["UID"], $lang);
		return $Scope;
	}


	public static function get_scope_by_UID_with_relations($UID, $lang = '') {

		debugLog::trace(__FILE__, __FUNCTION__, func_get_args());

		// check if scope exists
		$Scope = scope::get_scope_by_UID($UID);
		if($Scope == null)
			return null;

		// add related scopes to scope object
		$Scope["RELATED_SCOPES"] = scope::get_relations_of_scope($UID);

		$Scope["TERMS"] = scope::get_terms_of_scope($UID, $lang);
		return $Scope;
	}


	public static function serach_scopes($search_word, $search_fields, $lang = '') {

		debugLog::trace(__FILE__, __FUNCTION__, func_get_args());

		$dbObj = new dbAPI();

		for($i=0; i<count($search_fields); $i++) {
			$search_fields[$i] = "UPPER(" . $search_fields[$i] . ") LIKE UPPER('%" . $search_word . "%') "; 
		}
		$search_sttmnt = implode(" OR ", $search_fields);

		$query = "SELECT * FROM SCOPE where  ENABLED = '1' AND (". $search_sttmnt .")";
		$results = $dbObj->db_select_query($dbObj->db_get_contentDB(), $query);
		if(count($results) == 0)
			return array();

		for($i=0; $i<count($results); $i++) {
			$results[$i] = scope::get_scope_with_relations($results[$i], $lang);
		}
		
		return $results;	
	}

	public static function serach_scopes2($search_word) {

		debugLog::trace(__FILE__, __FUNCTION__, func_get_args());

		$query = "SELECT UID as 'SCOPE_UID', TITLE as 'SCOPE_TITLE', DESCRIPTION as 'SCOPE_DESCRIPTION' from [DB_NAME].SCOPE where (UPPER(TITLE) LIKE UPPER('%[SEARCH_WORD]%') OR UPPER(DESCRIPTION) LIKE UPPER('%[SEARCH_WORD]%')) AND ENABLED = 1";
		$dbObj = new dbAPI();
		$query = str_replace('[DB_NAME]', $dbObj->db_get_contentDB(), $query);
		$query = str_replace('[SEARCH_WORD]', $search_word, $query);
		$results = $dbObj->db_select_query($dbObj->db_get_contentDB(), $query);
		return $results;
	}




	// relate scope to another
	public static function add_relation_to_scope($parent_scope_UID, $child_scope_UID, $is_hier, $user) {

		debugLog::trace(__FILE__, __FUNCTION__, func_get_args());

		// create relation between two terms
		if(refRelation::add_relation_to_object($parent_scope_UID, $child_scope_UID, $is_hier, $user, 'R_Ls2s') == null) {
			debugLog::log("parent SCOPE (". $parent_scope_UID .") and child (". $child_scope_UID .") scope cannot be the same");
			return null;
		}
		// return recently created relation
		return refRelation::get_objects_relation($parent_scope_UID, $child_scope_UID, 'R_Ls2s');
	}

	// remove relation
	public static function remove_relation($parent_scope_UID, $child_scope_UID) {

		debugLog::trace(__FILE__, __FUNCTION__, func_get_args());

		refRelation::remove_relation($$parent_scope_UID, $child_scope_UID, 'R_Ls2s');
	}


	public static function get_relations_of_scope($scope_UID) {

		debugLog::trace(__FILE__, __FUNCTION__, func_get_args());

		return refRelation::get_relations_of_object($scope_UID, 'R_Ls2s', 'scope::get_scope_by_UID');
	}


	public static function get_terms_of_scope($scope_UID, $lang = '') {

		debugLog::trace(__FILE__, __FUNCTION__, func_get_args());

		$terms = array();

		// extract scope terms relations
		$dbObj = new dbAPI();
		$query = "SELECT * FROM TERMS where ENABLED = 1 AND ( ID_SCOPE = " . $scope_UID .  ")";
		$terms_related = $dbObj->db_select_query($dbObj->db_get_contentDB(), $query);

		if($terms_related == null)
			return null;

		// get terms details
		for($i=0; $i<count($terms_related); $i++) {
			$curr_term = term::get_term_by_UID_with_relations($terms_related[$i]["ID_TERM_STRING"], $lang);
			if($curr_term != null)
				array_push($terms, $curr_term);
		}

		return $terms;
	}
}


?>












