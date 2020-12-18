const db = require("../models");
const User = db.user;
const Role = db.role;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.keeperBoard = (req, res) => {
  res.status(200).send("Keeper Content.");
};

exports.findAllUsers = (req, res) => {
  Role.findOne({ name: "user" })
    .then(role => {
      User.find({ roles: [role._id] }) //contains only user role
        .then(users => {
          if (!users)
            res.status(404).send({ message: "No users found." })
          else res.send(users);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving users."
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving role id."
      });
    });
};

exports.assignKeeperRole = (req, res) => {
  const id = req.params.id;

  Role.findOne({ name: "keeper" })
    .then(role => {
      User.findByIdAndUpdate(id, { $push: { roles: role._id } }, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update user with id=${id}. Maybe user was not found!`
            });
          } else res.send({ message: "Role assigned successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving users."
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving role id."
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete user with id=${id}. Maybe user was not found!`
        });
      } else {
        res.send({
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user."
      });
    });
};