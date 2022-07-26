const express = require('express')
const { postWorkout,getWorkout,getWorkouts } = require('../controllers/workouts_controller')

const router = express.Router()

// get all workouts
router.get('/', getWorkouts)

// get a single workout
router.get('/:id', getWorkout)

// post a new workout
router.post('/', postWorkout)

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