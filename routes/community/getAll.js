const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log("in community/getAll.js");
    res.json({message: "Get all Community"});
})


module.exports = router;