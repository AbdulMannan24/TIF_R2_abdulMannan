const express = require('express');
const router = express.Router();
const role = require('../../models/Role');

router.get('/', async (req, res) => {
    try {
        let page = req.query.page || 1;
        let total = await role.countDocuments();
        let skipDocuments = (page - 1) * 10;
        let pages = Math.ceil(total/10);
        let result = await role.find().skip(skipDocuments).limit(10);
        let response = {
            "status": true,
            "content": {
                "meta": {
                    "total": total,
                    "pages": pages,
                    "page": page
                },
                "data": result
            }
        }
        res.json(response);
    } catch (err) {
        console.log(err);
        res.json({message: "Api Call Failed"});
    }
})

module.exports = router;