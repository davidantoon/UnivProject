# ************************************************************
# Sequel Pro SQL dump
# Version 4135
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.5.38)
# Database: CMSdb
# Generation Time: 2015-09-02 19:07:33 +0000
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
) ENGINE=InnoDB AUTO_INCREMENT=5236 DEFAULT CHARSET=utf8;

LOCK TABLES `CONTENT_LOCK` WRITE;
/*!40000 ALTER TABLE `CONTENT_LOCK` DISABLE KEYS */;

INSERT INTO `CONTENT_LOCK` (`id`, `LOCKED_UID`, `ENTITY_TYPE`, `LOCK_STATUS`, `USER_ID`, `CREATION_DATE`, `ENABLED`)
VALUES
	(5214,1,'KBIT_BASE','LOCKED',0,'2015-09-02 21:05:41',0),
	(5215,1008,'KBIT_BASE','LOCKED',0,'2015-09-02 21:05:41',0),
	(5216,1009,'KBIT_BASE','LOCKED',0,'2015-09-02 21:05:41',0),
	(5217,1010,'KBIT_BASE','LOCKED',0,'2015-09-02 21:05:41',0),
	(5218,1011,'KBIT_BASE','LOCKED',0,'2015-09-02 21:05:41',0),
	(5219,1012,'KBIT_BASE','LOCKED',0,'2015-09-02 21:05:41',0),
	(5220,1013,'KBIT_BASE','LOCKED',0,'2015-09-02 21:05:41',0),
	(5221,1014,'KBIT_BASE','LOCKED',0,'2015-09-02 21:05:41',1),
	(5222,1,'KBIT_BASE','UNLOCKED',0,'2015-09-02 21:05:41',1),
	(5223,1008,'KBIT_BASE','UNLOCKED',0,'2015-09-02 21:05:41',1),
	(5224,1009,'KBIT_BASE','UNLOCKED',0,'2015-09-02 21:05:41',1),
	(5225,1010,'KBIT_BASE','UNLOCKED',0,'2015-09-02 21:05:41',1),
	(5226,1011,'KBIT_BASE','UNLOCKED',0,'2015-09-02 21:05:41',1),
	(5227,1012,'KBIT_BASE','UNLOCKED',0,'2015-09-02 21:05:41',1),
	(5228,1013,'KBIT_BASE','UNLOCKED',0,'2015-09-02 21:05:41',1),
	(5229,1,'DELIVERY_BASE','LOCKED',0,'2015-09-02 21:05:41',1),
	(5230,1909,'DELIVERY_BASE','LOCKED',0,'2015-09-02 21:05:41',1),
	(5231,1910,'DELIVERY_BASE','LOCKED',0,'2015-09-02 21:05:41',1),
	(5232,1911,'DELIVERY_BASE','LOCKED',0,'2015-09-02 21:05:41',1),
	(5233,1912,'DELIVERY_BASE','LOCKED',0,'2015-09-02 21:05:42',1),
	(5234,1913,'DELIVERY_BASE','LOCKED',0,'2015-09-02 21:05:42',1),
	(5235,1914,'DELIVERY_BASE','LOCKED',0,'2015-09-02 21:05:42',1);

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
) ENGINE=InnoDB AUTO_INCREMENT=1915 DEFAULT CHARSET=utf8;

LOCK TABLES `DELIVERY_BASE` WRITE;
/*!40000 ALTER TABLE `DELIVERY_BASE` DISABLE KEYS */;

INSERT INTO `DELIVERY_BASE` (`id`, `UID`, `REVISION`, `TITLE`, `DESCRIPTION`, `ENABLED`, `USER_ID`, `CREATION_DATE`, `FRONT_TYPE`)
VALUES
	(1908,1,1,'-----Delivery title 0','Delivery description 0',0,0,'2015-09-02 21:05:41','DELIVERY_FRONT'),
	(1909,1909,1,'-----Delivery title 1','Delivery description 1',0,0,'2015-09-02 21:05:41','DELIVERY_FRONT'),
	(1910,1910,1,'-----Delivery title 2','Delivery description 2',0,0,'2015-09-02 21:05:41','DELIVERY_FRONT'),
	(1911,1911,1,'-----Delivery title 3','Delivery description 3',0,0,'2015-09-02 21:05:42','DELIVERY_FRONT'),
	(1912,1912,1,'-----Delivery title 4','Delivery description 4',0,0,'2015-09-02 21:05:42','DELIVERY_FRONT'),
	(1913,1913,1,'-----Delivery title 5','Delivery description 5',0,0,'2015-09-02 21:05:42','DELIVERY_FRONT'),
	(1914,1914,1,'-----Delivery title 6','Delivery description 6',0,0,'2015-09-02 21:05:42','DELIVERY_FRONT');

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
) ENGINE=InnoDB AUTO_INCREMENT=1055 DEFAULT CHARSET=utf8;



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
) ENGINE=InnoDB AUTO_INCREMENT=1022 DEFAULT CHARSET=utf8;

LOCK TABLES `KBIT_BASE` WRITE;
/*!40000 ALTER TABLE `KBIT_BASE` DISABLE KEYS */;

