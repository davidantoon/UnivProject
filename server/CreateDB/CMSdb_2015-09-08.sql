# ************************************************************
# Sequel Pro SQL dump
# Version 4135
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.5.38)
# Database: CMSdb
# Generation Time: 2015-09-07 22:55:49 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP DATABASE IF EXISTS CMSdb;
CREATE DATABASE IF NOT EXISTS CMSdb;

# Dump of table CONTENT_LOCK
# ------------------------------------------------------------

DROP TABLE IF EXISTS `CONTENT_LOCK`;

CREATE TABLE `CONTENT_LOCK` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `LOCKED_UID` int(11) unsigned NOT NULL,
  `ENTITY_TYPE` varchar(20) NOT NULL DEFAULT '',
  `LOCK_STATUS` varchar(20) NOT NULL DEFAULT '',
  `USER_ID` int(11) unsigned NOT NULL,
  `CREATION_DATE` datetime DEFAULT NULL,
  `ENABLED` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5923 DEFAULT CHARSET=utf8;

LOCK TABLES `CONTENT_LOCK` WRITE;
/*!40000 ALTER TABLE `CONTENT_LOCK` DISABLE KEYS */;

INSERT INTO `CONTENT_LOCK` (`id`, `LOCKED_UID`, `ENTITY_TYPE`, `LOCK_STATUS`, `USER_ID`, `CREATION_DATE`, `ENABLED`)
VALUES
	(5855,1,'KBIT_BASE','LOCKED',0,'2015-09-06 20:29:30',0),
	(5856,1338,'KBIT_BASE','LOCKED',0,'2015-09-06 20:29:30',0),
	(5857,1339,'KBIT_BASE','LOCKED',0,'2015-09-06 20:29:30',0),
	(5858,1340,'KBIT_BASE','LOCKED',0,'2015-09-06 20:29:30',0),
	(5859,1341,'KBIT_BASE','LOCKED',0,'2015-09-06 20:29:30',0),
	(5860,1342,'KBIT_BASE','LOCKED',0,'2015-09-06 20:29:30',0),
	(5861,1343,'KBIT_BASE','LOCKED',0,'2015-09-06 20:29:30',0),
	(5862,1344,'KBIT_BASE','LOCKED',0,'2015-09-06 20:29:30',1),
	(5863,1,'KBIT_BASE','UNLOCKED',0,'2015-09-06 20:29:30',1),
	(5864,1338,'KBIT_BASE','UNLOCKED',0,'2015-09-06 20:29:30',1),
	(5865,1339,'KBIT_BASE','UNLOCKED',0,'2015-09-06 20:29:30',1),
	(5866,1340,'KBIT_BASE','UNLOCKED',0,'2015-09-06 20:29:30',1),
	(5867,1341,'KBIT_BASE','UNLOCKED',0,'2015-09-06 20:29:30',1),
	(5868,1342,'KBIT_BASE','UNLOCKED',0,'2015-09-06 20:29:30',1),
	(5869,1343,'KBIT_BASE','UNLOCKED',0,'2015-09-06 20:29:30',1),
	(5870,1,'DELIVERY_BASE','LOCKED',0,'2015-09-06 20:29:30',0),
	(5871,2210,'DELIVERY_BASE','LOCKED',0,'2015-09-06 20:29:30',0),
	(5872,2211,'DELIVERY_BASE','LOCKED',0,'2015-09-06 20:29:30',0),
	(5873,2212,'DELIVERY_BASE','LOCKED',0,'2015-09-06 20:29:30',0),
	(5874,2213,'DELIVERY_BASE','LOCKED',0,'2015-09-06 20:29:30',0),
	(5875,2214,'DELIVERY_BASE','LOCKED',0,'2015-09-06 20:29:30',0),
	(5876,2215,'DELIVERY_BASE','LOCKED',0,'2015-09-06 20:29:30',0),
	(5877,1,'DELIVERY_BASE','UNLOCKED',0,'2015-09-06 20:29:31',0),
	(5878,2210,'DELIVERY_BASE','UNLOCKED',0,'2015-09-06 20:29:31',1),
	(5879,2211,'DELIVERY_BASE','UNLOCKED',0,'2015-09-06 20:29:31',1),
	(5880,2212,'DELIVERY_BASE','UNLOCKED',0,'2015-09-06 20:29:31',1),
	(5881,2213,'DELIVERY_BASE','UNLOCKED',0,'2015-09-06 20:29:31',1),
	(5882,2214,'DELIVERY_BASE','UNLOCKED',0,'2015-09-06 20:29:31',1),
	(5883,2215,'DELIVERY_BASE','UNLOCKED',0,'2015-09-06 20:29:31',1),
	(5884,1,'DELIVERY_BASE','LOCKED',1,'2015-09-07 01:24:37',0),
	(5885,1,'DELIVERY_BASE','UNLOCKED',1,'2015-09-07 06:07:57',0),
	(5886,1,'DELIVERY_BASE','LOCKED',1,'2015-09-07 06:20:13',0),
	(5887,1,'DELIVERY_BASE','UNLOCKED',1,'2015-09-07 06:23:01',0),
	(5888,1,'DELIVERY_BASE','LOCKED',1,'2015-09-07 06:27:39',0),
	(5889,1,'DELIVERY_BASE','UNLOCKED',1,'2015-09-07 06:28:01',0),
	(5890,1,'DELIVERY_BASE','LOCKED',1,'2015-09-07 06:29:59',0),
	(5891,1,'DELIVERY_BASE','UNLOCKED',1,'2015-09-07 06:31:48',0),
	(5892,1,'DELIVERY_BASE','LOCKED',1,'2015-09-07 06:32:09',0),
	(5893,1,'DELIVERY_BASE','UNLOCKED',1,'2015-09-07 06:34:42',0),
	(5894,1,'DELIVERY_BASE','LOCKED',1,'2015-09-07 11:19:51',0),
	(5895,1,'DELIVERY_BASE','UNLOCKED',1,'2015-09-07 11:33:07',0),
	(5896,1,'DELIVERY_BASE','LOCKED',1,'2015-09-07 20:20:44',0),
	(5897,1,'DELIVERY_BASE','UNLOCKED',1,'2015-09-07 20:29:31',0),
	(5898,1,'DELIVERY_BASE','LOCKED',1,'2015-09-07 20:29:46',0),
	(5899,1,'DELIVERY_BASE','UNLOCKED',1,'2015-09-07 20:41:55',0),
	(5900,1,'DELIVERY_BASE','LOCKED',1,'2015-09-07 20:46:01',0),
	(5901,1,'DELIVERY_BASE','UNLOCKED',1,'2015-09-07 20:47:15',0),
	(5902,1,'DELIVERY_BASE','LOCKED',1,'2015-09-07 21:01:59',0),
	(5903,1,'DELIVERY_BASE','UNLOCKED',1,'2015-09-07 21:02:40',0),
	(5904,1,'DELIVERY_BASE','LOCKED',1,'2015-09-07 21:13:55',0),
	(5905,1,'DELIVERY_BASE','UNLOCKED',1,'2015-09-07 21:16:11',0),
	(5906,1,'DELIVERY_BASE','LOCKED',1,'2015-09-07 21:20:17',0),
	(5907,1,'DELIVERY_BASE','UNLOCKED',1,'2015-09-07 21:20:31',0),
	(5908,1,'DELIVERY_BASE','LOCKED',1,'2015-09-07 21:24:19',0),
	(5909,1,'DELIVERY_BASE','UNLOCKED',1,'2015-09-07 21:26:31',0),
	(5910,1,'DELIVERY_BASE','LOCKED',1,'2015-09-07 21:27:56',0),
	(5911,1,'DELIVERY_BASE','UNLOCKED',1,'2015-09-07 21:28:15',0),
	(5912,1,'DELIVERY_BASE','LOCKED',1,'2015-09-07 21:29:15',0),
	(5913,1,'DELIVERY_BASE','UNLOCKED',1,'2015-09-07 21:29:27',0),
	(5914,1,'DELIVERY_BASE','LOCKED',1,'2015-09-07 21:35:42',0),
	(5915,1,'DELIVERY_BASE','UNLOCKED',1,'2015-09-07 21:36:00',0),
	(5916,1,'DELIVERY_BASE','LOCKED',1,'2015-09-07 21:38:24',0),
	(5917,1,'DELIVERY_BASE','UNLOCKED',1,'2015-09-07 21:38:44',0),
	(5918,1,'DELIVERY_BASE','LOCKED',1,'2015-09-07 21:38:49',0),
	(5919,1,'DELIVERY_BASE','UNLOCKED',1,'2015-09-07 21:39:19',0),
	(5920,1,'DELIVERY_BASE','LOCKED',1,'2015-09-07 21:50:01',0),
	(5921,1,'DELIVERY_BASE','UNLOCKED',1,'2015-09-07 21:50:11',0),
	(5922,1,'DELIVERY_BASE','LOCKED',1,'2015-09-07 22:19:29',1);

