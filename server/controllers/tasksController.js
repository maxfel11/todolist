const Task = require("../models/Task");
const tryCatch = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllTask = tryCatch(async (req, res) => {
  const getId = req.user;
  const { searchTerm, sortBy, projectId, taskType } = req.query;
  let filter = {
    user: getId,
  };

  if (projectId && projectId.trim() !== "") {
    filter.project = projectId;
  }

  if (searchTerm) {
    filter.$or = [
      { title: { $regex: searchTerm, $options: "i" } },
      { name: { $regex: searchTerm, $options: "i" } },
    ];
  }

  let tasks;
  if (taskType === "notes") {
    console.log(taskType);
    console.log("backend");
    if (sortBy === "completed") {
      tasks = await Task.find({
        ...filter,
        completed: true,
        taskType: "notes",
      });
    } else if (sortBy === "incomplete") {
      tasks = await Task.find({
        ...filter,
        completed: false,
        taskType: "notes",
      });
    } else {
      tasks = await Task.find({ ...filter, taskType: "notes" });
    }
  } else {
    if (sortBy === "completed") {
      tasks = await Task.find({ ...filter, completed: true });
    } else if (sortBy === "incomplete") {
      tasks = await Task.find({ ...filter, completed: false });
    } else {
      tasks = await Task.find(filter);
    }
  }

  return res.status(200).json({ tasks });
});

const createTask = tryCatch(async (req, res) => {
  const { title, name, project, taskType, completed, color } = req.body;
  const getId = req.user;
  let projectId;
  if (project && project.trim() !== "") {
    projectId = project;
  } else {
    projectId = null;
  }
  if (!title) {
    return next(createCustomError(`title must not be empty`, 401));
  }
  const createtask = new Task({
    user: getId,
    title: title,
    name: name,
    project: projectId,
    taskType: taskType,
    completed,
    color,
  });

  await createtask.save();
  return res
    .status(201)
    .json({ message: `Task: ${title} created successfully` });
});

const deleteTask = tryCatch(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskId });
  console.log(task);
  if (!task) {
    return next(createCustomError(`No task with id : ${taskId}`, 404));
  }
  return res.status(200).json("Successfully deleted task");
});
const updateTask = tryCatch(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskId}`, 404));
  }
  return res.status(200).json({ task });
});

module.exports = {
  getAllTask,
  createTask,
  updateTask,
  deleteTask,
};
