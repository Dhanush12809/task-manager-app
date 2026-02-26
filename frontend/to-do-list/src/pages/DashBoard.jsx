import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TaskForm from '../components/TaskForm'
import './DashBoard.css'

const Dashboard = () => {
  const [tasks, setTasks] = useState([])
  const [editingTask, setEditingTask] = useState(null)

  const getTasks = async () => {
    try {
      const token = localStorage.getItem('token')

      const res = await axios.get('http://localhost:5000/api/getTask', {
        headers: { Authorization: `Bearer ${token}` },
      })

      setTasks(res.data)
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    getTasks()
  }, [])

  const handleEdit = (task) => {
    setEditingTask(task)
  }

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token')

      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      getTasks()
    } catch (error) {
      console.log(error.response)
    }
  }

  return (
    <div className='dashboard-container'>
      <h2>Dashboard</h2>

      {/* + Button */}
      <button onClick={() => setEditingTask({})}>+</button>

      {/* Task Form */}
      {editingTask !== null && (
        <TaskForm
          editingTask={editingTask}
          setEditingTask={setEditingTask}
          fetchTasks={getTasks}
        />
      )}

      <div className='task-list'>
        {tasks.map((task) => (
          <div key={task._id} className='task-card'>
            <h3>{task.title}</h3>

            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
