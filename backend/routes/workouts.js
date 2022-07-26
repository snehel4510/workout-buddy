const express = require('express')

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
router.post('/', (req, res) => {
    res.send('Post a new workout')
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