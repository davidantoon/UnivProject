<?php

class debugLog {
	private static function debug_mode() {
		return false; // debug mode
	}

	public static function debug_log($message) {
		if(debugLog::debug_mode() == true) {
			echo "<br><b>" . date("d-m-y h:i:s") . ": </b>" . $message;
		}
		else {
			debugLog::file_log("<br><b>" . date("Y-m-d H:i:s"). ": </b>" . $message);
			// throw new Exception($message);
		}
	}

	public static function log($message) {
		debugLog::debug_log($message);
	}

	public static function important_log($message) {
		
		$color = 'red';
		if($message == "START" || $message == "DONE")
			$color = 'orange';
		if(debugLog::debug_mode() == true) {
			echo "<br><b>". "<hr style='border-color:". $color ."'>";
			echo date("d-m-y h:i:s") . ": </b>" . $message;
			echo "<hr style='border-color:". $color ."'>";
		}
		else
		{
			debugLog::file_log("<br><b>". "<hr style='border-color:". $color ."'>");
			debugLog::file_log(date("d-m-y h:i:s") . ": </b>" . $message);
			debugLog::file_log("<hr style='border-color:". $color ."'>");
		}
	}

	STATIC $include_couter = 0;

	public static function included_log($class_name) {
		$color = 'green';
		if(debugLog::debug_mode() == true) {
			echo "<b>" . ++debugLog::$include_couter .") " . $class_name . "</b> included successfully";
			echo "<hr style='border-color:". $color ."'>";
		}
	}

	public  static function po($object, $message) {

		debugLog::log('<b><u>'. $message .'</u></b>: '. dbAPI::print_json_s($object, 0));
		
	}

	private static function file_log($data) {

		$file_name = debugLog::get_log_file_name();
		file_put_contents($file_name, $data, FILE_APPEND);
		file_put_contents($file_name, "\n", FILE_APPEND);


	}



	private static function get_log_file_name() {

		$latest_number = 0;
		$files = glob("logs/log-file-". date("Y-m-d") ."*.log*");
		$files = array_combine($files, array_map("filemtime", $files));
		if(count($files) > 0) {
			arsort($files);

			$latest_file = key($files);
			preg_match('~.log(\d+)~', $latest_file, $temp);
			preg_match('~(\d+)~', $temp[0], $temp);
			$latest_number = $temp[0];
		}
		$curr_file_name = "logs/log-file-". date("Y-m-d") .".log" . sprintf("%03d", $latest_number);
		$latest_number++;
		$new_file_name = "logs/log-file-". date("Y-m-d") .".log" . sprintf("%03d", $latest_number);

		if(filesize($curr_file_name) < 45000)
			return $curr_file_name;
		return $new_file_name;

		var_dump($latest_file);
	}

	public static function get_all_log_files() {

		$files = glob("logs/log-file-*.log*");
		$files = array_combine($files, array_map("filemtime", $files));
		if(count($files) > 0) {
			arsort($files);
		}
		return $files;
	}
	
	public static function get_log_file_content($get_log_file_name) {

		return file_get_contents($get_log_file_name);
	}
}
?>















