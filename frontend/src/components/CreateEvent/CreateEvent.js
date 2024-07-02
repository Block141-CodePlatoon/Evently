import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import axios from '../../axiosSetup'; // Ensure this path is correct

const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [host, setHost] = useState(1); // Assuming you have the host ID

  const handleSubmit = async (event) => {
    event.preventDefault();
    const eventData = {
      title,
      description,
      date,
      location,
      host,
    };

    try {
      console.log('Sending POST request to /api/events/');
      const response = await axios.post('/api/events/', eventData);
      console.log('Response received:', response);
      // Clear the form
      setTitle('');
      setDescription('');
      setDate('');
      setLocation('');
      setHost(1);
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
          sx={{ color: 'white' }} // Change button text to white
        >
          Create Event
        </Button>
      </form>
    </Box>
  );
};

export default CreateEvent;
