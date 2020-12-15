/*
SQLyog Community v13.1.6 (64 bit)
MySQL - 10.4.14-MariaDB : Database - test
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`test` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `test`;

/*Table structure for table `module_button` */

DROP TABLE IF EXISTS `module_button`;

CREATE TABLE `module_button` (
  `buttonId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `internalName` varchar(1024) NOT NULL,
  `settingId` bigint(20) DEFAULT NULL,
  `type` varchar(128) DEFAULT 'textOnly',
  `icon` varchar(100) DEFAULT NULL,
  `iconAlign` varchar(100) DEFAULT 'left',
  `fillColor` varchar(100) DEFAULT '#000000',
  `hoverColor` varchar(100) DEFAULT '#000000',
  `title` varchar(1024) DEFAULT NULL,
  `ctaLink` varchar(1024) DEFAULT NULL,
  `linkColor` varchar(100) DEFAULT '#000000',
  `linkHoverColor` varchar(100) DEFAULT '#000000',
  `textAlign` varchar(10) DEFAULT 'center',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`buttonId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `module_button` */

insert  into `module_button`(`buttonId`,`internalName`,`settingId`,`type`,`icon`,`iconAlign`,`fillColor`,`hoverColor`,`title`,`ctaLink`,`linkColor`,`linkHoverColor`,`textAlign`,`createdAt`,`updatedAt`) values 
(1,'button1',22,'image','website-image--1602804186678.ico','right','#000000','#ff0000','<h3><strong>aaaa</strong></h3>','/aaa','#000000','#000000','center','2020-10-15 16:39:50','2020-10-18 14:43:24'),
(2,'Button2',24,'text','website-image--1602831470638.ico',NULL,NULL,NULL,'<p>Logo</p>',NULL,'#000000','#000000','center','2020-10-16 00:57:54','2020-10-18 15:32:39'),
(5,'menu button1',25,'text',NULL,NULL,'#000000','#000000','<p>Home</p>','/','#00ff00','#0000ff','left','2020-10-18 15:16:28','2020-10-18 20:04:16'),
(6,'menu button2',26,'text',NULL,NULL,NULL,NULL,'<p>Blog</p>','/blog','#00ff00','#ff0000','center','2020-10-18 15:18:17','2020-10-18 20:54:43');

/*Table structure for table `module_card` */

DROP TABLE IF EXISTS `module_card`;

CREATE TABLE `module_card` (
  `cardId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `internalName` varchar(1024) NOT NULL,
  `settingId` bigint(20) DEFAULT NULL,
  `type` varchar(128) DEFAULT NULL,
  `coverImageId` bigint(20) DEFAULT NULL,
  `title` varchar(4096) DEFAULT NULL,
  `subhead` varchar(1024) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `ctaText` varchar(1024) DEFAULT NULL,
  `ctaLink` varchar(1024) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`cardId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

/*Data for the table `module_card` */

insert  into `module_card`(`cardId`,`internalName`,`settingId`,`type`,`coverImageId`,`title`,`subhead`,`description`,`ctaText`,`ctaLink`,`createdAt`,`updatedAt`) values 
(1,'Card Test 12',1,'text',1,NULL,'This is test subhead 1',NULL,'Learn more',NULL,'2020-09-04 07:58:40','2020-09-11 10:24:53'),
(2,'Our Feature Card - 1',1,'text',1,'Our main goal','Great success','<p><span style=\"color: rgb(34, 34, 34);\">The component is also known as a&nbsp;</span><strong style=\"color: rgb(34, 34, 34);\">toast</strong><span style=\"color: rgb(34, 34, 34);\">. Snackbars inform users of a process that an app has performed or will perform. They appear temporarily, towards the bottom of the screen. They shouldn\'t interrupt the user experience, and they don\'t require user input to disappear.</span></p>','Learn more','/test-page','2020-09-04 07:58:40','2020-09-08 21:20:53'),
(3,'Multi Column Test 1',2,'image',NULL,'This is test title','This is subhead','This is description','Learn more','/saf/sdf/sdf','2020-09-05 10:29:10','2020-09-06 11:43:18'),
(4,'New Card module',16,'text',NULL,NULL,NULL,NULL,NULL,NULL,'2020-09-11 09:38:05','2020-09-11 09:38:05'),
(5,'Card 1',NULL,'image',15,'Setting Smarter Goals',NULL,'<p><span style=\"background-color: rgb(242, 242, 242); color: rgb(55, 59, 66);\">The year ahead holds so much promise and anticipation, another chance to fulfil the goals and resolutions we made last year which we want to improve on or those which weren’t quite reached. Either</span></p>','Read more...',NULL,'2020-09-13 18:59:23','2020-10-16 01:21:19'),
(6,'Dummy Card 1',NULL,'image',15,'Setting Smarter Goals',NULL,'<p><span style=\"background-color: rgb(242, 242, 242); color: rgb(55, 59, 66);\">The year ahead holds so much promise and anticipation, another chance to fulfil the goals and resolutions we made last year which we want to improve on or those which weren’t quite reached. Either</span></p>','Read more...',NULL,'2020-09-13 18:59:23','2020-09-13 18:59:23'),
(7,'Dummy Card 2',NULL,'image',16,'Design to Impress your Target Audience, Not your Boss','Page','<p><span style=\"color: rgb(55, 59, 66);\">Designing a new advertising piece isn’t as simple as making it look nice, sitting back and reaping the rewards. There is a lot to think about and this article will teach you how to better prepared yourself</span></p>','Read more','','2020-09-13 18:59:53','2020-09-15 07:26:41'),
(8,'Dummy Card 3',20,'image',NULL,'<h2><em>How to Create an Awesome Design Brief that Works.... in 5 Simple Steps<span class=\"ql-cursor\">﻿</span></em></h2>','<p><strong>Test</strong></p>','<p><span style=\"color: rgb(55, 59, 66); background-color: rgb(242, 242, 242);\">A design can only be as good as the brief it was developed from. Too general and the design runs the risk of missing the mark, too complicated and it wont allow the design to be open enough to</span></p>','Read more...','','2020-09-13 19:00:24','2020-10-15 01:41:39');

/*Table structure for table `module_header` */

DROP TABLE IF EXISTS `module_header`;

CREATE TABLE `module_header` (
  `headerId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `internalName` varchar(1024) NOT NULL,
  `settingId` bigint(20) DEFAULT NULL,
  `designType` varchar(128) DEFAULT 'centerLeftDesign',
  `image1` bigint(20) DEFAULT NULL,
  `image2` bigint(20) DEFAULT NULL,
  `menuGroup1` bigint(20) DEFAULT NULL,
  `menuGroup2` bigint(20) DEFAULT NULL,
  `menuGroup3` bigint(20) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`headerId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `module_header` */

insert  into `module_header`(`headerId`,`internalName`,`settingId`,`designType`,`image1`,`image2`,`menuGroup1`,`menuGroup2`,`menuGroup3`,`createdAt`,`updatedAt`) values 
(1,'Header1',19,'leftRightDesign',1,2,2,3,3,'2020-10-17 11:30:47','2020-11-21 11:50:50'),
(2,'f',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2020-11-21 06:13:50','2020-11-21 06:13:50');

/*Table structure for table `module_menu_group` */

DROP TABLE IF EXISTS `module_menu_group`;

CREATE TABLE `module_menu_group` (
  `menuGroupId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `internalName` varchar(128) NOT NULL,
  `settingId` bigint(20) DEFAULT NULL,
  `align` varchar(10) DEFAULT 'left',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`menuGroupId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `module_menu_group` */

insert  into `module_menu_group`(`menuGroupId`,`internalName`,`settingId`,`align`,`createdAt`,`updatedAt`) values 
(2,'Menu group1',23,'left','2020-10-17 10:36:27','2020-10-18 18:10:53'),
(3,'menu group2huj',NULL,NULL,'2020-10-18 15:18:25','2020-11-21 11:50:29'),
(4,'ffsd',NULL,NULL,'2020-11-21 06:13:58','2020-11-21 06:13:58');

/*Table structure for table `module_menu_group__buttons` */

DROP TABLE IF EXISTS `module_menu_group__buttons`;

CREATE TABLE `module_menu_group__buttons` (
  `menuGroupButtonId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `menuGroupId` bigint(20) NOT NULL,
  `moduleName` varchar(128) NOT NULL,
  `moduleId` bigint(20) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`menuGroupButtonId`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;

/*Data for the table `module_menu_group__buttons` */

insert  into `module_menu_group__buttons`(`menuGroupButtonId`,`menuGroupId`,`moduleName`,`moduleId`,`createdAt`,`updatedAt`) values 
(35,2,'module_button',5,'2020-10-18 18:15:16','2020-10-18 18:15:16'),
(36,2,'module_button',5,'2020-10-18 18:15:16','2020-10-18 18:15:16'),
(37,2,'module_button',5,'2020-10-18 18:15:16','2020-10-18 18:15:16'),
(38,2,'module_button',5,'2020-10-18 18:15:16','2020-10-18 18:15:16'),
(42,3,'module_button',6,'2020-11-21 11:50:29','2020-11-21 11:50:29'),
(43,3,'module_button',6,'2020-11-21 11:50:29','2020-11-21 11:50:29'),
(44,3,'module_button',6,'2020-11-21 11:50:29','2020-11-21 11:50:29');

/*Table structure for table `module_multi_columns` */

DROP TABLE IF EXISTS `module_multi_columns`;

CREATE TABLE `module_multi_columns` (
  `multiColumnsId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `internalName` varchar(128) NOT NULL,
  `settingId` bigint(20) DEFAULT NULL,
  `type` varchar(10) DEFAULT 'column',
  `columnCount` tinyint(10) NOT NULL,
  `columnWidths` varchar(4096) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`multiColumnsId`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

/*Data for the table `module_multi_columns` */

insert  into `module_multi_columns`(`multiColumnsId`,`internalName`,`settingId`,`type`,`columnCount`,`columnWidths`,`createdAt`,`updatedAt`) values 
(1,'Multi Columns Test 1',1,'row',1,'1','2020-09-04 08:00:06','2020-10-14 03:00:40'),
(2,'Multi Columns Test333',13,'row',3,'1,1,1','2020-09-04 08:00:32','2020-10-14 03:00:43'),
(4,'Test111',NULL,'row',2,'3','2020-09-09 11:24:07','2020-10-14 03:00:45'),
(8,'vvvvww4444',NULL,'row',2,'3','2020-09-11 09:25:55','2020-10-14 03:00:49'),
(9,'tttt111',NULL,'row',6,'5','2020-09-11 09:27:07','2020-10-14 03:00:49');

/*Table structure for table `module_multi_columns__columns` */

DROP TABLE IF EXISTS `module_multi_columns__columns`;

CREATE TABLE `module_multi_columns__columns` (
  `multiColumnsColumnId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `multiColumnsId` bigint(20) NOT NULL,
  `moduleName` varchar(128) NOT NULL,
  `moduleId` bigint(20) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`multiColumnsColumnId`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8;

/*Data for the table `module_multi_columns__columns` */

/*Table structure for table `module_page_setting` */

DROP TABLE IF EXISTS `module_page_setting`;

CREATE TABLE `module_page_setting` (
  `pageSettingId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `internalName` varchar(1024) NOT NULL,
  `maxWidth` varchar(1024) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`pageSettingId`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

/*Data for the table `module_page_setting` */

insert  into `module_page_setting`(`pageSettingId`,`internalName`,`maxWidth`,`createdAt`,`updatedAt`) values 
(1,'Page Setting 1','100%','2020-09-04 04:08:14','2020-09-04 04:08:14'),
(6,'Page Setting Test 777','100px','2020-09-04 06:36:56','2020-09-11 09:04:05'),
(7,'Page Setting Test 5','100px','2020-09-04 06:37:02','2020-09-04 06:37:02'),
(8,'Update page Setting 4','100px','2020-09-04 06:37:04','2020-09-09 12:24:38'),
(9,'Page Setting Test 9','1000px','2020-09-04 06:37:09','2020-09-04 06:37:09'),
(10,'Test Page 222',NULL,'2020-09-05 07:44:55','2020-09-05 07:44:55'),
(11,'Test page setting','','2020-09-11 10:24:40','2020-10-12 02:14:21'),
(12,'Dummy website page 123','100%','2020-09-13 18:54:19','2020-10-18 15:22:40'),
(13,'asdfasdf',NULL,'2020-09-15 20:38:21','2020-09-15 20:38:21'),
(14,'f','f','2020-11-21 06:12:59','2020-11-21 06:12:59');

/*Table structure for table `module_section_setting` */

DROP TABLE IF EXISTS `module_section_setting`;

CREATE TABLE `module_section_setting` (
  `sectionSettingId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `internalName` varchar(1024) NOT NULL,
  `width` varchar(1024) DEFAULT NULL,
  `maxWidth` varchar(1024) DEFAULT NULL,
  `height` varchar(1024) DEFAULT NULL,
  `maxHeight` varchar(1024) DEFAULT NULL,
  `backgroundColor` varchar(1024) DEFAULT NULL,
  `backgroundImageId` bigint(20) DEFAULT NULL,
  `borders` varchar(100) DEFAULT '',
  `borderStyle` varchar(10) DEFAULT 'solid',
  `borderThickness` varchar(10) DEFAULT '0px',
  `borderColor` varchar(7) DEFAULT '#aa0000',
  `paddingLeft` varchar(1024) DEFAULT NULL,
  `paddingRight` varchar(1024) DEFAULT NULL,
  `paddingTop` varchar(1024) DEFAULT NULL,
  `paddingBottom` varchar(1024) DEFAULT NULL,
  `marginLeft` varchar(1024) DEFAULT NULL,
  `marginRight` varchar(1024) DEFAULT NULL,
  `marginTop` varchar(1024) DEFAULT NULL,
  `marginBottom` varchar(1024) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`sectionSettingId`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

/*Data for the table `module_section_setting` */

insert  into `module_section_setting`(`sectionSettingId`,`internalName`,`width`,`maxWidth`,`height`,`maxHeight`,`backgroundColor`,`backgroundImageId`,`borders`,`borderStyle`,`borderThickness`,`borderColor`,`paddingLeft`,`paddingRight`,`paddingTop`,`paddingBottom`,`marginLeft`,`marginRight`,`marginTop`,`marginBottom`,`createdAt`,`updatedAt`) values 
(1,'Home page - Our features section - Setting',NULL,'1024px',NULL,NULL,'#fefefe',NULL,'','','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2020-09-05 09:44:58','2020-10-14 16:03:10'),
(2,'Section Setting Test 2',NULL,'1024px',NULL,NULL,NULL,NULL,'','','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2020-09-05 09:44:58','2020-10-14 16:03:11'),
(3,'New Section Setting',NULL,NULL,NULL,NULL,NULL,NULL,'','','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2020-09-11 07:51:19','2020-10-14 16:03:12'),
(4,'Test',NULL,NULL,NULL,NULL,NULL,NULL,'','','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2020-09-11 07:53:36','2020-10-14 16:03:12'),
(5,'vvvvwvwvw',NULL,NULL,NULL,NULL,NULL,NULL,'','','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2020-09-11 07:55:32','2020-10-14 16:03:13'),
(6,'eeeee',NULL,NULL,NULL,NULL,NULL,NULL,'','','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2020-09-11 08:05:23','2020-10-14 16:03:14'),
(7,'vvvvvvv',NULL,NULL,NULL,NULL,NULL,NULL,'','','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2020-09-11 08:07:36','2020-10-14 16:03:14'),
(8,'gegegeg',NULL,NULL,NULL,NULL,NULL,NULL,'','','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2020-09-11 08:20:37','2020-10-14 16:03:15'),
(9,'xxxxx',NULL,NULL,NULL,NULL,NULL,NULL,'','','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2020-09-11 08:32:06','2020-10-14 16:03:15'),
(10,'veeewrwer',NULL,NULL,NULL,NULL,NULL,NULL,'','','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2020-09-11 08:36:43','2020-10-14 16:03:16'),
(11,'eeeevvvv',NULL,'100',NULL,NULL,NULL,NULL,'','','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2020-09-11 08:37:04','2020-10-14 16:03:17'),
(12,'ertert',NULL,NULL,NULL,NULL,NULL,NULL,'','','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2020-09-11 08:39:18','2020-10-14 16:03:18'),
(13,'TestSetting777',NULL,NULL,NULL,NULL,NULL,NULL,'','','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2020-09-11 09:00:09','2020-10-14 16:03:19'),
(14,'twtwtwtwt',NULL,'1000px',NULL,NULL,NULL,NULL,'','','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2020-09-11 09:31:56','2020-10-14 16:03:19'),
(15,'twetewrt',NULL,'1024px',NULL,NULL,'',11,'','','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2020-09-11 09:32:12','2020-10-14 16:03:20'),
(16,'Card Section Setting',NULL,NULL,NULL,NULL,NULL,NULL,'','','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2020-09-11 09:38:00','2020-10-14 16:03:21'),
(17,'Test1',NULL,NULL,NULL,NULL,NULL,NULL,'','','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2020-09-11 09:38:59','2020-10-14 16:03:21'),
(18,'Test 333',NULL,'2223',NULL,NULL,'null',NULL,'','','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2020-09-12 08:36:24','2020-10-14 16:03:22'),
(19,'Dummy Page First','100%','','','','#f5fcff',NULL,',left,top','double','4px','#ff0000','','','','','','','','','2020-09-13 19:44:41','2020-10-18 15:28:00'),
(20,'Dummy Page Second',NULL,'1280px',NULL,NULL,'#e5ebee',NULL,'','','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2020-09-13 19:50:24','2020-10-14 16:03:23'),
(21,'Teste',NULL,'600px',NULL,NULL,NULL,NULL,'','','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2020-09-15 21:19:44','2020-10-14 16:03:25'),
(22,'Button seo','200px','200px','50px','50px','#aa0000',11,'left,right,top,bottom','solid','1px','#ff0000','0px','0px',NULL,NULL,NULL,NULL,NULL,NULL,'2020-10-16 01:43:40','2020-10-16 03:24:57'),
(23,'menugroup1','100%',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0','0','0','0','0','0','0','0','2020-10-18 15:08:33','2020-10-18 18:15:15'),
(24,'menu button2','100px',NULL,'50px',NULL,NULL,19,NULL,NULL,NULL,NULL,'0px','0px',NULL,NULL,NULL,NULL,NULL,NULL,'2020-10-18 15:29:41','2020-10-18 15:32:15'),
(25,'Menu Button Setting 1','100px',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'20px','0','0','0','0','0','0','0','2020-10-18 18:13:01','2020-10-18 19:54:30'),
(26,'Menu Button Setting 2','90px',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'20px','0','0','0','0','0','0','0','2020-10-18 18:21:33','2020-10-18 20:06:55');

/*Table structure for table `module_seo` */

DROP TABLE IF EXISTS `module_seo`;

CREATE TABLE `module_seo` (
  `seoId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `internalName` varchar(128) NOT NULL,
  `slug` varchar(1024) NOT NULL,
  `featuredImageId` bigint(20) DEFAULT NULL,
  `title` varchar(1024) DEFAULT NULL,
  `description` varchar(4096) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`seoId`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

/*Data for the table `module_seo` */

insert  into `module_seo`(`seoId`,`internalName`,`slug`,`featuredImageId`,`title`,`description`,`createdAt`,`updatedAt`) values 
(7,'Homepage SEO','index',9,'Emocean Studios | Home','<p>Our emocean studios site is awesome.</p>','2020-09-09 11:32:45','2020-09-12 23:17:39'),
(8,'Homepage','home/test',9,'Emocean | Home','<p>Emocean studios is global company.</p>','2020-09-11 09:36:23','2020-09-12 23:17:47'),
(10,'Test seo','test-page',12,NULL,NULL,'2020-09-12 10:21:19','2020-09-12 23:17:43'),
(11,'asdf','',11,'null','null','2020-09-12 10:44:53','2020-09-13 04:42:03'),
(12,'Dummy Website Page 123','dummy-website-page',13,'Dummy Website Page 1','This is dummy test page 1','2020-09-13 18:54:05','2020-09-15 20:52:30'),
(13,'Test 123','bbb',19,'sdf','<p>sdf</p>','2020-09-15 05:10:07','2020-09-15 05:10:27'),
(19,'eberb','erberb',NULL,NULL,NULL,'2020-09-15 06:51:27','2020-09-15 06:51:27'),
(20,'vwvewd','sdvsdv',NULL,NULL,NULL,'2020-09-15 06:54:21','2020-09-15 06:54:21'),
(21,'cbvcvb','cvbcvb',NULL,NULL,NULL,'2020-09-15 06:56:24','2020-09-15 06:56:24'),
(22,'zxczxc','zxczxc',NULL,'asdfsadf','dfgdfgdgasdfasdf\nasdf\nsadfasdfsadf\nxcvxcvxcvxcvxcvxcvxcvxcv','2020-09-15 06:57:31','2020-09-15 07:35:41'),
(23,'My test12','mytest1',NULL,'My Test','','2020-09-15 06:58:14','2020-10-12 02:13:19'),
(26,'ttttt','tttt/vvv',NULL,NULL,NULL,'2020-10-12 02:13:42','2020-10-12 02:13:59');

/*Table structure for table `module_site_setting` */

DROP TABLE IF EXISTS `module_site_setting`;

CREATE TABLE `module_site_setting` (
  `siteSettingId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `internalName` varchar(1024) NOT NULL,
  `siteName` varchar(1024) DEFAULT NULL,
  `maxWidth` varchar(1024) DEFAULT NULL,
  `favicon` varchar(1024) DEFAULT NULL,
  `defaultLinkTextColor` varchar(7) DEFAULT NULL,
  `h1Font` varchar(50) DEFAULT NULL,
  `h1FontSize` varchar(10) DEFAULT NULL,
  `h1FontColor` varchar(7) NOT NULL DEFAULT '#000000',
  `h1FontFormat` varchar(100) DEFAULT NULL,
  `h1FontAlign` varchar(10) NOT NULL DEFAULT 'Left',
  `h1LineHeight` varchar(10) NOT NULL DEFAULT '140%',
  `h1LetterSpacing` int(1) NOT NULL DEFAULT 0,
  `h2Font` varchar(50) DEFAULT NULL,
  `h2FontSize` varchar(10) DEFAULT NULL,
  `h2FontColor` varchar(7) NOT NULL DEFAULT '#000000',
  `h2FontFormat` varchar(100) DEFAULT NULL,
  `h2FontAlign` varchar(10) NOT NULL DEFAULT 'Left',
  `h2LineHeight` varchar(10) NOT NULL DEFAULT '140%',
  `h2LetterSpacing` int(1) NOT NULL DEFAULT 0,
  `h3Font` varchar(50) DEFAULT NULL,
  `h3FontSize` varchar(10) DEFAULT NULL,
  `h3FontColor` varchar(7) NOT NULL DEFAULT '#000000',
  `h3FontFormat` varchar(100) DEFAULT NULL,
  `h3FontAlign` varchar(10) NOT NULL DEFAULT 'Left',
  `h3LineHeight` varchar(10) NOT NULL DEFAULT '140%',
  `h3LetterSpacing` int(1) NOT NULL DEFAULT 0,
  `h4Font` varchar(50) DEFAULT NULL,
  `h4FontSize` varchar(10) DEFAULT NULL,
  `h4FontColor` varchar(7) NOT NULL DEFAULT '#000000',
  `h4FontFormat` varchar(100) DEFAULT NULL,
  `h4FontAlign` varchar(10) NOT NULL DEFAULT 'Left',
  `h4LineHeight` varchar(10) NOT NULL DEFAULT '140%',
  `h4LetterSpacing` int(1) NOT NULL DEFAULT 0,
  `body1Font` varchar(50) DEFAULT NULL,
  `body1FontSize` varchar(10) DEFAULT NULL,
  `body1FontColor` varchar(7) NOT NULL DEFAULT '#000000',
  `body1FontFormat` varchar(100) DEFAULT NULL,
  `body1FontAlign` varchar(10) NOT NULL DEFAULT 'Left',
  `body1LineHeight` varchar(10) NOT NULL DEFAULT '140%',
  `body1LetterSpacing` int(1) NOT NULL DEFAULT 0,
  `body2Font` varchar(50) DEFAULT NULL,
  `body2FontSize` varchar(10) DEFAULT NULL,
  `body2FontColor` varchar(7) NOT NULL DEFAULT '#000000',
  `body2FontFormat` varchar(100) DEFAULT NULL,
  `body2FontAlign` varchar(10) NOT NULL DEFAULT 'Left',
  `body2LineHeight` varchar(10) NOT NULL DEFAULT '140%',
  `body2LetterSpacing` int(1) NOT NULL DEFAULT 0,
  `body3Font` varchar(50) DEFAULT NULL,
  `body3FontSize` varchar(10) DEFAULT NULL,
  `body3FontColor` varchar(7) NOT NULL DEFAULT '#000000',
  `body3FontFormat` varchar(10) DEFAULT NULL,
  `body3FontAlign` varchar(10) NOT NULL DEFAULT 'Left',
  `body3LineHeight` varchar(10) NOT NULL DEFAULT '140%',
  `body3LetterSpacing` int(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`siteSettingId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `module_site_setting` */

insert  into `module_site_setting`(`siteSettingId`,`internalName`,`siteName`,`maxWidth`,`favicon`,`defaultLinkTextColor`,`h1Font`,`h1FontSize`,`h1FontColor`,`h1FontFormat`,`h1FontAlign`,`h1LineHeight`,`h1LetterSpacing`,`h2Font`,`h2FontSize`,`h2FontColor`,`h2FontFormat`,`h2FontAlign`,`h2LineHeight`,`h2LetterSpacing`,`h3Font`,`h3FontSize`,`h3FontColor`,`h3FontFormat`,`h3FontAlign`,`h3LineHeight`,`h3LetterSpacing`,`h4Font`,`h4FontSize`,`h4FontColor`,`h4FontFormat`,`h4FontAlign`,`h4LineHeight`,`h4LetterSpacing`,`body1Font`,`body1FontSize`,`body1FontColor`,`body1FontFormat`,`body1FontAlign`,`body1LineHeight`,`body1LetterSpacing`,`body2Font`,`body2FontSize`,`body2FontColor`,`body2FontFormat`,`body2FontAlign`,`body2LineHeight`,`body2LetterSpacing`,`body3Font`,`body3FontSize`,`body3FontColor`,`body3FontFormat`,`body3FontAlign`,`body3LineHeight`,`body3LetterSpacing`,`createdAt`,`updatedAt`) values 
(1,'SiteSetting','SiteSetting','100%','website-image--1602617556086.ico','#000000','sans-serif','2.5rem','#000000','','left','140%',1,'sans-serif','2.0rem','#000000','bold,italic','left','140%',2,'sans-serif','1.75rem','#000000',',italic','left','140%',1,'sans-serif','1.5rem','#000000','bold','left','140%',1,'sans-serif','1.0rem','#000000','','right','140%',1,'sans-serif','1.25rem','#000000','','justify','140%',1,'sans-serif','0.75rem','#000000','','left','140%',1,'2020-10-12 00:00:00','2020-10-18 15:19:56');

/*Table structure for table `module_slide_show` */

DROP TABLE IF EXISTS `module_slide_show`;

CREATE TABLE `module_slide_show` (
  `slideShowId` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `internalName` varchar(1024) CHARACTER SET latin1 NOT NULL,
  `slideType` varchar(200) DEFAULT NULL,
  `padding` int(10) DEFAULT NULL,
  `toggleButton` varchar(200) DEFAULT NULL,
  `transitionEffect` varchar(200) CHARACTER SET latin1 DEFAULT NULL,
  `icon` varchar(4096) DEFAULT NULL,
  `multiimage` varchar(4096) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`slideShowId`)
) ENGINE=InnoDB AUTO_INCREMENT=192 DEFAULT CHARSET=utf8;

/*Data for the table `module_slide_show` */

insert  into `module_slide_show`(`slideShowId`,`internalName`,`slideType`,`padding`,`toggleButton`,`transitionEffect`,`icon`,`multiimage`,`createdAt`,`updatedAt`) values 
(191,'1','Multi Image',2,'image','Fly In Left','slide-show-image--1606077245955.jpg','slide-show-image--1606080301000.jpg,slide-show-image--1606080301007.png,slide-show-image--1606079635661.jpg,slide-show-image--1606077350361.jpg,slide-show-image--1606077245964.jpg,slide-show-image--1606077245969.jpg,slide-show-image--1606077245976.png','2020-11-22 12:34:06','2020-11-22 13:25:01');

/*Table structure for table `module_title_description` */

DROP TABLE IF EXISTS `module_title_description`;

CREATE TABLE `module_title_description` (
  `titleDescriptionId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `internalName` varchar(1024) NOT NULL,
  `settingId` bigint(20) DEFAULT NULL,
  `title` varchar(4096) DEFAULT NULL,
  `subhead` varchar(1024) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `ctaText` varchar(1024) DEFAULT NULL,
  `ctaLink` varchar(1024) DEFAULT NULL,
  `align` varchar(1024) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`titleDescriptionId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `module_title_description` */

insert  into `module_title_description`(`titleDescriptionId`,`internalName`,`settingId`,`title`,`subhead`,`description`,`ctaText`,`ctaLink`,`align`,`createdAt`,`updatedAt`) values 
(1,'Title Description 1',1,'This is title','subhead','Here is description text. Here is description text. Here is description text. Here is description text. Here is description text. Here is description text. ','Click here',NULL,'center','2020-09-04 08:01:30','2020-09-04 08:01:33'),
(2,'Page Setting Test 222',15,'This is test title','This is subhead','<p>This is description</p>','Learn more','/saf/sdf/sdf','left','2020-09-04 08:01:30','2020-09-12 12:58:50'),
(3,'Page Setting Test 9',1,'This is test title','This is subhead','This is description','/saf/sdf/sdf','/saf/sdf/sdf','left','2020-09-05 06:11:09','2020-09-05 06:11:09'),
(4,'Title1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2020-09-11 09:39:16','2020-09-11 09:39:16'),
(5,'Our features',15,'Appear In Google Search','Feature','<p><span style=\"color: rgb(55, 59, 66);\">5 billion searches are performed every single day! Yes 5&nbsp;BILLION, with a “B”, that’s&nbsp;BILLION&nbsp;and it’s not a typo!</span></p>','Read more','/dummy-test-page','left','2020-09-13 18:56:31','2020-09-15 20:04:42');

/*Table structure for table `module_website_image` */

DROP TABLE IF EXISTS `module_website_image`;

CREATE TABLE `module_website_image` (
  `websiteImageId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `internalName` varchar(1024) NOT NULL,
  `image` varchar(1024) DEFAULT NULL,
  `imageMobile` varchar(1024) DEFAULT NULL,
  `alt` varchar(4096) DEFAULT NULL,
  `caption` varchar(4096) DEFAULT NULL,
  `ctaLink` varchar(1024) DEFAULT NULL,
  `border` varchar(256) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `settingId` int(10) DEFAULT NULL,
  `borders` int(10) DEFAULT NULL,
  `borderStyle` varchar(255) DEFAULT NULL,
  `borderThickness` varchar(255) DEFAULT NULL,
  `borderColor` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`websiteImageId`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

/*Data for the table `module_website_image` */

insert  into `module_website_image`(`websiteImageId`,`internalName`,`image`,`imageMobile`,`alt`,`caption`,`ctaLink`,`border`,`createdAt`,`updatedAt`,`settingId`,`borders`,`borderStyle`,`borderThickness`,`borderColor`) values 
(28,'123','website-image--1606061900760.jpg','website-image--1606076878685.jpg',NULL,NULL,NULL,NULL,'2020-11-22 07:13:25','2020-11-22 12:27:58',NULL,NULL,NULL,NULL,NULL),
(29,'ujhi',NULL,NULL,NULL,NULL,NULL,NULL,'2020-11-22 07:50:53','2020-11-22 08:08:00',NULL,NULL,NULL,NULL,NULL);

/*Table structure for table `page` */

DROP TABLE IF EXISTS `page`;

CREATE TABLE `page` (
  `pageId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `internalName` varchar(128) NOT NULL,
  `seoId` bigint(20) DEFAULT NULL,
  `pageSettingId` bigint(20) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`pageId`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;

/*Data for the table `page` */

/*Table structure for table `page__modules` */

DROP TABLE IF EXISTS `page__modules`;

CREATE TABLE `page__modules` (
  `pageModuleId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `pageId` bigint(20) NOT NULL,
  `moduleName` varchar(128) NOT NULL,
  `moduleId` bigint(20) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`pageModuleId`)
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8;

/*Data for the table `page__modules` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
