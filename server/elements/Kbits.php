<?php

debugLog::included_log("Kbits");


/**
 * Kbit class
 * @class Kbit
 */
class Kbit {

	private static function get_relations_tables_names() {
		return array('R_LD2K', 'R_LK2T', 'R_LK2K');
	}

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

		// get new UID from contents database to reseve the UID
		$UID = $dbObj->get_latest_UID($dbObj->db_get_contentDB(), 'KBIT_BASE');
		$UID++;

		// try to acquire lock on the Kbit
		if(Lock::acquire_lock($UID, 'KBIT_BASE', $user) == false) {
			debugLog::log("<i>[Kbits.php:add_new_Kbit_in_edit_mode]</i> Could not acquire lock on kbit (". $UID ."), check whether the Kbit is locked by other users");
			return null;
		}
		return Kbit::add_new_edit_for_kbit($UID, $title, $desc, $user, $front);
	}


	/**
	 * Add new Kbit (users database)
	 * @param {string} $title The title of the Kbit
	 * @param {string} $desc  The description of the Kbit
	 * @param {int} $user  The user's id who added the Kbit
	 * @param {frontKbit} $front array of key value pair in FRONT format
	 * @return {Kbit}
	 */
	public static function add_new_edit_for_kbit($UID, $title, $desc, $user, $front) {

		// check if Kbit is locked by user
		if(Lock::is_locked_by_user($UID, 'KBIT_BASE', $user) == false) {
			debugLog::log("<i>[Kbits.php:add_new_edit_for_kbit]</i>The kbit (". $UID .") is not locked by user (". $user .")");
			return null;
		}

		$dbObj = new dbAPI();
		// get front type
		if($front == null) {
			debugLog::log("<i>[Kbits.php:add_new_edit_for_kbit]</i> FRONT Kbit of (". $title .") is missing!");
			
			return null;
		}		
		if($front["FRONT_TYPE"] == null) {
			debugLog::log("<i>[Kbits.php:add_new_edit_for_kbit]</i> FRONT Kbit type of (". $title .") is missing!");
			
			return null;
		}

		// disable all kbit information
		Kbit::disable_all_kbit_info($UID, 'content');

		$front_type = $front["FRONT_TYPE"];
		// add record to database
		$query = "INSERT INTO KBIT_BASE (UID, REVISION, TITLE, DESCRIPTION, ENABLED, USER_ID, CREATION_DATE, FRONT_TYPE) VALUES (".
			$UID . ", 1, '" . $title ."', '" . $desc ."', 1, ". $user .",'". date("Y-m-d H:i:s") ."','". $front_type ."')";
		$dbObj->run_query($dbObj->db_get_usersDB(), $query);
		$query = "INSERT INTO KBIT_BASE (UID, REVISION, TITLE, DESCRIPTION, ENABLED, USER_ID, CREATION_DATE, FRONT_TYPE) VALUES (".
			$UID . ", 1, '" . $title ."', '" . $desc ."', 0, ". $user .",'". date("Y-m-d H:i:s") ."','". $front_type ."')";
		$dbObj->run_query('content', $query);
		// entity of recently added kbit
		$recent_kbit = Kbit::get_base_Kbit($UID, 'user');
		

		if($front != null) {
			// add front data to database
			$front_kbit = Kbit::add_new_front($UID, $front, $user);
			// check if the front was created successfully
			if($front_kbit == null) {
				debugLog::log("<i>[Kbits.php:add_new_edit_for_kbit]</i> FRONT Kbit (". $title .") faild to create!");
				

				// option to rollback
				// example: remove the base kbit due to this error.
				
				return $recent_kbit;
			}

			// merge front kbit with base
			$recent_kbit["FRONT_KBIT"] = $front_kbit;
		}
		return $recent_kbit;
	}

	/**
	 * Adds new instance of Kbit's front to the specific front table based on FRONT_TYPE in edit mode(to users database)
	 * @param {int} $UID The UID of the base Kbit
	 * @param {frontKbit} $front array of key value pair in FRONT format
	 * @param {int} $user User id of the creator
	 * @return {frontKbit}
	 */
	private static function add_new_front($UID, $front, $user) {

		$dbObj = new dbAPI();

		$front_type = $front["FRONT_TYPE"];
		if($front_type == null) {
			debugLog::log("<i>[Kbits.php:add_new_front]</i> FRONT Kbit type of (". $UID .") is missing!");
			
			return null;
		}
		// determine which front kbit insertion function should be called
		switch ($front_type) {
		    case "KBIT_FRONT":
		    	$kbit_front = Kbit::add_new_KBIT_FRONT($UID, $front, $user);
		    	if($kbit_front == null) {
		    		debugLog::log("<i>[Kbits.php:add_new_front]</i> Could not insert a new front Kbit of the base (". $UID ."), [add_new_KBIT_FRONT] faild");
		    		
		    		return null;
		    	}
		    	return $kbit_front;
		        break;
		    case "YOUTUBE": // example for future formats
		        debugLog::log("<i>[Kbits.php:add_new_front]</i> Dummy format was invoked (YOUTUBE)");
		        
		        return null;
		    default:
		        debugLog::log("<i>[Kbits.php:add_new_front]</i> Default case was invoked [UID]:(". $UID .")");
		        
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
	private static function add_new_KBIT_FRONT($UID, $front, $user) {
		
		$dbObj = new dbAPI();
		// determines the database name which the {Kbit} should be imported from
		$database_source = dbAPI::get_db_name('user');

		// static table name of specific Kbit front
		$tableName = 'KBIT_FRONT';
		// aquire a new revision number
		$rev_num = Kbit::get_new_Revision_and_disbale_old_ones($UID, $tableName, 'user');
		// database insert query
		$query = "INSERT INTO ". $tableName ." (UID, REVISION, PATH, ENABLED, USER_ID, CREATION_DATE) VALUES (".
			$UID . ", 1, '" . $front["PATH"] ."', 1, ". $user .",'". date("Y-m-d H:i:s") ."')";
		$dbObj->run_query($database_source, $query);

		return Kbit::get_front_Kbit($UID, $tableName, 'user');
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
		$database_source = dbAPI::get_db_name($source);
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
		$database_source = dbAPI::get_db_name($source);

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
		$database_source = dbAPI::get_db_name($source);
		
		// database query
		$query = "SELECT * FROM ". $tableName ." where UID = '" . $UID . "' AND ENABLED = '1'";
		$results = $dbObj->db_select_query($database_source, $query);
		if(count($results) == 0) {
			debugLog::log("<i>[Kbits.php:get_front_Kbit]</i> front Kbit (". $UID .") from database (". $source .".". $tableName .") was not found.");
			
			return null;
		}
		$temp = $results[0];
		$temp["FRONT_TYPE"] = $tableName;
		return $temp;
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
			debugLog::log("<i>[Kbits.php:begin_editing_kbit]</i> Could not find Kbit of the base (". $UID .") in content");
			
    		return false;
		}

		// try to acquire lock on the Kbit
		if(Lock::acquire_lock($UID, 'KBIT_BASE', $user) == false) {
			debugLog::log("<i>[Kbits.php:begin_editing_kbit]</i> Could not acquire lock on kbit (". $UID ."), check whether the Kbit is locked by other users");
			
			return false;
		}

		// disable all kbit information
		Kbit::disable_all_kbit_info($UID, 'user');

		// copy kbit from content database into user database
		$dbObj = new dbAPI();
		$where_sttmnt = ' WHERE UID = '. $UID .' AND ENABLED = 1 ';
		// get columns names
		$columns_names = $dbObj->db_get_columns_names($dbObj->db_get_usersDB(), "KBIT_BASE", true);
		// remove primary key (auto-increment) column (id)
		$columns_names = str_replace("id,", "", $columns_names);
		// copy record from content to user
		$query = "INSERT INTO ". $dbObj->db_get_usersDB() .".KBIT_BASE (". $columns_names .") SELECT ". $columns_names ." FROM ". $dbObj->db_get_contentDB() . ".KBIT_BASE ". $where_sttmnt ."";
		$dbObj->run_query($dbObj->db_get_usersDB(), $query);
		
		
		
		// get front kbit table name
		$front_table_name = Kbit::get_front_table_name($curr_kbit["FRONT_TYPE"]);
		if($front_table_name == null) {
			debugLog::log("<i>[Kbits.php:begin_editing_kbit]</i> Could not find front kbit table name (". $UID .")");
			
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
		$links_tables_names = Kbit::get_relations_tables_names();
		for($i = 0; $i < count($links_tables_names); $i++) {
			
			// prepare where statement
			if($links_tables_names[$i] == 'R_LK2K')
				$where_sttmnt = ' (PARENT_ID = '. $UID .' OR CHILD_ID = '. $UID .') ';
			else
				$where_sttmnt = ' (KBIT_BASE_ID = '. $UID . ') ';
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
		        debugLog::log("<i>[Kbits.php:get_front_table_name]</i> Dummy format was invoked (YOUTUBE)");
		        
		        return null;
		    default:
		        debugLog::log("<i>[Kbits.php:get_front_table_name]</i> Default case was invoked [front_type]:(". $front_type .")");
		        
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

		// disable all kbit information
		Kbit::disable_all_kbit_info($UID, 'content');

		// copy kbit from user database into content database
		$dbObj = new dbAPI();
		$where_sttmnt = ' WHERE UID = '. $UID .' AND ENABLED = 1 ';
		// get columns names
		$columns_names = $dbObj->db_get_columns_names($dbObj->db_get_contentDB(), "KBIT_BASE", true);
		// remove primary key (auto-increment) column (id)
		$columns_names = str_replace("id,", "", $columns_names);

		// copy record from user to content
		$query = "INSERT INTO ". $dbObj->db_get_contentDB() .".KBIT_BASE (". $columns_names .") SELECT ". $columns_names ." FROM ". $dbObj->db_get_usersDB() . ".KBIT_BASE ". $where_sttmnt ."";
		$dbObj->run_query($dbObj->db_get_contentDB(), $query);
		

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
		$links_tables_names = Kbit::get_relations_tables_names();
		for($i = 0; $i < count($links_tables_names); $i++) {
			
			// prepare where statement
			if($links_tables_names[$i] == 'R_LK2K')
				$where_sttmnt = ' (PARENT_ID = '. $UID .' OR CHILD_ID = '. $UID .') ';
			else
				$where_sttmnt = ' (KBIT_BASE_ID = '. $UID . ') ';
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
		Kbit::disable_all_kbit_info($UID, 'user');

		// release lock off the Kbit
		if(Lock::release_lock($UID, 'KBIT_BASE', $user) == false) {
			debugLog::log("<i>[Kbits.php:publish_changes]</i> Could not release lock off kbit (". $UID .")");
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
			debugLog::log("<i>[Kbits.php:cancel_edited_kbit]</i> Could not release lock off kbit (". $UID .")");
			return false;
		}
		// disable all records in user database
		Kbit::disable_all_kbit_info($UID, 'user');
	}

	public static function disable_all_kbit_info($UID, $destination = 'user') {

		$dbObj = new dbAPI();
		
		$destination = dbAPI::get_db_name($destination);

		// disable old records
		$dbObj->disable_revision('', $destination .".KBIT_BASE ", ' UID = '. $UID . ' ');	


		// disable old front record
		$links_tables_names = array('KBIT_FRONT');
		for($i = 0; $i < count($links_tables_names); $i++) {
			// disable old links records
			$dbObj->disable_revision('', $destination .".". $links_tables_names[$i] . " ", ' UID = '. $UID . ' ');
		}
		
		// loop over links and copy records from content to user
		$links_tables_names = Kbit::get_relations_tables_names();
		for($i = 0; $i < count($links_tables_names); $i++) {
			
			// prepare where statement
			if($links_tables_names[$i] == 'R_LK2K')
				$where_sttmnt = ' (PARENT_ID = '. $UID .' OR CHILD_ID = '. $UID .') ';
			else
				$where_sttmnt = ' (KBIT_BASE_ID = '. $UID . ') ';
			// disable old links records
			$dbObj->disable_revision('', $destination .".". $links_tables_names[$i] . " ", $where_sttmnt);
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

	public static function get_Kbit_details($UID, $user) {

		if(Lock::is_locked_by_user($UID, 'KBIT_BASE', $user))
			$kbit = Kbit::get_edited_kbit_by_UID($UID);
		else
			$kbit = Kbit::get_kbit_by_UID($UID);

		// get locking user
		$locking_user = Lock::get_locking_user($UID, 'KBIT_BASE');
		if($locking_user != null)
			$kbit["LOCKING_USER"] = $locking_user;

		return $kbit;
	}



	public static function add_K2K_relation($first_UID, $second_UID, $is_hier, $user) {

		// check if Kbits is locked by user
		if(Lock::is_locked_by_user($first_UID, 'KBIT_BASE', $user) == false && Lock::is_locked_by_user($second_UID, 'KBIT_BASE', $user) == false) {
			debugLog::log("<i>[Kbits.php:add_K2K_relation]</i> Non of the Kbits (". $first_UID .", ". $second_UID .") are locked by user (". $user .")");
			return null;
		}
		// check soft lock
		$locking_user = Lock::get_locking_user($first_UID, 'KBIT_BASE');
		if($locking_user != null && $locking_user["UID"] != $user) {
			debugLog::log("<i>[Kbits.php:add_K2K_relation]</i> one of the Kbits (". $first_UID .") is locked by other user(". $locking_user["UID"] .")");
			return null;
		}
		$locking_user = Lock::get_locking_user($second_UID, 'KBIT_BASE');
		if($locking_user != null && $locking_user["UID"] != $user) {
			debugLog::log("<i>[Kbits.php:add_K2K_relation]</i> one of the Kbits (". $first_UID .") is locked by other user(". $locking_user["UID"] .")");
			return null;
		}

		if(refRelation::add_relation_to_object($first_UID, $second_UID, $is_hier, $user, 'R_LK2K', 'user') == null) {
			debugLog::log("<i>[Kbits.php:add_K2K_relation]</i> parent Kbit (". $first_UID .") and child (". $second_UID .") Kbit cannot be the same");
			
			return null;
		}
		// return recently created relation
		return refRelation::get_objects_relation($first_UID, $second_UID, 'R_LK2K', 'user');
	}

	public static function remove_K2K_relation($first_UID, $second_UID) {

		// check if Kbits is locked by user
		if(Lock::is_locked_by_user($first_UID, 'KBIT_BASE', $user) == false && Lock::is_locked_by_user($second_UID, 'KBIT_BASE', $user) == false) {
			debugLog::log("<i>[Kbits.php:add_K2K_relation]</i> Non of the Kbits (". $first_UID .", ". $second_UID .") are locked by user (". $user .")");
			return null;
		}
		// check soft lock
		$locking_user = Lock::get_locking_user($first_UID, 'KBIT_BASE');
		if($locking_user != null && $locking_user["UID"] != $user) {
			debugLog::log("<i>[Kbits.php:add_K2K_relation]</i> one of the Kbits (". $first_UID .") is locked by other user(". $locking_user["UID"] .")");
			return null;
		}
		$locking_user = Lock::get_locking_user($second_UID, 'KBIT_BASE');
		if($locking_user != null && $locking_user["UID"] != $user) {
			debugLog::log("<i>[Kbits.php:add_K2K_relation]</i> one of the Kbits (". $first_UID .") is locked by other user(". $locking_user["UID"] .")");
			return null;
		}

		refRelation::remove_relation($first_UID, $second_UID, 'R_LK2K', 'user');
	}

	public static function get_K2K_relations($Kbit_UID, $user) {

		return refRelation::get_relations_of_object($Kbit_UID, 'R_LK2K', 'Kbit::get_Kbit_details', $user);
	}





	public static function add_K2T_relation($Kbit_UID, $term_UID, $link_type, $user) {

		if(Lock::is_locked_by_user($Kbit_UID, 'KBIT_BASE', $user) == false) {
			debugLog::log("<i>[Kbits.php:add_K2T_relation]</i> Kbit (". $Kbit_UID .") is not locked by the user (". $user .")");
			return null;
		}
		return O2TRelation::add_O2T_relation(array("column_name"=>'KBIT_BASE_ID', "value"=>$Kbit_UID), $term_UID, $link_type, $user, 'R_LK2T', 'user');
	}

	public static function get_terms_of_Kbit($Kbit_UID, $user = '', $lang = '') {

		if($user != '' && Lock::is_locked_by_user($Kbit_UID, 'KBIT_BASE', $user))
			$database_name = 'user';
		else
			$database_name = 'content';

		return O2TRelation::get_terms_of_object(array("column_name"=>'KBIT_BASE_ID', "value"=>$Kbit_UID), $database_name, 'R_LK2T', $lang);
	}

	public static function remove_term_from_Kbit($Kbit_UID, $term_UID, $link_type, $user) {

		if(Lock::is_locked_by_user($Kbit_UID, 'KBIT_BASE', $user) == false) {
			debugLog::log("<i>[Kbits.php:remove_term_from_Kbit]</i> Kbit (". $Kbit_UID .") is not locked by the user (". $user .")");
			return false;
		}

		O2TRelation::remove_O2T_relation(array("column_name"=>'KBIT_BASE_ID', "value"=>$Kbit_UID), $term_UID, $link_type, 'R_LK2T', 'user');
		return true;
	}

	

	// public static function add_kbit_to_delivery() {}
	// public static function remove_kbit_from_delivery() {}
	// public static function get_Kbits_of_delivery() {}
}

?>
















