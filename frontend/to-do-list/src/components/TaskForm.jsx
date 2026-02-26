import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './TaskForm.css'
function TaskForm({ editingTask, setEditingTask, fetchTasks }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState('Low')

  const navigate = useNavigate()

  // ✅ Pre-fill only if editing real task
  useEffect(() => {
    if (editingTask && editingTask._id) {
      setTitle(editingTask.title || '')
      setDescription(editingTask.description || '')

      if (editingTask.dueDate) {
        const formattedDate = editingTask.dueDate.split('T')[0]
        setDueDate(formattedDate)
      }

      setPriority(editingTask.priority || 'Low')
    } else {
      // 🆕 Create mode → clear form
      setTitle('')
      setDescription('')
      setDueDate('')
      setPriority('Low')
    }
  }, [editingTask])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        alert('Please login first')
        navigate('/')
        return
      }

      // ✅ UPDATE only if _id exists
      if (editingTask && editingTask._id) {
        await axios.put(
          `http://localhost:5000/api/tasks/${editingTask._id}`,
          { title, description, dueDate, priority },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )

        alert('Task Updated ✅')
      } else {
        // ✅ CREATE
        await axios.post(
          'http://localhost:5000/api/createTask',
          { title, description, dueDate, priority },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )
      }

      fetchTasks()
      setEditingTask(null)
    } catch (error) {
      alert(error.response?.data?.message || 'Something went wrong ❌')
    }
  }

  return (
    <div className='task-container'>
      <form onSubmit={handleSubmit} className='task-form'>
        <input
          type='text'
          placeholder='Task Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder='Task Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type='date'
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value='Low'>Low</option>
          <option value='Medium'>Medium</option>
          <option value='High'>High</option>
        </select>

        <button type='submit'>
          {editingTask && editingTask._id ? 'Update Task' : 'Create Task'}
        </button>
      </form>
    </div>
  )
}

export default TaskForm
