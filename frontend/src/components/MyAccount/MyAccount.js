import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import axios from '../../axiosSetup';

const MyAccount = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('Fetching user data...');
        const response = await axios.get('/accounts/user/');
        console.log('Response received:', response.data); // Debugging log
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else if (error.request) {
          console.error('Request data:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
        setError('Failed to load user data.');
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!userData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Account
      </Typography>
      <Typography variant="body1">
        Username: {userData.username}
      </Typography>
      <Typography variant="body1">
        Email: {userData.email}
      </Typography>
      <Typography variant="body1">
        First Name: {userData.first_name}
      </Typography>
      <Typography variant="body1">
        Last Name: {userData.last_name}
      </Typography>
    </Box>
  );
};

export default MyAccount;
