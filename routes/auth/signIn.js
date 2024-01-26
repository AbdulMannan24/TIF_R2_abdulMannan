const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../../models/User');
const validate = require('../../controllers/validate');
const secretKey = process.env.SECRET_KEY;

router.post('/', async (req, res) => {
    try {
        let validation = await validate(req.body, 'signIn');
        if (!validation.status) {
            res.json(validation);
            return;
        }
        let fetchedUser = await user.findOne({email: req.body.email})
        let checkPassword = await bcrypt.compare(req.body.password, fetchedUser.password);
        if (checkPassword) {
            let token = jwt.sign({id: fetchedUser.id}, secretKey);
            let response = {
                "status": true,
                "content": {
                  "data": {
                    "id": fetchedUser.id,
                    "name": fetchedUser.name,
                    "email": fetchedUser.email,
                    "created_at": fetchedUser.created_at
                  },
                  "meta": {
                    "access_token": token
                  }
                }
            }
            res.json(response);
        } else {
            validation.status = false;
            validation.errors.push({
                "param": "password",
                "message": "The credentials you provided are invalid.",
                "code": "INVALID_CREDENTIALS"
            });
            res.json(validation);
        }

    } catch (err) {
        console.log(err);
        res.json({message: "Api call Failed"});
    }
})

module.exports = router;