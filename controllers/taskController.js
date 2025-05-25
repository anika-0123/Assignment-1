const Task = require('../models/taskModel');

// Show all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.render('index', { tasks });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Show create task form (handled directly in route above)

// Create new task
exports.createTask = async (req, res) => {
  try {
    await Task.create(req.body);
    res.redirect('/tasks');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Show edit form
exports.showEditForm = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send('Task not found');
    res.render('edit', { task });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    await Task.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/tasks');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect('/tasks');
  } catch (err) {
    res.status(500).send(err.message);
  }
};
