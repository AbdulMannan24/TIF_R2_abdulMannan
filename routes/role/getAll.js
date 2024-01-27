const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.send("in getAllRole");
    } catch (err) {
        console.log(err);
        res.json({message: "Api Call Failed"});
    }
})

module.exports = router;