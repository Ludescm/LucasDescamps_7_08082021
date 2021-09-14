
const dbconnexion = require("../services/db");

// modele class USER pour la base de données.
class User{
    id = null;
    userName = "";
    email = "";
    password = "";
    isAdmin = false;
    createdAt = null;
    updatedAt = null;

    constructor(data = null){
        if(data != null){
            if(data.userName) this.userName = data.userName;
            if(data.email) this.email = data.email;
            if(data.password) this.password = data.password;
            if(data.isAdmin) this.isAdmin = data.isAdmin;
        }
    }

    static findOne(id){
        const sql = "select * From users where id = ?";
        return dbconnexion.query(sql, [id]);
    }

    static findOneByEmail(email){
        const sql = "select * From users where email = ?";
        return dbconnexion.query(sql, [email]);
    }

    static findAll(){
        const sql = "select id, userName, email, createdAt from users";
        return dbconnexion.query(sql);
    }

    static destroy(id){
        const sql = "delete from users where id = ?";
        return dbconnexion.execute(sql, [id]);
    }

    update(id){
        const sql = "UPDATE users SET userName=?, email=?, password=?, isAdmin=?, updatedAt=CURRENT_TIME() WHERE id = ?";
        return dbconnexion.execute(sql, [this.userName, this.email, this.password, this.isAdmin]);
    }

    save(){
        const sql = "INSERT INTO users (userName, email, password, isAdmin, createdAt, updatedAt) VALUES (?, ?, ?, ?, CURRENT_TIME(), CURRENT_TIME())";
        return dbconnexion.execute(sql, [this.userName, this.email, this.password, this.isAdmin]);
    }
}

module.exports = User;