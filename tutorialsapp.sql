-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Сен 05 2020 г., 17:26
-- Версия сервера: 10.4.11-MariaDB
-- Версия PHP: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `tutorialsapp`
--

-- --------------------------------------------------------

--
-- Структура таблицы `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `text` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tutorialId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `comments`
--

INSERT INTO `comments` (`id`, `text`, `tutorialId`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, 'Exercitationem in ab amet laboriosam voluptatem debitis quia nulla alias. In officiis id asperiores. Itaque cumque rerum voluptatem dolore consectetur quibusdam tempore. Velit occaecati molestiae voluptas aliquid quo molestias laborum et. Nihil fugiat occ', 1, 7, '2020-09-05 15:25:41', '2020-09-05 15:25:41'),
(2, 'Aut qui cum dolor. In laborum sunt. Voluptatem eaque explicabo architecto non iste dolor. Voluptas excepturi expedita quam nihil sit. Exercitationem quod architecto maiores cupiditate dolores sunt sint. Sunt esse id sint similique praesentium ex.', 2, 8, '2020-09-05 15:25:41', '2020-09-05 15:25:41'),
(3, 'Qui tempora ducimus explicabo. Quibusdam ea corporis ea est aspernatur blanditiis. Natus aut cum id laboriosam facilis.', 3, 9, '2020-09-05 15:25:41', '2020-09-05 15:25:41'),
(4, 'Ipsam et illum totam dolorum qui distinctio in et provident. Quis enim eos ducimus aliquid. Vel autem eius sit. Ad non qui fugiat tempore cum corporis.', 4, 10, '2020-09-05 15:25:41', '2020-09-05 15:25:41'),
(5, 'Repellendus est minus eos dolor ut eum autem inventore. Delectus odit sit debitis aliquid sequi voluptatibus odit. Sed illo repudiandae a est est quasi. Laudantium quod et explicabo facere quo aspernatur dolores quos. Ut eligendi molestiae qui commodi qui', 5, 11, '2020-09-05 15:25:41', '2020-09-05 15:25:41'),
(6, 'Illum odio eum. Ullam qui ad doloribus voluptas eum vero et vel. Aperiam exercitationem ducimus et corporis quaerat nemo unde ea est. Temporibus qui earum. Dolor deleniti eum velit iusto ut aut sit. Nihil id molestiae.', 6, 12, '2020-09-05 15:25:41', '2020-09-05 15:25:41'),
(7, 'Et molestiae repellendus reiciendis vitae laborum numquam temporibus. Explicabo nihil cum est deleniti harum aut. Optio nisi atque adipisci id atque quod. Praesentium aut nemo. Libero est porro ducimus autem possimus voluptatum molestiae libero.', 7, 13, '2020-09-05 15:25:41', '2020-09-05 15:25:41'),
(8, 'Qui omnis tempore quam aut distinctio. Id aut itaque magnam enim qui qui. Placeat deserunt veniam eum voluptatem cupiditate. Consequuntur ipsam et blanditiis consequuntur assumenda similique aut. Ducimus corporis eveniet qui saepe magnam. Molestias odio i', 8, 14, '2020-09-05 15:25:41', '2020-09-05 15:25:41'),
(9, 'A voluptas et sunt omnis ducimus molestiae. Ut aliquid quia cupiditate odio vel modi magnam amet. Quidem voluptatem consequatur fugiat.', 9, 15, '2020-09-05 15:25:41', '2020-09-05 15:25:41'),
(10, 'Amet sit labore quaerat perferendis aut. Doloremque culpa et eum non itaque quia. Voluptate ut et nobis. Velit vel officiis qui accusamus blanditiis vero. Quidem sed ex sit ut repudiandae quas debitis facere totam.', 10, 16, '2020-09-05 15:25:41', '2020-09-05 15:25:41'),
(11, 'Odit nihil est omnis dolor culpa porro qui. Possimus temporibus natus ullam aut voluptatem. Sit sunt vel inventore quae perspiciatis. Quae ex distinctio excepturi nobis veniam.', 3, 7, '2020-09-05 15:25:41', '2020-09-05 15:25:41'),
(12, 'Rerum nobis cumque occaecati quae molestiae aliquam et. Veniam impedit sapiente quisquam eveniet dicta sit. Ab qui est aliquam saepe. Ratione nesciunt ipsam deserunt voluptatem quibusdam eveniet molestiae harum ipsam. Quo velit vel in placeat et asperiore', 4, 8, '2020-09-05 15:25:41', '2020-09-05 15:25:41'),
(13, 'Reiciendis ut veritatis ipsum mollitia aliquam nemo natus eum. Est cupiditate neque autem blanditiis iste. Dignissimos architecto beatae et sit odio sit nihil voluptatem. Dolorem reprehenderit quibusdam et in sunt non non dolore eos. Ipsum tenetur minima ', 5, 9, '2020-09-05 15:25:41', '2020-09-05 15:25:41'),
(14, 'Rerum voluptatibus error porro. Sit et eos et enim nihil et vel dicta nam. Non nam omnis nihil id harum beatae et ut voluptatum. Delectus quia corrupti autem et voluptatem voluptas.', 6, 10, '2020-09-05 15:25:41', '2020-09-05 15:25:41'),
(15, 'Iste dolorem iure esse laboriosam aut quia eaque modi vero. Et magnam consequatur sed tempora magni repudiandae iure aut. Qui architecto ut. Veritatis quasi aut. Ratione eius ullam aut illum quia repellat.', 7, 11, '2020-09-05 15:25:41', '2020-09-05 15:25:41'),
(16, 'Voluptatum pariatur voluptatem ut et et et unde aperiam. Nesciunt voluptas sint. Necessitatibus harum autem ut. Quia veniam iusto hic ut rerum enim alias recusandae et. Minus voluptatibus rerum modi quo in.', 8, 12, '2020-09-05 15:25:41', '2020-09-05 15:25:41'),
(17, 'Voluptatem eos quaerat. Qui sapiente est deserunt. Tempore voluptatibus suscipit quae. Molestiae eum magnam qui voluptatem doloremque aliquid sapiente qui.', 9, 13, '2020-09-05 15:25:41', '2020-09-05 15:25:41');

-- --------------------------------------------------------

--
-- Структура таблицы `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `roles`
--

INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', '2020-09-05 15:25:40', '2020-09-05 15:25:40'),
(2, 'author', '2020-09-05 15:25:40', '2020-09-05 15:25:40'),
(3, 'user', '2020-09-05 15:25:40', '2020-09-05 15:25:40');

-- --------------------------------------------------------

--
-- Структура таблицы `tutorials`
--

CREATE TABLE `tutorials` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `published` tinyint(1) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `tutorials`
--

INSERT INTO `tutorials` (`id`, `title`, `description`, `published`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, 'Expedita similique praesentium ea quod numquam laborum assumenda quidem pariatur.', 'Omnis eveniet dolorem et voluptatem neque asperiores vitae iure. Corporis quis pariatur voluptas itaque aperiam aliquid. Cumque asperiores ipsam reiciendis assumenda rerum eveniet.\n \rVoluptate non ab hic asperiores dolorem et provident repudiandae. Ducimu', 1, 2, '2020-09-05 15:25:41', '2020-09-05 15:25:41'),
(2, 'Omnis odio voluptas molestiae.', 'Illum aut soluta iste libero voluptatibus cupiditate. Quia voluptas nihil ' ||
 'similique corporis consequuntur autem iure. Enim quasi dolore debitis culpa corporis.\n \rNihil aut qui molestias quisquam. Temporibus beatae quis velit. Blanditiis dolorum voluptate ', 1, 3, '2020-09-05 15:25:41', '2020-09-05 15:25:41'),
(3, 'Quibusdam asperiores officia et eligendi.', 'Provident cum temporibus corrupti. Inventore nisi non eos suscipit. Voluptas consequatur aspernatur corrupti ea voluptatem ut. Nihil deserunt sed velit quasi odio. Rerum quibusdam atque deleniti quia eum ducimus distinctio voluptates ipsam. Hic voluptas q', 1, 4, '2020-09-05 15:25:41', '2020-09-05 15:25:41'),
(4, 'Aspernatur aut modi repudiandae accusantium modi.', 'Ea ut qui. Quia exercitationem eveniet recusandae ' ||
 'architecto vel sunt excepturi. Doloremque impedit aut. Aut consequatur veniam occaecati. Quam molestiae ipsum. Delectus minima facere ut et vero modi iusto.\n \rNihil doloribus sequi reiciendis. Praesentium ', 1, 5, '2020-09-05 15:25:41', '2020-09-05 15:25:41'),
