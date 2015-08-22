<?php

debugLog::included_log("Kbits");


/**
 * Kbit class
 * @class Kbit
 */
class Kbit {

	/**
	 * Add new Kbit in edit mode (users database)
	 * @param {string} $title The title of the Kbit
	 * @param {string} $desc  The description of the Kbit
	 * @param {int} $user  The user's id who added the Kbit
	 * @param {frontKbit} $front array of key value pair in FRONT format
	 * @return {Kbit}
	 */
	public static function add_new_Kbit_in_edit_mode($title, $desc, $user, $front) {

		$dbObj = new dbAPI();		

		// get new UID
		$UID = $dbObj->get_latest_UID($dbObj->db_get_usersDB(), 'KBIT_BASE');
		$UID++;
		// get front type
		if($front == null) {
			debugLog::log("FRONT Kbit of (". $title .") is missing!");
			return null;
		}
		if($front["FRONT_TYPE"] == null) {
			debugLog::log("FRONT Kbit type of (". $title .") is missing!");
			return null;
		}
		$front_type = $front["FRONT_TYPE"]; 
		// add record to database
		$query = "INSERT INTO KBIT_BASE (UID, REVISION, TITLE, DESCRIPTION, ENABLED, USER_ID, CREATION_DATE, FRONT_TYPE) VALUES (".
			$UID . ", 1, '" . $title ."', '" . $desc ."', 1, ". $user .",'". date("Y-m-d H:i:s") ."','". $front_type ."')";
		$dbObj->run_query($dbObj->db_get_usersDB(), $query);
		// entity of recently added kbit
		$recent_kbit = Kbit::get_base_Kbit($UID, 'user');
		// add front data to database
		$front_kbit = Kbit::add_new_front($UID, $front, $user, $dbObj->db_get_usersDB());
		// check if the front was created successfully
		if($front_kbit == null) {
			debugLog::log("FRONT Kbit (". $title .") faild to create!");

			// option to rollback
			// example: remove the base kbit due to this error.
			
			return $recent_kbit;
		}

		// merge front kbit with base
		$recent_kbit["FRONT_KBIT"] = $front_kbit;
		return $recent_kbit;
	}



	/**
	 * Adds new instance of Kbit's front to the specific front table based on FRONT_TYPE in edit mode(to users database)
	 * @param {int} $UID The UID of the base Kbit
	 * @param {frontKbit} $front array of key value pair in FRONT format
	 * @param {int} $user User id of the creator
	 * @return {frontKbit}
	 */
	private static function add_new_front($UID, $front, $user, $source = 'content') {

		$dbObj = new dbAPI();

		$front_type = $front["FRONT_TYPE"];
		if($front_type == null) {
			debugLog::log("FRONT Kbit type of (". $UID .") is missing!");
			return null;
		}
		// determine which front kbit insertion function should be called
		switch ($front_type) {
		    case "KBIT_FRONT":
		    	$kbit_front = Kbit::add_new_KBIT_FRONT($UID, $front, $user, $source);
		    	if($kbit_front == null) {
		    		debugLog::log("[add_new_front]: Could not insert a new front Kbit of the base (". $UID ."), [add_new_KBIT_FRONT] faild");
		    		return null;
		    	}
		    	return $kbit_front;
		        break;
		    case "YOUTUBE": // example for future formats
		        debugLog::log("[Kbit::add_new_front]: Dummy format was invoked (YOUTUBE)");
		        return null;
		    default:
		        debugLog::log("[Kbit::add_new_front]: Default case was invoked [UID]:(". $UID .")");
		        return null;
		}
	}


	/**
	 * Inserts a new Kbit front of type KBIT_FRONT in edit mode into the database users
	 * @param {int} $UID The UID of the base Kbit
	 * @param {frontKbit} $front array of key value pair in FRONT format
	 * @param {int} $user User id of the creator
	 * @return {frontKbit:KBIT_FRONT}
	 */
	private static function add_new_KBIT_FRONT($UID, $front, $user, $source = 'content') {
		
		$dbObj = new dbAPI();
		// determines the database name which the {Kbit} should be imported from
		if($source == 'content')
			$database_source = $dbObj->db_get_contentDB();
		else
			$database_source = $dbObj->db_get_usersDB();

		// static table name of specific Kbit front
		$tableName = 'KBIT_FRONT';
		// aquire a new revision number
		$rev_num = Kbit::get_new_Revision_and_disbale_old_ones($UID, $tableName, $source);
		// database insert query
		$query = "INSERT INTO ". $tableName ." (UID, REVISION, PATH, ENABLED, USER_ID, CREATION_DATE) VALUES (".
			$UID . ", 1, '" . $front["PATH"] ."', 1, ". $user .",'". date("Y-m-d H:i:s") ."')";
		$dbObj->run_query($database_source, $query);

		return Kbit::get_front_Kbit($UID, $tableName, $source);
	}