/*!40000 ALTER TABLE `CONTENT_LOCK` ENABLE KEYS */;
UNLOCK TABLES;


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
) ENGINE=InnoDB AUTO_INCREMENT=2231 DEFAULT CHARSET=utf8;

LOCK TABLES `DELIVERY_BASE` WRITE;
/*!40000 ALTER TABLE `DELIVERY_BASE` DISABLE KEYS */;

INSERT INTO `DELIVERY_BASE` (`id`, `UID`, `REVISION`, `TITLE`, `DESCRIPTION`, `ENABLED`, `USER_ID`, `CREATION_DATE`, `FRONT_TYPE`)
VALUES
	(2209,1,1,'-----Delivery title 0','Delivery description 0',0,0,'2015-09-06 20:29:30','DELIVERY_FRONT'),
	(2210,2210,1,'-----Delivery title 1','Delivery description 1',0,0,'2015-09-06 20:29:30','DELIVERY_FRONT'),
	(2211,2211,1,'-----Delivery title 2','Delivery description 2',0,0,'2015-09-06 20:29:30','DELIVERY_FRONT'),
	(2212,2212,1,'-----Delivery title 3','Delivery description 3',0,0,'2015-09-06 20:29:30','DELIVERY_FRONT'),
	(2213,2213,1,'-----Delivery title 4','Delivery description 4',0,0,'2015-09-06 20:29:30','DELIVERY_FRONT'),
	(2214,2214,1,'-----Delivery title 5','Delivery description 5',0,0,'2015-09-06 20:29:30','DELIVERY_FRONT'),
	(2215,2215,1,'-----Delivery title 6','Delivery description 6',0,0,'2015-09-06 20:29:30','DELIVERY_FRONT'),
	(2216,1,1,'Delivery title 0','Delivery description 0',0,0,'2015-09-06 20:29:30','DELIVERY_FRONT'),
	(2217,2210,1,'Delivery title 1','Delivery description 1',1,0,'2015-09-06 20:29:30','DELIVERY_FRONT'),
	(2218,2211,1,'Delivery title 2','Delivery description 2',1,0,'2015-09-06 20:29:30','DELIVERY_FRONT'),
	(2219,2212,1,'Delivery title 3','Delivery description 3',1,0,'2015-09-06 20:29:30','DELIVERY_FRONT'),
	(2220,2213,1,'Delivery title 4','Delivery description 4',1,0,'2015-09-06 20:29:30','DELIVERY_FRONT'),
	(2221,2214,1,'Delivery title 5','Delivery description 5',1,0,'2015-09-06 20:29:30','DELIVERY_FRONT'),
	(2222,2215,1,'Delivery title 6','Delivery description 6',1,0,'2015-09-06 20:29:30','DELIVERY_FRONT'),
	(2223,1,5,'Delivery title 0 Update','Delivery description 0 Up',0,1,'2015-09-07 06:21:14','DELIVERY_FRONT'),
	(2224,1,6,'Delivery title 0 Updatek asd','kl askdasdDelivery description 0 Up',0,1,'2015-09-07 06:27:56','DELIVERY_FRONT'),
	(2225,1,7,'Delivery title 0 Updatek asdksk','sakd asdkl askdasdDelivery description 0 Up',0,1,'2015-09-07 06:34:06','DELIVERY_FRONT'),
	(2226,1,12,'Delivery title 0 Updatekk lasdsa','asddescription 0asdsad',0,1,'2015-09-07 11:29:14','DELIVERY_FRONT'),
	(2227,1,13,'Delivery title 0 Updatekk lasdsaklsa d','kas dlkasdasddescription 0asdsad',0,1,'2015-09-07 20:22:32','DELIVERY_FRONT'),
	(2228,1,14,'Delivery title 0 Updatekk lasdsaklsa d','kas dlkasdasddescription 0asdsad',0,1,'2015-09-07 20:30:14','DELIVERY_FRONT'),
	(2229,1,24,'Delivery title 0 Updatekk lasdsaklsa d','kas dlkasdasddescription 0asdsadsakd alsd',0,1,'2015-09-07 21:39:14','DELIVERY_FRONT'),
	(2230,1,25,'Delivery title 0 Updatsssekk lasdsaklsa d','kas dlkasdasddescription 0asdsadsakd alsd',1,1,'2015-09-07 21:50:07','DELIVERY_FRONT');

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
) ENGINE=InnoDB AUTO_INCREMENT=1217 DEFAULT CHARSET=utf8;