INSERT INTO `KBIT_BASE` (`id`, `UID`, `REVISION`, `TITLE`, `DESCRIPTION`, `ENABLED`, `USER_ID`, `CREATION_DATE`, `FRONT_TYPE`)
VALUES
	(1007,1,1,'------Kbit title 0','Kbit description 0',0,0,'2015-09-02 21:05:41','KBIT_FRONT'),
	(1008,1008,1,'------Kbit title 1','Kbit description 1',0,0,'2015-09-02 21:05:41','KBIT_FRONT'),
	(1009,1009,1,'------Kbit title 2','Kbit description 2',0,0,'2015-09-02 21:05:41','KBIT_FRONT'),
	(1010,1010,1,'------Kbit title 3','Kbit description 3',0,0,'2015-09-02 21:05:41','KBIT_FRONT'),
	(1011,1011,1,'------Kbit title 4','Kbit description 4',0,0,'2015-09-02 21:05:41','KBIT_FRONT'),
	(1012,1012,1,'------Kbit title 5','Kbit description 5',0,0,'2015-09-02 21:05:41','KBIT_FRONT'),
	(1013,1013,1,'------Kbit title 6','Kbit description 6',0,0,'2015-09-02 21:05:41','KBIT_FRONT'),
	(1014,1014,1,'------Kbit title 7','Kbit description 7',0,0,'2015-09-02 21:05:41','KBIT_FRONT'),
	(1015,1,1,'Kbit title 0','Kbit description 0',1,0,'2015-09-02 21:05:41','KBIT_FRONT'),
	(1016,1008,1,'Kbit title 1','Kbit description 1',1,0,'2015-09-02 21:05:41','KBIT_FRONT'),
	(1017,1009,1,'Kbit title 2','Kbit description 2',1,0,'2015-09-02 21:05:41','KBIT_FRONT'),
	(1018,1010,1,'Kbit title 3','Kbit description 3',1,0,'2015-09-02 21:05:41','KBIT_FRONT'),
	(1019,1011,1,'Kbit title 4','Kbit description 4',1,0,'2015-09-02 21:05:41','KBIT_FRONT'),
	(1020,1012,1,'Kbit title 5','Kbit description 5',1,0,'2015-09-02 21:05:41','KBIT_FRONT'),
	(1021,1013,1,'Kbit title 6','Kbit description 6',1,0,'2015-09-02 21:05:41','KBIT_FRONT');

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
) ENGINE=InnoDB AUTO_INCREMENT=607 DEFAULT CHARSET=utf8;

LOCK TABLES `KBIT_FRONT` WRITE;
/*!40000 ALTER TABLE `KBIT_FRONT` DISABLE KEYS */;

INSERT INTO `KBIT_FRONT` (`id`, `UID`, `REVISION`, `PATH`, `PARAM1`, `PARAM2`, `ENABLED`, `USER_ID`, `CREATION_DATE`)
VALUES
	(600,1,1,'http://google0.com',NULL,NULL,1,0,'2015-09-02 21:05:41'),
	(601,1008,1,'http://google1.com',NULL,NULL,1,0,'2015-09-02 21:05:41'),
	(602,1009,1,'http://google2.com',NULL,NULL,1,0,'2015-09-02 21:05:41'),
	(603,1010,1,'http://google3.com',NULL,NULL,1,0,'2015-09-02 21:05:41'),
	(604,1011,1,'http://google4.com',NULL,NULL,1,0,'2015-09-02 21:05:41'),
	(605,1012,1,'http://google5.com',NULL,NULL,1,0,'2015-09-02 21:05:41'),
	(606,1013,1,'http://google6.com',NULL,NULL,1,0,'2015-09-02 21:05:41');

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;



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
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8;



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
) ENGINE=InnoDB AUTO_INCREMENT=178 DEFAULT CHARSET=utf8;

LOCK TABLES `R_LK2K` WRITE;
/*!40000 ALTER TABLE `R_LK2K` DISABLE KEYS */;

INSERT INTO `R_LK2K` (`id`, `REVISION`, `HIER`, `PARENT_ID`, `CHILD_ID`, `LINK_TYPE`, `PARAM1`, `PARAM2`, `ENABLED`, `USER_ID`, `CREATION_DATE`)
VALUES
	(174,2,1,1008,1,NULL,NULL,NULL,0,0,'2015-09-02 21:05:41'),
	(175,2,1,1,1010,NULL,NULL,NULL,0,0,'2015-09-02 21:05:41'),
	(176,2,1,1009,1013,NULL,NULL,NULL,0,0,'2015-09-02 21:05:41'),
	(177,2,1,1013,1011,NULL,NULL,NULL,0,0,'2015-09-02 21:05:41');

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
) ENGINE=InnoDB AUTO_INCREMENT=217 DEFAULT CHARSET=utf8;

LOCK TABLES `R_LK2T` WRITE;
/*!40000 ALTER TABLE `R_LK2T` DISABLE KEYS */;

