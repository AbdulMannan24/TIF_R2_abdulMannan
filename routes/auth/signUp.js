const express = require('express');
const router = express.Router();
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Snowflake } = require('@theinternetfolks/snowflake');
const user = require('../../models/User');
const validate = require('../../controllers/validate');
const secretKey = process.env.SECRET_KEY;
/*
    request
        {
            "name": "Dolores Abernathy",
            "email": "dolores@westworld.com",
            "password": "vGuFQ1nJSSrdMaYV1LiN3G1i"
        }
    
    responses :
    {
        "status": true,
        "content": {
            "data": {
                "id": "7039874298864994303",
                "name": "Dolores Abernathy",
                "email": "dolores@westworld.com",
                "created_at": "2020-01-01T00:00:00.000Z"
            },
            "meta": {
                "access_token": "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIyMDIwLTAxLTAxVDAwOjAwOjAwLjAwMFoiLCJpZCI6IjcwMzk4NzQyOTg4NjQ5OTQzMDMiLCJleHAiOiIyMDIwLTAxLTAyVDAwOjAwOjAwLjAwMFoifQ.0WNbCXm8hZBPmib5Q-d1RNJWLoNsHj1AGtfHtcCguI0"
            }
        }
    } 
*/

router.post('/', async (req, res) => {
    try {
        let validation = await validate(req.body, 'signUp');
        if (!validation.status) {
            res.json(validation);
            return;
        }
        let {name, email, password} = req.body;
        // convert to strings
        name = name + '';
        email = email + '';
        password = password + '';
        let hashedPassword = await bcrypt.hash(password, 10);
        let createdUser = await user.create({
            id: Snowflake.generate(),
            name: name,
            email: email,
            password: hashedPassword
        })

        if (createdUser) {
           let token = jwt.sign({id: createdUser.id}, secretKey)
           let response = {
                "status": true,
                "content": {
                    "data": {
                        "id": createdUser.id,
                        "name": createdUser.name,
                        "email": createdUser.email,
                        "created_at": createdUser.created_at
                    },
                    "meta": {
                        "access_token": token
                    }
                }
            } 
            res.json(response);
            return;
        } else {
            console.log(createdUser);
            res.json({message: "Failed To Create User"});
        }
    } catch (err) {
        res.status(400).json({message: "Api Call Failed"});
    }
})

module.exports = router;