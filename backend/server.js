const express = require('express');
require('dotenv').config()

const app = express();

app.use((req,res,next) => {
    console.log(req.path, req.method);
    next();
})

app.get('/', (req, res) => {
    res.json({mssg : "welcome to the server"});
})

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});