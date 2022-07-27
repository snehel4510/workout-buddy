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
    let emptyFields = []
    if(!title) {
        emptyFields.push('title')
    }
    if(!reps) {
        emptyFields.push('reps')
    }
    if(!load) {
        emptyFields.push('load')
    }
    if(emptyFields.length > 0) {
        return res.status(400).send({ error: `Please fill in all the fields`, emptyFields })
    }
    try {
        const workout = await Workout.create({ title, reps, load })
        res.status(200).send(workout)
    } catch (err) {
        res.status(400).send({error: err.message})
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send('Invalid id')
    }
    const workout = await Workout.findOneAndDelete({_id:id})
    if(!workout) {
        res.status(404).send({ message: 'Workout not found' })
    }
    // res.status(200).json({message: "Workout Deleted",workout})
    res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send('Invalid id')
    }
    const workout = await Workout.findByIdAndUpdate({_id:id}, {...req.body}, {new: true})
    if(!workout) {
        res.status(404).send({ message: 'Workout not found' })
    }
    // res.status(200).send({ message: 'Workout updated', workout })
    res.status(200).json(workout)
}

module.exports = {
    postWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}