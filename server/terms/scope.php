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
		$query = "SELECT * FROM scope where UID = '" . $UID . "' AND ENABLED = '1'";
		$results = $dbObj->db_select_query($dbObj->db_get_contentDB(), $query);
		if(count($results) == 0)
			return null;

		return $results[0];	
	}
	
	public static function get_scope_by_UID_with_relations($UID, $lang = '') {

		// check if scope exists
		$Scope = scope::get_scope_by_UID($UID);
		if($Scope == null)
			return null;

		// add related scopes to scope object
		$Scope["RELATED_SCOPES"] = scope::get_relations_of_scope($UID);

		$Scope["TERMS"] = scope::get_terms_of_scope($UID, $lang);
		return $Scope;
	}

	// relate scope to another
	public static function add_relation_to_scope($parent_scope_UID, $child_scope_UID, $is_hier, $user) {
		
		if($parent_scope_UID == $child_scope_UID) {
			debugLog::log("parent scope (". $parent_scope_UID .") and child (". $child_scope_UID .") scope cannot be the same");
			return null;
		}
		// disable old relation
		scope::remove_relation($parent_scope_UID, $child_scope_UID);

		// get latest revision number
		$dbObj = new dbAPI();
		// where statement
		$where_sttmnt = " (PARENT_ID = " . $parent_scope_UID .
			" AND CHILD_ID = " . $child_scope_UID . ") OR (CHILD_ID = " . $parent_scope_UID .
			" AND PARENT_ID = " . $child_scope_UID . ")";
		$old_rel = $dbObj->get_latest_Rivision_ID($dbObj->db_get_contentDB(), 'R_Ls2s', $where_sttmnt);
		if($old_rel == null)
			$old_rel = 0;


		// add new relation
		$query = "INSERT INTO R_Ls2s (REVISION, HIER, PARENT_ID, CHILD_ID, ENABLED, USER_ID, CREATION_DATE) VALUES (".
			($old_rel + 1) . ", ". $is_hier . ", " . $parent_scope_UID .", " . $child_scope_UID .", 1, ". $user .",'". date("Y-m-d H:i:s") ."')";
		$dbObj->run_query($dbObj->db_get_contentDB(), $query);

		// return recently created relation
		return scope::get_scopes_relation($parent_scope_UID, $child_scope_UID);
	}

	// remove relation
	public static function remove_relation($parent_scope_UID, $child_scope_UID) {

		// disable old relation
		$dbObj = new dbAPI();
		
		// where statement
		$where_sttmnt = " (PARENT_ID = " . $parent_scope_UID .
			" AND CHILD_ID = " . $child_scope_UID . ") OR (CHILD_ID = " . $parent_scope_UID .
			" AND PARENT_ID = " . $child_scope_UID . ")";

		$dbObj->disable_revision($dbObj->db_get_contentDB(), 'R_Ls2s', $where_sttmnt);
	}

	public static function get_scopes_relation($first_scope, $second_scope) {

		$dbObj = new dbAPI();
		$query = "SELECT * FROM R_Ls2s where ENABLED = 1 AND ((PARENT_ID = " . $first_scope .
			" AND CHILD_ID = " . $second_scope . ") OR (CHILD_ID = " . $first_scope .
			" AND PARENT_ID = " . $second_scope . "))";
	
		$results = $dbObj->db_select_query($dbObj->db_get_contentDB(), $query);
		if(count($results) == 0) {
		}
		return $results[0];	
	}

	public static function get_relations_of_scope($scope_UID) {

		$parents = array();
		$children = array();
		$others = array();

		// extract related scopes
		$dbObj = new dbAPI();
		$query = "SELECT * FROM R_Ls2s where ENABLED = 1 AND ( CHILD_ID = " . $scope_UID . " OR PARENT_ID = " . $scope_UID . ")";
		$results = $dbObj->db_select_query($dbObj->db_get_contentDB(), $query);

		for($i=0;$i<count($results);$i++) {
			if($results[$i]["PARENT_ID"] == $scope_UID) {
				if($results[$i]["HIER"] == 1)
					array_push($children, scope::get_scope_by_UID($results[$i]["CHILD_ID"]));
				else
					array_push($others, scope::get_scope_by_UID($results[$i]["CHILD_ID"]));
			}
			else {
				if($results[$i]["HIER"] == 1)
					array_push($parents, scope::get_scope_by_UID($results[$i]["PARENT_ID"]));
				else
					array_push($others, scope::get_scope_by_UID($results[$i]["CHILD_ID"]));
			}
		}

		$relatives = array("parents"=>$parents, "children"=>$children, "others"=>$others);
		return $relatives;
	}


	public static function get_terms_of_scope($scope_UID, $lang = '') {

		$terms = array();

		// extract scope terms relations
		$dbObj = new dbAPI();
		$query = "SELECT * FROM TERMS where ENABLED = 1 AND ( ID_SCOPE = " . $scope_UID .  ")";
		$terms_related = $dbObj->db_select_query($dbObj->db_get_contentDB(), $query);

		if($terms_related == null)
			return null;

		// get terms details
		for($i=0; $i<count($terms_related); $i++) {
			$curr_term = term::get_term_by_UID($terms_related[$i]["ID_TERM_STRING"], $lang);
			if($curr_term != null)
				array_push($terms, $curr_term);
		}

		return $terms;
	}
}


?>












