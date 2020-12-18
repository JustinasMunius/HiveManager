const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.tutorials = require("./tutorial.model.js")(mongoose, mongoosePaginate);

db.hive = require("./hive.model.js");
db.data = require("./data.model.js");
db.note = require("./note.model.js");
db.notification = require("./notification.model.js");

db.user = require("./user.model");
db.role = require("./role.model");

db.ROLES = ["user", "admin", "keeper"];

module.exports = db;