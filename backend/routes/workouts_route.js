const express = require('express')

const Workout = require('../models/workouts_model')

const router = express.Router()

// get all workouts
router.get('/', (req, res) => {
    res.send('Workouts')
})

// get a single workout
router.get('/:id', (req, res) => {
    const id = req.params.id
    res.send(`Workout get ${id}`)
})

// post a new workout
router.post('/', async (req, res) => {
    const { title, reps, load } = req.body
    try {
        const workout = await Workout.create({ title, reps, load })
        res.status(200).send(workout)
        // workout.save()
        //     .then(() => res.send(workout))
        //     .catch(err => res.send(err))
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// delete a workout
router.delete('/:id', (req, res) => {
    const id = req.params.id
    res.send(`Workout delete ${id}`)
})

// update a workout
router.patch('/:id', (req, res) => {
    const id = req.params.id
    res.send(`Workout update ${id}`)
})

module.exports = router 