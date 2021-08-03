-- reset et creation database --
DROP DATABASE IF EXISTS groupomania;
CREATE DATABASE IF NOT EXISTS groupomania CHARACTER SET utf8;
USE groupomania;

-- reset des tables au cas ou elles existeraient deja --
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS thumbs;

-- creation des tables --
-- USERS --
-- id, username, email, password, first_name, last_name et is_admin determine si le user est administrateur du site ou simple utilisateur

CREATE TABLE users (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    username VARCHAR(55) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(55) NOT NULL,
    first_name VARCHAR(55) NOT NULL,
    las_name VARCHAR(55) NOT NULL,
    is_admin TINYINT NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
) ENGINE = InnoDB;

-- ARTICLE --
-- id, titre, description, sujet (classement des posts), auteur, date du post, --
-- éventuellement lien vers le site web de l'article.--
CREATE TABLE articles (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    description TEXT,
    subject VARCHAR(255) NOT NULL,
    lien_web VARCHAR(255),
    user_id SMALLINT UNSIGNED NOT NULL,
    date_post DATE NOT NULL,
    PRIMARY KEY (id)
) ENGINE = InnoDB;

-- THUMBS --
-- like et dislikes donnés par les utilisateur --
CREATE TABLE thumbs (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id SMALLINT UNSIGNED NOT NULL,
    article_id SMALLINT UNSIGNED NOT NULL,
    thumb TINYINT DEFAULT 0,
    liked TINYINT UNSIGNED DEFAULT 0,
    disliked TINYINT UNSIGNED DEFAULT 0,
    PRIMARY KEY (id)
) ENGINE = InnoDB;

-- COMMENTAIRES --
-- id, titre et description, article et auteur associés. -- 
CREATE TABLE comments (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT, 
    cryptoslug VARCHAR(255) UNIQUE NOT NULL,
    content VARCHAR(255) UNIQUE NOT NULL,
    user_id SMALLINT UNSIGNED NOT NULL,
    article_id SMALLINT UNSIGNED NOT NULL,
    date_post DATE NOT NULL,
    PRIMARY KEY (id)
) ENGINE InnoDB;



-- Section insertion --
-- Insertion user, article, thumbs et commentaires pour test --
