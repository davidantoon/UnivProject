<?php

debugLog::included_log("Lock");


/**
 * Lock class
 * @class Lock
 */
class Lock {



	public static function acquire_lock($UID, $entity_type, $user) {
		// add record to lock table in order to specify that the kbit is locked
		// NOTE: it is recomended to implement the lock in separated class
		if(Lock::is_locked($UID, $entity_type)) {
			debugLog::log("<i>[Lock::acquire_lock]:</i> cannot acquire lock on [". $entity_type ."]: ". $UID ." because it is already locked");
			return false;
		}
		$dbObj = new dbAPI();
		
		// disable unlock records
		$query = "UPDATE CONTENT_LOCK SET ENABLED = 0 WHERE LOCKED_UID = '" . $UID . "' AND ENTITY_TYPE = '" . $entity_type . "' AND LOCK_STATUS = 'UNLOCKED' AND ENABLED = 1 ";
		$results = $dbObj->run_query($dbObj->db_get_contentDB(), $query);
		if($results == false) {
			debugLog::log("<i>[Lock::acquire_lock]:</i> cannot acquire lock on [". $entity_type ."]: ". $UID ." because of database update error");
			return false;
		}
		// add lock record
		$query = "INSERT INTO CONTENT_LOCK (LOCKED_UID, ENTITY_TYPE, LOCK_STATUS, ENABLED, USER_ID, CREATION_DATE) VALUES (".
			$UID . ", '". $entity_type . "', 'LOCKED', 1, ". $user .",'". date("Y-m-d H:i:s") ."')";
		return $dbObj->run_query($dbObj->db_get_contentDB(), $query) == true;
	}

	public static function release_lock($UID, $entity_type, $user) {
		// add record to lock table in order to specify that the kbit is no longer locked
		// NOTE: it is recomended to implement the lock in separated class
		if(Lock::is_locked($UID, $entity_type) == false) {
			debugLog::log("<i>[Lock::release_lock]:</i> cannot release lock of [". $entity_type ."]: ". $UID ." because it is not locked");
			return false;
		}

		if(Lock::is_locked_by_user($UID, $entity_type, $user) == false) {
			debugLog::log("<i>[Lock::release_lock]:</i>cannot release lock of [". $entity_type ."]: ". $UID ." because it is not locked by the same user");
			return false;	
		}

		$dbObj = new dbAPI();
		// disable lock records
		$query = "UPDATE CONTENT_LOCK SET ENABLED = 0 WHERE LOCKED_UID = '" . $UID . "' AND ENTITY_TYPE = '" . $entity_type . "' AND LOCK_STATUS = 'LOCKED' AND ENABLED = 1 ";
		$results = $dbObj->run_query($dbObj->db_get_contentDB(), $query);
		if($results == false) {
			debugLog::log("<i>[Lock::release_lock]:</i>cannot release lock of [". $entity_type ."]: ". $UID ." because of database update error");
			return false;
		}
		// add release record
		$query = "INSERT INTO CONTENT_LOCK (LOCKED_UID, ENTITY_TYPE, ENABLED, LOCK_STATUS, USER_ID, CREATION_DATE) VALUES (".
			$UID . ", '". $entity_type . "', 1, 'UNLOCKED', ". $user .",'". date("Y-m-d H:i:s") ."')";
		return $dbObj->run_query($dbObj->db_get_contentDB(), $query) == true;
	}

	public static function is_locked($UID, $entity_type) {

		$dbObj = new dbAPI();
		$query = "SELECT * FROM CONTENT_LOCK where LOCKED_UID = '" . $UID . "' AND ENTITY_TYPE = '" . $entity_type . "' AND LOCK_STATUS = 'LOCKED' AND ENABLED = 1 ";
		$results = $dbObj->db_select_query($dbObj->db_get_contentDB(), $query);
		return count($results) != 0;
	}

	public static function is_locked_by_user($UID, $entity_type, $user) {
		
		$dbObj = new dbAPI();
		$query = "SELECT * FROM CONTENT_LOCK where LOCKED_UID = '" . $UID . "' AND ENTITY_TYPE = '" . $entity_type . "' AND LOCK_STATUS = 'LOCKED' AND ENABLED = 1 AND USER_ID = ". $user ." ";
		$results = $dbObj->db_select_query($dbObj->db_get_contentDB(), $query);
		return count($results) != 0;	
	}

	public static function get_locking_user($UID, $entity_type) {

		$dbObj = new dbAPI();
		$query = "SELECT usr.* FROM ". dbAPI::get_db_name('content') .".CONTENT_LOCK AS lk INNER JOIN ". dbAPI::get_db_name('user') .".USERS AS usr ON (usr.UID = lk.USER_ID) where lk.LOCKED_UID = '" . $UID . "' AND lk.ENTITY_TYPE = '" . $entity_type . "' AND lk.LOCK_STATUS = 'LOCKED' AND lk.ENABLED = 1 ";
		$results = $dbObj->db_select_query($dbObj->db_get_contentDB(), $query);
		if(count($results) > 0) {
			$usr = $results[0];
			$usr["PASSWORD"] = '********';
			return $usr;
		}
		return null;
	}
}

?>





















