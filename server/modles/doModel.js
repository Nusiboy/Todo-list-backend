const mongoose = require("mongoose");

const { Schema } = mongoose;

const toDoModel = new Schema({
  task: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("ToDo", toDoModel);