LOCK TABLES `DELIVERY_FRONT` WRITE;
/*!40000 ALTER TABLE `DELIVERY_FRONT` DISABLE KEYS */;

INSERT INTO `DELIVERY_FRONT` (`id`, `UID`, `REVISION`, `PATH`, `PARAM1`, `PARAM2`, `ENABLED`, `USER_ID`, `CREATION_DATE`)
VALUES
	(1202,1,1,'http://youtube0.com',NULL,NULL,0,0,'2015-09-06 20:29:30'),
	(1203,2210,1,'http://youtube1.com',NULL,NULL,1,0,'2015-09-06 20:29:30'),
	(1204,2211,1,'http://youtube2.com',NULL,NULL,1,0,'2015-09-06 20:29:30'),
	(1205,2212,1,'http://youtube3.com',NULL,NULL,1,0,'2015-09-06 20:29:30'),
	(1206,2213,1,'http://youtube4.com',NULL,NULL,1,0,'2015-09-06 20:29:30'),
	(1207,2214,1,'http://youtube5.com',NULL,NULL,1,0,'2015-09-06 20:29:30'),
	(1208,2215,1,'http://youtube6.com',NULL,NULL,1,0,'2015-09-06 20:29:30'),
	(1209,1,5,'http://update0.com',NULL,NULL,0,1,'2015-09-07 06:21:14'),
	(1210,1,6,'asdasd',NULL,NULL,0,1,'2015-09-07 06:27:56'),
	(1211,1,7,'asdasd',NULL,NULL,0,1,'2015-09-07 06:34:06'),
	(1212,1,12,'ksasadklsad',NULL,NULL,0,1,'2015-09-07 11:29:15'),
	(1213,1,13,'ksad',NULL,NULL,0,1,'2015-09-07 20:22:32'),
	(1214,1,14,'ksad',NULL,NULL,0,1,'2015-09-07 20:30:14'),
	(1215,1,24,'http://david.com',NULL,NULL,0,1,'2015-09-07 21:39:14'),
	(1216,1,25,'http://david.com',NULL,NULL,1,1,'2015-09-07 21:50:07');

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
) ENGINE=InnoDB AUTO_INCREMENT=1352 DEFAULT CHARSET=utf8;

LOCK TABLES `KBIT_BASE` WRITE;
/*!40000 ALTER TABLE `KBIT_BASE` DISABLE KEYS */;

INSERT INTO `KBIT_BASE` (`id`, `UID`, `REVISION`, `TITLE`, `DESCRIPTION`, `ENABLED`, `USER_ID`, `CREATION_DATE`, `FRONT_TYPE`)
VALUES
	(1337,1,1,'------Kbit title 0','Kbit description 0',0,0,'2015-09-06 20:29:30','KBIT_FRONT'),
	(1338,1338,1,'------Kbit title 1','Kbit description 1',0,0,'2015-09-06 20:29:30','KBIT_FRONT'),
	(1339,1339,1,'------Kbit title 2','Kbit description 2',0,0,'2015-09-06 20:29:30','KBIT_FRONT'),
	(1340,1340,1,'------Kbit title 3','Kbit description 3',0,0,'2015-09-06 20:29:30','KBIT_FRONT'),
	(1341,1341,1,'------Kbit title 4','Kbit description 4',0,0,'2015-09-06 20:29:30','KBIT_FRONT'),
	(1342,1342,1,'------Kbit title 5','Kbit description 5',0,0,'2015-09-06 20:29:30','KBIT_FRONT'),
	(1343,1343,1,'------Kbit title 6','Kbit description 6',0,0,'2015-09-06 20:29:30','KBIT_FRONT'),
	(1344,1344,1,'------Kbit title 7','Kbit description 7',0,0,'2015-09-06 20:29:30','KBIT_FRONT'),
	(1345,1,1,'Kbit title 0','Kbit description 0',1,0,'2015-09-06 20:29:30','KBIT_FRONT'),
	(1346,1338,1,'Kbit title 1','Kbit description 1',1,0,'2015-09-06 20:29:30','KBIT_FRONT'),
	(1347,1339,1,'Kbit title 2','Kbit description 2',1,0,'2015-09-06 20:29:30','KBIT_FRONT'),
	(1348,1340,1,'Kbit title 3','Kbit description 3',1,0,'2015-09-06 20:29:30','KBIT_FRONT'),
	(1349,1341,1,'Kbit title 4','Kbit description 4',1,0,'2015-09-06 20:29:30','KBIT_FRONT'),
	(1350,1342,1,'Kbit title 5','Kbit description 5',1,0,'2015-09-06 20:29:30','KBIT_FRONT'),
	(1351,1343,1,'Kbit title 6','Kbit description 6',1,0,'2015-09-06 20:29:30','KBIT_FRONT');

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
) ENGINE=InnoDB AUTO_INCREMENT=761 DEFAULT CHARSET=utf8;

