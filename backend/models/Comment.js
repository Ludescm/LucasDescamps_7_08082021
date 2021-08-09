/* Structuration des données "commentaires" dans la base de données MySQL */
 
var mysql = require("mysql");

//Constructeur
const Comment = function(comment) {
    this.id = comment.id;
    this.cryptoslug = comment.cryptoslug;
    this.content = comment.content;
    this.user_id = comment.user_id;
    this.article_id = comment.article_id;
    this.date_post = new Date();
    this.deleted = comment.deleted
};

module.exports = Comment;