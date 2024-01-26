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
    // user.create({
    //     name: "test1",
    //     id: Snowflake.generate(),
    //     password: "test1",
    //     email: "test1@example.com"
    // })

    // let result = await user.find({name: "test"});
    // if (result.length > 0) {
    //     result = result[0];
    //     console.log(result);
    //     console.log("this is found in Db");
    //     let responseBody = {
    //         "status": true,
    //         "content": {
    //             "data": {
    //                 "id": result.id,
    //                 "name": result.name,
    //                 "email": result.email,
    //                 "created_at": result.created_at
    //             },
    //             "meta": {
    //                 "access_token": "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIyMDIwLTAxLTAxVDAwOjAwOjAwLjAwMFoiLCJpZCI6IjcwMzk4NzQyOTg4NjQ5OTQzMDMiLCJleHAiOiIyMDIwLTAxLTAyVDAwOjAwOjAwLjAwMFoifQ.0WNbCXm8hZBPmib5Q-d1RNJWLoNsHj1AGtfHtcCguI0"
    //             }
    //         }
    //     };
    //     res.json(responseBody);
    //     return;
    // } else {
    //     console.log("not found");
    // }
    res.json({
        message: `
            Api routes:
            -> /v1/role - has 2 sub routes
            -> /v1/auth - has 3 sub routes
            -> /v1/community - has 5 sub routes
            -> /v1/member - has 2 sub routes
        `
    });
})


app.get('/v1', (req, res) => {
    res.json({message: "Api Server Working..."});
})


app.listen(PORT, (req, res) => {
    console.log(`Server Started: ${PORT}`);
    db();
})