LOCK TABLES `KBIT_FRONT` WRITE;
/*!40000 ALTER TABLE `KBIT_FRONT` DISABLE KEYS */;

INSERT INTO `KBIT_FRONT` (`id`, `UID`, `REVISION`, `PATH`, `PARAM1`, `PARAM2`, `ENABLED`, `USER_ID`, `CREATION_DATE`)
VALUES
	(754,1,1,'http://google0.com',NULL,NULL,1,0,'2015-09-06 20:29:30'),
	(755,1338,1,'http://google1.com',NULL,NULL,1,0,'2015-09-06 20:29:30'),
	(756,1339,1,'http://google2.com',NULL,NULL,1,0,'2015-09-06 20:29:30'),
	(757,1340,1,'http://google3.com',NULL,NULL,1,0,'2015-09-06 20:29:30'),
	(758,1341,1,'http://google4.com',NULL,NULL,1,0,'2015-09-06 20:29:30'),
	(759,1342,1,'http://google5.com',NULL,NULL,1,0,'2015-09-06 20:29:30'),
	(760,1343,1,'http://google6.com',NULL,NULL,1,0,'2015-09-06 20:29:30');

/*!40000 ALTER TABLE `KBIT_FRONT` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table lang
# ------------------------------------------------------------

DROP TABLE IF EXISTS `lang`;

CREATE TABLE `lang` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `LANG_CODE` text,
  `LANG_NAME` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=186 DEFAULT CHARSET=utf8;

LOCK TABLES `lang` WRITE;
/*!40000 ALTER TABLE `lang` DISABLE KEYS */;

