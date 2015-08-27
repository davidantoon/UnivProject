# ************************************************************
# Sequel Pro SQL dump
# Version 4135
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.5.38)
# Database: CMS_USERSdb
# Generation Time: 2015-08-25 19:55:33 +0000
# ************************************************************

DROP DATABASE IF EXISTS CMS_USERSdb;
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
  `FRONT_TYPE` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `DELIVERY_BASE` WRITE;
/*!40000 ALTER TABLE `DELIVERY_BASE` DISABLE KEYS */;

INSERT INTO `DELIVERY_BASE` (`id`, `UID`, `REVISION`, `TITLE`, `DESCRIPTION`, `ENABLED`, `USER_ID`, `CREATION_DATE`, `FRONT_TYPE`)
VALUES
	(735,1,1,'Delivery 1','description 1',0,1,'2015-08-25 21:51:34','DELIVERY_FRONT'),
	(736,995,1,'Delivery 2','description 2',0,1,'2015-08-25 21:51:34','DELIVERY_FRONT'),
	(737,996,1,'Delivery 3','description 3',0,1,'2015-08-25 21:51:34','DELIVERY_FRONT'),
	(738,997,1,'Delivery 4','description 4',0,1,'2015-08-25 21:51:34','DELIVERY_FRONT'),
	(739,1,1,'Delivery 1','description 1',0,1,'2015-08-25 21:51:34','DELIVERY_FRONT'),
	(740,995,1,'Delivery 2','description 2',0,1,'2015-08-25 21:51:34','DELIVERY_FRONT'),
	(741,996,1,'Delivery 3','description 3',1,1,'2015-08-25 21:51:34','DELIVERY_FRONT'),
	(742,997,1,'Delivery 4','description 4',1,1,'2015-08-25 21:51:34','DELIVERY_FRONT'),
	(743,1,1,'Delivery 1','description 1',1,1,'2015-08-25 21:51:34','DELIVERY_FRONT');

/*!40000 ALTER TABLE `DELIVERY_BASE` ENABLE KEYS */;
UNLOCK TABLES;


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

LOCK TABLES `DELIVERY_FRONT` WRITE;
/*!40000 ALTER TABLE `DELIVERY_FRONT` DISABLE KEYS */;

INSERT INTO `DELIVERY_FRONT` (`id`, `UID`, `REVISION`, `PATH`, `PARAM1`, `PARAM2`, `ENABLED`, `USER_ID`, `CREATION_DATE`)
VALUES
	(723,1,1,'http://youtube1.com',NULL,NULL,0,1,'2015-08-25 21:51:34'),
	(724,995,1,'http://youtube2.com',NULL,NULL,0,1,'2015-08-25 21:51:34'),
	(725,996,1,'http://youtube3.com',NULL,NULL,0,1,'2015-08-25 21:51:34'),
	(726,997,1,'http://youtube4.com',NULL,NULL,0,1,'2015-08-25 21:51:34'),
	(727,1,1,'http://youtube1.com',NULL,NULL,0,1,'2015-08-25 21:51:34'),
	(728,995,1,'http://youtube2.com',NULL,NULL,0,1,'2015-08-25 21:51:34'),
	(729,996,1,'http://youtube3.com',NULL,NULL,1,1,'2015-08-25 21:51:34'),
	(730,997,1,'http://youtube4.com',NULL,NULL,1,1,'2015-08-25 21:51:34'),
	(731,1,1,'http://youtube1.com',NULL,NULL,1,1,'2015-08-25 21:51:34');

/*!40000 ALTER TABLE `DELIVERY_FRONT` ENABLE KEYS */;
UNLOCK TABLES;


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
  `FRONT_TYPE` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `KBIT_BASE` WRITE;
/*!40000 ALTER TABLE `KBIT_BASE` DISABLE KEYS */;

INSERT INTO `KBIT_BASE` (`id`, `UID`, `REVISION`, `TITLE`, `DESCRIPTION`, `ENABLED`, `USER_ID`, `CREATION_DATE`, `FRONT_TYPE`)
VALUES
	(819,1,1,'Kbit 1','description 1',0,1,'2015-08-25 21:51:34','KBIT_FRONT'),
	(820,981,1,'Kbit 2','description 2',0,1,'2015-08-25 21:51:34','KBIT_FRONT'),
	(821,982,1,'Kbit 3','description 3',0,1,'2015-08-25 21:51:34','KBIT_FRONT'),
	(822,983,1,'Kbit 4','description 4',0,1,'2015-08-25 21:51:34','KBIT_FRONT'),
	(823,1,1,'Kbit 1','description 1',0,1,'2015-08-25 21:51:34','KBIT_FRONT'),
	(824,981,1,'Kbit 2','description 2',0,1,'2015-08-25 21:51:34','KBIT_FRONT'),
	(825,982,1,'Kbit 3','description 3',0,1,'2015-08-25 21:51:34','KBIT_FRONT'),
	(826,983,1,'Kbit 4','description 4',1,1,'2015-08-25 21:51:34','KBIT_FRONT'),
	(827,1,1,'Kbit 1','description 1',0,1,'2015-08-25 21:51:34','KBIT_FRONT'),
	(828,1,2,'new title for kbit 1','new description for kbit1',0,1,'2015-08-25 21:51:34','KBIT_FRONT'),
	(829,981,2,'new title for kbit 2','new description for kbit2',0,1,'2015-08-25 21:51:34','KBIT_FRONT');

/*!40000 ALTER TABLE `KBIT_BASE` ENABLE KEYS */;
UNLOCK TABLES;


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

