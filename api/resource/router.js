// build your `/api/resources` router here
const express = require("express");
const Resources = require("./model");

const router = express.Router();

router.get("/", (req, res) => {
  Resources.getResources()
    .then((resources) => {
      res.status(200).json(resources);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Error retrieving resources" });
    });
});

router.post("/", (req, res) => {
  const resourceData = req.body;

  Resources.addResource(resourceData)
  .then((resourceId) => {
    return Resources.getResourceById(resourceId);
  })
  .then((newResource) => {
    res.status(201).json(newResource);
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json({ error: "Error adding resource" });
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