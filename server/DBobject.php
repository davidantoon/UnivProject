<?php
/*
 * PHP database connector
 */

//a basic API for database connector
echo 'dbAPI included successfuly <hr>';
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
    
    private function db_get_connection($database_name) {
    	// Create connection
		$conn = new mysqli($this->host, $this->user, $this->password, $database_name);

		// Check connection
		if ($conn->connect_error) {
		    die("Connection failed: " . $conn->connect_error);
		}
		return $conn;
    }

    public function run_query($database_name, $sql) {
		$conn = $this->db_get_connection($database_name);
		$result = $conn->query($sql);
		
		if($result == TRUE) {
			
			$conn->close();
		    return $result;
		}
		else {
			$conn->close();
			echo "<br><hr>". date("d-m-y h:i:s") ."<br>SQL ERROR:<br>" . mysql_error() ."<br>QUERY:<br>" . $sql . "<br><hr><br>";
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

    public function get_latest_UID($database_name, $table_name) {
    	
    	$query = 'SELECT MAX(UID) AS max_UID FROM ' . $table_name;
    	$results = $this->db_select_query($database_name, $query);
	    if(count($results) == 0)
	    	return 0;
	    return $results[0]["max_UID"];
    }

    public function get_latest_Rivision_ID($database_name, $table_name, $whereSttmnt = '') {
    	
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
}

?>






