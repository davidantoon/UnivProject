<?php

debugLog::included_log("delivery");


/**
 * Delivery class
 * @class Delivery
 */
class Delivery {

	private static function get_relations_tables_names() {
		return array('R_LD2K', 'R_LD2T', 'R_LD2D');
	}

	/**
	 * Add new Delivery in edit mode (users database)
	 * @param {string} $title The title of the Delivery
	 * @param {string} $desc  The description of the Delivery
	 * @param {int} $user  The user's id who added the Delivery
	 * @param {frontDelivery} $front array of key value pair in FRONT format
	 * @return {Delivery}
	 */
	
	public static function add_new_Delivery_in_edit_mode($title, $desc, $user, $front) {

		$dbObj = new dbAPI();		

		// get new UID from contents database to reseve the UID
		$UID = $dbObj->get_latest_UID($dbObj->db_get_contentDB(), 'DELIVERY_BASE');
		$UID++;

		// try to acquire lock on the Delivery
		if(Lock::acquire_lock($UID, 'DELIVERY_BASE', $user) == false) {
			debugLog::log("<i>[delivery.php:add_new_Delivery_in_edit_mode]</i> Could not acquire lock on Delivery (". $UID ."), check whether the Delivery is locked by other users");
			return null;
		}
		return Delivery::add_new_edit_for_Delivery($UID, $title, $desc, $user, $front);
	}


	/**
	 * Add new Delivery (users database)
	 * @param {string} $title The title of the Delivery
	 * @param {string} $desc  The description of the Delivery
	 * @param {int} $user  The user's id who added the Delivery
	 * @param {frontDelivery} $front array of key value pair in FRONT format
	 * @return {Delivery}
	 */
	public static function add_new_edit_for_Delivery($UID, $title, $desc, $user, $front) {

		// check if Kbit is locked by user
		if(Lock::is_locked_by_user($UID, 'DELIVERY_BASE', $user) == false) {
			debugLog::log("<i>[delivery.php:add_new_edit_for_Delivery]</i>The Delivery (". $UID .") is not locked by user (". $user .")");
			return null;
		}

		$dbObj = new dbAPI();

		// get front type
		if($front == null) {
			debugLog::log("<i>[delivery.php:add_new_edit_for_Delivery]</i> FRONT Delivery of (". $title .") is missing!");
			return null;
		}
		if($front["FRONT_TYPE"] == null) {
			debugLog::log("<i>[delivery.php:add_new_edit_for_Delivery]</i> FRONT Delivery type of (". $title .") is missing!");
			return null;
		}

		// disable all Delivery information
		Delivery::disable_all_Delivery_info($UID, 'content');

		$front_type = $front["FRONT_TYPE"]; 
		// add record to database
		$query = "INSERT INTO DELIVERY_BASE (UID, REVISION, TITLE, DESCRIPTION, ENABLED, USER_ID, CREATION_DATE, FRONT_TYPE) VALUES (".
			$UID . ", 1, '" . $title ."', '" . $desc ."', 1, ". $user .",'". date("Y-m-d H:i:s") ."','". $front_type ."')";
		$dbObj->run_query($dbObj->db_get_usersDB(), $query);
		$query = "INSERT INTO DELIVERY_BASE (UID, REVISION, TITLE, DESCRIPTION, ENABLED, USER_ID, CREATION_DATE, FRONT_TYPE) VALUES (".
			$UID . ", 1, '" . $title ."', '" . $desc ."', 0, ". $user .",'". date("Y-m-d H:i:s") ."','". $front_type ."')";
		$dbObj->run_query('content', $query);
		// entity of recently added Delivery
		$recent_Delivery = Delivery::get_base_Delivery($UID, 'user');
		

		if($front != null) {
			// add front data to database
			$front_Delivery = Delivery::add_new_front($UID, $front, $user);
			// check if the front was created successfully
			if($front_Delivery == null) {
				debugLog::log("<i>[delivery.php:add_new_edit_for_Delivery]</i> FRONT Delivery (". $title .") faild to create!");
				

				// option to rollback
				// example: remove the base Delivery due to this error.
				
				return $recent_Delivery;
			}

			// merge front Delivery with base
			$recent_Delivery["FRONT_DELIVERY"] = $front_Delivery;
		}
		return $recent_Delivery;
	}

