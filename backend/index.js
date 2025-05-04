// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();
// const port = 3001;

// app.use(cors());
// app.use(express.json());


// mongoose.connect('mongodb://localhost:27017/mydatabase')
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('MongoDB error:', err));

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });



const express = require('express');
const app = express();
const port = 3001;
const cors = require("cors");

 app.use(cors());


app.use(express.json());

let tasks = [];
let currentId = 1;

app.post('/addTask', (req, res) => {
  const { taskName } = req.body;
  if (!taskName) return res.status(400).json({ message: 'taskName is required' });
  const newTask = { id: currentId++, taskName };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.delete('/task/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(task => task.id === id);
  if (index === -1) return res.status(404).json({ message: 'Task not found' });
  const deleted = tasks.splice(index, 1);
  res.json(deleted[0]);
});

app.put('/task/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { taskName } = req.body;
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  task.taskName = taskName;
  res.json(task);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
