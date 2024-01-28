const express = require('express');
const router = express.Router();
const member = require('../../models/Member');
const role = require('../../models/Role');
const user = require('../../models/User');

router.get('/', async (req, res) => {
    try {
        let communityId = req.communityId;
        console.log(communityId);
        let page = req.query.page || 1;
        let total = await member.countDocuments({community: communityId});
        let skipDocuments = (page - 1) * 10;
        let pages = Math.ceil(total/10);
        let result = await member.find({community: communityId}).skip(skipDocuments).limit(10);
        let finalResult = await Promise.all(result.map(async (data) => {
            let currentUser = await user.findOne({id: data.user});
            let userRole = await role.findOne({id: data.role});
            return ({
                id: data.id,
                community: data.community,
                user : {
                    id: data.user,
                    name: currentUser.name
                },
                role: {
                    id: data.role,
                    name: userRole.name
                },
                created_at: data.createdAt
            })
        }))
        let response = {
            "status": true,
            "content": {
                "meta": {
                    "total": total,
                    "pages": pages,
                    "page": page
                },
                "data": finalResult
            }
        }
        if (result.length == 0) {
            response.status = false;
        }
        res.json(response);
    } catch (err) {
        console.log(err);
        res.json({message: "Api Call Failed"});
    }
})

module.exports = router;