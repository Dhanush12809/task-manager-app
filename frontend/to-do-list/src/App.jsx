import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/LoginPage'
import Dashboard from './pages/DashBoard'
import SignupPage from './pages/SignupPage'
import TaskForm from './components/TaskForm'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/createTask' element={<TaskForm />} />
      </Routes>
    </Router>
  )
}

export default App
