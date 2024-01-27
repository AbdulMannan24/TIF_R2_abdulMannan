const express = require('express');
const router = express.Router();

router.delete('/', async (req, res) => {
    try {
        res.send("in removeMember");
    } catch (err) {
        console.log(err);
        res.json({message: "Api Call Failed"});
    }
})

module.exports = router;