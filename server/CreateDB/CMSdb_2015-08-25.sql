# ************************************************************
# Sequel Pro SQL dump
# Version 4135
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.5.38)
# Database: CMSdb
# Generation Time: 2015-08-25 19:55:16 +0000
# ************************************************************

DROP DATABASE IF EXISTS CMSdb;
CREATE DATABASE IF NOT EXISTS CMSdb;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `CONTENT_LOCK` WRITE;
/*!40000 ALTER TABLE `CONTENT_LOCK` DISABLE KEYS */;

INSERT INTO `CONTENT_LOCK` (`id`, `LOCKED_UID`, `ENTITY_TYPE`, `LOCK_STATUS`, `USER_ID`, `CREATION_DATE`, `ENABLED`)
VALUES
	(2512,1,'DELIVERY_BASE','LOCKED',1,'2015-08-25 21:51:34',0),
	(2513,995,'DELIVERY_BASE','LOCKED',1,'2015-08-25 21:51:34',0),
	(2514,996,'DELIVERY_BASE','LOCKED',1,'2015-08-25 21:51:34',0),
	(2515,997,'DELIVERY_BASE','LOCKED',1,'2015-08-25 21:51:34',0),
	(2516,1,'DELIVERY_BASE','UNLOCKED',1,'2015-08-25 21:51:34',0),
	(2517,995,'DELIVERY_BASE','UNLOCKED',1,'2015-08-25 21:51:34',0),
	(2518,996,'DELIVERY_BASE','UNLOCKED',1,'2015-08-25 21:51:34',0),
	(2519,997,'DELIVERY_BASE','UNLOCKED',1,'2015-08-25 21:51:34',0),
	(2520,1,'DELIVERY_BASE','LOCKED',1,'2015-08-25 21:51:34',0),
	(2521,995,'DELIVERY_BASE','LOCKED',2,'2015-08-25 21:51:34',0),
	(2522,996,'DELIVERY_BASE','LOCKED',1,'2015-08-25 21:51:34',1),
	(2523,997,'DELIVERY_BASE','LOCKED',1,'2015-08-25 21:51:34',1),
	(2524,1,'KBIT_BASE','LOCKED',1,'2015-08-25 21:51:34',0),
	(2525,981,'KBIT_BASE','LOCKED',1,'2015-08-25 21:51:34',0),
	(2526,982,'KBIT_BASE','LOCKED',1,'2015-08-25 21:51:34',0),
	(2527,983,'KBIT_BASE','LOCKED',1,'2015-08-25 21:51:34',0),
	(2528,1,'KBIT_BASE','UNLOCKED',1,'2015-08-25 21:51:34',0),
	(2529,981,'KBIT_BASE','UNLOCKED',1,'2015-08-25 21:51:34',0),
	(2530,982,'KBIT_BASE','UNLOCKED',1,'2015-08-25 21:51:34',0),
	(2531,983,'KBIT_BASE','UNLOCKED',1,'2015-08-25 21:51:34',0),
	(2532,1,'KBIT_BASE','LOCKED',1,'2015-08-25 21:51:34',0),
	(2533,981,'KBIT_BASE','LOCKED',1,'2015-08-25 21:51:34',0),
	(2534,982,'KBIT_BASE','LOCKED',2,'2015-08-25 21:51:34',0),
	(2535,983,'KBIT_BASE','LOCKED',1,'2015-08-25 21:51:34',1),
	(2536,1,'KBIT_BASE','UNLOCKED',1,'2015-08-25 21:51:34',0),
	(2537,982,'KBIT_BASE','UNLOCKED',2,'2015-08-25 21:51:34',1),
	(2538,1,'DELIVERY_BASE','UNLOCKED',1,'2015-08-25 21:51:34',0),
	(2539,995,'DELIVERY_BASE','UNLOCKED',2,'2015-08-25 21:51:34',1),
	(2540,1,'KBIT_BASE','LOCKED',1,'2015-08-25 21:51:34',0),
	(2541,1,'DELIVERY_BASE','LOCKED',1,'2015-08-25 21:51:34',1),
	(2542,1,'KBIT_BASE','UNLOCKED',1,'2015-08-25 21:51:34',1),
	(2543,981,'KBIT_BASE','UNLOCKED',1,'2015-08-25 21:51:35',1);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `DELIVERY_BASE` WRITE;
