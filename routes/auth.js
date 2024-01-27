const express = require('express');
const router = express.Router();

// routes
const signUpRoute = require('./auth/signUp');
router.use('/signUp', signUpRoute);

const signInRoute = require('./auth/signIn');
router.use('/signIn', signInRoute);

const getMeRoute = require('./auth/getMe');
router.use('/me', getMeRoute);


// delete this part 
// router.get('/', (req, res) => {
//     console.log('route: v1/auth');
//     res.status(200);
// })

module.exports = router;