	/**
	 * Adds new instance of Delivery's front to the specific front table based on FRONT_TYPE in edit mode(to users database)
	 * @param {int} $UID The UID of the base Delivery
	 * @param {frontDelivery} $front array of key value pair in FRONT format
	 * @param {int} $user User id of the creator
	 * @return {frontDelivery}
	 */
	private static function add_new_front($UID, $front, $user) {

		$dbObj = new dbAPI();

		$front_type = $front["FRONT_TYPE"];
		
		if($front_type == null) {
			debugLog::log("<i>[delivery.php:add_new_front]</i> FRONT Delivery type of (". $UID .") is missing!");
			
			return null;
		}
		// determine which front Delivery insertion function should be called
		switch ($front_type) {
		    case "DELIVERY_FRONT":
		    	$Delivery_front = Delivery::add_new_Delivery_FRONT($UID, $front, $user);
		    	if($Delivery_front == null) {
		    		debugLog::log("<i>[delivery.php:add_new_front]</i> Could not insert a new front Delivery of the base (". $UID ."), [add_new_Delivery_FRONT] faild");
		    		return null;
		    	}
		    	return $Delivery_front;
		        break;
		    case "YOUTUBE": // example for future formats
		        debugLog::log("<i>[delivery.php:add_new_front]</i> Dummy format was invoked (YOUTUBE)");
		        return null;
		    default:
		        debugLog::log("<i>[delivery.php:add_new_front]</i> Default case was invoked [UID]:(". $UID .")");
		        return null;
		}
	}


	/**
	 * Inserts a new Delivery front of type Delivery_FRONT in edit mode into the database users
	 * @param {int} $UID The UID of the base Delivery
	 * @param {frontDelivery} $front array of key value pair in FRONT format
	 * @param {int} $user User id of the creator
	 * @return {frontDelivery:Delivery_FRONT}
	 */
	private static function add_new_Delivery_FRONT($UID, $front, $user) {
		
		$dbObj = new dbAPI();
		// static table name of specific Delivery front
		$tableName = 'DELIVERY_FRONT';
		// aquire a new revision number
		$rev_num = Delivery::get_new_Revision_and_disbale_old_ones($UID, $tableName, 'user');
		// database insert query
		$query = "INSERT INTO ". $tableName ." (UID, REVISION, PATH, ENABLED, USER_ID, CREATION_DATE) VALUES (".
			$UID . ", 1, '" . $front["PATH"] ."', 1, ". $user .",'". date("Y-m-d H:i:s") ."')";
		$dbObj->run_query('user', $query);

		return Delivery::get_front_Delivery($UID, $tableName, 'user');
	}


	/**
	 * Disables all the old instances of the specific front Delivery and generates a new Rivision number
	 * @param  {int} $UID       The UID of requested Delivery
	 * @param  {string} $tableName The table name of a specific front format (front Delivery, e.g. YOUTUBE)
	 * @param  {string} $source The table name of a specific front format (front Delivery, e.g. YOUTUBE)
	 * @return {int}            The new revision that should be used
	 */
	private static function get_new_Revision_and_disbale_old_ones($UID, $tableName, $source = 'content') {

		$dbObj = new dbAPI();
		// determines the database name which the {Delivery} should be imported from
		$database_source = dbAPI::get_db_name($source);
		// prepare where statement
		$where_sttmnt = " ( UID = ". $UID ." ) ";
		// remove old instances of the specific front
		$dbObj->disable_revision($database_source, $tableName, $where_sttmnt);
		// get a new revision number for front Delivery
		$latest_revision = $dbObj->get_latest_Rivision_ID($database_source, $tableName, $where_sttmnt);
		if($latest_revision == null)
			$latest_revision = 0;

		return $latest_revision;
	}


	/**
	 * Creates a new instance of Base Delivery and returns it as {Delivery} array
	 * @param  {int} UID of the requested Base Delivery
	 * @param  {string} $source 'content' or 'user', depend on which database the {DeliveryBase} should be imported from
	 * @returns {DeliveryBase}
	 */
	private static function get_base_Delivery($UID, $source = 'content') {

		$dbObj = new dbAPI();		

		// determines the database name which the {Delivery} should be imported from
		$database_source = dbAPI::get_db_name($source);

		// database query
		$query = "SELECT * FROM DELIVERY_BASE where UID = '" . $UID . "' AND ENABLED = '1'";
		$results = $dbObj->db_select_query($database_source, $query);
		if(count($results) == 0) {
			debugLog::log("Base Delivery (". $UID .") from database (". $source .") was not found.");
			return null;
		}
		return $results[0];
	}


