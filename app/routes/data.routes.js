module.exports = app => {
    const data = require("../controllers/data.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Data
    router.post("/", data.create);

    // Retrieve all Data
    router.get("/", data.findAll);
  
    // Retrieve a single Data with id
    router.get("/:id", data.findOne);
  
    // Update a Data with id
    router.put("/:id", data.update);
  
    // Delete a Data with id
    router.delete("/:id", data.delete);
  
    // Create a new Data
    router.delete("/", data.deleteAll);
  
    app.use('/api/data', router);
  };