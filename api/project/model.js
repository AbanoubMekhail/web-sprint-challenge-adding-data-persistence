// build your `Project` model here

const db = require("../../data/dbConfig");

function getProjects() {
  return db("projects")
  .select("project_id", "project_name", "project_description", "project_completed")
  .then((projects) =>
    projects.map((project) => ({
      ...project,
      project_completed: Boolean(project.project_completed),
    }))
  );
}

function addProject(project) {
  return db("projects")
    .insert(project)
    .then(([projectId]) =>
      db("projects")
        .where({ project_id: projectId })
        .first()
        .then((newProject) => ({
          ...newProject,
          project_completed: Boolean(newProject.project_completed),
        }))
    );
}

// Additional functions for updating and deleting projects if needed

module.exports = {
  getProjects,
  addProject,
};