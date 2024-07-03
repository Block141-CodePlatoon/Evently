import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import axios from '../../axiosSetup';
import { jwtDecode } from 'jwt-decode'; // Correct named import

const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [host, setHost] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log('Decoded Token:', decodedToken);
      setHost(decodedToken.user_id); // Ensure this key matches your token structure
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const eventData = {
      title,
      description,
      date,
      location,
      host,
    };

    console.log('Event Data to be sent:', eventData);

    try {
      console.log('Sending POST request to /api/events/');
      const response = await axios.post('/api/events/', eventData);
      console.log('Response received:', response);
      // Clear the form
      setTitle('');
      setDescription('');
      setDate('');
      setLocation('');
    } catch (error) {
      console.error('Error creating event:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }
  };

  return (
    <Box>
      <Typography variant="h4">Create Event</Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Date"
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              placeholder: '',
            }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ color: 'white' }}
        >
          Create Event
        </Button>
      </form>
    </Box>
  );
};

export default CreateEvent;