	/**
	 * Disables all the old instances of the specific front Kbit and generates a new Rivision number
	 * @param  {int} $UID       The UID of requested Kbit
	 * @param  {string} $tableName The table name of a specific front format (front Kbit, e.g. YOUTUBE)
	 * @param  {string} $source The table name of a specific front format (front Kbit, e.g. YOUTUBE)
	 * @return {int}            The new revision that should be used
	 */
	private static function get_new_Revision_and_disbale_old_ones($UID, $tableName, $source = 'content') {

		$dbObj = new dbAPI();
		// determines the database name which the {Kbit} should be imported from
		if($source == 'content')
			$database_source = $dbObj->db_get_contentDB();
		else
			$database_source = $dbObj->db_get_usersDB();
		// prepare where statement
		$where_sttmnt = " ( UID = ". $UID ." ) ";
		// remove old instances of the specific front
		$dbObj->disable_revision($database_source, $tableName, $where_sttmnt);
		// get a new revision number for front kbit
		$latest_revision = $dbObj->get_latest_Rivision_ID($database_source, $tableName, $where_sttmnt);
		if($latest_revision == null)
			$latest_revision = 0;

		return $latest_revision;
	}


	/**
	 * Creates a new instance of Base Kbit and returns it as {Kbit} array
	 * @param  {int} UID of the requested Base Kbit
	 * @param  {string} $source 'content' or 'user', depend on which database the {KbitBase} should be imported from
	 * @returns {KbitBase}
	 */
	private static function get_base_Kbit($UID, $source = 'content') {

		$dbObj = new dbAPI();		

		// determines the database name which the {Kbit} should be imported from
		if($source == 'content')
			$database_source = $dbObj->db_get_contentDB();
		else
			$database_source = $dbObj->db_get_usersDB();

		// database query
		$query = "SELECT * FROM KBIT_BASE where UID = '" . $UID . "' AND ENABLED = '1'";
		$results = $dbObj->db_select_query($database_source, $query);
		if(count($results) == 0) {
			debugLog::log("Base Kbit (". $UID .") from database (". $source .") was not found.");
			return null;
		}
		return $results[0];
	}


	/**
	 * Creates a new instance of front Kbit and returns it as {Kbit} array
	 * @param  {int} UID of the requested Base Kbit
	 * @param  {string} $tableName The table name of a specific front format (front Kbit, e.g. YOUTUBE)
	 * @param  {string} $source 'content' or 'user', depend on which database the {frontKbit} should be imported from
	 * @returns {frontKbit}
	 */
	private static function get_front_Kbit($UID, $tableName, $source = 'content') {

		$dbObj = new dbAPI();		

		// determines the database name which the {Kbit} should be imported from
		if($source == 'content')
			$database_source = $dbObj->db_get_contentDB();
		else
			$database_source = $dbObj->db_get_usersDB();

		// database query
		$query = "SELECT * FROM ". $tableName ." where UID = '" . $UID . "' AND ENABLED = '1'";
		$results = $dbObj->db_select_query($database_source, $query);
		if(count($results) == 0) {
			debugLog::log("front Kbit (". $UID .") from database (". $source .".". $tableName .") was not found.");
			return null;
		}
		return $results[0];
	}



