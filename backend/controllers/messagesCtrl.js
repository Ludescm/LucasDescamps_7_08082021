const Message = require("../models/message");
const User = require("../models/user");


// Routes CRUD : Create, Read, Update, Delete.

// CREATE

exports.createMessage = (req, res, next) => {
//     if (!req.body.UserId || !req.body.message || !req.body.messageUrl || req.body.message.length > 1500) {
//         return res.status(400).json({message: "one ore more parameters missing or message too long (max length is 1500"})
// } else {
    //console.log('ligne 14 req.body' + req.body.messageUrl);
    let imagePost = "";
    if (req.file) { 
        imagePost = `${req.protocol}://${req.get("host")}/images/${req.file.filename}` 
    }
    
    const message = new Message(
        {
            UserId:     req.body.UserId,
            message:    req.body.message,
            messageUrl: imagePost
        }
    );
    console.log(message);
    message.save()
        .then(() => res.status(201).json({ message: "Publication réussie" }))
        .catch(error => res.status(400).json({ error }));
//}
};

// READ

exports.findAllMessages = (req, res, next) => {
    Message.findAllMessages()    
    .then(messages => {
        const list = messages.map(message => {
            return Object.assign({},
                {
                    id:         req.body.id,
                    createdAt:  req.body.createdAt,
                    message:    req.body.message,
                    messageUrl: req.body.messageUrl,
                    UserId:     req.body.UserId,
                }
            )
        })
        res.status(200).json({ list })
    })
    .catch(error => res.status(400).json({ error }))
}

exports.findOneMessage = (req, res, next) => {
    const oneMessage = {}
    Message.findOne({ 
        id :req.params.id,
        include: {
            model: User,
            required: true,
            attributes: ["userName"] 
        },
        order: [["id", "DESC"]]

    })
    .then(message => {
        oneMessage.id           = message.id
        oneMessage.userId       = message.UserId
        oneMessage.userName     = message.User.userName
        oneMessage.createdAt    = message.createdAt
        oneMessage.message      = message.message
        oneMessage.messageUrl   = message.messageUrl
        res.status(200).json(oneMessage)
    })
    .catch(error => res.status(404).json({ error }))
};

exports.findAllMessagesForOne = (req, res, next) => {
    let list = ""
    Message.findAll({ 
        UserId: req.params.id,
    })
    .then((res) => { 
        list = res;
        res.status(200).json( { list } )
    })
    .catch((error) => { res.status(404).json({ error })})
};

// DELETE

exports.deleteMessage = (req, res, next) => {
    console.log(" MESSAGE DELETION PROCESS ")
    console.log(" message Id is: " + req.query.messageId)
    console.log(" message User Id is : " + req.query.messageUid)
    console.log(" User Id who ask the deletion is : " + req.query.uid)

    console.log(" is it the author of the message who ask the deletion or is he Admin (admin is uid=1) ? ") + 
    console.log(" if True => delete the message ")
    console.log(" if False => unauthorized ")
    
    console.log(req.query.messageid == req.query.id || req.query.id == 1)
    if(req.query.messageid == req.query.id || req.query.id == 1) {
        Comment.destroy({ MessageId: req.query.messageId })
        Message.destroy({ id: req.query.messageId })
        .then((res) => {
                res.status(200).json({ message: "Message and its comments have been destroyed" })
        })
        .catch(error => res.status(400).json({ error }))
    } else {
        res.status(401).json({message : " unauthorized "})
    }
}