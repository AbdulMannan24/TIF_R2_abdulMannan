const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;
const isLoggedIn = require('../../middlewares/isLoggedIn');
const user = require('../../models/User')

router.get('/', isLoggedIn ,async(req, res) => {
    try {
        let userId = req.body.id;
        let fetchedUser = await user.findOne({id: userId});
        if (fetchedUser) {
            let response = {
                "status": true,
                "content": {
                    "data": {
                        "id": fetchedUser.id,
                        "name": fetchedUser.name,
                        "email": fetchedUser.email,
                        "created_at": fetchedUser.createdAt
                    }
                }
            }
            res.json(response);
        } else {
            res.json({message: "Error finding User Information"});
        }
    } catch (err) {
        console.log(err);
        res.json({message: "Api Call Failed"});
    }
})

module.exports = router;