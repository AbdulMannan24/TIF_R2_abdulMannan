const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

function isLoggedIn(req, res, next) {
    try {
        let bearerToken = req.headers.authorization;
        let token = bearerToken.split(' ')[1];
        let decoded = jwt.verify(token, secretKey);
        //res.json({message: `your id is ${decoded.id}`})
        req.body.id = decoded.id;
        next();
    } catch (err) {
        // console.log(err);
        let response = {
            "status": false,
            "errors": [
                {
                    "message": "You need to sign in to proceed.",
                    "code": "NOT_SIGNEDIN"
                }
            ]
        }
        res.json(response);   
    }
}

module.exports = isLoggedIn;