	/**
	 * Creates a new instance of front Delivery and returns it as {Delivery} array
	 * @param  {int} UID of the requested Base Delivery
	 * @param  {string} $tableName The table name of a specific front format (front Delivery, e.g. YOUTUBE)
	 * @param  {string} $source 'content' or 'user', depend on which database the {frontDelivery} should be imported from
	 * @returns {frontDelivery}
	 */
	private static function get_front_Delivery($UID, $tableName, $source = 'content') {

		$dbObj = new dbAPI();		

		// determines the database name which the {Delivery} should be imported from
		$database_source = dbAPI::get_db_name($source);
		// database query
		$query = "SELECT * FROM ". $tableName ." where UID = '" . $UID . "' AND ENABLED = '1'";
		$results = $dbObj->db_select_query($database_source, $query);
		if(count($results) == 0) {
			debugLog::log("<i>[delivery.php:get_front_Delivery]</i> front Delivery (". $UID .") from database (". $source .".". $tableName .") was not found.");
			
			return null;
		}
		return $results[0];
	}



	/**
	 * Disables old revisions in user database, create a copy of content records in user database then acquire lock on Delivery
	 * @param  {int} $UID  The UID of the edited Delivery
	 * @param  {int} $user The user that is editing the Delivery
	 * @return {bool}       returns true on success false otherwise
	 */
	public static function begin_editing_Delivery($UID, $user) {
		// acquire lock copy data records of the Delivery from the content database into user database
		// get selected Delivery
		$curr_Delivery = Delivery::get_Delivery_by_UID($UID);
		if($curr_Delivery == null) {
			debugLog::log("<i>[delivery.php:begin_editing_Delivery]</i> Could not find Delivery of the base (". $UID .") in content");
    		return false;
		}

		// try to acquire lock on the Delivery
		if(Lock::acquire_lock($UID, 'DELIVERY_BASE', $user) == false) {
			debugLog::log("<i>[delivery.php:begin_editing_Delivery]</i> Could not acquire lock on Delivery (". $UID ."), check whether the Delivery is locked by other users");
			return false;
		}

		// disable all Delivery information
		Delivery::disable_all_Delivery_info($UID, 'user');

		// copy Delivery from content database into user database
		$dbObj = new dbAPI();
		$where_sttmnt = ' WHERE UID = '. $UID .' AND ENABLED = 1 ';
		// get columns names
		$columns_names = $dbObj->db_get_columns_names($dbObj->db_get_usersDB(), "DELIVERY_BASE", true);
		// remove primary key (auto-increment) column (id)
		$columns_names = str_replace("id,", "", $columns_names);
		// copy record from content to user
		$query = "INSERT INTO ". $dbObj->db_get_usersDB() .".DELIVERY_BASE (". $columns_names .") SELECT ". $columns_names ." FROM ". $dbObj->db_get_contentDB() . ".Delivery_BASE ". $where_sttmnt ."";
		$dbObj->run_query('', $query);
		
		
		
		// get front Delivery table name
		$front_table_name = Delivery::get_front_table_name($curr_Delivery["FRONT_TYPE"]);
		if($front_table_name == null) {
			debugLog::log("<i>[delivery.php:begin_editing_Delivery]</i> Could not find front Delivery table name (". $UID .")");
			
    		// roll back option here
    		return false;
		}
		// get columns names
		$columns_names = $dbObj->db_get_columns_names($dbObj->db_get_usersDB(), $front_table_name, true);
		// remove primary key (auto-increment) column (id)
		$columns_names = str_replace("id,", "", $columns_names);
		// copy front record from content to user
		$query = "INSERT INTO ". $dbObj->db_get_usersDB() .".". $front_table_name ." (". $columns_names .") SELECT ". $columns_names ." FROM ". $dbObj->db_get_contentDB() . ".". $front_table_name ." ". $where_sttmnt ."";
		$dbObj->run_query('', $query);




		// loop over links and copy records from content to user
		$links_tables_names = Delivery::get_relations_tables_names();
		for($i = 0; $i < count($links_tables_names); $i++) {
			
			// prepare where statement
			if($links_tables_names[$i] == 'R_LD2D')
				$where_sttmnt = ' (PARENT_ID = '. $UID .' OR CHILD_ID = '. $UID .') ';
			else
				$where_sttmnt = ' (DELIVERY_BASE_ID = '. $UID . ') ';
			// get columns names
			$columns_names = $dbObj->db_get_columns_names($dbObj->db_get_usersDB(), $links_tables_names[$i], true);
			// remove primary key (auto-increment) column (id)
			$columns_names = str_replace("id,", "", $columns_names);
			// get all relevant relations
			$query = "SELECT id FROM ". $links_tables_names[$i] ." where ". $where_sttmnt ." AND ENABLED = '1'";
			$relations = $dbObj->db_select_query($dbObj->db_get_contentDB(), $query);

			// loop over all records and insert them
			for($j = 0; $j < count($relations); $j++) {
				$where_sttmnt = ' id ='. $relations[$j]["id"] . ' ';
				$query = "INSERT INTO ". $dbObj->db_get_usersDB() .".". $links_tables_names[$i] ." (". $columns_names .") SELECT ". $columns_names ." FROM ". $dbObj->db_get_contentDB() . ".". $links_tables_names[$i] ." where ". $where_sttmnt ."";
				$dbObj->run_query('', $query);
			}
		}

		return true;
	}


