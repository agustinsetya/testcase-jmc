-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 26, 2023 at 02:01 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `testcase-jmc`
--

-- --------------------------------------------------------

--
-- Table structure for table `mt_province`
--

CREATE TABLE `mt_province` (
  `mt_province_id` int(2) NOT NULL,
  `mt_province_name` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mt_province`
--

INSERT INTO `mt_province` (`mt_province_id`, `mt_province_name`, `created_at`, `updated_at`) VALUES
(1, 'Nanggroe Aceh Darussalam', '2023-07-25 10:45:10', '2023-07-25 10:45:10'),
(2, 'Sumatera Utara', '2023-07-25 10:45:10', '2023-07-25 10:45:10'),
(3, 'Sumatera Selatan', '2023-07-25 10:45:10', '2023-07-25 10:45:10'),
(4, 'Sumatera Barat', '2023-07-25 10:45:10', '2023-07-25 10:45:10'),
(5, 'Bengkulu', '2023-07-25 10:45:10', '2023-07-25 10:45:10'),
(6, 'Riau', '2023-07-25 10:45:10', '2023-07-25 10:45:10'),
(7, 'Kepulauan Riau', '2023-07-25 10:45:10', '2023-07-25 10:45:10'),
(8, 'Jambi', '2023-07-25 10:45:10', '2023-07-25 10:45:10'),
(9, 'Lampung', '2023-07-25 10:45:10', '2023-07-25 10:45:10'),
(10, 'Bangka Belitung', '2023-07-25 10:45:10', '2023-07-25 10:45:10'),
(11, 'Kalimantan Barat', '2023-07-25 10:45:10', '2023-07-25 10:45:10'),
(12, 'Kalimantan Timur', '2023-07-25 10:45:10', '2023-07-25 10:45:10'),
(13, 'Kalimantan Selatan', '2023-07-25 10:45:10', '2023-07-25 10:45:10'),
(14, 'Kalimantan Tengah', '2023-07-25 10:45:10', '2023-07-25 10:45:10'),
(15, 'Kalimantan Utara', '2023-07-25 10:45:10', '2023-07-25 10:45:10'),
(16, 'Banten', '2023-07-25 10:45:10', '2023-07-25 10:45:10'),
(17, 'DKI Jakarta', '2023-07-25 10:45:10', '2023-07-25 10:45:10'),
(18, 'Jawa Barat', '2023-07-25 10:45:10', '2023-07-25 10:45:10'),
(19, 'Jawa Tengah', '2023-07-25 10:45:10', '2023-07-25 10:45:10'),
(20, 'Daerah Istimewa Yogyakarta', '2023-07-25 10:45:10', '2023-07-25 10:45:10'),
(21, 'Jawa Timur', '2023-07-25 10:45:10', '2023-07-25 10:45:10'),
(22, 'Bali', '2023-07-25 10:45:10', '2023-07-25 12:57:50'),
(26, 'Nusa Tenggara Timur', '2023-07-25 23:16:04', '2023-07-25 23:16:04'),
(27, 'Nusa Tenggara Barat', '2023-07-25 23:16:20', '2023-07-25 23:16:20');

-- --------------------------------------------------------

--
-- Table structure for table `mt_regency`
--

CREATE TABLE `mt_regency` (
  `mt_regency_id` int(2) NOT NULL,
  `mt_province_id` int(2) NOT NULL,
  `mt_regency_name` varchar(100) NOT NULL,
  `total_population` int(10) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mt_regency`
--

INSERT INTO `mt_regency` (`mt_regency_id`, `mt_province_id`, `mt_regency_name`, `total_population`, `created_at`, `updated_at`) VALUES
(1, 21, 'Bangkalan', 1060377, '2023-07-25 10:38:06', '2023-07-25 10:38:06'),
(2, 21, 'Banyuwangi', 1708114, '2023-07-25 10:38:06', '2023-07-25 10:38:06'),
(3, 21, 'Blitar', 1223745, '2023-07-25 22:27:12', '2023-07-25 22:27:12'),
(4, 21, 'Kota Malang', 843810, '2023-07-25 22:27:12', '2023-07-25 22:27:12'),
(7, 14, 'Kotawaringin Timur', 428895, '2023-07-26 07:00:36', '2023-07-26 07:00:36'),
(8, 14, 'Kotawaringin Barat', 270388, '2023-07-26 07:00:36', '2023-07-26 07:00:36');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mt_province`
--
ALTER TABLE `mt_province`
  ADD PRIMARY KEY (`mt_province_id`);

--
-- Indexes for table `mt_regency`
--
ALTER TABLE `mt_regency`
  ADD PRIMARY KEY (`mt_regency_id`),
  ADD KEY `mt_province_id` (`mt_province_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `mt_province`
--
ALTER TABLE `mt_province`
  MODIFY `mt_province_id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `mt_regency`
--
ALTER TABLE `mt_regency`
  MODIFY `mt_regency_id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `mt_regency`
--
ALTER TABLE `mt_regency`
  ADD CONSTRAINT `mt_regency_ibfk_1` FOREIGN KEY (`mt_province_id`) REFERENCES `mt_province` (`mt_province_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
