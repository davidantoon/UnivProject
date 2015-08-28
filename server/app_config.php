<?php 

// include all required libraries
	
	include 'debugLog.php';
	include 'DBobject.php';
	include 'users.php';
	include 'terms/scope.php';
	include 'terms/term.php';
	include 'relations/relations.php';
	include 'elements/Kbits.php';
	include 'elements/lock.php';
	include 'elements/delivery.php';

	class Configurator {
	
		public static function get_webservice_URI() {
			$webservice_URI = 'http://localhost:8888/mopdqwompoaskdqomdiasjdiowqe/server/';
			return $webservice_URI;
		}
	}
	
	
?>