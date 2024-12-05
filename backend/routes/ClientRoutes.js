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
router.post("/add", addClientManager);

// Get all Client Managers
router.get("/get", getAllClientManagers);

// Get a Client Manager by ID
router.get("/:id", getClientManagerById);

// Update a Client Manager by ID
router.put("/update/:id", updateClientManager);

// Delete a Client Manager by ID
router.delete("/delete/:id", deleteClientManager);

module.exports = router;