(5, 'Ut assumenda nihil.', 'Delectus aliquam dolorem quis et eum sunt. Illo quidem dolore accusantium nisi totam ' ||
 'ullam ut sed rerum. Libero dignissimos sed et. Rerum laboriosam voluptas et omnis quia dignissimos minus non. Iste neque et ut voluptas in quo magnam.\n \rHic accusantium a', 1, 6, '2020-09-05 15:25:41', '2020-09-05 15:25:41'),
(6, 'Vero saepe sequi ullam ut velit et doloremque.', 'Quia assumenda quis laborum aut. Et est quasi vel modi excepturi blanditiis. Id a ratione eius est impedit saepe. Est non necessitatibus distinctio quia voluptatem commodi dolores et perferendis.\n \rAut voluptates corporis est quisquam sapiente culpa quaer', 1, 2, '2020-09-05 15:25:41', '2020-09-05 15:25:41'),
(7, 'Voluptas aut sunt est repellendus explicabo occaecati harum repudiandae.', 'Modi natus optio omnis voluptas sed voluptatibus mollitia alias. Atque distinctio minima vero. Rerum est molestias distinctio itaque porro autem alias.\n \rVoluptatum illo vel deleniti hic consectetur optio. Iusto blanditiis est similique quasi ut tempora. ', 0, 3, '2020-09-05 15:25:41', '2020-09-05 15:25:41'),
(8, 'Veritatis unde vitae ut occaecati illum consequatur.', 'Et labore laudantium corrupti ex. Fugit quos fuga aut. Harum est quos itaque esse et non et. Inventore quod dolores modi.\n \rNon ut omnis hic nihil. Sed reiciendis doloribus rem tempora est doloremque quo repellat molestias. Ea sunt voluptatum. Dolorem con', 1, 4, '2020-09-05 15:25:41', '2020-09-05 15:25:41'),
(9, 'Eum optio sit architecto tempore error ab deserunt ad est.', 'Cum facere quis blanditiis consectetur amet ipsum ' ||
 'non animi. Amet saepe laborum neque eum et. Quibusdam debitis vitae ea ipsum et. Dolores nam culpa labore provident ut saepe consequatur. Possimus vel nemo et minus. Nobis quis nihil nobis cum ut ut iusto ', 1, 5, '2020-09-05 15:25:41', '2020-09-05 15:25:41'),
(10, 'Eveniet autem sit.', 'Sit et adipisci tempora explicabo sequi. Dolores tempore sint. In neque vitae perferendis' ||
 ' sed eius odit ipsa. Sint nesciunt cupiditate reprehenderit excepturi dolorum eaque iure consequatur. Rerum debitis debitis consequatur ad est.\n \rQuisquam libero illu', 1, 6, '2020-09-05 15:25:41', '2020-09-05 15:25:41');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roleId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `roleId`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin', 'admin@gmail.com', '$2a$08$jWYrP.ssQ3ADqBccBH91GeNchqELnmYGue3Ylqp8PZNSti4DW5kF6', 1, '2020-09-05 15:25:40', '2020-09-05 15:25:40'),
