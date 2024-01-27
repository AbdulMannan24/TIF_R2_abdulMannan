const express = require('express');
const router = express.Router();
const user = require('../../models/User');
const role = require('../../models/Role');
const member = require('../../models/Member');
const community = require('../../models/Community');
const { Snowflake } = require('@theinternetfolks/snowflake');
const isLoggedIn = require('../../middlewares/isLoggedIn');

/*
    {
        "community": "7039920812358371327",
        "user": "7039921766419924991",
        "role": "7039873122358527999"
    }
*/
router.get('/', (req, res) => {
    res.send("coming to add member");
})

router.post('/', isLoggedIn, async (req, res) => {
    try {
               
        // check if community exists
        let checkCommunity = await community.findOne({id: req.body.community});
        if (!checkCommunity) {
            let response = {
                "status": false,
                "errors": [
                  {
                    "param": "community",
                    "message": "Community not found.",
                    "code": "RESOURCE_NOT_FOUND"
                  }
                ]
            }    
            res.json(response);
            return;
        }

        // not allowed Access
        let adminId = req.body.id;
        if (checkCommunity.owner != adminId) {
            let response = {
                "status": false,
                "errors": [
                    {
                        "message": "You are not authorized to perform this action.",
                        "code": "NOT_ALLOWED_ACCESS"
                    }
                ]
            }
            res.json(response);
            return;
        }

        // Member already exists
        let checkMember = await member.findOne({community: req.body.community, user: req.body.user});
        if (checkMember) {
            let response = {
                "status": false,
                "errors": [
                    {
                        "message": "User is already added in the community.",
                        "code": "RESOURCE_EXISTS"
                    }
                ]
            }
            res.json(response);
            return;
        }

        // Role not Found
        let checkRole = await role.findOne({id: req.body.role});
        if (!checkRole) {
            let response = {
                "status": false,
                "errors": [
                    {
                        "param": "role",
                        "message": "Role not found.",
                        "code": "RESOURCE_NOT_FOUND"
                    }
                ]
            }
            res.json(response);
            return;
        }
        
        // User not Found
        let checkUser = await user.findOne({id: req.body.user});
        if (!checkUser) {
            let response = {
                "status": false,
                "errors": [
                    {
                        "param": "user",
                        "message": "User not found.",
                        "code": "RESOURCE_NOT_FOUND"
                    }
                ]
            }
            res.json(response);
            return;
        }

        // adding member
        let createdMember = await member.create({
            id: Snowflake.generate(),
            community: req.body.community,
            user: req.body.user,
            role: req.body.role
        }) 
        if (createdMember) {
            let response = {
                "status": true,
                "content": {
                    "data": {
                        "id": createdMember.id,
                        "community": createdMember.community,
                        "user": createdMember.user,
                        "role": createdMember.role,
                        "created_at": createdMember.created_at
                    }
                }
            }
            res.json(response);
        } else {
            console.log(createdMember);
            res.json({message: "Failed to Add Member"});
        }
    } catch (err) {
        console.log(err);
        res.json({message: "Api Call Failed"});
    }
})

module.exports = router;