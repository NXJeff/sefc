-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 26, 2014 at 11:20 PM
-- Server version: 5.5.27
-- PHP Version: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `sefc`
--

-- --------------------------------------------------------

--
-- Table structure for table `audio`
--

CREATE TABLE IF NOT EXISTS `audio` (
  `description` text,
  `uploaded_user` bigint(20) DEFAULT NULL,
  `source` varchar(20) DEFAULT NULL,
  `category` varchar(20) DEFAULT NULL,
  `language` varchar(20) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `speaker` varchar(20) NOT NULL DEFAULT '',
  `duration` varchar(10) DEFAULT NULL,
  `added_date` date DEFAULT NULL,
  `filesize` varchar(10) DEFAULT NULL,
  `play_count` bigint(20) NOT NULL DEFAULT '0',
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`title`,`speaker`),
  KEY `audio_title` (`title`),
  KEY `audio_speaker` (`speaker`),
  KEY `audio_play_count` (`play_count`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `audio`
--

INSERT INTO `audio` (`description`, `uploaded_user`, `source`, `category`, `language`, `title`, `speaker`, `duration`, `added_date`, `filesize`, `play_count`, `url`) VALUES
(NULL, NULL, NULL, NULL, 'CN', '不要处在安乐区', '陈添荣牧师', '57:09', '2014-03-09', '27433414', 0, '../content/Messages/chinese/201408/09-Mar-2014-Record-Sun-09-35-59.mp3'),
(NULL, NULL, NULL, NULL, 'CN', '举目观看', '陈方辉牧师', '59:02', '2014-02-09', '28337872', 0, '../content/Messages/chinese/201408/09-Feb-2014-Record-Sun-09-35-53.mp3'),
(NULL, NULL, NULL, NULL, 'CN', '做个得胜的人', '廖国华牧师', '40:51', '2014-04-27', '19613900', 0, '../content/Messages/chinese/201408/27-Apr-2014-Record-Sun-09-33-31.mp3'),
(NULL, NULL, NULL, NULL, 'CN', '同心合一，各尽其职，建立基督的身体', '余文发牧师', '70:05', '2014-01-19', '33642138', 0, '../content/Messages/chinese/201408/19-Jan-2014-Record-Sun-09-36-06.mp3'),
(NULL, NULL, NULL, NULL, 'CN', '听从神的话', '蔡永谦长老', '43:47', '2014-04-06', '21016386', 0, '../content/Messages/chinese/201408/06-Apr-2014-Record-Sun-09-46-19.mp3'),
(NULL, NULL, NULL, NULL, 'CN', '基督徒如何面对新的一年？', '王祖祥牧师', '45:32', '2014-01-26', '21857264', 0, '../content/Messages/chinese/201408/26-Jan-2014-Record-Sun-09-30-26.mp3'),
(NULL, NULL, NULL, NULL, 'CN', '学耶稣的样式', '王月昭牧师', '47:07', '2014-06-22', '22620835', 0, '../content/Messages/chinese/201408/22-Jun-2014-Record-Sun.mp3'),
(NULL, NULL, NULL, NULL, 'CN', '家', '黄志明牧师', '50:34', '2014-08-03', '24279250', 0, '../content/Messages/chinese/201408/03-Aug-2014-Record-Sun-09-39-56.mp3'),
(NULL, NULL, NULL, NULL, 'CN', '属神体系与属世体系', '黄彩群牧师', '58:25', '2014-04-13', '28045562', 0, '../content/Messages/chinese/201408/13-Apr-2014-Record-Sun-09-29-43.mp3'),
(NULL, NULL, NULL, NULL, 'CN', '带着盼望的祷告', '提摩太牧师', '44:40', '2014-02-02', '21445846', 0, '../content/Messages/chinese/201408/02-Feb-2014-Record-Sun-10-02-10.mp3'),
(NULL, NULL, NULL, NULL, 'CN', '当你来到尽头时', '朱明镜牧师', '54:27', '2014-03-30', '26139862', 0, '../content/Messages/chinese/201408/30-Mar-2014-Record-Sun-09-40-54.mp3'),
(NULL, NULL, NULL, NULL, 'CN', '成为一个正直的人', '杨兰心牧师', '53:09', '2014-06-29', '25514736', 0, '../content/Messages/chinese/201408/29-Jun-2014-Record-Sun-09-29-00.mp3'),
(NULL, NULL, NULL, NULL, 'CN', '成熟的基督徒，应该有的思想', '王生坚牧师', '45:21', '2014-07-06', '21771994', 0, '../content/Messages/chinese/201408/06-Jul-2014-Record-Sun-09-43-37.mp3'),
(NULL, NULL, NULL, NULL, 'CN', '我与宣教', '陈镇国牧师', '48:55', '2014-02-23', '23486464', 0, '../content/Messages/chinese/201408/23-Feb-2014-Record-Sun-09-36-59.mp3'),
(NULL, NULL, NULL, NULL, 'CN', '有问必答', '冯显光牧师', '41:09', '2014-05-04', '19758664', 0, '../content/Messages/chinese/201408/04-May-2014-Record-Sun-09-43-42.mp3'),
(NULL, NULL, NULL, NULL, 'CN', '活在苦难的日子的里面', '王惠光牧师', '51:40', '2014-07-20', '24807412', 0, '../content/Messages/chinese/201408/20-Jul-2014-Record-Sun-09-36-37.mp3'),
(NULL, NULL, NULL, NULL, 'CN', '爱 (歌唱与分享)', '雷圣雄弟兄', '44:18', '2014-02-16', '21268154', 0, '../content/Messages/chinese/201408/16-Feb-2014-Record-Sun-09-34-07.mp3'),
(NULL, NULL, NULL, NULL, 'CN', '神依然向我们说话', '李全丰牧师', '60:27', '2014-05-25', '29016960', 0, '../content/Messages/chinese/201408/25-May-2014-Record-Sun-09-28-50.mp3'),
(NULL, NULL, NULL, NULL, 'CN', '神是叫我们抬起头的', '王月昭牧师', '37:27', '2014-03-02', '17977081', 0, '../content/Messages/chinese/201408/02-Mar-2014-Record-Sun-09-50-38.mp3'),
(NULL, NULL, NULL, NULL, 'CN', '神有应许之地为你预备', '王月昭牧师', '58:11', '2014-01-12', '27935356', 0, '../content/Messages/chinese/201408/12-Jan-2014-Record-Sun-09-30-07.mp3'),
(NULL, NULL, NULL, NULL, 'CN', '神的帮助', '王文辉牧师', '39:17', '2014-03-16', '18863632', 0, '../content/Messages/chinese/201408/16-Mar-2014-Record-Sun-09-38-00.mp3'),
(NULL, NULL, NULL, NULL, 'CN', '神的话大有能力', '王月昭牧师', '52:43', '2014-07-13', '25307518', 0, '../content/Messages/chinese/201408/13-Jul-2014-Record-Sun-09-39-10.mp3'),
(NULL, NULL, NULL, NULL, 'CN', '神的道', '张志贤牧师', '47:43', '2014-05-11', '22911854', 0, '../content/Messages/chinese/201408/11-May-2014-Record-Sun-09-32-32.mp3'),
(NULL, NULL, NULL, NULL, 'CN', '耶稣受死的意义', '秦泉维牧师', '47:28', '2014-04-20', '22785886', 0, '../content/Messages/chinese/201408/20-Apr-2014-Record-Sun-09-35-20.mp3'),
(NULL, NULL, NULL, NULL, 'CN', '胜过恐惧和忧虑', '王月昭牧师', '41:16', '2014-07-27', '19813438', 0, '../content/Messages/chinese/201408/27-Jul-2014-Record-Sun-09-34-25.mp3'),
(NULL, NULL, NULL, NULL, 'CN', '认识神', '饶康健牧师', '53:38', '2014-05-18', '25751054', 0, '../content/Messages/chinese/201408/18-May-2014-Record-Sun-09-28-33.mp3'),
(NULL, NULL, NULL, NULL, 'CN', '齐开步伐，同心建造', '陈在清长老', '37:37', '2014-03-23', '18063794', 0, '../content/Messages/chinese/201408/23-Mar-2014-Record-Sun-09-32-13.mp3');

-- --------------------------------------------------------

--
-- Table structure for table `speakers`
--

CREATE TABLE IF NOT EXISTS `speakers` (
  `language` varchar(20) CHARACTER SET utf8 NOT NULL,
  `name` varchar(20) CHARACTER SET utf8 NOT NULL,
  `other_name` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `contacts` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `image_url` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `other_image_urls` text CHARACTER SET utf8,
  `view_count` bigint(20) DEFAULT NULL,
  `description` text CHARACTER SET utf8,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `speakers`
--

INSERT INTO `speakers` (`language`, `name`, `other_name`, `contacts`, `image_url`, `other_image_urls`, `view_count`, `description`) VALUES
('CN', '余文发牧师', NULL, NULL, NULL, NULL, NULL, NULL),
('CN', '冯显光牧师', NULL, NULL, NULL, NULL, NULL, NULL),
('CN', '廖国华牧师', NULL, NULL, NULL, NULL, NULL, NULL),
('CN', '张志贤牧师', NULL, NULL, NULL, NULL, NULL, NULL),
('CN', '提摩太牧师', NULL, NULL, NULL, NULL, NULL, NULL),
('CN', '朱明镜牧师', NULL, NULL, NULL, NULL, NULL, NULL),
('CN', '李全丰牧师', NULL, NULL, NULL, NULL, NULL, NULL),
('CN', '杨兰心牧师', NULL, NULL, NULL, NULL, NULL, NULL),
('CN', '王惠光牧师', NULL, NULL, NULL, NULL, NULL, NULL),
('CN', '王文辉牧师', NULL, NULL, NULL, NULL, NULL, NULL),
('CN', '王月昭牧师', NULL, NULL, NULL, NULL, NULL, NULL),
('CN', '王生坚牧师', NULL, NULL, NULL, NULL, NULL, NULL),
('CN', '王祖祥牧师', NULL, NULL, NULL, NULL, NULL, NULL),
('CN', '秦泉维牧师', NULL, NULL, NULL, NULL, NULL, NULL),
('CN', '蔡永谦长老', NULL, NULL, NULL, NULL, NULL, NULL),
('CN', '陈在清长老', NULL, NULL, NULL, NULL, NULL, NULL),
('CN', '陈方辉牧师', NULL, NULL, NULL, NULL, NULL, NULL),
('CN', '陈添荣牧师', NULL, NULL, NULL, NULL, NULL, NULL),
('CN', '陈镇国牧师', NULL, NULL, NULL, NULL, NULL, NULL),
('CN', '雷圣雄弟兄', NULL, NULL, NULL, NULL, NULL, NULL),
('CN', '饶康健牧师', NULL, NULL, NULL, NULL, NULL, NULL),
('CN', '黄彩群牧师', NULL, NULL, NULL, NULL, NULL, NULL),
('CN', '黄志明牧师', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `login` varchar(20) NOT NULL,
  `password` text NOT NULL,
  `email` varchar(50) NOT NULL,
  `fullname` varchar(50) DEFAULT NULL,
  `contact` varchar(50) DEFAULT NULL,
  `role` varchar(20) NOT NULL,
  `status` char(1) NOT NULL,
  `preferences` text NOT NULL,
  PRIMARY KEY (`login`),
  UNIQUE KEY `user_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`login`, `password`, `email`, `fullname`, `contact`, `role`, `status`, `preferences`) VALUES
('Test', '1234', 'test@test.com', 'Test 123', '123456', 'U', 'P', '');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
