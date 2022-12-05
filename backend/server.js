const express = require('express');
const mongoose = require('mongoose');
const path = require("path")

const workoutRoutes = require('./routes/workouts_route');
const userRoutes = require('./routes/user_routes');

require('dotenv').config()

const app = express();

// this middleware will parse the request body while sending data to the server via a POST/PUT/PATCH request
app.use(express.json());

app.use((req,res,next) => {
    console.log(req.path, req.method);
    next();
})

// registering the routes
app.use('/api/workouts',workoutRoutes)
app.use('/api/user',userRoutes)

app.use(express.static(path.join(__dirname,"../frontend/build")));

app.get("*" , (req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
})

// mongodb://localhost:27017
const port = process.env.PORT;
const uri = process.env.MONGO_URI;
mongoose.connect(uri)
    .then(() => {
        app.listen(port, () => {
            console.log(`connected to the database,Server is running on port ${port}`);
        });
    })
    .catch(err => console.error(err));

