// build your `/api/projects` router here
const router = require('express').Router()
const Projects = require("./model");

router.get("/", (req, res) => {
    Projects.getProjects()
      .then((projects) => {
        res.status(200).json(projects);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: "Error retrieving projects" });
      });
  });
  
  router.post("/", (req, res) => {
    const projectData = req.body;
  
    Projects.addProject(projectData)
      .then((project) => {
        res.status(201).json(project);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: "Error adding project" });
      });
  });

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(500).json({
        customMessage: 'somthing went wrong inside the project router',
        message: err.message,
        stack: err.stack
    })
})

module.exports = router