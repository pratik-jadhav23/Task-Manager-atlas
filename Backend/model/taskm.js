const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  tasks: {
    type: [{
      task:String,
      isCompleted:Boolean
    }], // array of strings
    default: []
  }
});

const taskm = mongoose.model("tmtasks", userSchema);

module.exports = taskm;
