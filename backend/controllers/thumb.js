/*LOGIQUE METIER POUR CE QUI CONCERNE LES REQUETES SUR LES LIKES/DISLIKES */

const Thumb = require("../models/Thumb"); 
var db = require("../connectiondb");
const {body} = require('express-validator');
const jwt = require("jsonwebtoken");


/*REMARQUE : dans toutes les requêtes suivantes, sont utilisés des placeholders et des "escaped variables" pour éviter les attaques par injection SQL */


/*Fontion qui gère la logique métier de la route POST (envoi d'un nouveau like ou dislike). 
Règle : si thumb=1, le like est enregistré, si thumb=-1, le dislike est enregistré.*/
exports.sendThumb = (req, res, next) => {
     //Recherche dans la BDD l'id de l'article concerné par les thumbs
    let sql = "SELECT * FROM Articles WHERE slug = ?";
    db.query(sql, [req.params.slug], function(err, data) {
        if (err) {
            return res.status(400).json({err});
        }
        var articleId = data[0].id;
        let sql = `INSERT INTO Thumbs(user_id, article_id, thumb, liked, disliked) VALUES (?)`;
        let values = [req.body.user_id, articleId, req.body.thumb, (req.body.thumb == 1 ? 1:0), (req.body.thumb == -1 ? 1:0)];
        db.query(sql, [values], function(err, data, fields) {
            if (err) {
                return res.status(400).json({err});
            }
            res.json({status: 201, data, message: "Nouveau like/dislike enregistré avec succès !"})
        });
    });
};


//Fontion qui gère la logique métier de la route DELETE (suppression d'un like ou d'un dislike, autorisée pour celui qui l'a posté uniquement)
exports.deleteThumb = (req, res, next) => {
    //Recherche dans la BDD l'id de l'article concerné par les thumbs
    let sql = "SELECT * FROM Articles WHERE slug = ?";
    db.query(sql, [req.params.slug], function(err, data) {
        if (err) {
            return res.status(400).json({err});
        }
        var articleId = data[0].id;
        let sql = `DELETE FROM Thumbs WHERE article_id = ? AND user_id = ?`;
        let values = [articleId, req.user.userId];
        db.query(sql, values, function(err, data) {
            if (err) {
                return res.status(400).json({err});
            }
            console.log(data);
            res.json({status: 200, data, message: "Like ou dislike supprimé !"})
        });
    });
};

 
//Fontion qui gère la logique métier de la route GET (affichage des totaux de tous les likes et dislikes par article)  
exports.getAllThumbs = (req, res, next) => {
    //Recherche dans la BDD l'id de l'article concerné par les thumbs
    let sql = "SELECT * FROM Articles WHERE slug = ?";
    db.query(sql, [req.params.slug], function(err, data) {
        if (err) {
            return res.status(400).json({err});
        }
        var articleId = data[0].id;
        let sql = "SELECT SUM(liked) as sumOfLikes, SUM(disliked) as sumOfDislikes FROM Thumbs WHERE article_id = ?"; 
        db.query(sql, [articleId], function(err, data) {
            if (err) {
                return res.status(400).json({err});
            } 
            //console.log(data);
            res.json({status: 200, data, message: "Likes/dislikes affichés avec succès !"})
          });
    });
};  

//Fontion qui gère la logique métier de la route GET (affichage d'un seul thumb, pour déterminer si un user a déjà liké ou disliké un certain article)  
exports.getUserThumb = (req, res, next) => {
    //Recherche dans la BDD l'id de l'article concerné par les thumbs
    let sql = "SELECT * FROM Articles WHERE slug = ?";
    db.query(sql, [req.params.slug], function(err, data) {
        if (err) {
            return res.status(400).json({err});
        }
        var articleId = data[0].id;
        let sql = "SELECT * FROM Thumbs WHERE article_id = ? AND user_id = ? "; 
        let values = [articleId, req.user.userId];
        db.query(sql, values, function(err, data) {
            if (err) {
                return res.status(400).json({err});
            } 
            //console.log(data);
            res.json({status: 200, data, message: "Like/dislike du user affiché avec succès !"})
          });
    });
};  