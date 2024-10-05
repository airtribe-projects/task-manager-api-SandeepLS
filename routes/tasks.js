const express = require("express");
const router = express.Router();
let tasks = require("../task.json").tasks;

router.get("/", (req, res) => {
  res.status(200).json(tasks);
});

router.get("/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).send("Task not found");
  }
  res.status(200).json(task);
});

router.post("/", (req, res) => {
  const { title, description, completed } = req.body;
  if (!title || !description || typeof completed !== "boolean") {
    return res.status(400).send("Invalid input");
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    completed,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.put("/:id", (req, res) => {
  const { title, description, completed } = req.body;
  const task = tasks.find((t) => t.id === parseInt(req.params.id));

  if (!task) return res.status(404).send("Task not found");

  if (!title || !description || typeof completed !== "boolean") {
    return res.status(400).send("Invalid input");
  }

  task.title = title;
  task.description = description;
  task.completed = completed;
  res.status(200).json(task);
});

router.delete("/:id", (req, res) => {
  const taskIndex = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  if (taskIndex === -1) return res.status(404).send("Task not found");

  tasks.splice(taskIndex, 1);
  res.status(200).send("Task deleted");
});

module.exports = router;
