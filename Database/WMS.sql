-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 31, 2022 at 10:21 AM
-- Server version: 10.3.34-MariaDB-0+deb10u1
-- PHP Version: 7.3.31-1~deb10u1

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
  `id` timestamp NOT NULL DEFAULT current_timestamp(),
  `Pressure` varchar(1000) NOT NULL,
  `Volume` varchar(1000) NOT NULL,
  `warning1` int(10) NOT NULL,
  `warning2` int(10) NOT NULL,
  `watertank_id` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `well_id` int(11) NOT NULL,
  `Interval_on` int(11) NOT NULL,
  `Interval_off` int(11) NOT NULL,
  `image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `statistics`
--

CREATE TABLE `statistics` (
  `id` int(2) NOT NULL,
  `Total_consumption` int(10) NOT NULL,
  `Flow_rate` int(3) NOT NULL,
  `Record_count` int(11) NOT NULL,
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
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`well_id`);

--
-- Indexes for table `statistics`
--
ALTER TABLE `statistics`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `well_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `statistics`
--
ALTER TABLE `statistics`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `water_tanks`
--
ALTER TABLE `water_tanks`
  MODIFY `watertank_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
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

--
-- Constraints for table `statistics`
--
ALTER TABLE `statistics`
  ADD CONSTRAINT `statistics_ibfk_1` FOREIGN KEY (`watertank_id`) REFERENCES `water_tanks` (`watertank_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
