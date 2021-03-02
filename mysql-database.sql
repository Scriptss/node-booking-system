-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 02, 2021 at 09:01 AM
-- Server version: 5.7.33-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `freedbtech_theidol`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_bookings`
--

CREATE TABLE `tbl_bookings` (
  `ID` int(11) NOT NULL,
  `surname` varchar(250) NOT NULL,
  `phoneNumber` varchar(250) NOT NULL,
  `partySize` int(11) NOT NULL,
  `bookingDate` date NOT NULL,
  `tableNumber` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_bookings`
--

INSERT INTO `tbl_bookings` (`ID`, `surname`, `phoneNumber`, `partySize`, `bookingDate`, `tableNumber`) VALUES
(2, 'John', '12345', 4, '2021-12-04', 2),
(3, 'John', '12345', 4, '2021-12-04', 3),
(4, 'John', '12345', 4, '2021-12-04', 4),
(6, 'John', '12345', 4, '2021-12-04', 5),
(7, 'adam', '9876', 2, '2021-12-05', 1),
(8, 'julie', '7681', 3, '2021-12-05', 2),
(9, 'sam', '0747642423423', 4, '2021-12-05', 3),
(10, 'adrian', '0747642423423', 2, '2021-12-05', 4),
(11, 'karen', '543345345', 3, '2021-12-05', 5),
(12, 'smith', '23424234', 1, '2021-12-06', 1),
(13, 'dfgdg', 'dfgdfg', 3, '2021-03-04', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_tables`
--

CREATE TABLE `tbl_tables` (
  `ID` int(11) NOT NULL,
  `tableNumber` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_tables`
--

INSERT INTO `tbl_tables` (`ID`, `tableNumber`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_bookings`
--
ALTER TABLE `tbl_bookings`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tbl_tables`
--
ALTER TABLE `tbl_tables`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_bookings`
--
ALTER TABLE `tbl_bookings`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `tbl_tables`
--
ALTER TABLE `tbl_tables`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
