const dbconnexion = require("../services/db");

class Message {
    id = null;
    message = "";
    messageUrl = "";
    createdAt = null;
    updatedAt = null;
    UserId = null;
    userName = "";

    constructor(data = null){
        if(data != null){
            if (data.message) this.message = data.message;
            if (data.messageUrl) this.messageUrl = data.messageUrl;
            if (data.UserId) this.UserId = data.UserId;
            if (data.userName) this.userName = data.userName;
        }
    }

    createMessage(){
        const sql = "INSERT INTO messages(message, messageUrl, createdAt, updatedAt, UserId) VALUES (?, ?, CURRENT_TIME(), CURRENT_TIME(), ?);";
        return dbconnexion.execute(sql, [this.message, this.messageUrl, this.UserId]);
    };
    
    static findAllMessages(){
        const sql = "SELECT message, messageUrl, createdAt, updatedAt, UserId FROM messages INNER JOIN users ON users.id = messages.UserId ORDER BY createdAt DESC";
        return dbconnexion.query(sql);
    };

    static findOneMessage(id){
        const sql = "SELECT * FROM messages INNER JOIN users ON users.id = messages.UserId WHERE messages.id=?";
        return dbconnexion.query(sql, [id]);
    };

    static findAllMessagesForOne(UserId){
        const sql = "SELECT * FROM messages WHERE UserId = ?";
        return dbconnexion.query(sql, [UserId]);
    };
    static deleteMessage(messages){
        const sql = "DELETE FROM messages WHERE messages = ?";
        return dbconnexion.execute(sql, [messages]);
    };

    static destroy(){
        const sql = "delete from messages ";
        return dbconnexion.execute(sql);
    };
    static destroyByUser(userId){
        const sql = "delete from messages where UserId = ?";
        return dbconnexion.execute(sql, [userId]);
    }

    save(){
        const sql = "INSERT INTO messages (message, messageUrl, createdAt, updatedAt, UserId) VALUES (?, ?, CURRENT_TIME(), CURRENT_TIME(), ?)";
        return dbconnexion.execute(sql, [this.message, this.messageUrl, this.UserId]);
    };
}


module.exports = Message;