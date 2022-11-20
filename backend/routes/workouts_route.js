const express = require('express')
const { postWorkout,getWorkout,getWorkouts,deleteWorkout,updateWorkout } = require('../controllers/workouts_controller')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// authentication before accessing the workout routes
router.use(requireAuth)

// get all workouts
router.get('/', getWorkouts)

// get a single workout
router.get('/:id', getWorkout)

// post a new workout
router.post('/', postWorkout)

// delete a workout
router.delete('/:id', deleteWorkout)

// update a workout
router.patch('/:id', updateWorkout)

module.exports = router 