<?php

class debugLog {
	private static function debug_mode() {
		return true; // debug mode
	}

	public static function debug_log($message) {
		if(debugLog::debug_mode() == true) {
			echo "<br><b>" . date("d-m-y h:i:s") . ": </b>" . $message;
		}
	}
}
?>