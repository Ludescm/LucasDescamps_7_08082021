/*LOGIQUE METIER POUR CE QUI CONCERNE LES REQUETES SUR LES COMMENTAIRES POSTES A PROPOS D'UN ARTICLE */

const Comment = require("../models/Comment"); 
var db = require("../connectiondb"); 
const {body} = require('express-validator');
var cryptoRandomString = require('crypto-random-string');

//Fonction de validation des inputs pour les requêtes post et put
exports.validate = (method) => {
  switch (method) {
    case 'createComment': {
     return [ 
        body('content').exists().isAlpha()
       ]   
    }
    case 'modifyComment': {
     return [ 
        body('content').exists().isAlpha()
       ]   
    }  
  }
}

/*REMARQUE : dans toutes les requêtes suivantes, sont utilisés des placeholders et des "escaped variables" pour éviter les attaques par injection SQL */

//Fonction qui gère la logique métier de la route POST (ajout d'un nouveau commentaire) à condition que le user n'ait pas déjà posté un commentaire
exports.createComment = (req, res, next) => {
    //Recherche dans la BDD si le user courant a déjà posté un commentaire sur l'article concerné
    let sql = `SELECT Comments.id FROM Comments INNER JOIN Articles ON Comments.article_id = Articles.id WHERE Comments.deleted = false AND Articles.slug = ? AND Comments.user_id = ?`;
    let values = [req.params.slug, req.user.userId];
    db.query(sql, values, function(err, data) {
        if (err) {
            return res.status(400).json({err});
        }
        var result = data[0];
        //Si aucun commentaire du user sur cet article n'existe, le user est autorisé à poster un commentaire
        if (result === null || result === undefined) {
            let sql = `INSERT INTO Comments(cryptoslug, content, user_id, article_id, date_post) VALUES (?)`;
            //Création d'un slug aléatoire
            let newSlug = cryptoRandomString({length: 5});;
            let values = [newSlug, req.body.content, req.body.user_id, req.body.article_id, req.body.date_post];
            db.query(sql, [values], function(err, data, fields) {
                if (err) {
                    return res.status(400).json({err});
                }
                res.json({status: 201, data, message: "Nouveau commentaire posté avec succès !"})
            });
        } else {
            return res.status(400).json({error: "Vous avez déjà posté un commentaire sur cet article !"});
        }
    });
};


//Fonction qui gère la logique métier de la route PUT (modification d'un commentaire posté, autorisée pour son auteur uniquement)
 exports.modifyComment = (req, res, next) => {
    //Recherche dans la BDD du commentaire à modifier via son slug
    let sql = "SELECT * FROM Comments WHERE cryptoslug = ?";
    db.query(sql, [req.params.cryptoslug], function(err, data) {
        if (err) {
            return res.status(400).json({err});
        }
        var commentToModify = data[0];
        //Comparaison de l'id du user courant avec l'id du user ayant posté le commentaire
        if (commentToModify.user_id === req.user.userId || req.user.isAdmin === 1) {
            let sql = `UPDATE Comments SET content = ?, user_id = ?, date_post = ? WHERE cryptoslug = ?`;
            let values = [req.body.content, req.body.user_id, req.body.date_post, req.params.cryptoslug]
            db.query(sql, values, function(err, data, fields) {
                if (err) {
                    return res.status(400).json({err});
                }
                res.json({status: 201, data, message: "Commentaire modifié !"})
            });
        } else {
            throw "La modification du commentaire n'est possible que par son auteur.";
        }
    });
}; 

    
//Fonction qui gère la logique métier de la route DELETE (suppression d'un commentaire posté, autorisée pour son auteur uniquement)
exports.deleteComment = (req, res, next) => {
    //Recherche dans la BDD du commentaire à modifier
    let sql = "SELECT * FROM Comments WHERE cryptoslug = ?";
    db.query(sql, [req.params.cryptoslug], function(err, data) {
        if (err) {
            return res.status(400).json({err});
        }
        var commentToModify = data[0];
        //Comparaison de l'id du user courant avec l'id du user ayant posté le commentaire
        if (commentToModify.user_id === req.user.userId || req.user.isAdmin === 1) {
            let sql = "UPDATE Comments SET deleted = true WHERE Comments.cryptoslug = ?";
            db.query(sql, [req.params.cryptoslug], function(err, data) {
                if (err) {
                return res.status(400).json({err});
                }
            res.json({status: 200, data, message: "Commentaire supprimé !"})
            });
        } else {
            throw "La suppression du commentaire n'est possible que par son auteur.";
        }
    });
};


//Fonction qui gère la logique métier de la route GET (affichage de tous les commentaires)
exports.getAllComments = (req, res, next) => { 
    let articleSlug = req.params.slug; 
    let sql = "SELECT Comments.id, Comments.cryptoslug, Comments.user_id, content, Comments.date_post, username, Articles.title, Articles.slug FROM Comments INNER JOIN Users ON Comments.user_id = Users.id INNER JOIN Articles ON Comments.article_id = Articles.id WHERE Articles.slug = ? AND Comments.deleted = false ORDER BY Comments.date_post DESC"; 
    db.query(sql, [articleSlug], function(err, data) {
        if (err) {
            return res.status(400).json({err});
        } 
        res.json({status: 200, data, message: "Commentaires affichés avec succès !"})
    });
};


//Fonction qui gère la logique métier de la route GET (affichage d'un commentaire en particulier, sélectionné par son slug)
exports.getOneComment = (req, res, next) => {
    let commentSlug = req.params.cryptoslug; 
    let sql = "SELECT Comments.id, Comments.cryptoslug, Comments.user_id, content, Comments.date_post, username, Articles.slug FROM Comments INNER JOIN Users ON Comments.user_id = Users.id INNER JOIN Articles ON Comments.article_id = Articles.id WHERE Comments.cryptoslug = ?";
    db.query(sql, commentSlug, function(err, data, fields) {
    if (err) {
        return res.status(404).json({err});
    }
    console.log(data);
    res.json({status: 200, data, message: "Commentaire affiché avec succès !"})
  });
};
