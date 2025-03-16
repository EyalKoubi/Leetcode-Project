const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  videoUrl: { type: String, required: true },
  codeUrl: { type: String, required: true },
});

const Problem = mongoose.model("Problem", ProblemSchema);
module.exports = Problem;
