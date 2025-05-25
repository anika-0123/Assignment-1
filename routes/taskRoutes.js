const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Display all tasks
router.get('/tasks', taskController.getAllTasks);

// Show create task form
router.get('/tasks/create', (req, res) => {
  res.render('create');
});

// Handle create task POST
router.post('/tasks/create', taskController.createTask);

// Show edit form for a task
router.get('/tasks/edit/:id', taskController.showEditForm);

// Handle update task POST
router.post('/tasks/edit/:id', taskController.updateTask);

// Handle delete task POST
router.post('/tasks/delete/:id', taskController.deleteTask);

module.exports = router;
