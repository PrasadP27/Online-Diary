--
-- Database: `online_diary`
--

-- --------------------------------------------------------

--
-- Table structure for table `diaries`
--

CREATE TABLE `diaries` (
  `diaryId` varchar(5) NOT NULL PRIMARY KEY,
  `userId` int(5) NOT NULL,
  `date` datetime NOT NULL,
  `heading` varchar(50) NOT NULL DEFAULT 'Heading...',
  `content` text DEFAULT 'Your entry here...',
  `tags` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


