const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let page = req.query.page || 1;
        let total = await community.countDocuments();
        let skipDocuments = (page - 1) * 10;
        let pages = Math.ceil(total/10);
        let result = await community.find().skip(skipDocuments).limit(10);
        res.send("get all members");
    } catch (err) {
        console.log(err);
        res.json({message: "Api Call Failed"});
    }
})

module.exports = router;