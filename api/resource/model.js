// build your `Resource` model here
const db = require("../../data/dbConfig");

function getResources() {
  return db("resources");
}

function getResourceById(resourceId) {
  return db("resources").where({ resource_id: resourceId }).first();
}

function addResource(resource) {
  return db("resources").insert(resource);
}


module.exports = {
  getResources,
  addResource,
  getResourceById,
};