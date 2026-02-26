const Task = require('../model/listModel')

const createTask = async (req, res) => {
  try {
    console.log('Creating Task User:', req.userId) // DEBUG

    const { title, description, dueDate, priority } = req.body

    const newTask = new Task({
      title,
      description,
      dueDate,
      priority,
      user: req.userId,
    })

    const savedTask = await newTask.save()
    res.status(201).json(savedTask)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getTask = async (req, res) => {
  try {
    console.log('Fetching Task User:', req.userId) // DEBUG

    const task = await Task.find({ user: req.userId })
    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    if (task.user.toString() !== req.userId) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    const { title, description, dueDate, priority } = req.body

    task.title = title || task.title
    task.description = description || task.description
    task.dueDate = dueDate || task.dueDate
    task.priority = priority || task.priority

    const taskSaved = await task.save()

    return res.status(200).json(taskSaved)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    if (!task) {
      return res.status(404).json({ message: 'Task was not found' })
    }
    //every task has it owner id is user
    //from middleware we can authorize it
    if (task.user.toString() !== req.userId) {
      return res.json({ message: 'Not authorized' })
    }
    await task.deleteOne()
    res.status(200).json({ message: 'Task was deleted sucessfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { createTask, getTask, updateTask, deleteTask }