	/**
	 * Returns the appropriate front Delivery table name
	 * @param  {string} $front_type front Delivery descriptor
	 * @return {string}             front Delivery table name
	 */
	private static function get_front_table_name($front_type) {
		// determine front Delivery table name
		switch ($front_type) {
		    case "DELIVERY_FRONT":
		    	return "DELIVERY_FRONT";
		    case "YOUTUBE": // example for future formats
		        debugLog::log("<i>[delivery.php:get_front_table_name]</i> Dummy format was invoked (YOUTUBE)");
		        
		        return null;
		    default:
		        debugLog::log("<i>[delivery.php:get_front_table_name]</i> Default case was invoked [front_type]:(". $front_type .")");
		        
		        return null;
		}
		return null;
	}


	/**
	 * Creates a copy of all records related to the specified Delivery into the content database and disables all records in user database then releases the lock
	 * @param  {int} $UID  UID of the Delivery that is being published
	 * @param  {int} $user The user that is publishing the Delivery
	 * @return {bool}       true on success false otherwise
	 */
	public static function publish_changes($UID, $user) {
		// add new record in content database for each data record and disable all data records in user database
		
		if(Lock::is_locked_by_user($UID, 'DELIVERY_BASE', $user) == false) {
			debugLog::log("<i>[delivery.php:publish_changes]</i> cannot publish Delivery (". $UID .") because the user is not locking it or is locked by someone else");
			return false;
		}

		// get selected Delivery
		$curr_Delivery = Delivery::get_edited_Delivery_by_UID($UID);
		if($curr_Delivery == null) {
			debugLog::log("<i>[Delivery::publish_changes]:</i> Could not find Delivery of the base (". $UID .") in user");
    		return false;
		}

		// disable all Delivery information
		Delivery::disable_all_Delivery_info($UID, 'content');

		// copy Delivery from user database into content database
		$dbObj = new dbAPI();
		$where_sttmnt = ' WHERE UID = '. $UID .' AND ENABLED = 1 ';
		// get columns names
		$columns_names = $dbObj->db_get_columns_names($dbObj->db_get_contentDB(), "DELIVERY_BASE", true);
		// remove primary key (auto-increment) column (id)
		$columns_names = str_replace("id,", "", $columns_names);

		// copy record from user to content
		$query = "INSERT INTO ". $dbObj->db_get_contentDB() .".DELIVERY_BASE (". $columns_names .") SELECT ". $columns_names ." FROM ". $dbObj->db_get_usersDB() . ".DELIVERY_BASE ". $where_sttmnt ."";
		$dbObj->run_query($dbObj->db_get_contentDB(), $query);
		

		// get front Delivery table name
		$front_table_name = Delivery::get_front_table_name($curr_Delivery["FRONT_TYPE"]);
		if($front_table_name == null) {
			debugLog::log("<i>[Delivery::publish_changes]:</i> Could not find front Delivery table name (". $UID .")");
    		// roll back option here
    		return false;
		}
		// get columns names
		$columns_names = $dbObj->db_get_columns_names($dbObj->db_get_contentDB(), $front_table_name, true);
		// remove primary key (auto-increment) column (id)
		$columns_names = str_replace("id,", "", $columns_names);
		// copy front record from user to content
		$query = "INSERT INTO ". $dbObj->db_get_contentDB() .".". $front_table_name ." (". $columns_names .") SELECT ". $columns_names ." FROM ". $dbObj->db_get_usersDB() . ".". $front_table_name ." ". $where_sttmnt ."";
		$dbObj->run_query($dbObj->db_get_contentDB(), $query);




		// loop over links and copy records from user to content
		$links_tables_names = Delivery::get_relations_tables_names();
		for($i = 0; $i < count($links_tables_names); $i++) {
			
			// prepare where statement
			if($links_tables_names[$i] == 'R_LD2D')
				$where_sttmnt = ' (PARENT_ID = '. $UID .' OR CHILD_ID = '. $UID .') ';
			else
				$where_sttmnt = ' (Delivery_BASE_ID = '. $UID . ') ';
			// get columns names
			$columns_names = $dbObj->db_get_columns_names($dbObj->db_get_contentDB(), $links_tables_names[$i], true);
			// remove primary key (auto-increment) column (id)
			$columns_names = str_replace("id,", "", $columns_names);
			// get all relevant relations
			$query = "SELECT id FROM ". $links_tables_names[$i] ." where ". $where_sttmnt ." AND ENABLED = '1'";
			$relations = $dbObj->db_select_query($dbObj->db_get_usersDB(), $query);

			// loop over all records and insert them
			for($j = 0; $j < count($relations); $j++) {
				$where_sttmnt = ' id ='. $relations[$j]["id"] . ' ';
				$query = "INSERT INTO ". $dbObj->db_get_contentDB() .".". $links_tables_names[$i] ." (". $columns_names .") SELECT ". $columns_names ." FROM ". $dbObj->db_get_usersDB() . ".". $links_tables_names[$i] ." where ". $where_sttmnt ."";
				$dbObj->run_query($dbObj->db_get_contentDB(), $query);
			}
		}

		// remove copies from user database
		Delivery::disable_all_Delivery_info($UID, 'user');
		
		// release lock off the Delivery
		if(Lock::release_lock($UID, 'DELIVERY_BASE', $user) == false) {
			debugLog::log("<i>[delivery.php:publish_changes]</i> Could not release lock off Delivery (". $UID .")");
			
			return false;
		}

		return true;
	}
	


