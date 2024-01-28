const express = require('express');
const isLoggedIn = require('../../middlewares/isLoggedIn');
const router = express.Router();
const role = require('../../models/Role');
const { Snowflake } = require('@theinternetfolks/snowflake');
const validator = require('validator');

router.post('/', isLoggedIn , async (req, res) => {
    try {
        let name = req.body.name;
        if (!validator.isLength(name, {min: 2})) {
            let response = {
                "status": false,
                "errors": [
                    {
                        "param": "name",
                        "message": "Name should be at least 2 characters.",
                        "code": "INVALID_INPUT"
                    }
                ]
            }
            res.json(response);
            return;
        }
        let createdRole = await role.create({
            id: Snowflake.generate(),
            name: name
        })
        if (createdRole) {
            let response = {
                "status": true,
                "content": {
                    "data": {
                        "id": createdRole.id,
                        "name": createdRole.name,
                        "created_at": createdRole.createdAt,
                        "updated_at": createdRole.updatedAt
                    }
                }
            }
            res.json(response);
        } else {
            console.log(createdRole);
            res.json({message: "Failed to create role"});
        }
    } catch (err) {
        console.log(err);
        res.json({message: "Api Call Failed"});
    }
})

module.exports = router;