// src/components/Profile.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

// Example user data, replace this with actual user data fetching logic
const mockUserData = {
  name: '',
  email: '',
};

const Profile = () => {
  const [user, setUser] = useState(mockUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const navigate = useNavigate();

  // Simulate fetching user data on component mount
  useEffect(() => {
    // Replace with actual data fetching logic
    setUser(mockUserData);
    setFormData(mockUserData);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    // Simulate saving user data
    setUser(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(user);
  };

  const handleLogout = () => {
    // Perform logout logic here
    navigate('/');
  };

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      {isEditing ? (
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
