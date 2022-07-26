const express = require('express');
require('dotenv').config()

const app = express();
const workoutRoutes = require('./routes/workouts');

// this middleware will parse the request body while sending data to the server via a POST/PUT/PATCH request
app.use(express.json());

app.use((req,res,next) => {
    console.log(req.path, req.method);
    next();
})

app.use('/api/workouts',workoutRoutes)

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});