	/**
	 * Removes all instances of Delivery and its relatives from user database and releases the lock
	 * @param  {int} $UID  Delivery UID
	 * @param  {int} $user The user's UID that is performing the operation
	 * @return {bool}       true on success false otherwise
	 */
	public static function cancel_edited_Delivery($UID, $user) {

		// release lock off the Delivery
		if(Lock::release_lock($UID, 'Delivery_BASE', $user) == false) {
			debugLog::log("<i>[delivery.php:cancel_edited_Delivery]</i> Could not release lock off Delivery (". $UID .")");
			return false;
		}
		// disable all records in user database
		Delivery::disable_all_Delivery_info($UID, 'user');
	}

	public static function disable_all_Delivery_info($UID, $destination = 'user') {

		$dbObj = new dbAPI();

		$destination = dbAPI::get_db_name($destination);		
		// disable old records
		$dbObj->disable_revision('', $destination .".DELIVERY_BASE ", ' UID = '. $UID . ' ');	

		// disable old front record
		$links_tables_names = array('DELIVERY_FRONT');
		for($i = 0; $i < count($links_tables_names); $i++) {
			// disable old links records
			$dbObj->disable_revision('', $destination .".". $links_tables_names[$i] . " ", ' UID = '. $UID . ' ');
		}
		
		// loop over links and copy records from content to user
		$links_tables_names = Delivery::get_relations_tables_names();
		for($i = 0; $i < count($links_tables_names); $i++) {
			
			// prepare where statement
			if($links_tables_names[$i] == 'R_LD2D')
				$where_sttmnt = ' (PARENT_ID = '. $UID .' OR CHILD_ID = '. $UID .') ';
			else
				$where_sttmnt = ' (DELIVERY_BASE_ID = '. $UID . ') ';
			// disable old links records
			$dbObj->disable_revision('', $destination .".". $links_tables_names[$i] . " ", $where_sttmnt);
		}
		return true;
	}






