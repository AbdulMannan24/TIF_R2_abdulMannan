const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
       res.send("in addMember");
    } catch (err) {
        console.log(err);
        res.json({message: "Api Call Failed"});
    }
})

module.exports = router;