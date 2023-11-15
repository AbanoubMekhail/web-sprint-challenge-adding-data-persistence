// build your `/api/tasks` router here
const express = require("express");
const Tasks = require("./model");

const router = express.Router();

router.get("/", (req, res) => {
  Tasks.getTasks()
    .then((tasks) => {
      res.status(200).json(tasks);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Error retrieving tasks" });
    });
});

router.post("/", (req, res) => {
  const taskData = req.body;

  Tasks.addTask(taskData)
    .then((taskId) => {
      return Tasks.getTaskById(taskId);
    })
    .then((newTask) => {
      res.status(201).json(newTask);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Error adding task" });
    });
});

router.use((err, req, res, next) => { //eslint-disable-line
  res.status(500).json({
    customMessage: 'somthing went wrong inside the project router',
    message: err.message,
    stack: err.stack
  })
})

module.exports = router;