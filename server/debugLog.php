<?php

class debugLog {
	private static function debug_mode() {
		return false; // debug mode
	}
	private static function debug_db() {
		return false; // debug database function/queries
	}

	// #66d9ef blue (time)
	// #f92772 pink (important)
	// #a6e22d (function name)
	// while (text)
	// #272822 (background)
	public static function debug_log($message) {
		if(debugLog::debug_mode() == true) {
			echo "<br><b><font color='#66d9ef'>" . date("d-m-y h:i:s") . ": </font></b>" . $message;
		}
		else {
			$temp = $message;
			$i = 1;
			$message = str_replace("<i>","<font color='#a6e22d'><i>", $message, $i);
			$i = 1;
			$message = str_replace("</i>","</i></font><font color ='white'>", $message, $i) . '</font>';
			debugLog::file_log("<br><b><font color='#66d9ef'>" . date("Y-m-d H:i:s"). ": </font></b>" . $message);
			// throw new Exception($temp);
		}
	}

	public static function trace($fileName, $function, $arg, $class_name = 'trace') {
		
		if(debugLog::debug_db() == false && $class_name == 'db')
			return;

		if($class_name != 'db')
			$function = '<font color="#a381ff">'. $function . '</font>';
		$str = '<br><font color = "#dadb74" size="2"><b>' . date("Y-m-d H:i:s"). ": </b>";
		$str .= '<ul class="trace"><li><b><u>' . basename($fileName) . '</u></b>' . '<ul><li><u><i>' . $function . '</i></u><ul><li>' . json_encode($arg) . '</li></ul></li></ul></li></ul>';
		
		$str .= "</font>";
		if($class_name != 'trace')
			$class_name .= ' trace';
		debugLog::file_log('<div class="'. $class_name .'">'.$str.'</div>');
	}

	public static function log($message) {
		debugLog::debug_log($message);
	}

	public static function important_log($message) {
		
		$color = '#f92772';
		if($message == "START" || $message == "DONE")
			$color = 'orange';
		if(debugLog::debug_mode() == true) {
			echo "<font color='#f92772'><br><b>". "<hr style='border-color:". $color ."'>";
			echo date("d-m-y h:i:s") . ": </b>" . $message;
			echo "<hr style='border-color:". $color ."'></font>";
		}
		else
		{
			debugLog::file_log("<br><font color='#f92772'><b>". "<hr style='border-color:". $color ."'>");
			debugLog::file_log(date("d-m-y h:i:s") . ": </b>" . $message);
			debugLog::file_log("<hr style='border-color:". $color ."'></font>");
		}
	}

	public static function api_log($message) {
		$color = 'orange';
		debugLog::file_log("<font color='". $color ."'><hr style='border-color:". $color ."'>");
		debugLog::file_log(date("d-m-y h:i:s") . ':API REQUEST: <br>' . $message);
		debugLog::file_log("<hr style='border-color:". $color ."'></font>");
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

		if (!file_exists('logs/'. date("Y-m-d")))
			mkdir('logs/'.date("Y-m-d"), 0755, true);

		$latest_number = 0;
		$files = glob("logs/". date("Y-m-d") ."/log-file-". date("Y-m-d") ."*.log*");
		$files = array_combine($files, array_map("filemtime", $files));
		if(count($files) > 0) {
			arsort($files);

			$latest_file = key($files);
			preg_match('~.log(\d+)~', $latest_file, $temp);
			preg_match('~(\d+)~', $temp[0], $temp);
			$latest_number = $temp[0];
		}
		$curr_file_name = "logs/". date("Y-m-d") ."/log-file-". date("Y-m-d") .".log" . sprintf("%03d", $latest_number);
		$latest_number++;
		$new_file_name = "logs/". date("Y-m-d") ."/log-file-". date("Y-m-d") .".log" . sprintf("%03d", $latest_number);

		if(filesize($curr_file_name) < 90000)
			return $curr_file_name;
		return $new_file_name;

		var_dump($latest_file);
	}

	public static function get_log_file_content($get_log_file_name) {

		return file_get_contents($get_log_file_name);
	}
}
?>