	/**
	 * Returns the Delivery's base from content database
	 * @param  {int} $UID The UID of the requested Delivery
	 * @return {DeliveryBase}      the requested Delivery
	 */
	public static function get_Delivery_by_UID($UID) {
		// returns the Delivery from content database for as read-only
		$dbObj = new dbAPI();
		$query = "SELECT * FROM DELIVERY_BASE where UID = '" . $UID . "' AND ENABLED = '1'";
		$results = $dbObj->db_select_query($dbObj->db_get_contentDB(), $query);
		if(count($results) == 0)
			return null;

		return $results[0];
	}

	/**
	 * Returns the Delivery's base from user database
	 * @param  {int} $UID The UID of the requested Delivery
	 * @return {DeliveryBase}      the requested Delivery
	 */
	public static function get_edited_Delivery_by_UID($UID) {
		// returns the Delivery from user database
		$dbObj = new dbAPI();
		$query = "SELECT * FROM DELIVERY_BASE where UID = '" . $UID . "' AND ENABLED = '1'";
		$results = $dbObj->db_select_query($dbObj->db_get_usersDB(), $query);
		if(count($results) == 0)
			return null;

		return $results[0];
	}

	public static function get_Delivery_details($UID, $user) {

		if(Lock::is_locked_by_user($UID, 'DELIVERY_BASE', $user))
			$Delivery = Delivery::get_edited_Delivery_by_UID($UID);
		else
			$Delivery = Delivery::get_Delivery_by_UID($UID);

		// get locking user
		$locking_user = Lock::get_locking_user($UID, 'DELIVERY_BASE');
		if($locking_user != null)
			$Delivery["LOCKING_USER"] = $locking_user;

		return $Delivery;
	}



	public static function add_D2D_relation($first_UID, $second_UID, $is_hier, $user) {

		// check if delivery is locked by user
		if(Lock::is_locked_by_user($first_UID, 'DELIVERY_BASE', $user) == false && Lock::is_locked_by_user($second_UID, 'DELIVERY_BASE', $user) == false) {
			debugLog::log("<i>[delivery.php:add_D2D_relation]</i> Non of the deliveries (". $first_UID .", ". $second_UID .") are locked by user (". $user .")");
			return null;
		}
		// check soft lock
		$locking_user = Lock::get_locking_user($first_UID, 'DELIVERY_BASE');
		if($locking_user != null && $locking_user["UID"] != $user) {
			debugLog::log("<i>[delivery.php:add_D2D_relation]</i> one of the deliveries (". $first_UID .") is locked by other user(". $locking_user["UID"] .")");
			return null;
		}
		$locking_user = Lock::get_locking_user($second_UID, 'DELIVERY_BASE');
		if($locking_user != null && $locking_user["UID"] != $user) {
			debugLog::log("<i>[delivery.php:add_D2D_relation]</i> one of the deliveries (". $first_UID .") is locked by other user(". $locking_user["UID"] .")");
			return null;
		}

		if(refRelation::add_relation_to_object($first_UID, $second_UID, $is_hier, $user, 'R_LD2D', 'user') == null) {
			debugLog::log("<i>[delivery.php:add_D2D_relation]</i> parent Delivery (". $first_UID .") and child (". $second_UID .") Delivery cannot be the same");
			return null;
		}
		// return recently created relation
		return refRelation::get_objects_relation($first_UID, $second_UID, 'R_LD2D', 'user');
	}

	public static function remove_D2D_relation($first_UID, $second_UID) {

		// check if delivery is locked by user
		if(Lock::is_locked_by_user($first_UID, 'DELIVERY_BASE', $user) == false && Lock::is_locked_by_user($second_UID, 'DELIVERY_BASE', $user) == false) {
			debugLog::log("<i>[delivery.php:add_D2D_relation]</i> Non of the deliveries (". $first_UID .", ". $second_UID .") are locked by user (". $user .")");
			return null;
		}
		// check soft lock
		$locking_user = Lock::get_locking_user($first_UID, 'DELIVERY_BASE');
		if($locking_user != null && $locking_user["UID"] != $user) {
			debugLog::log("<i>[delivery.php:add_D2D_relation]</i> one of the deliveries (". $first_UID .") is locked by other user(". $locking_user["UID"] .")");
			return null;
		}
		$locking_user = Lock::get_locking_user($second_UID, 'DELIVERY_BASE');
		if($locking_user != null && $locking_user["UID"] != $user) {
			debugLog::log("<i>[delivery.php:add_D2D_relation]</i> one of the deliveries (". $first_UID .") is locked by other user(". $locking_user["UID"] .")");
			return null;
		}

		if(refRelation::add_relation_to_object($first_UID, $second_UID, $is_hier, $user, 'R_LD2D', 'user') == null) {
			debugLog::log("<i>[delivery.php:add_D2D_relation]</i> parent Delivery (". $first_UID .") and child (". $second_UID .") Delivery cannot be the same");
			return null;
		}

		refRelation::remove_relation($first_UID, $second_UID, 'R_LD2D', 'user');
	}

