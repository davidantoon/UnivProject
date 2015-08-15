# ************************************************************
# Sequel Pro SQL dump
# Version 4135
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.5.38)
# Database: CMS_USERSdb
# Generation Time: 2015-08-15 15:11:13 +0000
# ************************************************************

CREATE DATABASE IF NOT EXISTS CMS_USERSdb;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table DELIVERY_BASE
# ------------------------------------------------------------

DROP TABLE IF EXISTS `DELIVERY_BASE`;

CREATE TABLE `DELIVERY_BASE` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `UID` int(11) unsigned NOT NULL,
  `REVISION` int(10) unsigned NOT NULL,
  `TITLE` text,
  `DESCRIPTION` text,
  `ENABLED` tinyint(1) NOT NULL,
  `USER_ID` int(11) unsigned NOT NULL,
  `CREATION_DATE` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table DELIVERY_FRONT
# ------------------------------------------------------------

DROP TABLE IF EXISTS `DELIVERY_FRONT`;

CREATE TABLE `DELIVERY_FRONT` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `UID` int(11) unsigned NOT NULL,
  `REVISION` int(11) unsigned NOT NULL,
  `PATH` text,
  `PARAM1` text,
  `PARAM2` text,
  `ENABLED` tinyint(1) NOT NULL,
  `USER_ID` int(11) unsigned NOT NULL,
  `CREATION_DATE` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table KBIT_BASE
# ------------------------------------------------------------

DROP TABLE IF EXISTS `KBIT_BASE`;

CREATE TABLE `KBIT_BASE` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `UID` int(11) unsigned NOT NULL,
  `REVISION` int(11) unsigned NOT NULL,
  `TITLE` text,
  `DESCRIPTION` text,
  `ENABLED` tinyint(1) NOT NULL,
  `USER_ID` int(11) unsigned NOT NULL,
  `CREATION_DATE` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table KBIT_FRONT
# ------------------------------------------------------------

DROP TABLE IF EXISTS `KBIT_FRONT`;

CREATE TABLE `KBIT_FRONT` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `UID` int(11) unsigned NOT NULL,
  `REVISION` int(11) unsigned NOT NULL,
  `PATH` text,
  `PARAM1` text,
  `PARAM2` text,
  `ENABLED` tinyint(1) NOT NULL,
  `USER_ID` int(11) unsigned NOT NULL,
  `CREATION_DATE` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table KEY_VALUE_PAIR
# ------------------------------------------------------------

DROP TABLE IF EXISTS `KEY_VALUE_PAIR`;

CREATE TABLE `KEY_VALUE_PAIR` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `OBJECT_KEY` text NOT NULL,
  `OBJECT_VALUE` text,
  `CREATION_DATE` datetime DEFAULT NULL,
  `USER_ID` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table R_LD2D
# ------------------------------------------------------------

DROP TABLE IF EXISTS `R_LD2D`;

CREATE TABLE `R_LD2D` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `REVISION` int(11) unsigned NOT NULL,
  `HIER` tinyint(1) NOT NULL,
  `PARENT_ID` int(11) unsigned NOT NULL,
  `CHILD_ID` int(11) unsigned NOT NULL,
  `LINK_TYPE` text,
  `PARAM1` text,
  `PARAM2` text,
  `ENABLED` tinyint(1) NOT NULL,
  `USER_ID` int(11) unsigned NOT NULL,
  `CREATION_DATE` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table R_LD2K
# ------------------------------------------------------------

DROP TABLE IF EXISTS `R_LD2K`;

CREATE TABLE `R_LD2K` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `REVISION` int(11) unsigned NOT NULL,
  `KBIT_BASE_ID` int(11) unsigned NOT NULL,
  `DELIVERY_BASE_ID` int(11) unsigned NOT NULL,
  `LINK_TYPE` text,
  `PARAM1` text,
  `PARAM2` text,
  `LINK_WEIGHT` float DEFAULT NULL,
  `ENABLED` tinyint(1) NOT NULL,
  `USER_ID` int(11) unsigned NOT NULL,
  `CREATION_DATE` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table R_LD2T
# ------------------------------------------------------------

DROP TABLE IF EXISTS `R_LD2T`;