INSERT INTO `R_LK2T` (`id`, `KBIT_BASE_ID`, `TERM_ID`, `LINK_TYPE`, `ENABLED`, `USER_ID`, `CREATION_DATE`, `REVISION`)
VALUES
	(210,1,7,'link type',1,0,'2015-09-02 21:05:41',1),
	(211,1008,6,'link type',1,0,'2015-09-02 21:05:41',1),
	(212,1009,5,'link type',1,0,'2015-09-02 21:05:41',1),
	(213,1010,4,'link type',1,0,'2015-09-02 21:05:41',1),
	(214,1011,3,'link type',1,0,'2015-09-02 21:05:41',1),
	(215,1012,2,'link type',1,0,'2015-09-02 21:05:41',1),
	(216,1013,1,'link type',1,0,'2015-09-02 21:05:41',1);

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
) ENGINE=InnoDB AUTO_INCREMENT=151 DEFAULT CHARSET=utf8;

LOCK TABLES `SCOPE` WRITE;
/*!40000 ALTER TABLE `SCOPE` DISABLE KEYS */;

INSERT INTO `SCOPE` (`id`, `UID`, `TITLE`, `DESCRIPTION`, `ENABLED`, `USER_ID`, `CREATION_DATE`)
VALUES
	(143,1,'scope title 0','scope description 0',1,0,'2015-09-02 21:05:41'),
	(144,144,'scope title 1','scope description 1',1,0,'2015-09-02 21:05:41'),
	(145,145,'scope title 2','scope description 2',1,0,'2015-09-02 21:05:41'),
	(146,146,'scope title 3','scope description 3',1,0,'2015-09-02 21:05:41'),
	(147,147,'scope title 4','scope description 4',1,0,'2015-09-02 21:05:41'),
	(148,148,'scope title 5','scope description 5',1,0,'2015-09-02 21:05:41'),
	(149,149,'scope title 6','scope description 6',1,0,'2015-09-02 21:05:41'),
	(150,150,'scope title 7','scope description 7',1,0,'2015-09-02 21:05:41');

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
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8;

LOCK TABLES `TERM_MEAN` WRITE;
/*!40000 ALTER TABLE `TERM_MEAN` DISABLE KEYS */;

INSERT INTO `TERM_MEAN` (`id`, `UID`, `TEXT`, `LANG`, `ENABLED`, `USER_ID`, `CREATION_DATE`)
VALUES
	(90,1,'term meaning 0','en',1,0,'2015-09-02 21:05:41'),
	(91,91,'term meaning 1','en',1,0,'2015-09-02 21:05:41'),
	(92,92,'term meaning 2','en',1,0,'2015-09-02 21:05:41'),
	(93,93,'term meaning 3','en',1,0,'2015-09-02 21:05:41'),
	(94,94,'term meaning 4','en',1,0,'2015-09-02 21:05:41'),
	(95,95,'term meaning 5','en',1,0,'2015-09-02 21:05:41'),
	(96,96,'term meaning 6','en',1,0,'2015-09-02 21:05:41'),
	(97,97,'term meaning 7','en',1,0,'2015-09-02 21:05:41');

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
) ENGINE=InnoDB AUTO_INCREMENT=164 DEFAULT CHARSET=utf8;

LOCK TABLES `TERM_STRING` WRITE;
/*!40000 ALTER TABLE `TERM_STRING` DISABLE KEYS */;

INSERT INTO `TERM_STRING` (`id`, `UID`, `TEXT`, `LANG`, `ENABLED`, `USER_ID`, `CREATION_DATE`)
VALUES
	(156,1,'term 0','en',1,0,'2015-09-02 21:05:41'),
	(157,157,'term 1','en',1,0,'2015-09-02 21:05:41'),
	(158,158,'term 2','en',1,0,'2015-09-02 21:05:41'),
	(159,159,'term 3','en',1,0,'2015-09-02 21:05:41'),
	(160,160,'term 4','en',1,0,'2015-09-02 21:05:41'),
	(161,161,'term 5','en',1,0,'2015-09-02 21:05:41'),
	(162,162,'term 6','en',1,0,'2015-09-02 21:05:41'),
	(163,163,'term 7','en',1,0,'2015-09-02 21:05:41');

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
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8;

LOCK TABLES `TERMS` WRITE;
/*!40000 ALTER TABLE `TERMS` DISABLE KEYS */;

INSERT INTO `TERMS` (`id`, `UID`, `ID_TERM_MEAN`, `ID_SCOPE`, `ID_TERM_STRING`, `ENABLED`, `USER_ID`, `CREATION_DATE`)
VALUES
	(84,1,1,1,1,1,0,'2015-09-02 21:05:41'),
	(85,85,91,144,157,1,0,'2015-09-02 21:05:41'),
	(86,86,92,145,158,1,0,'2015-09-02 21:05:41'),
	(87,87,93,146,159,1,0,'2015-09-02 21:05:41'),
	(88,88,94,147,160,1,0,'2015-09-02 21:05:41'),
	(89,89,95,148,161,1,0,'2015-09-02 21:05:41'),
	(90,90,96,149,162,1,0,'2015-09-02 21:05:41'),
	(91,91,97,150,163,1,0,'2015-09-02 21:05:41');

/*!40000 ALTER TABLE `TERMS` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
