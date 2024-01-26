const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

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

app.get('/', (req, res) => {
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

})