CREATE TABLE `R_LD2T` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `DELIVERY_BASE_ID` int(11) unsigned NOT NULL,
  `TERM_ID` int(11) unsigned NOT NULL,
  `LINK_TYPE` text,
  `ENABLED` tinyint(1) NOT NULL,
  `USER_ID` int(11) unsigned NOT NULL,
  `CREATION_DATE` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table R_LK2K
# ------------------------------------------------------------

DROP TABLE IF EXISTS `R_LK2K`;

CREATE TABLE `R_LK2K` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `REVISION` int(11) unsigned NOT NULL,
  `HIER` tinyint(1) NOT NULL,
  `PARENT_ID` int(11) unsigned NOT NULL,
  `CHILD_ID` int(11) unsigned NOT NULL,
  `LINK_TYPE` text,
  `PARAM1` text,
  `PARAM2` text,
  `ENABLED` tinyint(1) NOT NULL,
  `USER_ID` int(11) unsigned NOT NULL,
  `CREATION_DATE` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table R_LK2T
# ------------------------------------------------------------

DROP TABLE IF EXISTS `R_LK2T`;

CREATE TABLE `R_LK2T` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `KBIT_BASE_ID` int(11) unsigned NOT NULL,
  `TERM_ID` int(11) unsigned NOT NULL,
  `LINK_TYPE` text,
  `ENABLED` tinyint(1) NOT NULL,
  `USER_ID` int(11) unsigned NOT NULL,
  `CREATION_DATE` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table R_Ls2s
# ------------------------------------------------------------

DROP TABLE IF EXISTS `R_Ls2s`;

CREATE TABLE `R_Ls2s` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `REVISION` int(11) unsigned NOT NULL,
  `HIER` tinyint(1) NOT NULL,
  `PARENT_ID` int(11) unsigned NOT NULL,
  `CHILD_ID` int(11) unsigned NOT NULL,
  `LINK_TYPE` text,
  `ENABLED` tinyint(1) NOT NULL,
  `PARAM1` text,
  `PARAM2` text,
  `USER_ID` int(11) unsigned NOT NULL,
  `CREATION_DATE` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table R_Lt2t
# ------------------------------------------------------------

DROP TABLE IF EXISTS `R_Lt2t`;

CREATE TABLE `R_Lt2t` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `REVISION` int(11) unsigned NOT NULL,
  `HIER` tinyint(1) NOT NULL,
  `PARENT_ID` int(11) unsigned NOT NULL,
  `CHILD_ID` int(11) unsigned NOT NULL,
  `LINK_TYPE` text,
  `ENABLED` tinyint(1) NOT NULL,
  `PARAM1` text,
  `PARAM2` text,
  `USER_ID` int(11) unsigned NOT NULL,
  `CREATION_DATE` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table SCOPE
# ------------------------------------------------------------

DROP TABLE IF EXISTS `SCOPE`;

CREATE TABLE `SCOPE` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `UID` int(11) unsigned NOT NULL,
  `TITLE` text,
  `DESCRIPTION` text,
  `ENABLED` tinyint(1) NOT NULL,
  `USER_ID` int(11) unsigned NOT NULL,
  `CREATION_DATE` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

LOCK TABLES `SCOPE` WRITE;
/*!40000 ALTER TABLE `SCOPE` DISABLE KEYS */;

INSERT INTO `SCOPE` (`id`, `UID`, `TITLE`, `DESCRIPTION`, `ENABLED`, `USER_ID`, `CREATION_DATE`)
VALUES
	(1,1,'title 1','description asdasdasd',1,2,'2015-08-14 00:00:00'),
	(2,2,'title 1','description asdasdasd',1,2,'2015-08-14 00:00:00'),
	(3,3,'title 1','description asdasdasd',1,2,'2015-08-14 00:00:00'),
	(4,4,'title 1','description asdasdasd',1,2,'2015-08-14 00:00:00'),
	(5,5,'title 1','description asdasdasd',1,2,'2015-08-14 00:00:00'),
	(6,6,'title 1','description asdasdasd',1,2,'2015-08-14 00:00:00'),
	(7,7,'title 1','description asdasdasd',1,2,'2015-08-14 00:00:00'),
	(8,8,'title 1','description asdasdasd',1,2,'2015-08-14 00:00:00'),
	(9,9,'title 1','description asdasdasd',1,2,'2015-08-14 00:00:00'),
	(11,10,'title 1','description asdasdasd',1,2,'2015-08-14 00:00:00');

