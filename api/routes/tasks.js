const express = require("express");
const router = express.Router();

// Mock data
let tasks = [
  { id: 1, descricao: "Task 1", status: "pendente" },
  { id: 2, descricao: "Task 2", status: "completa" },
];

// Get all tasks
router.get("/", (req, res) => {
  res.json(tasks);
});

// Get a single task by ID
router.get("/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send("Task not found");
  res.json(task);
});

// Create a new task
router.post("/", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    descricao: req.body.descricao,
    status: req.body.status || "pendente",
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update a task
router.put("/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send("Task not found");

  task.descricao = req.body.descricao;
  task.status = req.body.status;
  res.json(task);
});

// Delete a task
router.delete("/:id", (req, res) => {
  const taskIndex = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  if (taskIndex === -1) return res.status(404).send("Task not found");

  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

module.exports = router;
