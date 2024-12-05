import React, { useState } from "react";
import "../styles/ClientManager.css";
import {addClient, getClients, getClientById, updateClient, deleteClient} from '../services/api';

const ClientManager = () => {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsappNumber: "",
    contactNumber: "",
    countryCode: "+91", // Default country code
    description: "",
  });
  const [error, setError] = useState("");

  

  // Mapping of country codes to allowed contact number lengths
  const countryCodeToLength = {
    "+1": 10, // USA
    "+91": 10, // India
    "+44": 10, // UK
    "+61": 9,  // Australia
    "+81": 10, // Japan
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "contactNumber") {
      // Get the maximum digit length for the selected country code
      const maxDigits = countryCodeToLength[formData.countryCode] || 15; // Default max length is 15
      if (value.length > maxDigits) return; // Prevent exceeding allowed digits
    }

    if (name === "whatsappNumber" && value.length > 10) {
      return; // WhatsApp number must always be 10 digits
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const maxDigits = countryCodeToLength[formData.countryCode] || 15; // Get the allowed digit length
    if (!formData.name || !formData.email || !formData.whatsappNumber || !formData.contactNumber) {
      setError("Please fill in all required fields.");
      return false;
    }

    if (formData.whatsappNumber.length !== 10) {
      setError("WhatsApp Number must be exactly 10 digits.");
      return false;
    }

    if (formData.contactNumber.length !== maxDigits) {
      setError(
        `Contact Number must be exactly ${maxDigits} digits for the selected country code (${formData.countryCode}).`
      );
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setClients((prevClients) => [
      ...prevClients,
      { ...formData, id: new Date().getTime() }, // Use timestamp as a unique ID
    ]);

    // Reset form
    setFormData({
      name: "",
      email: "",
      whatsappNumber: "",
      contactNumber: "",
      countryCode: "+91",
      description: "",
    });
    setError("");
  };

  return (
    <div className="client-manager-container">
      <h2>Client Manager</h2>

      {/* Client Form */}
      <form onSubmit={handleSubmit} className="client-form">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number *</label>
          <div className="contact-number-container">
            <select
              id="countryCode"
              name="countryCode"
              value={formData.countryCode}
              onChange={handleInputChange}
              className="country-code-dropdown"
            >
              <option value="+1">+1 (USA)</option>
              <option value="+91">+91 (India)</option>
              <option value="+44">+44 (UK)</option>
              <option value="+61">+61 (Australia)</option>
              <option value="+81">+81 (Japan)</option>
              {/* Add more country codes as needed */}
            </select>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              placeholder="Enter contact number"
              className="contact-number-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="whatsappNumber">WhatsApp Number *</label>
          <input
            type="text"
            id="whatsappNumber"
            name="whatsappNumber"
            value={formData.whatsappNumber}
            onChange={handleInputChange}
            placeholder="Enter WhatsApp number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter additional details (optional)"
          ></textarea>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="submit-button">
          Add Client
        </button>
      </form>

      {/* Client List */}
      <div className="client-list">
        <h3>Client List</h3>
        {clients.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>WhatsApp Number</th>
                <th>Contact Number</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => (
                <tr key={index}>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{client.whatsappNumber}</td>
                  <td>
                    {client.countryCode} {client.contactNumber}
                  </td>
                  <td>{client.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No clients found.</p>
        )}
      </div>
    </div>
  );
};

export default ClientManager;