INSERT INTO `lang` (`id`, `LANG_CODE`, `LANG_NAME`)
VALUES
	(1,'0','Indonesian'),
	(2,'en','English'),
	(3,'aa','Afar'),
	(4,'ab','Abkhazian'),
	(5,'ae','Avestan'),
	(6,'af','Afrikaans'),
	(7,'ak','Akan'),
	(8,'am','Amharic'),
	(9,'an','Aragonese'),
	(10,'ar','Arabic'),
	(11,'as','Assamese'),
	(12,'av','Avaric'),
	(13,'ay','Aymara'),
	(14,'az','Azerbaijani'),
	(15,'ba','Bashkir'),
	(16,'be','Belarusian'),
	(17,'bg','Bulgarian'),
	(18,'bh','Bihari languages'),
	(19,'bi','Bislama'),
	(20,'bm','Bambara'),
	(21,'bn','Bengali'),
	(22,'bo','Tibetan'),
	(23,'br','Breton'),
	(24,'bs','Bosnian'),
	(25,'ca','Catalan; Valencian'),
	(26,'ce','Chechen'),
	(27,'ch','Chamorro'),
	(28,'co','Corsican'),
	(29,'cr','Cree'),
	(30,'cs','Czech'),
	(31,'cu','Church Slavic; Old Slavonic; Church Slavonic; Old Bulgarian; Old Church Slavonic'),
	(32,'cv','Chuvash'),
	(33,'cy','Welsh'),
	(34,'da','Danish'),
	(35,'de','German'),
	(36,'dv','Divehi; Dhivehi; Maldivian'),
	(37,'dz','Dzongkha'),
	(38,'ee','Ewe'),
	(39,'el','Greek=> Modern (1453-)'),
	(40,'eo','Esperanto'),
	(41,'es','Spanish; Castilian'),
	(42,'et','Estonian'),
	(43,'eu','Basque'),
	(44,'fa','Persian'),
	(45,'ff','Fulah'),
	(46,'fi','Finnish'),
	(47,'fj','Fijian'),
	(48,'fo','Faroese'),
	(49,'fr','French'),
	(50,'fy','Western Frisian'),
	(51,'ga','Irish'),
	(52,'gd','Gaelic; Scottish Gaelic'),
	(53,'gl','Galician'),
	(54,'gn','Guarani'),
	(55,'gu','Gujarati'),
	(56,'gv','Manx'),
	(57,'ha','Hausa'),
	(58,'he','Hebrew'),
	(59,'hi','Hindi'),
	(60,'ho','Hiri Motu'),
	(61,'hr','Croatian'),
	(62,'ht','Haitian; Haitian Creole'),
	(63,'hu','Hungarian'),
	(64,'hy','Armenian'),
	(65,'hz','Herero'),
	(66,'ia','Interlingua (International Auxiliary Language Association)'),
	(67,'id','Indonesian'),
	(68,'ie','Interlingue; Occidental'),
	(69,'ig','Igbo'),
	(70,'ii','Sichuan Yi; Nuosu'),
	(71,'ik','Inupiaq'),
	(72,'io','Ido'),
	(73,'is','Icelandic'),
	(74,'it','Italian'),
	(75,'iu','Inuktitut'),
	(76,'ja','Japanese'),
	(77,'jv','Javanese'),
	(78,'ka','Georgian'),
	(79,'kg','Kongo'),
	(80,'ki','Kikuyu; Gikuyu'),
	(81,'kj','Kuanyama; Kwanyama'),
	(82,'kk','Kazakh'),
	(83,'kl','Kalaallisut; Greenlandic'),
	(84,'km','Central Khmer'),
	(85,'kn','Kannada'),
	(86,'ko','Korean'),
	(87,'kr','Kanuri'),
	(88,'ks','Kashmiri'),
	(89,'ku','Kurdish'),
	(90,'kv','Komi'),
	(91,'kw','Cornish'),
	(92,'ky','Kirghiz; Kyrgyz'),
	(93,'la','Latin'),
	(94,'lb','Luxembourgish; Letzeburgesch'),
	(95,'lg','Ganda'),
	(96,'li','Limburgan; Limburger; Limburgish'),
	(97,'ln','Lingala'),
	(98,'lo','Lao'),
	(99,'lt','Lithuanian'),
	(100,'lu','Luba-Katanga'),
	(101,'lv','Latvian'),
	(102,'mg','Malagasy'),
	(103,'mh','Marshallese'),
	(104,'mi','Maori'),
	(105,'mk','Macedonian'),
	(106,'ml','Malayalam'),
	(107,'mn','Mongolian'),
	(108,'mr','Marathi'),
	(109,'ms','Malay'),
	(110,'mt','Maltese'),
	(111,'my','Burmese'),
	(112,'na','Nauru'),
	(113,'nb','BokmÃ¥l, Norwegian; Norwegian BokmÃ¥l'),
	(114,'nd','Ndebele, North; North Ndebele'),
	(115,'ne','Nepali'),
	(116,'ng','Ndonga'),
	(117,'nl','Dutch; Flemish'),
	(118,'nn','Norwegian Nynorsk; Nynorsk=> Norwegian'),
	(119,'no','Norwegian'),
	(120,'nr','Ndebele, South; South Ndebele'),
	(121,'nv','Navajo; Navaho'),
	(122,'ny','Chichewa; Chewa; Nyanja'),
	(123,'oc','Occitan (post 1500); ProvenÃ§al'),
	(124,'oj','Ojibwa'),
	(125,'om','Oromo'),
	(126,'or','Oriya'),
	(127,'os','Ossetian; Ossetic'),
	(128,'pa','Panjabi; Punjabi'),
	(129,'pi','Pali'),
	(130,'pl','Polish'),
	(131,'ps','Pushto; Pashto'),
	(132,'pt','Portuguese'),
	(133,'qu','Quechua'),
	(134,'rm','Romansh'),
	(135,'rn','Rundi'),
	(136,'ro','Romanian; Moldavian; Moldovan'),
	(137,'ru','Russian'),
	(138,'rw','Kinyarwanda'),
	(139,'sa','Sanskrit'),
	(140,'sc','Sardinian'),
	(141,'sd','Sindhi'),
	(142,'se','Northern Sami'),
	(143,'sg','Sango'),
	(144,'si','Sinhala; Sinhalese'),
	(145,'sk','Slovak'),
	(146,'sl','Slovenian'),
	(147,'sm','Samoan'),
	(148,'sn','Shona'),
	(149,'so','Somali'),
	(150,'sq','Albanian'),
	(151,'sr','Serbian'),
	(152,'ss','Swati'),
	(153,'st','Sotho, Southern'),
	(154,'su','Sundanese'),
	(155,'sv','Swedish'),
	(156,'sw','Swahili'),
	(157,'ta','Tamil'),
	(158,'te','Telugu'),
	(159,'tg','Tajik'),
	(160,'th','Thai'),
	(161,'ti','Tigrinya'),
	(162,'tk','Turkmen'),
	(163,'tl','Tagalog'),
	(164,'tn','Tswana'),
	(165,'to','Tonga (Tonga Islands)'),
	(166,'tr','Turkish'),
	(167,'ts','Tsonga'),
	(168,'tt','Tatar'),
	(169,'tw','Twi'),
	(170,'ty','Tahitian'),
	(171,'ug','Uighur; Uyghur'),
	(172,'uk','Ukrainian'),
	(173,'ur','Urdu'),
	(174,'uz','Uzbek'),
	(175,'ve','Venda'),
	(176,'vi','Vietnamese'),
	(177,'vo','VolapÃ¼k'),
	(178,'wa','Walloon'),
	(179,'wo','Wolof'),
	(180,'xh','Xhosa'),
	(181,'yi','Yiddish'),
	(182,'yo','Yoruba'),
	(183,'za','Zhuang; Chuang'),
	(184,'zh','Chinese'),
	(185,'zu','Zulu');

/*!40000 ALTER TABLE `lang` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8;



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
) ENGINE=InnoDB AUTO_INCREMENT=426 DEFAULT CHARSET=utf8;

LOCK TABLES `R_LD2K` WRITE;
/*!40000 ALTER TABLE `R_LD2K` DISABLE KEYS */;