LOCK TABLES `KBIT_FRONT` WRITE;
/*!40000 ALTER TABLE `KBIT_FRONT` DISABLE KEYS */;

INSERT INTO `KBIT_FRONT` (`id`, `UID`, `REVISION`, `PATH`, `PARAM1`, `PARAM2`, `ENABLED`, `USER_ID`, `CREATION_DATE`)
VALUES
	(795,1,1,'http://google1.com',NULL,NULL,0,1,'2015-08-25 21:51:34'),
	(796,981,1,'http://google2.com',NULL,NULL,0,1,'2015-08-25 21:51:34'),
	(797,982,1,'http://google3.com',NULL,NULL,0,1,'2015-08-25 21:51:34'),
	(798,983,1,'http://google4.com',NULL,NULL,0,1,'2015-08-25 21:51:34'),
	(799,1,1,'http://google1.com',NULL,NULL,0,1,'2015-08-25 21:51:34'),
	(800,981,1,'http://google2.com',NULL,NULL,0,1,'2015-08-25 21:51:34'),
	(801,982,1,'http://google3.com',NULL,NULL,0,1,'2015-08-25 21:51:34'),
	(802,983,1,'http://google4.com',NULL,NULL,1,1,'2015-08-25 21:51:34'),
	(803,1,1,'http://google1.com',NULL,NULL,0,1,'2015-08-25 21:51:34'),
	(804,1,1,'http://google1.com',NULL,NULL,0,1,'2015-08-25 21:51:34'),
	(805,981,1,'http://google2.com',NULL,NULL,0,1,'2015-08-25 21:51:34');

/*!40000 ALTER TABLE `KBIT_FRONT` ENABLE KEYS */;
UNLOCK TABLES;


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

LOCK TABLES `R_LD2D` WRITE;
/*!40000 ALTER TABLE `R_LD2D` DISABLE KEYS */;

INSERT INTO `R_LD2D` (`id`, `REVISION`, `HIER`, `PARENT_ID`, `CHILD_ID`, `LINK_TYPE`, `PARAM1`, `PARAM2`, `ENABLED`, `USER_ID`, `CREATION_DATE`)
VALUES
	(130,2,1,996,997,NULL,NULL,NULL,1,1,'2015-08-25 21:51:34'),
	(131,2,1,1,996,NULL,NULL,NULL,0,1,'2015-08-25 21:51:34'),
	(132,2,1,1,996,NULL,NULL,NULL,1,1,'2015-08-25 21:51:34');

/*!40000 ALTER TABLE `R_LD2D` ENABLE KEYS */;
UNLOCK TABLES;


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

LOCK TABLES `R_LD2K` WRITE;
/*!40000 ALTER TABLE `R_LD2K` DISABLE KEYS */;

INSERT INTO `R_LD2K` (`id`, `REVISION`, `KBIT_BASE_ID`, `DELIVERY_BASE_ID`, `LINK_TYPE`, `PARAM1`, `PARAM2`, `LINK_WEIGHT`, `ENABLED`, `USER_ID`, `CREATION_DATE`)
VALUES
	(85,1,1,1,'NEEDED',NULL,NULL,0,1,1,'2015-08-25 21:51:34'),
	(86,1,981,1,'PROVIDED',NULL,NULL,0,1,1,'2015-08-25 21:51:34');

/*!40000 ALTER TABLE `R_LD2K` ENABLE KEYS */;
UNLOCK TABLES;


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
  `REVISION` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `R_LD2T` WRITE;
/*!40000 ALTER TABLE `R_LD2T` DISABLE KEYS */;

INSERT INTO `R_LD2T` (`id`, `DELIVERY_BASE_ID`, `TERM_ID`, `LINK_TYPE`, `ENABLED`, `USER_ID`, `CREATION_DATE`, `REVISION`)
VALUES
	(144,1,1,'link type',0,1,'2015-08-25 21:51:34',1),
	(145,1,2,'true',0,1,'2015-08-25 21:51:34',1),
	(146,1,2,'true',1,1,'2015-08-25 21:51:34',1);

/*!40000 ALTER TABLE `R_LD2T` ENABLE KEYS */;
UNLOCK TABLES;


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

LOCK TABLES `R_LK2K` WRITE;
/*!40000 ALTER TABLE `R_LK2K` DISABLE KEYS */;

INSERT INTO `R_LK2K` (`id`, `REVISION`, `HIER`, `PARENT_ID`, `CHILD_ID`, `LINK_TYPE`, `PARAM1`, `PARAM2`, `ENABLED`, `USER_ID`, `CREATION_DATE`)
VALUES
	(156,2,1,1,981,NULL,NULL,NULL,0,1,'2015-08-25 21:51:34'),
	(157,2,1,1,981,NULL,NULL,NULL,0,1,'2015-08-25 21:51:34');

/*!40000 ALTER TABLE `R_LK2K` ENABLE KEYS */;
UNLOCK TABLES;


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
  `REVISION` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `R_LK2T` WRITE;
/*!40000 ALTER TABLE `R_LK2T` DISABLE KEYS */;

INSERT INTO `R_LK2T` (`id`, `KBIT_BASE_ID`, `TERM_ID`, `LINK_TYPE`, `ENABLED`, `USER_ID`, `CREATION_DATE`, `REVISION`)
VALUES
	(159,1,1,'link type',0,1,'2015-08-25 21:51:34',1),
	(160,1,2,'link type33333',0,1,'2015-08-25 21:51:34',1),
	(161,1,2,'link type33333',0,1,'2015-08-25 21:51:34',1);

/*!40000 ALTER TABLE `R_LK2T` ENABLE KEYS */;
UNLOCK TABLES;


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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
