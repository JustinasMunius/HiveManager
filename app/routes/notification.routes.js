module.exports = app => {
    const notif = require("../controllers/notification.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Data
    router.post("/", notif.create);

    // Retrieve all Data
    router.get("/", notif.findAll);
  
    // Retrieve a single Data with id
    router.get("/:id", notif.findOne);
  
    // Update a Data with id
    router.put("/:id", notif.update);
  
    // Delete a Data with id
    router.delete("/:id", notif.delete);
  
    // Delete all Data
    router.delete("/", notif.deleteAll);
  
    app.use('/api/notifications', router);
  };