INSERT INTO `R_LD2K` (`id`, `REVISION`, `KBIT_BASE_ID`, `DELIVERY_BASE_ID`, `LINK_TYPE`, `PARAM1`, `PARAM2`, `LINK_WEIGHT`, `ENABLED`, `USER_ID`, `CREATION_DATE`)
VALUES
	(364,1,1,1,'NEEDED',NULL,NULL,0,0,0,'2015-09-06 20:29:30'),
	(365,1,1338,1,'NEEDED',NULL,NULL,0,0,0,'2015-09-06 20:29:30'),
	(366,1,1339,1,'NEEDED',NULL,NULL,0,0,0,'2015-09-06 20:29:30'),
	(367,1,1,2210,'PROVIDED',NULL,NULL,0,1,0,'2015-09-06 20:29:30'),
	(368,1,1341,2210,'PROVIDED',NULL,NULL,0,1,0,'2015-09-06 20:29:30'),
	(369,1,1342,2210,'NEEDED',NULL,NULL,0,1,0,'2015-09-06 20:29:30'),
	(370,1,1344,2210,'NEEDED',NULL,NULL,0,1,0,'2015-09-06 20:29:31'),
	(371,1,1343,2210,'NEEDED',NULL,NULL,0,1,0,'2015-09-06 20:29:31'),
	(372,1,1341,2211,'NEEDED',NULL,NULL,0,1,0,'2015-09-06 20:29:30'),
	(373,1,1339,2211,'PROVIDED',NULL,NULL,0,1,0,'2015-09-06 20:29:30'),
	(374,1,1338,2211,'PROVIDED',NULL,NULL,0,1,0,'2015-09-06 20:29:30'),
	(375,1,1341,2212,'NEEDED',NULL,NULL,0,1,0,'2015-09-06 20:29:30'),
	(376,1,1339,2212,'PROVIDED',NULL,NULL,0,1,0,'2015-09-06 20:29:30'),
	(377,1,1343,2213,'PROVIDED',NULL,NULL,0,1,0,'2015-09-06 20:29:31'),
	(378,1,1344,2214,'PROVIDED',NULL,NULL,0,1,0,'2015-09-06 20:29:31'),
	(379,1,1343,2214,'PROVIDED',NULL,NULL,0,1,0,'2015-09-06 20:29:31'),
	(380,1,1342,2215,'PROVIDED',NULL,NULL,0,1,0,'2015-09-06 20:29:31'),
	(381,1,1339,1,'NEEDED',NULL,NULL,0,0,0,'2015-09-06 20:29:30'),
	(382,1,1,1,'NEEDED',NULL,NULL,0,0,1,'2015-09-07 06:21:14'),
	(383,1,1338,1,'NEEDED',NULL,NULL,0,0,1,'2015-09-07 06:21:14'),
	(384,1,1,1,'PROVIDED',NULL,NULL,0,0,1,'2015-09-07 06:21:14'),
	(385,1,1338,1,'PROVIDED',NULL,NULL,0,0,1,'2015-09-07 06:21:14'),
	(386,1,1338,1,'NEEDED',NULL,NULL,0,0,1,'2015-09-07 06:21:14'),
	(387,1,1,1,'NEEDED',NULL,NULL,0,0,1,'2015-09-07 06:27:56'),
	(388,1,1339,1,'NEEDED',NULL,NULL,0,0,1,'2015-09-07 06:27:56'),
	(389,1,1,1,'PROVIDED',NULL,NULL,0,0,1,'2015-09-07 06:27:56'),
	(390,1,1338,1,'PROVIDED',NULL,NULL,0,0,1,'2015-09-07 06:27:56'),
	(391,1,1338,1,'NEEDED',NULL,NULL,0,0,1,'2015-09-07 06:34:06'),
	(392,1,1,1,'NEEDED',NULL,NULL,0,0,1,'2015-09-07 06:34:06'),
	(393,1,1339,1,'NEEDED',NULL,NULL,0,0,1,'2015-09-07 06:34:06'),
	(394,1,1,1,'PROVIDED',NULL,NULL,0,0,1,'2015-09-07 06:34:06'),
	(395,1,1338,1,'PROVIDED',NULL,NULL,0,0,1,'2015-09-07 06:34:06'),
	(396,1,1,1,'NEEDED',NULL,NULL,0,0,1,'2015-09-07 11:29:15'),
	(397,1,1339,1,'NEEDED',NULL,NULL,0,0,1,'2015-09-07 11:29:15'),
	(398,1,1338,1,'NEEDED',NULL,NULL,0,0,1,'2015-09-07 11:29:15'),
	(399,1,1,1,'PROVIDED',NULL,NULL,0,0,1,'2015-09-07 11:29:15'),
	(400,1,1339,1,'PROVIDED',NULL,NULL,0,0,1,'2015-09-07 11:29:15'),
	(401,1,1338,1,'PROVIDED',NULL,NULL,0,0,1,'2015-09-07 11:29:15'),
	(402,1,1339,1,'NEEDED',NULL,NULL,0,0,1,'2015-09-07 11:29:15'),
	(403,1,1338,1,'NEEDED',NULL,NULL,0,0,1,'2015-09-07 11:29:15'),
	(404,1,1,1,'NEEDED',NULL,NULL,0,0,1,'2015-09-07 20:22:32'),
	(405,1,1,1,'PROVIDED',NULL,NULL,0,0,1,'2015-09-07 20:22:32'),
	(406,1,1339,1,'PROVIDED',NULL,NULL,0,0,1,'2015-09-07 20:22:32'),
	(407,1,1338,1,'PROVIDED',NULL,NULL,0,0,1,'2015-09-07 20:22:32'),
	(408,1,1,1,'PROVIDED',NULL,NULL,0,0,1,'2015-09-07 20:22:32'),
	(409,1,1339,1,'PROVIDED',NULL,NULL,0,0,1,'2015-09-07 20:22:32'),
	(410,1,1339,1,'NEEDED',NULL,NULL,0,0,1,'2015-09-07 20:30:14'),
	(411,1,1338,1,'NEEDED',NULL,NULL,0,0,1,'2015-09-07 20:30:14'),
	(412,1,1,1,'NEEDED',NULL,NULL,0,0,1,'2015-09-07 20:30:14'),
	(413,1,1338,1,'PROVIDED',NULL,NULL,0,0,1,'2015-09-07 20:30:14'),
	(414,1,1,1,'NEEDED',NULL,NULL,0,0,1,'2015-09-07 20:30:14'),
	(415,1,1339,1,'NEEDED',NULL,NULL,0,0,1,'2015-09-07 21:39:14'),
	(416,1,1338,1,'NEEDED',NULL,NULL,0,0,1,'2015-09-07 21:39:15'),
	(417,1,1,1,'PROVIDED',NULL,NULL,0,0,1,'2015-09-07 21:39:15'),
	(418,1,1339,1,'PROVIDED',NULL,NULL,0,0,1,'2015-09-07 21:39:15'),
	(419,1,1338,1,'PROVIDED',NULL,NULL,0,0,1,'2015-09-07 21:39:15'),
	(420,1,1,1,'NEEDED',NULL,NULL,0,1,1,'2015-09-07 21:50:07'),
	(421,1,1339,1,'NEEDED',NULL,NULL,0,1,1,'2015-09-07 21:50:07'),
	(422,1,1338,1,'NEEDED',NULL,NULL,0,1,1,'2015-09-07 21:50:07'),
	(423,1,1,1,'PROVIDED',NULL,NULL,0,1,1,'2015-09-07 21:50:07'),
	(424,1,1339,1,'PROVIDED',NULL,NULL,0,1,1,'2015-09-07 21:50:07'),
	(425,1,1338,1,'PROVIDED',NULL,NULL,0,1,1,'2015-09-07 21:50:07');

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
) ENGINE=InnoDB AUTO_INCREMENT=255 DEFAULT CHARSET=utf8;

