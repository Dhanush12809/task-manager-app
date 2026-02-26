const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const authModel = require('../model/authModelSchema')

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }
    const hashedPass = await bcrypt.hash(password, 10)
    const existingUser = await authModel.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }
    const newUser = new authModel({
      name,
      email,
      password: hashedPass,
    })
    await newUser.save()
    res.status(201).json({
      message: 'User created successfully',
      userId: newUser._id,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'Invalid Credentials' })
  }
  const user = await authModel.findOne({ email })
  if (!user) {
    return res.status(400).json({ message: 'User not found' })
  }
  const verifyPass = await bcrypt.compare(password, user.password)
  if (!verifyPass) {
    return res.status(400).json({ message: 'Invalid password' })
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: '7d',
  })
  res.status(200).json({ message: 'Login Sucessfully', token })
}

module.exports = { signup, login }
