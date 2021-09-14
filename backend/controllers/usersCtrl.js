const User = require("../models/user");
const Comment = require("../models/comment");
const Message = require("../models/message");

// Routes CRUD : Create, Read, Update, Delete.

// READ

exports.findOne = async (req, res, next) => {
    var userData = {};
    User.findOne(req.params.id)
        .then(data => {
            const user = data[0][0];
            res.status(200).json(user);
            userData.id = user.id
            userData.userName = user.userName
            userData.email = user.email
            userData.createdAt = user.createdAt
            userData.isAdmin = user.isAdmin
        })
        /*.then(async () => {
            await Message.countUserMessage(req.params.id)
                .then(data => {
                    var total = data[0][0].total;
                    userData.totalMessages = total
                })
        })
        .then(() => {
            Comment.countUserComment(req.params.id)
                .then(data => {
                    var total = data[0][0].total;
                    userData.totalComments = total
                    res.status(200).json(userData)
                })
        })*/
        .catch(error => res.status(400).json({ error }))
}

exports.findAll = (req, res, next) => {
    console.log("requete vers tout les utilisateurs");
    User.findAll()
        .then((data) => {
            const users = data[0];
            res.status(200).json(users)
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
}

// params uid & isAdmin

exports.deleteOne = (req, res, next) => {
    console.log(" USER DELETION PROCESS ")
    console.log(" user Id is: " + req.params.id)
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TKN_SECRET);
    const isAdmin = decodedToken.isAdmin;
    console.log(" if isAdmin True => delete the user ")
    console.log(" if False => unauthorized ")

    if (isAdmin) {
        Comment.destroyByUser(req.params.id)
        Message.destroyByUser(req.params.id)
        User.destroy(req.params.id)
            .then((res) => {
                res.status(200).json({ message: "User, its Messages and its comments have been destroyed" })
            })
            .catch(error => res.status(400).json({ error }))
    } else {
        res.status(401).json({ message: " unauthorized " })
    }
}

exports.deleteMyAccount = (req, res, next) => {
    console.log(" USER ACCOUNT DELETION PROCESS ")
    console.log(" user Id is: " + req.params.id)
    Comment.destroyByUser(req.params.id)
    Message.destroyByUser(req.params.id)
    User.destroy(req.params.id)
        .then(() => res.status(200).json({ message: "ok" }))
        .catch(error => console.log(error));
}