LOCK TABLES `R_LD2T` WRITE;
/*!40000 ALTER TABLE `R_LD2T` DISABLE KEYS */;

INSERT INTO `R_LD2T` (`id`, `DELIVERY_BASE_ID`, `TERM_ID`, `LINK_TYPE`, `ENABLED`, `USER_ID`, `CREATION_DATE`, `REVISION`)
VALUES
	(219,1,267,'link type',0,0,'2015-09-06 20:29:30',1),
	(220,2210,266,'',1,0,'2015-09-06 20:29:30',1),
	(221,2211,265,'',1,0,'2015-09-06 20:29:30',1),
	(222,2212,264,'',1,0,'2015-09-06 20:29:30',1),
	(223,2213,263,'',1,0,'2015-09-06 20:29:30',1),
	(224,2214,262,'',1,0,'2015-09-06 20:29:30',1),
	(225,2215,261,'',1,0,'2015-09-06 20:29:30',1),
	(226,1,267,'link type',0,0,'2015-09-06 20:29:30',1),
	(227,1,1,'',0,1,'2015-09-07 06:21:14',3),
	(228,1,267,'link type',0,0,'2015-09-06 20:29:30',1),
	(229,1,1,'',0,1,'2015-09-07 06:27:56',4),
	(230,1,267,'link type',0,0,'2015-09-06 20:29:30',1),
	(231,1,1,'',0,1,'2015-09-07 06:27:56',4),
	(232,1,261,'',0,1,'2015-09-07 06:34:06',1),
	(233,1,262,'',0,1,'2015-09-07 06:34:06',1),
	(234,1,267,'link type',0,0,'2015-09-06 20:29:30',1),
	(235,1,1,'',0,1,'2015-09-07 06:27:56',4),
	(236,1,262,'',0,1,'2015-09-07 06:34:06',1),
	(237,1,261,'',0,1,'2015-09-07 11:29:15',5),
	(238,1,267,'link type',0,0,'2015-09-06 20:29:30',1),
	(239,1,1,'',0,1,'2015-09-07 06:27:56',4),
	(240,1,262,'',0,1,'2015-09-07 06:34:06',1),
	(241,1,261,'',0,1,'2015-09-07 20:22:32',6),
	(242,1,267,'',0,0,'2015-09-06 20:29:30',1),
	(243,1,1,'',0,1,'2015-09-07 06:27:56',4),
	(244,1,262,'',0,1,'2015-09-07 06:34:06',1),
	(245,1,261,'',0,1,'2015-09-07 20:30:14',7),
	(246,1,267,'',0,0,'2015-09-06 20:29:30',1),
	(247,1,262,'',0,1,'2015-09-07 06:34:06',1),
	(248,1,261,'',0,1,'2015-09-07 20:30:14',7),
	(250,1,1,'',0,1,'2015-09-07 21:39:15',11),
	(251,1,267,'',1,1,'2015-09-07 21:50:07',11),
	(252,1,262,'',1,1,'2015-09-07 21:50:07',4),
	(253,1,261,'',1,1,'2015-09-07 21:50:07',10),
	(254,1,1,'',1,1,'2015-09-07 21:50:07',12);

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
) ENGINE=InnoDB AUTO_INCREMENT=266 DEFAULT CHARSET=utf8;

LOCK TABLES `R_LK2K` WRITE;
/*!40000 ALTER TABLE `R_LK2K` DISABLE KEYS */;

INSERT INTO `R_LK2K` (`id`, `REVISION`, `HIER`, `PARENT_ID`, `CHILD_ID`, `LINK_TYPE`, `PARAM1`, `PARAM2`, `ENABLED`, `USER_ID`, `CREATION_DATE`)
VALUES
	(262,2,1,1338,1,NULL,NULL,NULL,0,0,'2015-09-06 20:29:30'),
	(263,2,1,1,1340,NULL,NULL,NULL,0,0,'2015-09-06 20:29:30'),
	(264,2,1,1339,1343,NULL,NULL,NULL,0,0,'2015-09-06 20:29:30'),
	(265,2,1,1343,1341,NULL,NULL,NULL,0,0,'2015-09-06 20:29:30');

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
) ENGINE=InnoDB AUTO_INCREMENT=371 DEFAULT CHARSET=utf8;

LOCK TABLES `R_LK2T` WRITE;
/*!40000 ALTER TABLE `R_LK2T` DISABLE KEYS */;

INSERT INTO `R_LK2T` (`id`, `KBIT_BASE_ID`, `TERM_ID`, `LINK_TYPE`, `ENABLED`, `USER_ID`, `CREATION_DATE`, `REVISION`)
VALUES
	(364,1,267,'',1,0,'2015-09-06 20:29:30',1),
	(365,1338,266,'',1,0,'2015-09-06 20:29:30',1),
	(366,1339,265,'',1,0,'2015-09-06 20:29:30',1),
	(367,1340,264,'',1,0,'2015-09-06 20:29:30',1),
	(368,1341,263,'',1,0,'2015-09-06 20:29:30',1),
	(369,1342,262,'',1,0,'2015-09-06 20:29:30',1),
	(370,1343,261,'',1,0,'2015-09-06 20:29:30',1);

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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;



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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;



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
) ENGINE=InnoDB AUTO_INCREMENT=327 DEFAULT CHARSET=utf8;

