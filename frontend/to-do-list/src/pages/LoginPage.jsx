import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const responce = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      })
      localStorage.setItem('token', responce.data.token)
      alert('Login sucessfull')
      navigate('/dashboard')
    } catch (error) {
      alert(error.response?.data?.message || 'Login Failed ❌')
    }
  }
  return (
    <div className='login-container'>
      <form onSubmit={handleSubmit} className='login-form'>
        <input
          type='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter password'
          required
        />
        <input
          type='password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='password'
          required
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginPage
