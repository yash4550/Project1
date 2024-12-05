const ProjectManager = require("../models/ProjectManager");
const ClientManager = require("../models/ClientManager");

// Create a new project
exports.addProject = async (req, res) => {
  try {
    const { projectName, clientId } = req.body;

    // Verify the client exists
    const client = await ClientManager.findById(clientId);
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    const newProject = new ProjectManager({ projectName, clientId });
    await newProject.save();

    res.status(201).json({ message: "Project created successfully", data: newProject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create project" });
  }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await ProjectManager.find().populate("clientId", "name email");
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

// Get a project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await ProjectManager.findById(req.params.id).populate("clientId", "name email");
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch project" });
  }
};

// Update a project by ID
exports.updateProject = async (req, res) => {
  try {
    const { projectName, clientId } = req.body;

    // Verify the client exists
    if (clientId) {
      const client = await ClientManager.findById(clientId);
      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }
    }

    const updatedProject = await ProjectManager.findByIdAndUpdate(
      req.params.id,
      { projectName, clientId },
      { new: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({ message: "Project updated successfully", data: updatedProject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update project" });
  }
};

// Delete a project by ID
exports.deleteProject = async (req, res) => {
  try {
    const project = await ProjectManager.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete project" });
  }
};
