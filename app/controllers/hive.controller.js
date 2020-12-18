const db = require("../models");
const Hive = db.hive;
const Data = db.data;
const User = db.user;

// Create and Save a new hive
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Title can not be empty!" });
    return;
  }
  if (!req.body.keeper) {
    res.status(400).send({ message: "Keeper id is not specified" });
    return;
  }

  User.findById(req.body.keeper)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Keeper not found with id " + req.body.keeper });
      else {
        // Create hive
        const hive = new Hive({
          title: req.body.title,
          keeper: req.body.keeper
        });

        // Save hive in the database
        hive
          .save(hive)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the hive."
            });
          });
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving user data with id=" + req.body.hive });
    });
};

// Retrieve all hives from the database.
exports.findAll = (req, res) => {
  const keeper = req.query.keeper;
  var condition = keeper ? { keeper: keeper } : {};

  Hive.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving hives."
      });
    });
};

// Find a single hive with id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Hive.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Hive not found with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving hive with id=" + id });
    });
};

// Update hive by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Hive to update can not be empty!"
    });
  }

  const id = req.params.id;

  Hive.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update hive with id=${id}. Maybe hive was not found!`
        });
      } else res.send({ message: "Hive was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating hive with id=" + id
      });
    });
};

// Delete hive with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Hive.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete hive with id=${id}. Maybe hive was not found!`
        });
      } else {
        Data.deleteMany({ hive: id })
          .then(data => {
            res.send({
              message: `Hive and ${data.deletedCount} data logs were deleted successfully!`
            });
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while removing all data logs."
            });
          });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete hive with id=" + id
      });
    });
};