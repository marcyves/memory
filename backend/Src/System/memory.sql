-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 10, 2021 at 08:26 PM
-- Server version: 5.7.30
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `memory`
--

-- --------------------------------------------------------

--
-- Table structure for table `wall_of_fame`
--

CREATE TABLE `wall_of_fame` (
  `id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `score` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `wall_of_fame`
--

INSERT INTO `wall_of_fame` (`id`, `name`, `score`) VALUES
(1, 'Marc', '00:50:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `wall_of_fame`
--
ALTER TABLE `wall_of_fame`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `wall_of_fame`
--
ALTER TABLE `wall_of_fame`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
