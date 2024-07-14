// utils/auth.js
import axios from 'axios'; 

export const isAuthenticated = () => {
  const token = localStorage.getItem('access_token');

  if (!token) {
    return false;
  }

  return true;
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  // Reset Axios headers
  axios.defaults.headers['Authorization'] = '';
};
