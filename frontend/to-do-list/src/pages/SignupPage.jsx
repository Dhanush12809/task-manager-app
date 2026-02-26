import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const responce = await axios.post('http://localhost:5000/api/signup', {
        name,
        email,
        password,
      })
      alert('Login sucessfull')
      navigate('/')
    } catch (error) {
      alert(error.response?.data?.message || 'Signup Failed ❌')
    }
  }
  return (
    <div className='login-container'>
      <form onSubmit={handleSubmit} className='login-form'>
        <input
          type='text'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Enter Name'
          required
        />

        <input
          type='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder=' email'
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
        <button type='submit'>create an account</button>
      </form>
    </div>
  )
}

export default SignupPage
