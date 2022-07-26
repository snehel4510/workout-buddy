const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
require('dotenv').config()

const app = express();

// this middleware will parse the request body while sending data to the server via a POST/PUT/PATCH request
app.use(express.json());

app.use((req,res,next) => {
    console.log(req.path, req.method);
    next();
})

app.use('/api/workouts',workoutRoutes)

const port = process.env.PORT;
const uri = process.env.MONGO_URI;
mongoose.connect(uri)
    .then(() => {
        app.listen(port, () => {
            console.log(`connected to the database,Server is running on port ${port}`);
        });
    })
    .catch(err => console.error(err));

