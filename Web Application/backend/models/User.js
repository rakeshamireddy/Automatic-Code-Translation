const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: { 
    type: Date,
    default: Date.now
  },
  translations: [
    {
      date: {
        type: Date,
        default: Date.now
      },
      sourceLang: {
        type: String,
        required: true,
      },
      sourceFile:
        {
        file: { type: String },
        }
      ,
      targetLang: {
        type: String,
        required: true,
      },
      outputFile:
        {
        file: { type: String },
        }
      ,
    },
  ]
});

module.exports = User = mongoose.model('user', UserSchema);