(2, 'Author', 'author@gmail.com', '$2a$08$nHFWQ12Ar64edxfKNFipqeNiGU0EWkhN6CjIgwQe.YglYjbj6gvqy', 2, '2020-09-05 15:25:40', '2020-09-05 15:25:40'),
(3, 'Warren Hoppe', 'Shanon_Leffler@yahoo.com', '$2a$08$b8pHeT4eP0pr1RNGRbBdkewrbF9InJpHkb1NdBoKnJJDOXeV0quKu', 2, '2020-09-05 15:25:40', '2020-09-05 15:25:40'),
(4, 'Madisyn Moen', 'Effie39@yahoo.com', '$2a$08$ItvjIof9O9ZF40bq473jYuk24Sk..o7TFqngmseo228ydVwDUTkXW', 2, '2020-09-05 15:25:40', '2020-09-05 15:25:40'),
(5, 'Melvina Wiegand', 'Nels56@gmail.com', '$2a$08$tktC75lbqrpJWbOhcfRCLej/biAs8wnRts85qOKgyov2UcEpvqXP2', 2, '2020-09-05 15:25:40', '2020-09-05 15:25:40'),
(6, 'Valentin Watsica', 'Abbie_Schimmel@yahoo.com', '$2a$08$qrCQ9FW9Ytgjrd.ODmUy2OC/3lR/NkwrX1AbJXWiZWiH7KZhuIlWO', 2, '2020-09-05 15:25:40', '2020-09-05 15:25:40'),
(7, 'User', 'user@gmail.com', '$2a$08$dccJ5nUHNJuccWtARlisV.dM9QNsgOUpw2EMLtAnrTlwMfTKPwaxy', 3, '2020-09-05 15:25:40', '2020-09-05 15:25:40'),
(8, 'Sierra Schmitt', 'Dave.Halvorson73@hotmail.com', '$2a$08$YiRICUgp4iLUZiCuEiAoOeXAxV3MKM6VwH8JjFb5W2MtNYFIXLYHu', 3, '2020-09-05 15:25:41', '2020-09-05 15:25:41'),
(9, 'Jordon Osinski', 'Nathanael.Morissette@gmail.com', '$2a$08$VwmerbS2GNMNIJu3M9G0yOgFI2rYd2.U3fk/S.wK5RDePfY0AirT2', 3, '2020-09-05 15:25:41', '2020-09-05 15:25:41'),
(10, 'Dejuan Wyman', 'Chauncey.Thompson@hotmail.com', '$2a$08$xBqoN51WhQbXk1kECjKcEufJKQACTE/nTh.P7h3cDGlo7xTAF.Lv.', 3, '2020-09-05 15:25:41', '2020-09-05 15:25:41'),
(11, 'Amparo Friesen', 'Cordell40@gmail.com', '$2a$08$CnhJSQdMVe9nY75/zjnNoegKc.VMrchO9hzOXp5cDEnahHO6Hxzke', 3, '2020-09-05 15:25:41', '2020-09-05 15:25:41'),
(12, 'Mr. Giles McLaughlin', 'Jason_Bergnaum3@hotmail.com', '$2a$08$NsV0WFjri.DXIkwPgOWLfenw9RhIb77oMPNot1BCpy//XZ31xb2Pm', 3, '2020-09-05 15:25:41', '2020-09-05 15:25:41'),
(13, 'Rosalyn Doyle', 'Benton3@gmail.com', '$2a$08$lkhooiQuGaH4xuvRDcQxEuZUzMwVVXEx9UOGAI.cxK3cEbnSMCWjy', 3, '2020-09-05 15:25:41', '2020-09-05 15:25:41'),
(14, 'Daniella Pfeffer', 'Nellie24@hotmail.com', '$2a$08$pgyvoaZ6aGxoietTJN6HZuZsOm/H3YCULok0AfF1BFDTd0pJIhFUK', 3, '2020-09-05 15:25:41', '2020-09-05 15:25:41'),
(15, 'Eloisa DuBuque', 'Shaina_Gleason44@hotmail.com', '$2a$08$E.U9FPulOoX69dobRL09s.zaoTBqwdLp7CiaRG0j7Zhyrv4nqeMUW', 3, '2020-09-05 15:25:41', '2020-09-05 15:25:41'),
(16, 'Thelma Ratke', 'Wilhelmine_Dach0@gmail.com', '$2a$08$pNS9x6YW.X1HrWXcIIY2hugdS3VTE.nRNohxqRdvm7LsSJzCMgzXK', 3, '2020-09-05 15:25:41', '2020-09-05 15:25:41');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tutorialId` (`tutorialId`),
  ADD KEY `userId` (`userId`);

--
-- Индексы таблицы `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `tutorials`
--
ALTER TABLE `tutorials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roleId` (`roleId`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT для таблицы `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `tutorials`
--
ALTER TABLE `tutorials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`tutorialId`) REFERENCES `tutorials` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `tutorials`
--
ALTER TABLE `tutorials`
  ADD CONSTRAINT `tutorials_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
