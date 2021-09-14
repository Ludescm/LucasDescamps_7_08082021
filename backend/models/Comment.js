const dbconnexion = require("../services/db");
const Message = require("./message");
const User = require("./user");

class Comment {
    id = null;
    comment = "";
    createdAt = null;
    updateAt = null;
    UserId = User.id;
    CommentId = Comment.id;
    MessageId = Message.id;

    constructor(data = null){
        if(data != null){
            if(data.comment) this.comment = data.comment;
        }
    }

    createComment(id){
        const sql = "INSERT INTO comments (comment, createdAt) VALUES (?, CURRENT_TIME())";
        return dbconnexion.execute(sql, [this.comment]);
    };

    static findOneComment(id){
        const sql = "SELECT * FROM messages WHERE id = ?";
        return dbconnexion.query(sql, [id]);
    };

    static findAllComments(){
        const sql = "SELECT * FROM messages";
        return dbconnexion.query(sql);
    };

    deleteComment(id){
        const sql = "DELETE FORM comments WHERE id = ?";
        return dbconnexion.execute(sql, [id]);
    };

    destroy(){
        const sql = "DELETE * FROM comments";
        return dbconnexion.execute(sql);
    };

    static destroyByUser(userId){
        const sql = "delete from comments where UserId = ?";
        return dbconnexion.execute(sql, [userId]);
    }
    save(){
        const sql = "INSERT INTO messages (comment, createdAt) VALUES (?, CURRENT_TIME())";
        return dbconnexion.execute(sql, [this.comment]);
    };
    static countUserComment(UserId){
        const sql = "SELECT count(*) AS total WHERE UserId = ?";
        return dbconnexion.query(sql, [UserId]);
    }
}

module.exports = Comment;