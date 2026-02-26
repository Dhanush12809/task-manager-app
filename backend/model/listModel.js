const mongoose = require('mongoose')

const listModel = mongoose.Schema({
  user: {
    //these id sent from register to store the data for separate users
    type: mongoose.Schema.Types.ObjectId,
    ref: 'authModel',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  dueDate: {
    type: Date,
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Low',
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model('modelSchema', listModel)
