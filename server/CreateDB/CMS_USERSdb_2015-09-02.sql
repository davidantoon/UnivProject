# ************************************************************
# Sequel Pro SQL dump
# Version 4135
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.5.38)
# Database: CMS_USERSdb
# Generation Time: 2015-09-02 19:07:13 +0000
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
) ENGINE=InnoDB AUTO_INCREMENT=1566 DEFAULT CHARSET=utf8;

LOCK TABLES `DELIVERY_BASE` WRITE;
/*!40000 ALTER TABLE `DELIVERY_BASE` DISABLE KEYS */;

INSERT INTO `DELIVERY_BASE` (`id`, `UID`, `REVISION`, `TITLE`, `DESCRIPTION`, `ENABLED`, `USER_ID`, `CREATION_DATE`, `FRONT_TYPE`)
VALUES
	(1559,1,1,'Delivery title 0','Delivery description 0',1,0,'2015-09-02 21:05:41','DELIVERY_FRONT'),
	(1560,1909,1,'Delivery title 1','Delivery description 1',1,0,'2015-09-02 21:05:41','DELIVERY_FRONT'),
	(1561,1910,1,'Delivery title 2','Delivery description 2',1,0,'2015-09-02 21:05:41','DELIVERY_FRONT'),
	(1562,1911,1,'Delivery title 3','Delivery description 3',1,0,'2015-09-02 21:05:41','DELIVERY_FRONT'),
	(1563,1912,1,'Delivery title 4','Delivery description 4',1,0,'2015-09-02 21:05:42','DELIVERY_FRONT'),
	(1564,1913,1,'Delivery title 5','Delivery description 5',1,0,'2015-09-02 21:05:42','DELIVERY_FRONT'),
	(1565,1914,1,'Delivery title 6','Delivery description 6',1,0,'2015-09-02 21:05:42','DELIVERY_FRONT');

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
) ENGINE=InnoDB AUTO_INCREMENT=1555 DEFAULT CHARSET=utf8;

LOCK TABLES `DELIVERY_FRONT` WRITE;
/*!40000 ALTER TABLE `DELIVERY_FRONT` DISABLE KEYS */;

INSERT INTO `DELIVERY_FRONT` (`id`, `UID`, `REVISION`, `PATH`, `PARAM1`, `PARAM2`, `ENABLED`, `USER_ID`, `CREATION_DATE`)
VALUES
	(1548,1,1,'http://youtube0.com',NULL,NULL,1,0,'2015-09-02 21:05:41'),
	(1549,1909,1,'http://youtube1.com',NULL,NULL,1,0,'2015-09-02 21:05:41'),
	(1550,1910,1,'http://youtube2.com',NULL,NULL,1,0,'2015-09-02 21:05:41'),
	(1551,1911,1,'http://youtube3.com',NULL,NULL,1,0,'2015-09-02 21:05:42'),
	(1552,1912,1,'http://youtube4.com',NULL,NULL,1,0,'2015-09-02 21:05:42'),
	(1553,1913,1,'http://youtube5.com',NULL,NULL,1,0,'2015-09-02 21:05:42'),
	(1554,1914,1,'http://youtube6.com',NULL,NULL,1,0,'2015-09-02 21:05:42');

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
) ENGINE=InnoDB AUTO_INCREMENT=860 DEFAULT CHARSET=utf8;

LOCK TABLES `KBIT_BASE` WRITE;
/*!40000 ALTER TABLE `KBIT_BASE` DISABLE KEYS */;

