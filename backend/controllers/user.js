/*LOGIQUE METIER POUR CE QUI CONCERNE L'AUTHENTIFICATION DES USERS */

var db = require("../connectiondb");
const User = require("../models/User");
const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken");
const {body} = require('express-validator');

//Fonction de validation des inputs pour les requêtes post user
exports.validate = (method) => {
  switch (method) {
    case 'signup': {
     return [ 
        body('username').exists().isLength({min: 3}).isLength({max: 10}),
        body('email').exists().isEmail().normalizeEmail(),
        body('password').exists().isLength({min: 3}).isLength({max: 10}),
        body('first_name').exists().isAlpha(),
        body('last_name').exists().isAlpha()
       ]   
    }
    case 'login': {
        return [ 
        body('email').exists().isEmail(),
        body('password').exists().isLength({min: 3}).isLength({max: 10})
       ] 
    }       
  }
}

/*REMARQUE : dans toutes les requêtes suivantes, sont utilisés des placeholders et des "escaped variables" pour éviter les attaques par injection SQL */

//Fonction qui gère la logique métier de la route POST (inscription d'un nouvel user)
exports.signup = (req, res, next) => {
    //Cryptage du password
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            //Création d'un nouvel utilisateur
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash,
                first_name: req.body.first_name,
                last_name: req.body.last_name  
            });
            //Enregistrement du new user dans la base de données
            let sql = `INSERT INTO Users(username, email, password, first_name, last_name) VALUES (?)`;
            let values = [user.username, user.email, user.password, user.first_name, user.last_name];
            db.query(sql, [values], function(err, data, fields) {
                if (err) {
                    return res.status(400).json({err}); 
                }
                //Si absence d'erreur, on crée un nouveau token pour ce new user
                let sql = `SELECT * FROM Users WHERE email = ?`;
                db.query(sql, [req.body.email], function(err, data, fields) {
                    if (err) {
                    return res.status(404).json({err}); 
                    }
                    res.status(200).json({ 
                        userId: data[0].id, 
                        username: data[0].username, 
                        isAdmin: data[0].is_admin,
                        //Encodage d'un nouveau token
                        token: jwt.sign(
                            {userId : data[0].id, username: data[0].username, isAdmin: data[0].is_admin},
                            "RANDOM_SECRET_TOKEN",
                            {expiresIn: "24h"}
                        )
                    });
                });
            });
        })
        .catch(error => res.status(500).json({error})); 
};


//Fonction qui gère la logique métier de la route POST (connexion d'un user existant dans la database)
exports.login = (req, res, next) => {
    //Recherche de l'utilisateur dans la DB via son email 
    let sql = `SELECT * FROM Users WHERE email = ?`;
    db.query(sql, [req.body.email], function(err, data, fields) {
        if (data.length === 0) {
            return res.status(404).json({err: "Utilisateur non trouvé !"}); 
        } 
        //Si on a trouvé le mail dans la DB, on compare le hash du nouveau mot de passe au hash de la DB
        bcrypt.compare(req.body.password, data[0].password)
            .then(valid => {
                if(!valid) {
                    return res.status(401).json({error: "Mot de passe incorrect !"});
                }
                res.status(200).json({
                    userId: data[0].id,
                    username: data[0].username,
                    isAdmin: data[0].is_admin,
                    //Si le password est correct, encodage d'un nouveau token
                    token: jwt.sign(
                        {userId : data[0].id, username: data[0].username, isAdmin: data[0].is_admin},
                        "RANDOM_TOKEN_SECRET",
                        {expiresIn: "24h"}
                    )
                });
            })
            .catch(error => res.status(500).json({error}));  
    });
};
    

//Fonction qui gère la logique métier de la route GET (affichage des données d'un user)
exports.getOneUser = (req, res, next) => {
    let sql = `SELECT * FROM Users WHERE id = ?`;
    db.query(sql, [req.params.id], function(err, data, fields) {
    if (err) {
        return res.status(404).json({err});
    }
    res.json({status: 200, data, message: "User affiché avec succès !"})
  });
};


//Fonction qui gère la logique métier de la route DELETE (suppression d'un compte user existant dans la database)
exports.deleteAccount = (req, res, next) => {
    let sql = `DELETE FROM Users WHERE id = ?`;
    db.query(sql, [req.params.id], function(err, data, fields) {
        if (err) {
            return res.status(400).json({err: "Désolé, votre demande de suppression de compte n'a pu aboutir."}); 
        }
        res.json({status: 200, data, message: "Votre compte a bien été supprimé !"});    
    });
};

