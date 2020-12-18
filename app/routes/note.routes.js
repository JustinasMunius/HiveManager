module.exports = app => {
  const note = require("../controllers/note.controller.js");

  var router = require("express").Router();

  // Create a new Data
  router.post("/", note.create);

  // Retrieve all Data
  router.get("/", note.findAll);

  // Retrieve a single note with id
  router.get("/:id", note.findOne);

  // Update a note with id
  router.put("/:id", note.update);

  // Delete a note with id
  router.delete("/:id", note.delete);

  app.use('/api/notes', router);
};