-- MySQL dump 10.15  Distrib 10.0.28-MariaDB, for debian-linux-gnueabihf (armv7l)
--
-- Host: WMS    Database: WMS
-- ------------------------------------------------------
-- Server version	10.0.28-MariaDB-2+b1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `commands`
--

DROP TABLE IF EXISTS `commands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `commands` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pressurePump` int(10) NOT NULL,
  `wellPump` int(10) NOT NULL,
  `wellValve` int(10) NOT NULL,
  `overRide` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commands`
--

LOCK TABLES `commands` WRITE;
/*!40000 ALTER TABLE `commands` DISABLE KEYS */;
INSERT INTO `commands` VALUES (1,0,0,0,0);
/*!40000 ALTER TABLE `commands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sensorValues`
--

DROP TABLE IF EXISTS `sensorValues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sensorValues` (
  `id` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Pressure` varchar(1000) NOT NULL,
  `WellTank` varchar(1000) NOT NULL,
  `warning1` int(10) NOT NULL,
  `warning2` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensorValues`
--

LOCK TABLES `sensorValues` WRITE;
/*!40000 ALTER TABLE `sensorValues` DISABLE KEYS */;
INSERT INTO `sensorValues` VALUES ('2022-05-30 10:46:26','23','1400',0,0),('2022-05-30 14:18:05','33','1500',0,0),('2022-05-30 14:18:16','33','1600',0,0),('2022-05-30 14:18:21','33','1700',0,0),('2022-05-30 14:18:29','33','1800',0,0),('2022-05-30 14:18:35','33','1900',0,0),('2022-05-30 14:18:42','33','2000',0,0),('2022-05-30 14:18:46','33','2100',0,0),('2022-05-30 14:18:51','33','2200',0,0),('2022-05-30 14:18:55','33','2300',0,0),('2022-05-30 14:19:00','33','2400',0,0),('2022-05-31 06:59:06','23','2500',0,0),('2022-05-31 06:59:25','23','2600',0,0),('2022-05-31 06:59:38','23','2700',0,0),('2022-05-31 07:06:17','23','2800',0,0),('2022-05-31 07:06:29','23','2900',0,0),('2022-05-31 07:06:47','23','3000',0,0),('2022-05-31 07:07:13','23','3100',0,0),('2022-05-31 07:07:21','23','3200',0,0),('2022-05-31 07:07:35','23','3300',0,0),('2022-05-31 07:07:52','23','3400',0,0),('2022-05-31 07:19:23','23','3500',0,0),('2022-05-31 07:19:37','23','3600',0,0),('2022-05-31 07:19:58','23','3700',0,0),('2022-05-31 07:42:11','23','2700',0,0),('2022-05-31 07:42:35','23','2600',0,0),('2022-05-31 07:48:11','23','2700',0,0),('2022-05-31 07:48:28','23','2800',0,0),('2022-05-31 07:51:14','23','2829',0,0),('2022-05-31 07:51:31','23','2840',0,0),('2022-05-31 07:51:45','23','2900',0,0),('2022-05-31 07:51:51','23','3000',0,0),('2022-05-31 07:51:55','23','3100',0,0),('2022-05-31 07:52:12','23','3200',0,0),('2022-05-31 08:00:09','23','3400',0,0),('2022-05-31 08:00:23','23','3200',0,0),('2022-05-31 08:00:39','23','3000',0,0),('2022-05-31 08:00:53','23','3500',0,0);
/*!40000 ALTER TABLE `sensorValues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(1000) NOT NULL,
  `password` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'uchizingwira@gmail.com','password');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-31 16:20:02
