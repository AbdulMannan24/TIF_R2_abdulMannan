const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());


// routes



app.listen(PORT, ()=> {
    console.log(`Server Started: ${PORT}`);

})