import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';

const CreateEvent = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/events/', { name, description });
      // Clear the form
      setName('');
      setDescription('');
      // Optionally, trigger a refresh of the sidenav (you might use context or props)
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4">Create Event</Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Event Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        <Button type="submit" variant="contained" color="primary">
          Create Event
        </Button>
      </form>
    </Box>
  );
};

export default CreateEvent;