LOCK TABLES `SCOPE` WRITE;
/*!40000 ALTER TABLE `SCOPE` DISABLE KEYS */;

INSERT INTO `SCOPE` (`id`, `UID`, `TITLE`, `DESCRIPTION`, `ENABLED`, `USER_ID`, `CREATION_DATE`)
VALUES
	(319,1,'scope title 0','scope description 0',1,0,'2015-09-06 20:29:29'),
	(320,320,'scope title 1','scope description 1',1,0,'2015-09-06 20:29:29'),
	(321,321,'scope title 2','scope description 2',1,0,'2015-09-06 20:29:30'),
	(322,322,'scope title 3','scope description 3',1,0,'2015-09-06 20:29:30'),
	(323,323,'scope title 4','scope description 4',1,0,'2015-09-06 20:29:30'),
	(324,324,'scope title 5','scope description 5',1,0,'2015-09-06 20:29:30'),
	(325,325,'scope title 6','scope description 6',1,0,'2015-09-06 20:29:30'),
	(326,326,'scope title 7','scope description 7',1,0,'2015-09-06 20:29:30');

/*!40000 ALTER TABLE `SCOPE` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table TERM_MEAN
# ------------------------------------------------------------

DROP TABLE IF EXISTS `TERM_MEAN`;

CREATE TABLE `TERM_MEAN` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `UID` int(11) unsigned NOT NULL,
  `TEXT` text,
  `LANG` text,
  `ENABLED` tinyint(1) NOT NULL,
  `USER_ID` int(11) unsigned NOT NULL,
  `CREATION_DATE` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=276 DEFAULT CHARSET=utf8;

LOCK TABLES `TERM_MEAN` WRITE;
/*!40000 ALTER TABLE `TERM_MEAN` DISABLE KEYS */;

INSERT INTO `TERM_MEAN` (`id`, `UID`, `TEXT`, `LANG`, `ENABLED`, `USER_ID`, `CREATION_DATE`)
VALUES
	(268,1,'term meaning 0','en',1,0,'2015-09-06 20:29:29'),
	(269,269,'term meaning 1','en',1,0,'2015-09-06 20:29:30'),
	(270,270,'term meaning 2','en',1,0,'2015-09-06 20:29:30'),
	(271,271,'term meaning 3','en',1,0,'2015-09-06 20:29:30'),
	(272,272,'term meaning 4','en',1,0,'2015-09-06 20:29:30'),
	(273,273,'term meaning 5','en',1,0,'2015-09-06 20:29:30'),
	(274,274,'term meaning 6','en',1,0,'2015-09-06 20:29:30'),
	(275,275,'term meaning 7','en',1,0,'2015-09-06 20:29:30');

/*!40000 ALTER TABLE `TERM_MEAN` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table TERM_STRING
# ------------------------------------------------------------

DROP TABLE IF EXISTS `TERM_STRING`;

CREATE TABLE `TERM_STRING` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `UID` int(11) unsigned NOT NULL,
  `TEXT` text,
  `LANG` text,
  `ENABLED` tinyint(1) NOT NULL,
  `USER_ID` int(11) unsigned NOT NULL,
  `CREATION_DATE` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=342 DEFAULT CHARSET=utf8;

LOCK TABLES `TERM_STRING` WRITE;
/*!40000 ALTER TABLE `TERM_STRING` DISABLE KEYS */;

INSERT INTO `TERM_STRING` (`id`, `UID`, `TEXT`, `LANG`, `ENABLED`, `USER_ID`, `CREATION_DATE`)
VALUES
	(334,1,'term 0','en',1,0,'2015-09-06 20:29:29'),
	(335,335,'term 1','en',1,0,'2015-09-06 20:29:29'),
	(336,336,'term 2','en',1,0,'2015-09-06 20:29:30'),
	(337,337,'term 3','en',1,0,'2015-09-06 20:29:30'),
	(338,338,'term 4','en',1,0,'2015-09-06 20:29:30'),
	(339,339,'term 5','en',1,0,'2015-09-06 20:29:30'),
	(340,340,'term 6','en',1,0,'2015-09-06 20:29:30'),
	(341,341,'term 7','en',1,0,'2015-09-06 20:29:30');

/*!40000 ALTER TABLE `TERM_STRING` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table TERMS
# ------------------------------------------------------------

DROP TABLE IF EXISTS `TERMS`;

CREATE TABLE `TERMS` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `UID` int(11) unsigned NOT NULL,
  `ID_TERM_MEAN` int(11) unsigned DEFAULT NULL,
  `ID_SCOPE` int(11) unsigned DEFAULT NULL,
  `ID_TERM_STRING` int(11) unsigned NOT NULL,
  `ENABLED` tinyint(1) NOT NULL,
  `USER_ID` int(11) unsigned NOT NULL,
  `CREATION_DATE` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=268 DEFAULT CHARSET=utf8;

LOCK TABLES `TERMS` WRITE;
/*!40000 ALTER TABLE `TERMS` DISABLE KEYS */;

INSERT INTO `TERMS` (`id`, `UID`, `ID_TERM_MEAN`, `ID_SCOPE`, `ID_TERM_STRING`, `ENABLED`, `USER_ID`, `CREATION_DATE`)
VALUES
	(260,1,1,1,1,1,0,'2015-09-06 20:29:29'),
	(261,261,269,320,335,1,0,'2015-09-06 20:29:30'),
	(262,262,270,321,336,1,0,'2015-09-06 20:29:30'),
	(263,263,271,322,337,1,0,'2015-09-06 20:29:30'),
	(264,264,272,323,338,1,0,'2015-09-06 20:29:30'),
	(265,265,273,324,339,1,0,'2015-09-06 20:29:30'),
	(266,266,274,325,340,1,0,'2015-09-06 20:29:30'),
	(267,267,275,326,341,1,0,'2015-09-06 20:29:30');

/*!40000 ALTER TABLE `TERMS` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