	/**
	 * Disables old revisions in user database, create a copy of content records in user database then acquire lock on kbit
	 * @param  {int} $UID  The UID of the edited Kbit
	 * @param  {int} $user The user that is editing the Kbit
	 * @return {bool}       returns true on success false otherwise
	 */
	public static function begin_editing_kbit($UID, $user) {
		// acquire lock copy data records of the kbit from the content database into user database
		// get selected Kbit
		$curr_kbit = Kbit::get_kbit_by_UID($UID);
		if($curr_kbit == null) {
			debugLog::log("[begin_editing_kbit]: Could not find Kbit of the base (". $UID .") in content");
    		return false;
		}

		// try to acquire lock on the Kbit
		if(Lock::acquire_lock($UID, 'KBIT_BASE', $user) == false) {
			debugLog::log("Could not acquire lock on kbit (". $UID ."), check whether the Kbit is locked by other users");
			return false;
		}

		// copy kbit from content database into user database
		$dbObj = new dbAPI();
		$where_sttmnt = ' WHERE UID = '. $UID .' AND ENABLED = 1 ';
		// get columns names
		$columns_names = $dbObj->db_get_columns_names($dbObj->db_get_usersDB(), "KBIT_BASE", true);
		// remove primary key (auto-increment) column (id)
		$columns_names = str_replace("id,", "", $columns_names);
		// disable old records
		$dbObj->disable_revision('', $dbObj->db_get_usersDB() .".KBIT_BASE ", ' UID = '. $UID . ' ');
		// copy record from content to user
		$query = "INSERT INTO ". $dbObj->db_get_usersDB() .".KBIT_BASE (". $columns_names .") SELECT ". $columns_names ." FROM ". $dbObj->db_get_contentDB() . ".KBIT_BASE ". $where_sttmnt ."";
		$dbObj->run_query($dbObj->db_get_usersDB(), $query);
		


		// disable old front record
		$links_tables_names = array('KBIT_FRONT');
		for($i = 0; $i < count($links_tables_names); $i++) {
			// disable old links records
			$dbObj->disable_revision('', $dbObj->db_get_usersDB() .".". $links_tables_names[$i] . " ", ' UID = '. $UID . ' ');
		}
		// get front kbit table name
		$front_table_name = Kbit::get_front_table_name($curr_kbit["FRONT_TYPE"]);
		if($front_table_name == null) {
			debugLog::log("[begin_editing_kbit]: Could not find front kbit table name (". $UID .")");
    		// roll back option here
    		return false;
		}
		// get columns names
		$columns_names = $dbObj->db_get_columns_names($dbObj->db_get_usersDB(), $front_table_name, true);
		// remove primary key (auto-increment) column (id)
		$columns_names = str_replace("id,", "", $columns_names);
		// copy front record from content to user
		$query = "INSERT INTO ". $dbObj->db_get_usersDB() .".". $front_table_name ." (". $columns_names .") SELECT ". $columns_names ." FROM ". $dbObj->db_get_contentDB() . ".". $front_table_name ." ". $where_sttmnt ."";
		$dbObj->run_query($dbObj->db_get_usersDB(), $query);




		// loop over links and copy records from content to user
		$links_tables_names = array('R_LD2K', 'R_LK2T', 'R_LK2K');
		for($i = 0; $i < count($links_tables_names); $i++) {
			
			// prepare where statement
			if($links_tables_names[$i] == 'R_LK2K')
				$where_sttmnt = ' (PARENT_ID = '. $UID .' OR CHILD_ID = '. $UID .') ';
			else
				$where_sttmnt = ' (KBIT_BASE_ID = '. $UID . ') ';
			// disable old links records
			$dbObj->disable_revision('', $dbObj->db_get_usersDB() .".". $links_tables_names[$i] . " ", $where_sttmnt);
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
				$dbObj->run_query($dbObj->db_get_usersDB(), $query);
			}
		}

