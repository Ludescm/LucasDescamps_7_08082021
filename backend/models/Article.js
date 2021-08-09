/* Structuration des données "articles" dans la base de données MySQL */

var mysql = require("mysql");

//Constructeur
const Article = function(article) {
    this.id = article.id;
    this.title = article.title;
    this.slug = article.slug;
    this.description = article.description;
    this.subject = article.subject;
    this.image = article.image;
    this.user_id = article.user_id;
    this.date_post = new Date();
    this.deleted = article.deleted
};

module.exports = Article;