INSERT INTO `KBIT_BASE` (`id`, `UID`, `REVISION`, `TITLE`, `DESCRIPTION`, `ENABLED`, `USER_ID`, `CREATION_DATE`, `FRONT_TYPE`)
VALUES
	(852,1,1,'Kbit title 0','Kbit description 0',0,0,'2015-09-02 21:05:41','KBIT_FRONT'),
	(853,1008,1,'Kbit title 1','Kbit description 1',0,0,'2015-09-02 21:05:41','KBIT_FRONT'),
	(854,1009,1,'Kbit title 2','Kbit description 2',0,0,'2015-09-02 21:05:41','KBIT_FRONT'),
	(855,1010,1,'Kbit title 3','Kbit description 3',0,0,'2015-09-02 21:05:41','KBIT_FRONT'),
	(856,1011,1,'Kbit title 4','Kbit description 4',0,0,'2015-09-02 21:05:41','KBIT_FRONT'),
	(857,1012,1,'Kbit title 5','Kbit description 5',0,0,'2015-09-02 21:05:41','KBIT_FRONT'),
	(858,1013,1,'Kbit title 6','Kbit description 6',0,0,'2015-09-02 21:05:41','KBIT_FRONT'),
	(859,1014,1,'Kbit title 7','Kbit description 7',1,0,'2015-09-02 21:05:41','KBIT_FRONT');

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
) ENGINE=InnoDB AUTO_INCREMENT=860 DEFAULT CHARSET=utf8;

LOCK TABLES `KBIT_FRONT` WRITE;
/*!40000 ALTER TABLE `KBIT_FRONT` DISABLE KEYS */;

INSERT INTO `KBIT_FRONT` (`id`, `UID`, `REVISION`, `PATH`, `PARAM1`, `PARAM2`, `ENABLED`, `USER_ID`, `CREATION_DATE`)
VALUES
	(852,1,1,'http://google0.com',NULL,NULL,0,0,'2015-09-02 21:05:41'),
	(853,1008,1,'http://google1.com',NULL,NULL,0,0,'2015-09-02 21:05:41'),
	(854,1009,1,'http://google2.com',NULL,NULL,0,0,'2015-09-02 21:05:41'),
	(855,1010,1,'http://google3.com',NULL,NULL,0,0,'2015-09-02 21:05:41'),
	(856,1011,1,'http://google4.com',NULL,NULL,0,0,'2015-09-02 21:05:41'),
	(857,1012,1,'http://google5.com',NULL,NULL,0,0,'2015-09-02 21:05:41'),
	(858,1013,1,'http://google6.com',NULL,NULL,0,0,'2015-09-02 21:05:41'),
	(859,1014,1,'http://google7.com',NULL,NULL,1,0,'2015-09-02 21:05:41');

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

LOCK TABLES `KEY_VALUE_PAIR` WRITE;
/*!40000 ALTER TABLE `KEY_VALUE_PAIR` DISABLE KEYS */;

INSERT INTO `KEY_VALUE_PAIR` (`id`, `OBJECT_KEY`, `OBJECT_VALUE`, `CREATION_DATE`, `USER_ID`)
VALUES
	(1,'Steps','elements/kvpData/1_14_55e4e70bed588.kvp','2015-08-31 22:55:15',1);

/*!40000 ALTER TABLE `KEY_VALUE_PAIR` ENABLE KEYS */;
UNLOCK TABLES;


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
) ENGINE=InnoDB AUTO_INCREMENT=203 DEFAULT CHARSET=utf8;



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
) ENGINE=InnoDB AUTO_INCREMENT=340 DEFAULT CHARSET=utf8;

LOCK TABLES `R_LD2K` WRITE;
/*!40000 ALTER TABLE `R_LD2K` DISABLE KEYS */;

