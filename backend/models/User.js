/* Structuration des données "users" dans la base de données MySQL */

var mysql = require("mysql");

//Constructeur
const User = function(user) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.is_admin = user.is_admin;
};

module.exports = User;