// src/auth.js

import axios from 'axios';

// Register a new user
export const register = async (username, password, email) => {
  const response = await axios.post('http://localhost:8000/accounts/register/', {
    username,
    password,
    email
  });

  const data = response.data;

  if (response.status === 201) {
    localStorage.setItem('access', data.access);
    localStorage.setItem('refresh', data.refresh);
  } else {
    throw new Error(data.detail || 'Registration failed');
  }
};

// Login a user
export const login = async (username, password) => {
  const response = await axios.post('http://localhost:8000/api/auth/token/', {
    username,
    password
  });

  const data = response.data;

  if (response.status === 200) {
    localStorage.setItem('access', data.access);
    localStorage.setItem('refresh', data.refresh);
  } else {
    throw new Error(data.detail || 'Login failed');
  }
};

// Fetch protected data
export const fetchProtectedData = async () => {
  const access = localStorage.getItem('access');

  const response = await axios.get('http://localhost:8000/api/protected/', {
    headers: {
      'Authorization': `Bearer ${access}`
    }
  });

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error('Failed to fetch protected data');
  }
};
