const express = require('express');
const isLoggedIn = require('../../middlewares/isLoggedIn');
const router = express.Router();
const community = require('../../models/Community');

router.get('/', isLoggedIn, async (req, res) => {
    try {
        let page = req.query.page || 1;
        let total = await community.countDocuments();
        let skipDocuments = (page - 1) * 10;
        let pages = Math.ceil(total/10);
        let result = await community.find({owner: req.body.id}).skip(skipDocuments).limit(10);
        let finalResult = await Promise.all(result.map(async (data) => {
            return {
                id: data.id,
                name: data.name,
                slug: data.slug,
                owner: req.body.id, 
                created_at: data.createdAt,
                updated_at: data.updatedAt
            }
        }));
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
        res.json(response);
    } catch (err) {
        console.log(err);
        res.json({message: "Api Call Failed"});
    }
})

module.exports = router;