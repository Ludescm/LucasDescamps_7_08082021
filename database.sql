
-- Suppression des tables avant ajout --

DROP TABLE users;
DROP TABLE messages;
DROP TABLE comments;


-- Creation Table Users --
CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `isAdmin` INT NULL DEFAULT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email` (`email` ASC) INVISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- Creation Table Messages --

CREATE TABLE `messages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `message` VARCHAR(255) NOT NULL,
  `messageUrl` VARCHAR(255) NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  `UserId` INT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_UserId` (`userId`),
  CONSTRAINT `fk_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- Creation Table Comments --

CREATE TABLE `comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `comment` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  `UserId` INT NULL,
  `CommentId` INT NULL,
  `MessageId` INT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comments_MessageId` (`MessageId`),
  KEY `fk_comments_UserId` (`UserId`),
  KEY `fk_comments_CommentId` (`CommentId`),
  CONSTRAINT `fk_comments_MessageId` FOREIGN KEY (`MessageId`) REFERENCES `messages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_comments_UserId` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_comments_CommentId` FOREIGN KEY (`CommentId`) REFERENCES `comments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;