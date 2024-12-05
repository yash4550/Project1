import React, { useState } from 'react';
import "../styles/ClientManager.css";

const ClientManager = () => {
  const [clients, setClients] = useState([]); // To store client data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsappNumber: '',
    contactNumber: '',
    description: '',
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.whatsappNumber || !formData.contactNumber) {
      setError('Please fill in all required fields.');
      return;
    }

    // Add the new client data to the list
    setClients([...clients, formData]);

    // Reset the form
    setFormData({
      name: '',
      email: '',
      whatsappNumber: '',
      contactNumber: '',
      description: '',
    });

    setError('');
  };

  return (
    <div className="client-manager-container">
      <h2>Client Manager</h2>

      {/* Client Form */}
      <form onSubmit={handleSubmit} className="client-form">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="str"
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
          <label htmlFor="whatsappNumber">WhatsApp Number *</label>
          <input
            type="number"
            id="whatsappNumber"
            name="whatsappNumber"
            value={formData.whatsappNumber}
            onChange={handleInputChange}
            placeholder="Enter WhatsApp number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number *</label>
          <input
            type="number"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            placeholder="Enter contact number"
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
                  <td>{client.contactNumber}</td>
                  <td>{client.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default ClientManager;