/*!40000 ALTER TABLE `SCOPE` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table SQL_SELECT_CONFIG
# ------------------------------------------------------------

DROP TABLE IF EXISTS `SQL_SELECT_CONFIG`;

CREATE TABLE `SQL_SELECT_CONFIG` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `TABLE_NAME` text,
  `SELECTED_COLUMNS` text,
  `PARAM1` text,
  `PARAM2` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table SQL_TEPLATES
# ------------------------------------------------------------

DROP TABLE IF EXISTS `SQL_TEPLATES`;

CREATE TABLE `SQL_TEPLATES` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `USER_ID` int(11) unsigned NOT NULL,
  `QUERY_TEXT` text,
  `QUERY_NAME` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table TERM_MEAN
# ------------------------------------------------------------

DROP TABLE IF EXISTS `TERM_MEAN`;

CREATE TABLE `TERM_MEAN` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `UID` int(11) unsigned NOT NULL,
  `TEXT` text,
  `LANG` int(11) unsigned DEFAULT NULL,
  `ENABLED` tinyint(1) NOT NULL,
  `USER_ID` int(11) unsigned NOT NULL,
  `CREATION_DATE` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table TERM_STRING
# ------------------------------------------------------------

DROP TABLE IF EXISTS `TERM_STRING`;

CREATE TABLE `TERM_STRING` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `UID` int(11) unsigned NOT NULL,
  `TEXT` text,
  `LANG` int(11) unsigned DEFAULT NULL,
  `ENABLED` tinyint(1) NOT NULL,
  `USER_ID` int(11) unsigned NOT NULL,
  `CREATION_DATE` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table TERMS
# ------------------------------------------------------------

DROP TABLE IF EXISTS `TERMS`;

CREATE TABLE `TERMS` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `UID` int(11) unsigned NOT NULL,
  `ID_TERM_MEAN` int(11) unsigned NOT NULL,
  `ID_SCOPE` int(11) unsigned NOT NULL,
  `ID_TERM_STRING` int(11) unsigned NOT NULL,
  `ENABLED` tinyint(1) NOT NULL,
  `USER_ID` int(11) unsigned NOT NULL,
  `CREATION_DATE` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table USERS
# ------------------------------------------------------------

DROP TABLE IF EXISTS `USERS`;

CREATE TABLE `USERS` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `UID` int(11) unsigned NOT NULL,
  `FIRST_NAME` text,
  `LAST_NAME` text,
  `USERNAME` text NOT NULL,
  `PASSWORD` text NOT NULL,
  `EMAIL` text,
  `CREATION_DATE` datetime DEFAULT NULL,
  `PROFILE_PICTURE` text,
  `ROLE` int(11) DEFAULT NULL,
  `token` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

LOCK TABLES `USERS` WRITE;
/*!40000 ALTER TABLE `USERS` DISABLE KEYS */;

INSERT INTO `USERS` (`id`, `UID`, `FIRST_NAME`, `LAST_NAME`, `USERNAME`, `PASSWORD`, `EMAIL`, `CREATION_DATE`, `PROFILE_PICTURE`, `ROLE`, `token`)
VALUES
	(1,1,'geryes','Mousa','rajibaba','my_password','geryes@gmail.com','0000-00-00 00:00:00',NULL,1,NULL),
	(2,2,'anton','anton','antoon91','pass5',NULL,NULL,NULL,NULL,'IU4e7v58Ltmyn8n3gncFS5VV03eNpUq8PunW0s4LWrkjzInP6zvYEqUEu8sT3S2SnpOnST9Okt8UcvJi4fhJGboakQ4nJ6g6w4uo'),
	(3,3,'name','last_name','geryes','asdads','aaa',NULL,'ss',1,NULL),
	(4,4,'name','last_name','geryes1','asdads','aaa','2015-08-08 00:00:00','ss',1,NULL);

/*!40000 ALTER TABLE `USERS` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
