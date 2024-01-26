const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  title: {
    type: String,
    required: [true, "Must provide a title for the task"],
    maxlength: [24, "title must not exceed 24 characters"],
  },
  name: {
    type: String,
  },
  color: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  taskType: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
