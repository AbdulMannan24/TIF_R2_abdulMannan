const express = require('express');
const router = express.Router();
const validator = require('validator');
const slugify = require('slugify');
const community = require('../../models/Community');
const { Snowflake } = require('@theinternetfolks/snowflake');
const isLoggedIn = require('../../middlewares/isLoggedIn');
const assignRole = require('../../controllers/assignRole');
const addMember = require('../../controllers/addMember');


router.post('/', isLoggedIn, async (req, res) => {
    try {
        let communityName = req.body.name;
        if (!validator.isLength(communityName, {min: 2})) {
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
        //let slug = validator.slugify(communityName);
        let slug = slugify(communityName)
        let createdCommunity = await community.create({
            id: Snowflake.generate(),
            name: communityName,
            slug: slug,
            owner: req.body.id
        })

        if (createdCommunity) {
            let response = {
                "status": true,
                "content": {
                    "data": {
                        "id": createdCommunity.id,
                        "name": createdCommunity.name,
                        "slug": createdCommunity.slug,
                        "owner": createdCommunity.owner,
                        "created_at": createdCommunity.created_at,
                        "updated_at": createdCommunity.updated_at
                    }
                }
            }
            let assignedRole = await assignRole("Community Admin");
            let member = {
                community: createdCommunity.id,
                user: req.body.id,
                role: assignedRole
            }
            await addMember(member);
            res.json(response);
        } else {
            console.log(createdCommunity);
            res.json("Failed to Create Community");
        }

    } catch (err) {
        console.log(err);
        res.json({message: "Api Call Failed"});
    }
})

module.exports = router;
// delete this after use
// router.post('/', (req, res) => {
//     console.log("in community/create.js");
//     res.json({message: "Creating a Community"});
// })