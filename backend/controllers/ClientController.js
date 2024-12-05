const ClientManager = require("../models/ClientManger");

// Create a new client manager
exports.addClientManager = async (req, res) => {
  try {
    const { name, email, whatsappNumber, contactNumber, description } = req.body;
    const newClientManager = new ClientManager({ name, email, whatsappNumber, contactNumber, description });
    await newClientManager.save();
    res.status(201).json({ message: "Client Manager added successfully", data: newClientManager });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add Client Manager" });
  }
};

// Get all client managers
exports.getAllClientManagers = async (req, res) => {
  try {
    const clientManagers = await ClientManager.find();
    res.status(200).json(clientManagers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch Client Managers" });
  }
};

// Get a single client manager by ID
exports.getClientManagerById = async (req, res) => {
  try {
    const clientManager = await ClientManager.findById(req.params.id);
    if (!clientManager) return res.status(404).json({ error: "Client Manager not found" });
    res.status(200).json(clientManager);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch Client Manager" });
  }
};

// Update a client manager by ID
exports.updateClientManager = async (req, res) => {
  try {
    const { name, email, whatsappNumber, contactNumber, description } = req.body;
    const clientManager = await ClientManager.findByIdAndUpdate(
      req.params.id,
      { name, email, whatsappNumber, contactNumber, description },
      { new: true }
    );
    if (!clientManager) return res.status(404).json({ error: "Client Manager not found" });
    res.status(200).json({ message: "Client Manager updated successfully", data: clientManager });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update Client Manager" });
  }
};

// Delete a client manager by ID
exports.deleteClientManager = async (req, res) => {
  try {
    const clientManager = await ClientManager.findByIdAndDelete(req.params.id);
    if (!clientManager) return res.status(404).json({ error: "Client Manager not found" });
    res.status(200).json({ message: "Client Manager deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete Client Manager" });
  }
};