/*!40000 ALTER TABLE `DELIVERY_BASE` DISABLE KEYS */;

INSERT INTO `DELIVERY_BASE` (`id`, `UID`, `REVISION`, `TITLE`, `DESCRIPTION`, `ENABLED`, `USER_ID`, `CREATION_DATE`, `FRONT_TYPE`)
VALUES
	(994,1,1,'-----Delivery 1','description 1',0,1,'2015-08-25 21:51:34','DELIVERY_FRONT'),
	(995,995,1,'-----Delivery 2','description 2',0,1,'2015-08-25 21:51:34','DELIVERY_FRONT'),
	(996,996,1,'-----Delivery 3','description 3',0,1,'2015-08-25 21:51:34','DELIVERY_FRONT'),
	(997,997,1,'-----Delivery 4','description 4',0,1,'2015-08-25 21:51:34','DELIVERY_FRONT'),
	(998,1,1,'Delivery 1','description 1',0,1,'2015-08-25 21:51:34','DELIVERY_FRONT'),
	(999,995,1,'Delivery 2','description 2',0,1,'2015-08-25 21:51:34','DELIVERY_FRONT'),
	(1000,996,1,'Delivery 3','description 3',1,1,'2015-08-25 21:51:34','DELIVERY_FRONT'),
	(1001,997,1,'Delivery 4','description 4',1,1,'2015-08-25 21:51:34','DELIVERY_FRONT'),
	(1002,1,1,'Delivery 1','description 1',1,1,'2015-08-25 21:51:34','DELIVERY_FRONT'),
	(1003,995,1,'Delivery 2','description 2',1,1,'2015-08-25 21:51:34','DELIVERY_FRONT');

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
	(550,1,1,'http://youtube1.com',NULL,NULL,0,1,'2015-08-25 21:51:34'),
	(551,995,1,'http://youtube2.com',NULL,NULL,0,1,'2015-08-25 21:51:34'),
	(552,996,1,'http://youtube3.com',NULL,NULL,1,1,'2015-08-25 21:51:34'),
	(553,997,1,'http://youtube4.com',NULL,NULL,1,1,'2015-08-25 21:51:34'),
	(554,1,1,'http://youtube1.com',NULL,NULL,1,1,'2015-08-25 21:51:34'),
	(555,995,1,'http://youtube2.com',NULL,NULL,1,1,'2015-08-25 21:51:34');

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
	(980,1,1,'------Kbit 1','description 1',0,1,'2015-08-25 21:51:34','KBIT_FRONT'),
	(981,981,1,'------Kbit 2','description 2',0,1,'2015-08-25 21:51:34','KBIT_FRONT'),
	(982,982,1,'------Kbit 3','description 3',0,1,'2015-08-25 21:51:34','KBIT_FRONT'),
	(983,983,1,'------Kbit 4','description 4',0,1,'2015-08-25 21:51:34','KBIT_FRONT'),
	(984,1,1,'Kbit 1','description 1',0,1,'2015-08-25 21:51:34','KBIT_FRONT'),
	(985,981,1,'Kbit 2','description 2',0,1,'2015-08-25 21:51:34','KBIT_FRONT'),
	(986,982,1,'Kbit 3','description 3',0,1,'2015-08-25 21:51:34','KBIT_FRONT'),
	(987,983,1,'Kbit 4','description 4',1,1,'2015-08-25 21:51:34','KBIT_FRONT'),
	(988,1,1,'Kbit 1','description 1',0,1,'2015-08-25 21:51:34','KBIT_FRONT'),
	(989,982,1,'Kbit 3','description 3',1,1,'2015-08-25 21:51:34','KBIT_FRONT'),
	(990,1,2,'new title for kbit 1','new description for kbit1',1,1,'2015-08-25 21:51:34','KBIT_FRONT'),
	(991,981,2,'new title for kbit 2','new description for kbit2',1,1,'2015-08-25 21:51:34','KBIT_FRONT');

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
	(520,1,1,'http://google1.com',NULL,NULL,0,1,'2015-08-25 21:51:34'),
	(521,981,1,'http://google2.com',NULL,NULL,0,1,'2015-08-25 21:51:34'),
	(522,982,1,'http://google3.com',NULL,NULL,0,1,'2015-08-25 21:51:34'),
	(523,983,1,'http://google4.com',NULL,NULL,1,1,'2015-08-25 21:51:34'),
	(524,1,1,'http://google1.com',NULL,NULL,0,1,'2015-08-25 21:51:34'),
	(525,982,1,'http://google3.com',NULL,NULL,1,1,'2015-08-25 21:51:34'),
	(526,1,1,'http://google1.com',NULL,NULL,1,1,'2015-08-25 21:51:34'),
	(527,981,1,'http://google2.com',NULL,NULL,1,1,'2015-08-25 21:51:34');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `R_LD2D` WRITE;
