// build your `Task` model here
const db = require("../../data/dbConfig");

function getTasks() {
  return db("tasks as t")
    .join("projects as p", "t.project_id", "p.project_id")
    .select(
      "t.task_id",
      "t.task_description",
      "t.task_notes",
      "t.task_completed",
      "p.project_name",
      "p.project_description"
    )
    .then((tasks) =>
      tasks.map((task) => ({
        ...task,
        task_completed: Boolean(task.task_completed),
        project_completed: Boolean(task.project_completed),
      }))
    );
}

function getTaskById(taskId) {
  return db("tasks as t")
    .join("projects as p", "t.project_id", "p.project_id")
    .select(
      "t.task_id",
      "t.task_description",
      "t.task_notes",
      "t.task_completed",
      "p.project_name",
      "p.project_description"
    )
    .where("t.task_id", taskId)
    .first()
    .then((task) => ({
      ...task,
      task_completed: Boolean(task.task_completed),
    }));
}

function addTask(task) {
  return db("tasks").insert(task);
}


module.exports = {
  getTasks,
  addTask,
  getTaskById,
};