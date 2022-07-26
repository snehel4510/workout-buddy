const Workout = require('../models/workouts_model')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find().sort({ createdAt: -1 })
        res.status(200).send(workouts)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

// get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params
    // validate the mongodb object id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send('Invalid id')
    }
    const workout = await Workout.findById(id)
    if(!workout) {
        res.status(404).send({ message: 'Workout not found' })
    }
    res.status(200).send(workout)
}

// post a new workout
const postWorkout = async (req, res) => {
    const { title, reps, load } = req.body
    try {
        const workout = await Workout.create({ title, reps, load })
        res.status(200).send(workout)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

// delete a workout

// update a workout

module.exports = {
    postWorkout,
    getWorkouts,
    getWorkout
}