	public static function get_D2D_relations($Delivery_UID, $user) {

		return refRelation::get_relations_of_object($Delivery_UID, 'R_LD2D', 'Delivery::get_Delivery_details', $user);
	}





	public static function add_D2T_relation($Delivery_UID, $term_UID, $link_type, $user) {

		if(Lock::is_locked_by_user($Delivery_UID, 'DELIVERY_BASE', $user) == false) {
			debugLog::log("<i>[delivery.php:add_D2T_relation]</i> Delivery (". $Delivery_UID .") is not locked by the user (". $user .")");
			return null;
		}
		return O2TRelation::add_O2T_relation(array("column_name"=>'DELIVERY_BASE_ID', "value"=>$Delivery_UID), $term_UID, $link_type, $user, 'R_LD2T', 'user');
	}

	public static function get_terms_of_Delivery($Delivery_UID, $user = '', $lang = '') {

		if($user != '' && Lock::is_locked_by_user($Delivery_UID, 'DELIVERY_BASE', $user))
			$database_name = 'user';
		else
			$database_name = 'content';

		return O2TRelation::get_terms_of_object(array("column_name"=>'DELIVERY_BASE_ID', "value"=>$Delivery_UID), $database_name, 'R_LD2T', $lang);
	}

	public static function remove_term_from_Delivery($Delivery_UID, $term_UID, $link_type, $user) {

		if(Lock::is_locked_by_user($Delivery_UID, 'DELIVERY_BASE', $user) == false) {
			debugLog::log("<i>[delivery.php:remove_term_from_Delivery]</i> Delivery (". $Delivery_UID .") is not locked by the user (". $user .")");
			return false;
		}

		O2TRelation::remove_O2T_relation(array("column_name"=>'DELIVERY_BASE_ID', "value"=>$Delivery_UID), $term_UID, $link_type, 'R_LD2T', 'user');
		return true;
	}

	



	public static function add_Kbit_to_delivery($Kbit_UID, $Delivery_UID, $link_type, $link_weight, $user) {

		if(Lock::is_locked_by_user($Delivery_UID, 'DELIVERY_BASE', $user) == false) {
			debugLog::log("<i>[delivery.php:remove_term_from_Delivery]</i> Delivery (". $Delivery_UID .") is not locked by the user (". $user .")");
			return null;
		}
		$locking_user = Lock::get_locking_user($UID, 'KBIT_BASE');
		if($locking_user != null && $locking_user["UID"] != $user) {
			debugLog::log("<i>[delivery.php:add_Kbit_to_delivery]</i> Kbit(". $Kbit_UID .") is locked by other user(". $locking_user["UID"] .")");
			return null;
		}

		return D2KRelation::add_D2K_relation($Kbit_UID, $Delivery_UID, $link_type, $link_weight, $user, 'user');
	}


	public static function remove_Kbit_from_delivery($Kbit_UID, $Delivery_UID, $link_type, $user) {

		if(Lock::is_locked_by_user($Delivery_UID, 'DELIVERY_BASE', $user) == false) {
			debugLog::log("<i>[delivery.php:remove_term_from_Delivery]</i> Delivery (". $Delivery_UID .") is not locked by the user (". $user .")");
			return null;
		}
		$locking_user = Lock::get_locking_user($UID, 'KBIT_BASE');
		if($locking_user != null && $locking_user["UID"] != $user) {
			debugLog::log("<i>[delivery.php:add_Kbit_to_delivery]</i> Kbit(". $Kbit_UID .") is locked by other user(". $locking_user["UID"] .")");
			return null;
		}

		return D2KRelation::remove_D2K_relation($Kbit_UID, $Delivery_UID, $link_type, 'user');
	}


	public static function get_Kbit_of_delivery($Delivery_UID, $user) {

		return D2KRelation::get_related_Kbits($Delivery_UID, $user);
	}
}

?>
















