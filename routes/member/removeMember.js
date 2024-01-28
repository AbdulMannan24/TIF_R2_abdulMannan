const express = require('express');
const isLoggedIn = require('../../middlewares/isLoggedIn');
const router = express.Router();
const member = require('../../models/Member');
const role = require('../../models/Role');
const community = require('../../models/Community');

router.delete('/:id',isLoggedIn, async (req, res) => {
    try {
       // console.log(req.params.id);
        let checkMember = await member.findOne({id: req.params.id});
        if (!checkMember) {
            let response = {
                "status": false,
                "errors": [
                    {
                        "message": "Member not found.",
                        "code": "RESOURCE_NOT_FOUND"
                    }
                ]
            }
            res.json(response);
            return;
        }
        let communityId = checkMember.community;
        let checkCommunity = await community.findOne({id: communityId});
        if (checkCommunity.owner == req.body.id) {
            let deleteMember = await member.deleteOne({id: req.params.id});
            res.json({status: true});
        } else {
            // let's find the role of the user who wants to delete this id member
            let moderator = await member.findOne({community: communityId, user: req.body.id});
            console.log(moderator);
            if (moderator) {
                let moderatorRole = await role.findOne({id: moderator.role});
                if (moderatorRole) {
                    let currentRole = moderatorRole.name;
                    if (currentRole == 'Community Moderator') {
                        let deleteMember = await member.deleteOne({id: req.params.id});
                        res.json({status: true});
                    } else {
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
                } else {
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
            } else {
                res.json({message: "Failed To Delete Member"});
            }
        }
    } catch (err) {
        console.log(err);
        res.json({message: "Api Call Failed"});
    }
})

module.exports = router;