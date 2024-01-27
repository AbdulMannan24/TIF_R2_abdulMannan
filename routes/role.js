const express = require('express');
const router = express.Router();

// routes 
const createRoute = require('./role/create');
router.use('/', createRoute);

const getAllRoute = require('./role/getAll');
router.use('/', getAllRoute);

module.exports = router;