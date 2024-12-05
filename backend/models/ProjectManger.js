const mongoose = require("mongoose");

const projectManagerSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "ClientManager", required: true },
}, { timestamps: true });

module.exports = mongoose.model("ProjectManager", projectManagerSchema);
