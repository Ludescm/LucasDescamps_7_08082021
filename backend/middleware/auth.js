const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedtoken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userid = decodedtoken.userid;
        const isAdmin = req.user.isAdmin;
        if (req.body.userid && res.body.userid !== userid) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid Request')
        });
    }
};