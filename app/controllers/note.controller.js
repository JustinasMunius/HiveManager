const { user } = require("../models");
const db = require("../models");
const Note = db.note;
const Hive = db.hive;
const User = db.user;

// Create a new note with user id
exports.create = (req, res) => {
  // Validate request
  if (!req.body.user) {
    res.status(400).send({ message: "User id must be specified!" });
    return;
  }

  /*// Create a notification
  const note = new Note({
    content: req.body.content
  });

  // Save data in the database
  note
    .save(note)
    .then(data => {
      User.findByIdAndUpdate(req.body.user,
        { $push: { notes: data.id } },
        { new: true, useFindAndModify: false },
        function (err, response) {
          // Handle any possible database errors
          if (err) {
            res.status(500).send({
              message:
                err.message || "Some error occurred while adding note to user."
            });
          }
          res.send(response);
        }
      );
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating note."
      });
    });*/


  User.findById(req.body.user)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "User not found with id " + req.body.user });
      else {
        // Create a note
        const note = new Note({
          content: req.body.content
        });

        // Save data in the database
        note
          .save(note)
          .then(data2 => {
            //Assign note to user
            User.updateOne(
              { "_id": req.body.user },
              { $push: { notes: data2.id } }
            ).exec();
            res.send(data2);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating note."
            });
          });
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving user data with id=" + req.body.user });
    });
};

// Retrieve all notifications from the database.
exports.findAll = (req, res) => {
  const user = req.query.user;
  var condition = user ? { user: user } : {};

  Note.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving notes."
      });
    });
};

// Find a single note with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Note.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Note not found with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving note with id=" + id });
    });
};

// Update a note by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Note to update can not be empty!"
    });
  }

  const id = req.params.id;

  Note.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update note with id=${id}. Maybe note was not found!`
        });
      } else res.send({ message: "Note was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating note with id=" + id
      });
    });
};

// Delete note with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Note.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete note with id=${id}. Maybe note was not found!`
        });
      } else {
        User.updateOne(
          { notes: req.params.id },
          { $pull: { notes: req.params.id }}, 
          { useFindAndModify: false }
          ).exec();
        res.send({
          message: "Note was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete note with id=" + id
      });
    });
};
/*
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
};*/