INSERT INTO `R_LD2K` (`id`, `REVISION`, `KBIT_BASE_ID`, `DELIVERY_BASE_ID`, `LINK_TYPE`, `PARAM1`, `PARAM2`, `LINK_WEIGHT`, `ENABLED`, `USER_ID`, `CREATION_DATE`)
VALUES
	(323,1,1,1,'NEEDED',NULL,NULL,0,1,0,'2015-09-02 21:05:42'),
	(324,1,1008,1,'NEEDED',NULL,NULL,0,1,0,'2015-09-02 21:05:42'),
	(325,1,1009,1,'NEEDED',NULL,NULL,0,1,0,'2015-09-02 21:05:42'),
	(326,1,1011,1910,'NEEDED',NULL,NULL,0,1,0,'2015-09-02 21:05:42'),
	(327,1,1009,1910,'PROVIDED',NULL,NULL,0,1,0,'2015-09-02 21:05:42'),
	(328,1,1008,1910,'PROVIDED',NULL,NULL,0,1,0,'2015-09-02 21:05:42'),
	(329,1,1011,1911,'NEEDED',NULL,NULL,0,1,0,'2015-09-02 21:05:42'),
	(330,1,1009,1911,'PROVIDED',NULL,NULL,0,1,0,'2015-09-02 21:05:42'),
	(331,1,1,1909,'PROVIDED',NULL,NULL,0,1,0,'2015-09-02 21:05:42'),
	(332,1,1011,1909,'PROVIDED',NULL,NULL,0,1,0,'2015-09-02 21:05:42'),
	(333,1,1012,1909,'NEEDED',NULL,NULL,0,1,0,'2015-09-02 21:05:42'),
	(334,1,1014,1909,'NEEDED',NULL,NULL,0,1,0,'2015-09-02 21:05:42'),
	(335,1,1013,1909,'NEEDED',NULL,NULL,0,1,0,'2015-09-02 21:05:42'),
	(336,1,1012,1914,'PROVIDED',NULL,NULL,0,1,0,'2015-09-02 21:05:42'),
	(337,1,1014,1913,'PROVIDED',NULL,NULL,0,1,0,'2015-09-02 21:05:42'),
	(338,1,1013,1913,'PROVIDED',NULL,NULL,0,1,0,'2015-09-02 21:05:42'),
	(339,1,1013,1912,'PROVIDED',NULL,NULL,0,1,0,'2015-09-02 21:05:42');

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
) ENGINE=InnoDB AUTO_INCREMENT=292 DEFAULT CHARSET=utf8;

LOCK TABLES `R_LD2T` WRITE;
/*!40000 ALTER TABLE `R_LD2T` DISABLE KEYS */;

INSERT INTO `R_LD2T` (`id`, `DELIVERY_BASE_ID`, `TERM_ID`, `LINK_TYPE`, `ENABLED`, `USER_ID`, `CREATION_DATE`, `REVISION`)
VALUES
	(285,1,7,'link type',1,0,'2015-09-02 21:05:41',1),
	(286,1909,6,'link type',1,0,'2015-09-02 21:05:41',1),
	(287,1910,5,'link type',1,0,'2015-09-02 21:05:41',1),
	(288,1911,4,'link type',1,0,'2015-09-02 21:05:42',1),
	(289,1912,3,'link type',1,0,'2015-09-02 21:05:42',1),
	(290,1913,2,'link type',1,0,'2015-09-02 21:05:42',1),
	(291,1914,1,'link type',1,0,'2015-09-02 21:05:42',1);

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
) ENGINE=InnoDB AUTO_INCREMENT=184 DEFAULT CHARSET=utf8;

LOCK TABLES `R_LK2K` WRITE;
/*!40000 ALTER TABLE `R_LK2K` DISABLE KEYS */;

INSERT INTO `R_LK2K` (`id`, `REVISION`, `HIER`, `PARENT_ID`, `CHILD_ID`, `LINK_TYPE`, `PARAM1`, `PARAM2`, `ENABLED`, `USER_ID`, `CREATION_DATE`)
VALUES
	(180,2,1,1008,1,NULL,NULL,NULL,0,0,'2015-09-02 21:05:41'),
	(181,2,1,1013,1011,NULL,NULL,NULL,0,0,'2015-09-02 21:05:41'),
	(182,2,1,1009,1013,NULL,NULL,NULL,0,0,'2015-09-02 21:05:41'),
	(183,2,1,1,1010,NULL,NULL,NULL,0,0,'2015-09-02 21:05:41');

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
) ENGINE=InnoDB AUTO_INCREMENT=301 DEFAULT CHARSET=utf8;

LOCK TABLES `R_LK2T` WRITE;
/*!40000 ALTER TABLE `R_LK2T` DISABLE KEYS */;

