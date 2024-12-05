const mongoose = require("mongoose");

const clientManagerSchema = new mongoose.Schema({
  name: { 
    type: String, required: true 
},
  email: { 
    type: String, required: true, unique: true 
},
  whatsappNumber: { 
    type: String, required: true 
},
  contactNumber: { 
    type: String, required: true 
},
  description: { 
    type: String 
},
}, { timestamps: true });

module.exports = mongoose.model("ClientManager", clientManagerSchema);
