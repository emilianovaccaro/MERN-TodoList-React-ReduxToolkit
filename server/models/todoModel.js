const mongoose = require('mongoose');


const todoSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },  
  title: {
      type: String,
      required: [true, 'please add a title']
    }
  }, 
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Todo', todoSchema);