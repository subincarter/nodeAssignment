-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 18, 2023 at 05:15 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodeassignment`
--

-- --------------------------------------------------------

--
-- Table structure for table `feed`
--

CREATE TABLE `feed` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `url` varchar(100) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `admin_user_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feed`
--

INSERT INTO `feed` (`id`, `name`, `url`, `description`, `admin_user_id`, `user_id`) VALUES
(6, 'Feeds 1', 'fedd.url.in', 'csancscaskclas cslacalcksalcsa casclsakcsac', NULL, 9),
(7, 'Feeds 2', 'fedd.url.in', 'csancscaskclas cslacalcksalcsa casclsakcsac', 14, 9),
(9, 'Feeds 3', 'fedd.url.in', 'csancscaskclas cslacalcksalcsa casclsakcsac', NULL, NULL),
(10, 'Feeds 3', 'fedd.url.in', 'csancscaskclas cslacalcksalcsa casclsakcsac', NULL, NULL),
(11, 'Feeds 3', 'fedd.url.in', 'csancscaskclas cslacalcksalcsa casclsakcsac', NULL, NULL),
(12, 'Feeds 3', 'fedd.url.in', 'csancscaskclas cslacalcksalcsa casclsakcsac', NULL, NULL),
(13, 'Feeds 3', 'fedd.url.in', 'csancscaskclas cslacalcksalcsa casclsakcsac', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `role` varchar(100) NOT NULL,
  `access` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`access`)),
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `token` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `role`, `access`, `email`, `password`, `token`) VALUES
(9, 'user', 'user', '{\"access\":[\"read\"]}', 'user@gmail.com', '$2b$10$/ZkHtUT.Juf6BvN8CdPN6ueruuTVbPN1OQnOj84/RtX4XbokyBg/G', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidXNlciIsInJvbGUiOiJ1c2VyIiwiYWNjZXNzIjoie1wiYWNjZXNzXCI6W1wicmVhZFwiXX0iLCJ1c2VySUQiOjksImlhdCI6MTY4NzA3MTQzMX0.oXxJD6j1XU_9CrjLqti3jcSnCYBeikLRkCQ7mxxim8Y'),
(11, 'superadmin', 'superadmin', '{\"access\":[\"update\",\"delete\",\"read\"]}', 'superadmin@gmail.com', '$2b$10$h.e92xCmqDnworEh7zmNGOjPMV/oDBNa3E5eo0GZtuh05H6TpEuVi', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic3VwZXJhZG1pbiIsInJvbGUiOiJzdXBlcmFkbWluIiwiYWNjZXNzIjoie1wiYWNjZXNzXCI6W1wiZWRpdFwiLFwiZGVsZXRlXCIsXCJyZWFkXCJdfSIsInVzZXJJRCI6MTEsImlhdCI6MTY4NzA3MTI3Mn0.xvKupnWdXvyUpJgalI_SfWnDqWzw-KgqVd-0YbQklYo'),
(14, 'admin', 'admin', '{\"access\":[\"read\",\"allocate\"]}', 'user@gmail.com', '$2b$10$GUfOkh6ZdKkpUfn8rFIMh.8vaMbIJrqVhSYGMoJleD02G.JaHjCu2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJhY2Nlc3MiOiJ7XCJhY2Nlc3NcIjpbXCJyZWFkXCIsXCJhbGxvY2F0ZVwiXX0iLCJ1c2VySUQiOjE0LCJpYXQiOjE2ODcwNjk1MDN9.H33f8JzBcdKYa_rJpO6X9b8QfocVu7fOC3cqMBh2XF0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `feed`
--
ALTER TABLE `feed`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `feed`
--
ALTER TABLE `feed`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
