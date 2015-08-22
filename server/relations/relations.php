<?php
debugLog::included_log("refRelation");

class refRelation {

	// public static function get_scope_by_UID_with_relations($UID, $lang = '') {

	// 	// check if scope exists
	// 	$Scope = scope::get_scope_by_UID($UID);
	// 	if($Scope == null)
	// 		return null;

	// 	// add related scopes to scope object
	// 	$Scope["RELATED_SCOPES"] = scope::get_relations_of_scope($UID);

	// 	$Scope["TERMS"] = scope::get_terms_of_scope($UID, $lang);
	// 	return $Scope;
	// }

	// relate scope to another
	public static function add_relation_to_object($parent_UID, $child_UID, $is_hier, $user, $tableName) {
		
		if($parent_UID == $child_UID) {
			debugLog::log("parent ". $tableName ." (". $parent_UID .") and child (". $child_UID .") ". $tableName ." cannot be the same");
			return null;
		}
		// disable old relation
		refRelation::remove_relation($parent_UID, $child_UID, $tableName);
		// get latest revision number
		$dbObj = new dbAPI();
		// where statement
		$where_sttmnt = " (PARENT_ID = " . $parent_UID .
			" AND CHILD_ID = " . $child_UID . ") OR (CHILD_ID = " . $parent_UID .
			" AND PARENT_ID = " . $child_UID . ")";
		$old_rel = $dbObj->get_latest_Rivision_ID($dbObj->db_get_contentDB(), $tableName, $where_sttmnt);
		if($old_rel == null)
			$old_rel = 0;

		// add new relation
		$query = "INSERT INTO ". $tableName ." (REVISION, HIER, PARENT_ID, CHILD_ID, ENABLED, USER_ID, CREATION_DATE) VALUES (".
			($old_rel + 1) . ", ". $is_hier . ", " . $parent_UID .", " . $child_UID .", 1, ". $user .",'". date("Y-m-d H:i:s") ."')";
		$dbObj->run_query($dbObj->db_get_contentDB(), $query);

		// return recently created relation
		return refRelation::get_objects_relation($parent_UID, $child_UID, $tableName);
	}





	// remove relation
	public static function remove_relation($parent_UID, $child_UID, $tableName) {

		// disable old relation
		$dbObj = new dbAPI();
		
		// where statement
		$where_sttmnt = " (PARENT_ID = " . $parent_UID .
			" AND CHILD_ID = " . $child_UID . ") OR (CHILD_ID = " . $parent_UID .
			" AND PARENT_ID = " . $child_UID . ")";
		
		$dbObj->disable_revision($dbObj->db_get_contentDB(), $tableName, $where_sttmnt);
	}



	// returns objects relations (between two objects)
	public static function get_objects_relation($first_object, $second_object, $tableName) {

		$dbObj = new dbAPI();
		$query = "SELECT * FROM ". $tableName ." where ENABLED = 1 AND ((PARENT_ID = " . $first_object .
			" AND CHILD_ID = " . $second_object . ") OR (CHILD_ID = " . $first_object .
			" AND PARENT_ID = " . $second_object . "))";
	
		$results = $dbObj->db_select_query($dbObj->db_get_contentDB(), $query);
		if(count($results) == 0) {
		}
		return $results[0];	
	}



	public static function get_relations_of_object($object_UID, $tableName, $anonFunc, $param2 = '') {

		$parents = array();
		$children = array();
		$others = array();

		// extract related objects
		$dbObj = new dbAPI();
		$query = "SELECT * FROM ". $tableName ." where ENABLED = 1 AND ( CHILD_ID = " . $object_UID . " OR PARENT_ID = " . $object_UID . ")";
		$results = $dbObj->db_select_query($dbObj->db_get_contentDB(), $query);

		for($i=0;$i<count($results);$i++) {
			if($results[$i]["PARENT_ID"] == $object_UID) {
				if($results[$i]["HIER"] == 1)
					array_push($children, call_user_func($anonFunc, $results[$i]["CHILD_ID"], $param2));
				else
					array_push($others, call_user_func($anonFunc, $results[$i]["CHILD_ID"], $param2));
			}
			else {
				if($results[$i]["HIER"] == 1)
					array_push($parents, call_user_func($anonFunc, $results[$i]["PARENT_ID"], $param2));
				else
					array_push($others, call_user_func($anonFunc, $results[$i]["PARENT_ID"], $param2));
			}
		}

		$relatives = array("parents"=>$parents, "children"=>$children, "others"=>$others);
		return $relatives;
	}
}

?>