/*!40000 ALTER TABLE `R_LD2D` DISABLE KEYS */;

INSERT INTO `R_LD2D` (`id`, `REVISION`, `HIER`, `PARENT_ID`, `CHILD_ID`, `LINK_TYPE`, `PARAM1`, `PARAM2`, `ENABLED`, `USER_ID`, `CREATION_DATE`)
VALUES
	(49,2,1,1,996,NULL,NULL,NULL,1,1,'2015-08-25 21:51:34');

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
	(46,1,2,'true',1,1,'2015-08-25 21:51:34',1);

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
	(74,2,1,1,981,NULL,NULL,NULL,0,1,'2015-08-25 21:51:34'),
	(75,2,1,1,981,NULL,NULL,NULL,0,1,'2015-08-25 21:51:34');

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
	(73,1,2,'link type33333',0,1,'2015-08-25 21:51:34',1),
	(74,1,2,'link type33333',1,1,'2015-08-25 21:51:34',1);

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

LOCK TABLES `R_Ls2s` WRITE;
/*!40000 ALTER TABLE `R_Ls2s` DISABLE KEYS */;

INSERT INTO `R_Ls2s` (`id`, `REVISION`, `HIER`, `PARENT_ID`, `CHILD_ID`, `LINK_TYPE`, `ENABLED`, `PARAM1`, `PARAM2`, `USER_ID`, `CREATION_DATE`)
VALUES
	(8,9,1,0,1,NULL,1,NULL,NULL,2,'2015-08-15 19:23:49'),
	(9,1,1,2,0,NULL,1,NULL,NULL,2,'2015-08-15 19:24:06'),
	(10,2,0,3,0,NULL,1,NULL,NULL,2,'2015-08-15 19:24:21'),
	(11,2,0,0,4,NULL,1,NULL,NULL,2,'2015-08-15 19:24:45'),
	(12,1,0,1,0,NULL,0,NULL,NULL,2,'2015-08-15 19:25:02');

/*!40000 ALTER TABLE `R_Ls2s` ENABLE KEYS */;
UNLOCK TABLES;


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

LOCK TABLES `R_Lt2t` WRITE;
/*!40000 ALTER TABLE `R_Lt2t` DISABLE KEYS */;

