//const { hive } = require("../models");
const db = require("../models");
const Data = db.data;
const Hive = db.hive;

// Create and Save a new data with hive id
exports.create = (req, res) => {
  // Validate request
  if (!req.body.hive) {
    res.status(400).send({ message: "Hive id must be specified!" });
    return;
  }

  Hive.findById(req.body.hive)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Hive not found with id " + req.body.hive });
      else {
        // Create a Data
        const dataa = new Data({
          temperature: req.body.temperature,
          humidity: req.body.humidity,
          pressure: req.body.pressure,
          weight: req.body.weight,
          hive: req.body.hive
        });

        // Save data in the database
        dataa
          .save(dataa)
          .then(data2 => {
            res.send(data2);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the data."
            });
          });
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving hive data with id=" + req.body.hive});
    });
};

// Retrieve all data from the database.
exports.findAll = (req, res) => {
  const hive = req.query.hive;
  var condition = hive ? { hive: hive } : {};

  Data.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data."
      });
    });
};

// Find a single data with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Data.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found data with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving data with id=" + id });
    });
};

// Update a data by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Data.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update data with id=${id}. Maybe data was not found!`
        });
      } else res.send({ message: "Data was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating data with id=" + id
      });
    });
};

// Delete data with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Data.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete data with id=${id}. Maybe data was not found!`
        });
      } else {
        res.send({
          message: "Data was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete data with id=" + id
      });
    });
};

// Delete all data from the database.
exports.deleteAll = (req, res) => {
  Data.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} data were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all data."
      });
    });
};