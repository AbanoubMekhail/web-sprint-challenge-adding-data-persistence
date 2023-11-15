// build your `Project` model here

const db = require("../../data/dbConfig");

function getProjects() {
  return db("projects");
}

function addProject(project) {
  return db("projects").insert(project);
}

// Additional functions for updating and deleting projects if needed

module.exports = {
  getProjects,
  addProject,
};