INSERT INTO `R_Lt2t` (`id`, `REVISION`, `HIER`, `PARENT_ID`, `CHILD_ID`, `LINK_TYPE`, `ENABLED`, `PARAM1`, `PARAM2`, `USER_ID`, `CREATION_DATE`)
VALUES
	(1,1,0,1,2,NULL,0,NULL,NULL,2,'2015-08-16 22:00:32'),
	(2,2,0,1,2,NULL,0,NULL,NULL,2,'2015-08-16 22:01:29'),
	(3,3,0,1,2,NULL,0,NULL,NULL,2,'2015-08-16 22:01:41'),
	(4,4,0,1,2,NULL,1,NULL,NULL,2,'2015-08-16 22:02:00');

/*!40000 ALTER TABLE `R_Lt2t` ENABLE KEYS */;
UNLOCK TABLES;


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
	(2,0,'General','General scope',1,2,'2015-08-15 00:00:00'),
	(4,1,'OOP','Object Oriented Programming',1,2,'2015-08-15 00:00:00'),
	(5,2,'Java','Java like language',1,2,'2015-08-15 00:00:00'),
	(6,3,'Java2','New java languange',1,2,'2015-08-15 00:00:00'),
	(7,4,'C# 2','b3refesh shoo',1,2,'2015-08-15 00:00:00');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `TERM_MEAN` WRITE;
/*!40000 ALTER TABLE `TERM_MEAN` DISABLE KEYS */;

INSERT INTO `TERM_MEAN` (`id`, `UID`, `TEXT`, `LANG`, `ENABLED`, `USER_ID`, `CREATION_DATE`)
VALUES
	(14,1,'C sharp','en',1,2,'2015-08-15 00:00:00'),
	(15,2,'C kteer sharp','en',1,2,'2015-08-15 00:00:00'),
	(17,3,'arabic shit shit15-08-15 04:39:19','en',1,2,'2015-08-15 00:00:00'),
	(18,4,'arabic shit shit15-08-15 04:41:10','en',1,2,'2015-08-15 00:00:00'),
	(19,5,'arabic shit shit15-08-15 04:41:10','ar',1,3,'2015-08-15 00:00:00'),
	(20,6,'arabic shit shit15-08-15 04:48:38','en',1,2,'2015-08-15 00:00:00'),
	(21,5,'meaning in arabic','ch',1,1,'2015-08-15 17:02:49'),
	(22,6,'اشي بالعربي','ar',1,1,'2015-08-15 17:02:49'),
	(23,6,'chinaaaa','ch',1,1,'2015-08-15 17:02:49');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `TERM_STRING` WRITE;
/*!40000 ALTER TABLE `TERM_STRING` DISABLE KEYS */;

INSERT INTO `TERM_STRING` (`id`, `UID`, `TEXT`, `LANG`, `ENABLED`, `USER_ID`, `CREATION_DATE`)
VALUES
	(23,1,'C#','en',1,2,'2015-08-15 00:00:00'),
	(24,2,'J#','en',1,2,'2015-08-15 00:00:00'),
	(25,2,'×©×œ×•×','he',1,2,'2015-08-15 00:00:00'),
	(26,2,'arabicccc','ar',1,2,'2015-08-15 00:00:00');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `TERMS` WRITE;
/*!40000 ALTER TABLE `TERMS` DISABLE KEYS */;

INSERT INTO `TERMS` (`id`, `UID`, `ID_TERM_MEAN`, `ID_SCOPE`, `ID_TERM_STRING`, `ENABLED`, `USER_ID`, `CREATION_DATE`)
VALUES
	(10,1,1,0,1,1,2,'2015-08-15 00:00:00'),
	(11,2,2,0,2,1,2,'2015-08-15 00:00:00'),
	(13,3,3,1,1,1,2,'2015-08-15 00:00:00'),
	(14,4,3,2,2,1,2,'2015-08-15 00:00:00'),
	(15,5,4,4,3,1,2,'2015-08-15 00:00:00'),
	(16,6,5,4,3,1,3,'2015-08-15 00:00:00'),
	(17,7,6,4,2,1,2,'2015-08-15 00:00:00');

/*!40000 ALTER TABLE `TERMS` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
