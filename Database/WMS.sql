-- phpMyAdmin SQL Dump
-- version 4.6.6deb4+deb9u2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 06, 2022 at 09:27 AM
-- Server version: 10.1.48-MariaDB-0+deb9u2
-- PHP Version: 7.0.33-0+deb9u12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `WMS`
--

-- --------------------------------------------------------

--
-- Table structure for table `commands`
--

CREATE TABLE `commands` (
  `id` int(11) NOT NULL,
  `pressurePump` int(10) NOT NULL,
  `wellPump` int(10) NOT NULL,
  `wellValve` int(10) NOT NULL,
  `overRide` int(10) NOT NULL,
  `watertank_id` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `commands`
--

INSERT INTO `commands` (`id`, `pressurePump`, `wellPump`, `wellValve`, `overRide`, `watertank_id`) VALUES
(2, 0, 0, 0, 0, 1),
(3, 0, 0, 0, 0, 3);

-- --------------------------------------------------------

--
-- Table structure for table `sensorValues`
--

CREATE TABLE `sensorValues` (
  `id` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Pressure` varchar(1000) NOT NULL,
  `Volume` varchar(1000) NOT NULL,
  `warning1` int(10) NOT NULL,
  `warning2` int(10) NOT NULL,
  `watertank_id` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sensorValues`
--

INSERT INTO `sensorValues` (`id`, `Pressure`, `Volume`, `warning1`, `warning2`, `watertank_id`) VALUES
('2022-06-03 09:02:28', '45', '4500', 0, 0, 1),
('2022-06-03 09:51:16', '34', '4120.99', 0, 0, 1),
('2022-06-03 09:51:34', '34', '4112.68', 0, 0, 3);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(1000) DEFAULT NULL,
  `email` varchar(1000) NOT NULL,
  `password` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(3, 'admin', 'uchizingwira@gmail.com', '$2y$10$JlKrk34ZSyeIuckgAAPHve89NFyClrv2XQacIqV.ifRAYOoylU2RW');

-- --------------------------------------------------------

--
-- Table structure for table `water_tanks`
--

CREATE TABLE `water_tanks` (
  `watertank_id` int(11) UNSIGNED NOT NULL,
  `name` varchar(1000) NOT NULL,
  `location` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `water_tanks`
--

INSERT INTO `water_tanks` (`watertank_id`, `name`, `location`) VALUES
(1, 'Well Tank', 'GHII Training center'),
(3, 'Waterboard Tank', 'GHII Training center');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `commands`
--
ALTER TABLE `commands`
  ADD PRIMARY KEY (`id`),
  ADD KEY `watertank_id` (`watertank_id`);

--
-- Indexes for table `sensorValues`
--
ALTER TABLE `sensorValues`
  ADD PRIMARY KEY (`id`),
  ADD KEY `watertank_id` (`watertank_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `water_tanks`
--
ALTER TABLE `water_tanks`
  ADD PRIMARY KEY (`watertank_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `commands`
--
ALTER TABLE `commands`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `water_tanks`
--
ALTER TABLE `water_tanks`
  MODIFY `watertank_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `commands`
--
ALTER TABLE `commands`
  ADD CONSTRAINT `commands_ibfk_1` FOREIGN KEY (`watertank_id`) REFERENCES `water_tanks` (`watertank_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sensorValues`
--
ALTER TABLE `sensorValues`
  ADD CONSTRAINT `sensorValues_ibfk_1` FOREIGN KEY (`watertank_id`) REFERENCES `water_tanks` (`watertank_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
