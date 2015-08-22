<?php
debugLog::included_log("Relation");


// reflexive relations
class refRelation {

	/**
	 * Relate object to object of the same type
	 * @param {int} $parent_UID parent/first object UID
	 * @param {int} $child_UID  child/second object UID
	 * @param {bool} $is_hier    true if relation is parent/child false otherwise
	 * @param {int} $user       the user id that is performing the operation
	 * @param {string} $tableName  table name of the relation, e.g. R_LT2T, R_LS2S..
	 * @return {refRelation} the relation that was just created
	 */
	public static function add_relation_to_object($parent_UID, $child_UID, $is_hier, $user, $tableName) {
		
		if($parent_UID == $child_UID) {
			debugLog::log("<i>[relations.php:add_relation_to_object]</i> parent ". $tableName ." (". $parent_UID .") and child (". $child_UID .") ". $tableName ." cannot be the same");
			
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





	/**
	 * Remove a relation between two objects
	 * @param  {int} $parent_UID first object UID
	 * @param  {int} $child_UID  second object UID
	 * @param  {string} $tableName  table name of relations table
	 */
	public static function remove_relation($parent_UID, $child_UID, $tableName) {

		// disable old relation
		$dbObj = new dbAPI();
		
		// where statement
		$where_sttmnt = " (PARENT_ID = " . $parent_UID .
			" AND CHILD_ID = " . $child_UID . ") OR (CHILD_ID = " . $parent_UID .
			" AND PARENT_ID = " . $child_UID . ")";
		
		$dbObj->disable_revision($dbObj->db_get_contentDB(), $tableName, $where_sttmnt);
	}



	/**
	 * returns objects relation (between two objects, mostly for internal use)
	 * @param  {int} $first_object  first object UID
	 * @param  {int} $second_object second object UID
	 * @param  {string} $tableName     table name of relations table
	 * @return {refRelation}         relation between two objects
	 */
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


	/**
	 * creates three arrays (parents, children, others) and populates them according to type of relation
	 * @param  {int} $object_UID object UID that the relations are requested for
	 * @param  {string} $tableName  aa
	 * @param  {function($UID, $param2 = '')} $anonFunc   function that should be called to get related object's details
	 * @param  {string} $param2     additional optional variable that should be passed to annonFunc if required
	 * @return {array}             contains each of parents, children and others that each contains related objects
	 */
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






// %2T
class O2TRelation {

	
	/**
	 * connect term to object (add relation)
	 * @param {array} $object_UID    array of type array("column_name"=>'DELIVERY_BASE_ID', "value"=>5)
	 * @param {int} $term_UID      term UID
	 * @param {string} $link_type     The link type
	 * @param {int} $user          user's id that is performing the operation
	 * @param {string} $tableName     Table name of the relation which depends on object type, e.g. R_LD2T, R_LK2T.
	 * @param {string} $database_name database name e.g. 'content', 'user'
	 * @return  {O2TRelation} The relation that was just created
	 */
	public static function add_O2T_relation($object_UID, $term_UID, $link_type, $user, $tableName, $database_name) {
		
		$database_name = dbAPI::get_db_name($database_name);	
		// disable old relation
		genRelation::remove_O2T_relation($object_UID, $term_UID, $link_type, $database_name);
		// get latest revision number
		$dbObj = new dbAPI();
		// where statement
		$object_column_name = $object_UID["column_name"];
		$object_UID_value = $object_UID["value"];
		if($object_column_name == null || $object_column_name == '') {
			debugLog::log("<i>[relations.php:add_O2T_relation]</i> Column name was not specified.");
			return null;
		}

		$where_sttmnt = " (". $object_column_name ." = " . $object_UID_value .
			" AND TERM_ID = " . $term_UID . " AND LINK_TYPE = '". $link_type ."')";

		$old_rev = $dbObj->get_latest_Rivision_ID($database_name, $tableName, $where_sttmnt);
		if($old_rev == null)
			$old_rev = 0;

		// add new relation
		$query = "INSERT INTO ". $tableName ." (REVISION, ". $object_column_name .", TERM_ID, LINK_TYPE, ENABLED, USER_ID, CREATION_DATE) VALUES (". ($old_rev + 1) . ", ". $object_UID_value . ", " . $term_UID .", " . $link_type .", 1, ". $user .",'". date("Y-m-d H:i:s") ."')";
		$dbObj->run_query($database_name, $query);

		// return recently created relation
		return O2TRelation::get_O2T_relation($object_UID, $term_UID, $link_type, $tableName, $database_name);
	}





	/**
	 * Remove a relation between object and term
	 * @param {array} $object_UID    array of type array("column_name"=>'DELIVERY_BASE_ID', "value"=>5)
	 * @param {int} $term_UID      term UID
	 * @param {string} $link_type     The link type
	 * @param {string} $tableName     Table name of the relation which depends on object type, e.g. R_LD2T, R_LK2T.
	 * @param {string} $database_name database name e.g. 'content', 'user'
	 */
	public static function remove_O2T_relation($object_UID, $term_UID, $link_type, $tableName, $database_name) {

		$database_name = dbAPI::get_db_name($database_name);

		// disable old relation
		$dbObj = new dbAPI();
		
		// where statement
		$object_column_name = $object_UID["column_name"];
		$object_UID_value = $object_UID["value"];
		if($object_column_name == null || $object_column_name == '') {
			debugLog::log("<i>[relations.php:remove_O2T_relation]</i> Column name was not specified.");
			return null;
		}
		$where_sttmnt = " (". $object_column_name ." = " . $object_UID_value .
			" AND TERM_ID = " . $term_UID . " AND LINK_TYPE = '". $link_type ."' AND ENABLED = 1)";
		
		$dbObj->disable_revision($database_name, $tableName, $where_sttmnt);
	}



	/**
	 * returns objects relations (between two objects)
	 * @param {array} $object_UID    array of type array("column_name"=>'DELIVERY_BASE_ID', "value"=>5)
	 * @param {int} $term_UID      	term UID
	 * @param {string} $link_type     The link type
	 * @param {string} $tableName     Table name of the relation which depends on object type, e.g. R_LD2T, R_LK2T.
	 * @return {O2TRelation}  
	 */
	public static function get_O2T_relation($object_UID, $term_UID, $link_type, $tableName, $database_name) {

		$database_name = dbAPI::get_db_name($database_name);

		$dbObj = new dbAPI();
		// where statement
		$object_column_name = $object_UID["column_name"];
		$object_UID_value = $object_UID["value"];
		if($object_column_name == null || $object_column_name == '') {
			debugLog::log("<i>[relations.php:get_O2T_relation]</i> Column name was not specified.");
			return null;
		}
		$where_sttmnt = " (". $object_column_name ." = " . $object_UID_value .
			" AND TERM_ID = " . $term_UID . " AND LINK_TYPE = '". $link_type ."' AND ENABLED = 1)";
		$query = "SELECT * FROM ". $tableName ." where " . $where_sttmnt;
	
		$results = $dbObj->db_select_query($database_name, $query);
		if(count($results) == 0) {
			return null;
		}
		return $results[0];	
	}



	/**
	 * returns list of terms that are related to object
	 * @param {array} $object_UID    array of type array("column_name"=>'DELIVERY_BASE_ID', "value"=>5)
	 * @param {string} $link_type     The link type
	 * @param {string} $tableName     Table name of the relation which depends on object type, e.g. R_LD2T, R_LK2T.
	 * @param  {string} $lang          The required language, if no language is selected all languages will be returned
	 * @return {array:terms}                array of terms
	 */
	public static function get_terms_of_object($object_UID, $database_name, $tableName, $lang = '') {

		// get database name
		$database_name = dbAPI::get_db_name($database_name);
		
		$dbObj = new dbAPI();

		// get column name of object and its value (UID) to look for in table
		$object_column_name = $object_UID["column_name"];
		$object_UID_value = $object_UID["value"];
		if($object_column_name == null || $object_column_name == '') {
			debugLog::log("<i>[relations.php:get_terms_of_object]</i> Column name was not specified.");
			return null;
		}
		// get all related terms to object
		$query = "SELECT * FROM ". $tableName ." where ENABLED = 1 AND (". $object_column_name ." = " . $object_UID_value .")";
		$results = $dbObj->db_select_query($database_name, $query);

		// retrieve term's details from terms class into array
		$terms = array();
		for($i=0;$i<count($results);$i++) {
			$curr_term = term::get_term_by_UID($results[$i]["TERM_ID"], $lang);
			// copy LINK_TYPE to term object
			$curr_term["LINK_TYPE"] = $results["LINK_TYPE"];
			array_push($terms, $curr_term);
		}
		return $terms;
	}
}

?>

































