const express = require('express');
const router = express.Router();

// routes
const signUpRoute = require('./auth/signUp');
router.use('/signUp', signUpRoute);

const signInRoute = require('./auth/signIn');
router.use('/signIn', signInRoute);

const getMeRoute = require('./auth/getMe');
router.use('/me', getMeRoute);

// const user = require('../models/User');
// router.get('/', async (req, res) => {
//     try {
//         let page = parseInt(req.query.page) || 1;
//         let total = await user.countDocuments();
//         let skipDocuments = (page - 1) * 10;
//         let pages = Math.ceil(total/10);
//         let result = await user.find().skip(skipDocuments).limit(10);
//         let response = {
//             "status": true,
//             "content": {
//                 "meta": {
//                     "total": total,
//                     "pages": pages,
//                     "page": page
//                 },
//                 "data": result
//             }
//         }
//         res.json(response);
//     } catch (err) {
//         console.log(err);
//         res.json({message: "Api Call Failed"});
//     }
// })
// delete this part 
// router.get('/', (req, res) => {
//     console.log('route: v1/auth');
//     res.status(200);
// })

module.exports = router;