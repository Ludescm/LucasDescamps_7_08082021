/*RESET AND CREATION SECTION*/
DROP DATABASE IF EXISTS groupomania;
CREATE DATABASE IF NOT EXISTS groupomania;
USE groupomania;

SET NAMES utf8;

/*Reset rapide en cas d'erreur*/
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Articles;
DROP TABLE IF EXISTS Thumbs;
DROP TABLE IF EXISTS Comments;


/*TABLE CREATION SECTION*/
/*Création de la table des utilisateurs, avec id, username, mail, password, nom, prénom. is_admin détermine si le user est administrateur du site ou juste utilisateur */
CREATE TABLE Users (
    id SMALLINT UNSIGNED NOT NULL  AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    is_admin TINYINT NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
) ENGINE = InnoDB ;


/*Création de la table des articles postés, avec id, titre, description, sujet (pour classement des posts), auteur, date du post, et éventuellement lien vers le site web de l'article. Deleted permet de conserver dans la base de données même les articles effacés. */
CREATE TABLE Articles (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    description TEXT,
    subject VARCHAR(50) NOT NULL,
    lien_web VARCHAR(400),
    user_id SMALLINT UNSIGNED NOT NULL,
    date_post DATE NOT NULL,
    deleted BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (id)
) ENGINE = InnoDB ;


/*Création de la table des likes et dislikes donnés par les users sur les articles */
CREATE TABLE Thumbs (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id SMALLINT UNSIGNED NOT NULL,
    article_id SMALLINT UNSIGNED NOT NULL,
    thumb TINYINT DEFAULT 0,
    liked TINYINT UNSIGNED DEFAULT 0,
    disliked TINYINT UNSIGNED DEFAULT 0,
    PRIMARY KEY (id)
) ENGINE = InnoDB ;


/*Création de la table des commentaires, avec id, titre et description, article et auteur associés. Deleted permet de conserver dans la base de données même les commentaires effacés. */
CREATE TABLE Comments (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    cryptoslug VARCHAR(50) UNIQUE NOT NULL,
    content VARCHAR(255) UNIQUE NOT NULL,
    user_id SMALLINT UNSIGNED NOT NULL,
    article_id SMALLINT UNSIGNED NOT NULL,
    date_post DATE NOT NULL,
    deleted BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (id)
) ENGINE = InnoDB ;