		return true;
	}


	/**
	 * Returns the appropriate front kbit table name
	 * @param  {string} $front_type front kbit descriptor
	 * @return {string}             front kbit table name
	 */
	private static function get_front_table_name($front_type) {
		// determine front kbit table name
		switch ($front_type) {
		    case "KBIT_FRONT":
		    	return "KBIT_FRONT";
		    case "YOUTUBE": // example for future formats
		        debugLog::log("[Kbit::get_front_table_name]: Dummy format was invoked (YOUTUBE)");
		        return null;
		    default:
		        debugLog::log("[Kbit::get_front_table_name]: Default case was invoked [front_type]:(". $front_type .")");
		        return null;
		}
		return null;
	}


	/**
	 * Creates a copy of all records related to the specified Kbit into the content database and disables all records in user database then releases the lock
	 * @param  {int} $UID  UID of the kbit that is being published
	 * @param  {int} $user The user that is publishing the kbit
	 * @return {bool}       true on success false otherwise
	 */
	public static function publish_changes($UID, $user) {
		// add new record in content database for each data record and disable all data records in user database
		
		if(Lock::is_locked_by_user($UID, 'KBIT_BASE', $user) == false) {
			debugLog::log("<i>[Kbits.php:publish_changes]</i> cannot publish Kbit (". $UID .") because the user is not locking it or is locked by someone else");
			return false;
		}

		// get selected Kbit
		$curr_kbit = Kbit::get_edited_kbit_by_UID($UID);
		if($curr_kbit == null) {
			debugLog::log("<i>[Kbit::publish_changes]:</i> Could not find Kbit of the base (". $UID .") in user");
    		return false;
		}

		// copy kbit from user database into content database
		$dbObj = new dbAPI();
		$where_sttmnt = ' WHERE UID = '. $UID .' AND ENABLED = 1 ';
		// get columns names
		$columns_names = $dbObj->db_get_columns_names($dbObj->db_get_contentDB(), "KBIT_BASE", true);
		// remove primary key (auto-increment) column (id)
		$columns_names = str_replace("id,", "", $columns_names);
		// disable old records
		$dbObj->disable_revision('', $dbObj->db_get_contentDB() .".KBIT_BASE ", ' UID = '. $UID . ' ');
		// copy record from user to content
		$query = "INSERT INTO ". $dbObj->db_get_contentDB() .".KBIT_BASE (". $columns_names .") SELECT ". $columns_names ." FROM ". $dbObj->db_get_usersDB() . ".KBIT_BASE ". $where_sttmnt ."";
		$dbObj->run_query($dbObj->db_get_contentDB(), $query);
		


		// disable old front record
		$links_tables_names = array('KBIT_FRONT');
		for($i = 0; $i < count($links_tables_names); $i++) {
			// disable old links records
			$dbObj->disable_revision('', $dbObj->db_get_contentDB() .".". $links_tables_names[$i] . " ", ' UID = '. $UID . ' ');
		}
		// get front kbit table name
		$front_table_name = Kbit::get_front_table_name($curr_kbit["FRONT_TYPE"]);
		if($front_table_name == null) {
			debugLog::log("<i>[Kbit::publish_changes]:</i> Could not find front kbit table name (". $UID .")");
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
		$links_tables_names = array('R_LD2K', 'R_LK2T', 'R_LK2K');
		for($i = 0; $i < count($links_tables_names); $i++) {
			
			// prepare where statement
			if($links_tables_names[$i] == 'R_LK2K')
				$where_sttmnt = ' (PARENT_ID = '. $UID .' OR CHILD_ID = '. $UID .') ';
			else
				$where_sttmnt = ' (KBIT_BASE_ID = '. $UID . ') ';
			// disable old links records
			$dbObj->disable_revision('', $dbObj->db_get_contentDB() .".". $links_tables_names[$i] . " ", $where_sttmnt);
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
		// release lock off the Kbit
		if(Lock::release_lock($UID, 'KBIT_BASE', $user) == false) {
			debugLog::log("<i>[Kbit::publish_changes]:</i> Could not release lock off kbit (". $UID .")");
			return false;
		}

		return true;
	}
	


	/**
	 * Removes all instances of kbit and its relatives from user database and releases the lock
	 * @param  {int} $UID  Kbit UID
	 * @param  {int} $user The user's UID that is performing the operation
	 * @return {bool}       true on success false otherwise
	 */
	public static function cancel_edited_kbit($UID, $user) {

		// release lock off the Kbit
		if(Lock::release_lock($UID, 'KBIT_BASE', $user) == false) {
			debugLog::important_log("<i>[Kbits.php:cancel_edited_kbit]</i> Could not release lock off kbit (". $UID .")");
			return false;
		}
		$dbObj = new dbAPI();
		// disable old records
		$dbObj->disable_revision('', $dbObj->db_get_usersDB() .".KBIT_BASE ", ' UID = '. $UID . ' ');	


		// disable old front record
		$links_tables_names = array('KBIT_FRONT');
		for($i = 0; $i < count($links_tables_names); $i++) {
			// disable old links records
			$dbObj->disable_revision('', $dbObj->db_get_usersDB() .".". $links_tables_names[$i] . " ", ' UID = '. $UID . ' ');
		}
		
		// loop over links and copy records from content to user
		$links_tables_names = array('R_LD2K', 'R_LK2T', 'R_LK2K');
		for($i = 0; $i < count($links_tables_names); $i++) {
			
			// prepare where statement
			if($links_tables_names[$i] == 'R_LK2K')
				$where_sttmnt = ' (PARENT_ID = '. $UID .' OR CHILD_ID = '. $UID .') ';
			else
				$where_sttmnt = ' (KBIT_BASE_ID = '. $UID . ') ';
			// disable old links records
			$dbObj->disable_revision('', $dbObj->db_get_usersDB() .".". $links_tables_names[$i] . " ", $where_sttmnt);
		}
		return true;
	}






	/**
	 * Returns the Kbit's base from content database
	 * @param  {int} $UID The UID of the requested Kbit
	 * @return {KbitBase}      the requested Kbit
	 */
	public static function get_kbit_by_UID($UID) {
		// returns the kbit from content database for as read-only
		$dbObj = new dbAPI();
		$query = "SELECT * FROM KBIT_BASE where UID = '" . $UID . "' AND ENABLED = '1'";
		$results = $dbObj->db_select_query($dbObj->db_get_contentDB(), $query);
		if(count($results) == 0)
			return null;

		return $results[0];
	}

	/**
	 * Returns the Kbit's base from user database
	 * @param  {int} $UID The UID of the requested Kbit
	 * @return {KbitBase}      the requested Kbit
	 */
	public static function get_edited_kbit_by_UID($UID) {
		// returns the kbit from user database
		$dbObj = new dbAPI();
		$query = "SELECT * FROM KBIT_BASE where UID = '" . $UID . "' AND ENABLED = '1'";
		$results = $dbObj->db_select_query($dbObj->db_get_usersDB(), $query);
		if(count($results) == 0)
			return null;

		return $results[0];
	}

	public static function delete_kbit($UID) {

		// disable all data of kbit in both databases by adding a new record with enabled = 0
		throw new Exception('Unimplemented method _delete_kbit_');
	}


}

?>
















