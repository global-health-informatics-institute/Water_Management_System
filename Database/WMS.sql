-- phpMyAdmin SQL Dump
-- version 4.6.6deb4+deb9u2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 02, 2022 at 03:10 PM
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
  `waterPump` int(10) NOT NULL,
  `outletValve` int(10) NOT NULL,
  `inletValve` int(10) NOT NULL,
  `overRide` int(10) NOT NULL,
  `watertank_id` int(11) UNSIGNED NOT NULL,
  `OpCode` int(2) NOT NULL,
  `reset` int(2) NOT NULL,
  `toggle_pressure` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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

-- --------------------------------------------------------

--
-- Table structure for table `water_tanks`
--

CREATE TABLE `water_tanks` (
  `watertank_id` int(11) UNSIGNED NOT NULL,
  `name` varchar(1000) NOT NULL,
  `capacity` int(10) NOT NULL,
  `location` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `water_tanks`
--
ALTER TABLE `water_tanks`
  MODIFY `watertank_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
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
