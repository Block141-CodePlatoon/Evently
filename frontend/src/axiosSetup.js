import axios from 'axios';

// Create an instance of axios
const instance = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

// Add a request interceptor to include the token
instance.interceptors.request.use(
  config => {
    // Get the token from local storage or any other storage method
    const token = localStorage.getItem('token');
    
    // If the token exists, include it in the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;
