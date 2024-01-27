const express = require('express');
const router = express.Router();

// routes
const addMemberRoute = require('./member/addMember');
router.use('/', addMemberRoute);

const removeMemberRoute = require('./member/removeMember');
router.use('/', removeMemberRoute);

// router.get('/', (req, res) => {
//     console.log('route: v1/member');
//     res.status(200);
// })

module.exports = router;