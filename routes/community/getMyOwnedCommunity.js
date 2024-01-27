const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.send("my owned communities");
    } catch (err) {
        console.log(err);
        res.json({message: "Api Call Failed"});
    }
})

module.exports = router;