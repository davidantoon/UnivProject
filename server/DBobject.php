<?php
/*
 * PHP database connector
 */

//a basic API for database connector
debugLog::included_log("dbAPI");

class dbAPI {

	private $user = 'root';
	private $password = 'root';
	private $dbUsers = 'CMS_USERSdb';
	private $dbContent = 'CMSdb';
	private $host = 'localhost';

	public function db_get_usersDB(){
		return $this->dbUsers;
	}
	public function db_get_contentDB(){
		return $this->dbContent;
	}
	public static function get_db_name($source) {
		$dbObj = new dbAPI();
		if($source == 'content' || $source == "CMSdb")
			return $dbObj->db_get_contentDB();
		else
			return $dbObj->db_get_usersDB();
	}
    
    private function db_get_connection($database_name = '') {
    	// Create connection
    	if($database_name != '')
			$conn = new mysqli($this->host, $this->user, $this->password, $database_name);
		else
			$conn = new mysqli($this->host, $this->user, $this->password);

		// Check connection
		if ($conn->connect_error) {
		    die("Connection failed: " . $conn->connect_error);
		}
		return $conn;
    }
    
    public function run_query($database_name, $sql) {
		$database_name = dbAPI::get_db_name($database_name);
		$conn = $this->db_get_connection($database_name);
		$result = $conn->query($sql);
		
		if($result == TRUE) {
			
			$conn->close();
		    return $result;
		}
		else {
			echo "<br><hr>". date("d-m-y h:i:s") ."<br>SQL ERROR:<br>" . mysql_error() ."<br>QUERY:<br>" . $sql . "<br>";
			echo '<hr>';
			echo '<hr>';
			var_dump($conn);
			echo '<hr>';
			echo "<hr><br>";
			$conn->close();
		}
    }

    public function db_select_query($database_name, $sql) {
    	try {
	    	$res = $this->run_query($database_name, $sql);
	    	$results = array();
			while($row = $res->fetch_assoc()) {
			         $results[] = $row;
		    }
		    return $results;
		}
		catch (Exception $e) {
		    echo 'Caught exception: ',  $e->getMessage(), "\n";
		}
    }

    public function db_get_columns_names($database_name, $table_name, $separated = false) {
    	
    	$query = "select column_name from INFORMATION_SCHEMA.COLUMNS  where table_name = '". $table_name ."' AND TABLE_SCHEMA = '". $database_name ."'";
    	$results = $this->db_select_query($database_name, $query);
    	if($separated == false)
	    	return $results;
		$ar = implode(', ', array_map(function ($entry) {return $entry['column_name'];}, $results));
		return $ar;
    }

    public function insert_batch($database_name, $table_name, $data) {

    	echo '13<br>';
    	$conn = $this->db_get_connection($database_name);
    	echo '14<br>';
    	// debugLog::important_log(dbAPI::print_json_s($data, 0));
		// $result = $conn->insert_batch($table_name, $data);
		$result = $this->db->insert_batch($table_name, $data);
		debugLog::important_log("aa");
		var_dump($result);
		debugLog::important_log("aa");
		echo '15<br>';
		if($result == false) {
			echo "<br><hr>". date("d-m-y h:i:s") ."<br>SQL ERROR";
			echo '<hr>';
			echo '<hr>';
			var_dump($conn);
			echo '<hr>';
			echo "<hr><br>";
		}
		return $result;
    }

    public function get_latest_UID($database_name, $table_name) {
    	
    	$query = 'SELECT MAX(id) AS max_UID FROM ' . $table_name;
    	$results = $this->db_select_query($database_name, $query);
	    if(count($results) == 0)
	    	return 0;
	    return $results[0]["max_UID"];
    }

    public function get_latest_Rivision_ID($database_name, $table_name, $whereSttmnt = '') {
    	$database_name = dbAPI::get_db_name($database_name);
    	if($whereSttmnt != '')
    		$whereSttmnt = ' WHERE (('. $whereSttmnt .'))';

    	$query = 'SELECT MAX(REVISION) AS max_Riv FROM ' . $table_name . $whereSttmnt;
    	$results = $this->db_select_query($database_name, $query);
	    if(count($results) == 0)
	    	return null;
	    return $results[0]["max_Riv"];
    }

    public function disable_revision($database_name, $table_name, $whereSttmnt) {

		$query = "UPDATE ". $table_name ." SET ENABLED = 0 WHERE ". $whereSttmnt . " ";
		
		$results = $this->run_query($database_name, $query);
		if($results) {
			// on success
			return true;
		}
		debugLog::debug_log("[disable_revision]: could not disbale rivision. [query]: <br>" . $query ."<hr>");
		return false;
    }


    public function print_table($results) {
    	echo "<hr>";
    	$jsonIterator = new RecursiveIteratorIterator(new RecursiveArrayIterator($results), RecursiveIteratorIterator::SELF_FIRST);

    	$jsonIterator1 = new RecursiveIteratorIterator(new RecursiveArrayIterator($results[0]), RecursiveIteratorIterator::SELF_FIRST);

    	echo "<table border = 1>";
    	echo "<tr>";
	    foreach ($jsonIterator1 as $key => $val) {
	    	if(!is_array($val)) {
		    	echo "<td>" . "$key\n" . "</td>";
	    	}
	    }
	    // echo "</tr>";
		foreach ($jsonIterator as $key => $val) {
			if(is_array($val)) {
				echo "</tr>";
				echo "<tr>";
			} else {
			    echo "<td>" . "$val\n" . "</td>";
			}
		}
		echo "</table>";
		echo "<hr>";
		echo "<br/>";
		echo "<br/>";
		echo "<br/>";
    }

    public static function print_json_s($arr, $prnt = 1) {
    	$dbo = new dbAPI();
    	return $dbo->print_json($arr, $prnt);
    }
    public function print_json($arr, $prnt = 1) {
    	$jsons = "<br/>" .
    	"<hr>" .
    	json_encode($arr) .
    	"<hr>" .
    	"<br/>";
    	if($prnt == 1)
	    	echo $jsons;
    	return $jsons;
    }


    public static function delete_all($dbArr) {
    	$dbObj = new dbAPI();
		// $dbArr = array( $u.'.KBIT_BASE', $u.'.KBIT_FRONT', $c.'.KBIT_BASE', $c.'.KBIT_FRONT', $c.'.CONTENT_LOCK');
		for($k = 0; $k < count($dbArr); $k++)
			$dbObj->run_query($dbObj->db_get_usersDB(), "DELETE FROM " . $dbArr[$k]);
    }
}

?>






