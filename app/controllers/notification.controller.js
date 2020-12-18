const db = require("../models");
const Notification = db.notification;
const Hive = db.hive;

// Create a new notification with hive id
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
        // Create a notification
        const notif = new Notification({
          content: req.body.content,
          level: req.body.level,
          hive: req.body.hive
        });

        // Save data in the database
        notif
          .save(notif)
          .then(data2 => {
            res.send(data2);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating notification."
            });
          });
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving hive data with id=" + req.body.hive });
    });
};

// Retrieve all notifications from the database.
exports.findAll = (req, res) => {
  const hive = req.query.hive;
  var condition = hive ? { hive: hive } : {};

  Notification.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving notifications."
      });
    });
};

// Find a single notification with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Notification.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Notification not found with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving notification with id=" + id });
    });
};

// Update a notification by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Notification to update can not be empty!"
    });
  }

  const id = req.params.id;

  Notification.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update notification with id=${id}. Maybe notification was not found!`
        });
      } else res.send({ message: "Notification was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating notification with id=" + id
      });
    });
};

// Delete notification with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Notification.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete notification with id=${id}. Maybe notification was not found!`
        });
      } else {
        res.send({
          message: "Notification was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete notification with id=" + id
      });
    });
};

// Delete all notifications from the database.
exports.deleteAll = (req, res) => {
  Notification.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} notifications were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all notifications."
      });
    });
};