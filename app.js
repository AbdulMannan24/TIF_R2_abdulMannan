const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const db = require('./db');
const user = require('./models/User.js');
const {Snowflake} = require('@theinternetfolks/snowflake');

// middlewares
app.use(express.json());


// routes
const roleRoutes = require('./routes/role.js');
app.use('/v1/role', roleRoutes);

const authRoutes = require('./routes/auth.js');
app.use('/v1/auth', authRoutes);

const communityRoutes = require('./routes/community.js');
app.use('/v1/community', communityRoutes);

const memberRoutes = require('./routes/member.js');
app.use('/v1/member', memberRoutes);

app.get('/', async(req, res) => {
    res.json({message: "check for routes on V1-> /v1"});
})


app.get('/v1', (req, res) => {
    res.json({message: "Api Server Working..."});
})


app.listen(PORT, (req, res) => {
    console.log(`Server Started: ${PORT}`);
    db();
})