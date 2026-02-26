const express = require('express')
const router = express.Router()

const {
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require('../controller/listController')
const { signup, login } = require('../controller/authController')
const protect = require('../middleware/middleware')

// authentication
router.post('/signup', signup)
router.post('/login', login)

// task routes
router.post('/createTask', protect, createTask)

router.get('/getTask', protect, getTask)

router.put('/tasks/:id', protect, updateTask)

router.delete('/tasks/:id', protect, deleteTask)

module.exports = router
