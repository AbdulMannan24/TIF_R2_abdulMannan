const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
       res.send("in create(role");
    } catch (err) {
        console.log(err);
        res.json({message: "Api Call Failed"});
    }
})

module.exports = router;