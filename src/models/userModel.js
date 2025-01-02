const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    // verified: {
    //   type: Boolean,
    //   default: false,
    //   required: false,
    // },
    created_at: {
      type: Date,
      default: Date.now,
    },
  })

  const User = mongoose.model('User', userSchema);

module.exports = User