const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
   
  },
  {
    timestamps: true,
  }
);

module.exports= mongoose.model("tasks",taskSchema)