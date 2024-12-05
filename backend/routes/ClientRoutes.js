const express = require("express");
const router = express.Router();
const {
  addClientManager,
  getAllClientManagers,
  getClientManagerById,
  updateClientManager,
  deleteClientManager,
} = require("../controllers/ClientController");

// Add a new Client Manager
router.post("/", addClientManager);

// Get all Client Managers
router.get("/", getAllClientManagers);

// Get a Client Manager by ID
router.get("/:id", getClientManagerById);

// Update a Client Manager by ID
router.put("/:id", updateClientManager);

// Delete a Client Manager by ID
router.delete("/:id", deleteClientManager);

module.exports = router;
