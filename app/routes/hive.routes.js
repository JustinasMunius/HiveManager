module.exports = app => {
    const hive = require("../controllers/hive.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Hive
    router.post("/", hive.create);
  
    // Retrieve all Hives
    router.get("/", hive.findAll);
  
    // Retrieve a single Hive with id
    router.get("/:id", hive.findOne);
  
    // Update a Hive with id
    router.put("/:id", hive.update);
  
    // Delete a Hive with id
    router.delete("/:id", hive.delete);
  
    app.use('/api/hive', router);
  };