INSERT INTO `R_LK2T` (`id`, `KBIT_BASE_ID`, `TERM_ID`, `LINK_TYPE`, `ENABLED`, `USER_ID`, `CREATION_DATE`, `REVISION`)
VALUES
	(293,1,7,'link type',0,0,'2015-09-02 21:05:41',1),
	(294,1008,6,'link type',0,0,'2015-09-02 21:05:41',1),
	(295,1009,5,'link type',0,0,'2015-09-02 21:05:41',1),
	(296,1010,4,'link type',0,0,'2015-09-02 21:05:41',1),
	(297,1011,3,'link type',0,0,'2015-09-02 21:05:41',1),
	(298,1012,2,'link type',0,0,'2015-09-02 21:05:41',1),
	(299,1013,1,'link type',0,0,'2015-09-02 21:05:41',1),
	(300,1014,0,'link type',1,0,'2015-09-02 21:05:41',1);

/*!40000 ALTER TABLE `R_LK2T` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table R_LS2S
# ------------------------------------------------------------

DROP TABLE IF EXISTS `R_LS2S`;

CREATE TABLE `R_LS2S` (
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



# Dump of table R_LT2T
# ------------------------------------------------------------

DROP TABLE IF EXISTS `R_LT2T`;

CREATE TABLE `R_LT2T` (
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

LOCK TABLES `SQL_SELECT_CONFIG` WRITE;
/*!40000 ALTER TABLE `SQL_SELECT_CONFIG` DISABLE KEYS */;

INSERT INTO `SQL_SELECT_CONFIG` (`id`, `TABLE_NAME`, `SELECTED_COLUMNS`, `PARAM1`, `PARAM2`)
VALUES
	(1,'KBIT_BASE','UID,TITLE,DESCRIPTION,USER_ID,CREATION_DATE,FRONT_TYPE',NULL,NULL),
	(2,'DELIVERY_BASE','UID,TITLE,DESCRIPTION,USER_ID,CREATION_DATE,FRONT_TYPE',NULL,NULL);

/*!40000 ALTER TABLE `SQL_SELECT_CONFIG` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table SQL_TEMPLATES
# ------------------------------------------------------------

DROP TABLE IF EXISTS `SQL_TEMPLATES`;

CREATE TABLE `SQL_TEMPLATES` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `USER_ID` int(11) unsigned NOT NULL,
  `QUERY_TEXT` text,
  `QUERY_NAME` text,
  `TABLE_NAME` text,
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

LOCK TABLES `USERS` WRITE;
/*!40000 ALTER TABLE `USERS` DISABLE KEYS */;

INSERT INTO `USERS` (`id`, `UID`, `FIRST_NAME`, `LAST_NAME`, `USERNAME`, `PASSWORD`, `EMAIL`, `CREATION_DATE`, `PROFILE_PICTURE`, `ROLE`, `token`)
VALUES
	(1,1,'geryes','Mousa','rajibaba','my_password','geryes@gmail.com','2015-08-08 00:00:00',NULL,1,'8WzmKzTyeNErmjZvSrE1gLfWL7bCFrNNnna8W3GbQlDdFDIx5nzm9OiUWuwCVkpjHArED8QutuI87qGcOfyX4RR1moDhI3ApD24h'),
	(2,1,'anton','anton','antoon91','1234','antoon91@gmail.com','2015-08-08 00:00:00',NULL,NULL,'0CkbA9Kd1cYfInwiIuNeY5xDDG8OxlXyXiJyruLsGKHp7eHQJv4IBBmfhu3PP0oNj8lKC7cjSUJ09qQSWUBywXNNrQDhR15a9qUM'),
	(3,3,'name','last_name','geryes','asdads','aaa','2015-08-08 00:00:00','ss',1,NULL),
	(4,4,'name','last_name','geryes1','asdads','aaa','2015-08-08 00:00:00','ss',1,NULL),
	(5,5,'Galit','David','Learner','davidGalitLearner',NULL,'2015-08-08 00:00:00',NULL,NULL,'aG6PPNjRNfMI4k58ZNB5dlN3EfZDYou85BYVoiMcyzUCTZLSNmX0HK3m03ZZst7x55ttnfFVOzyHzjAmGxnniqKjuKiXepujvYMT');

/*!40000 ALTER TABLE `USERS` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
