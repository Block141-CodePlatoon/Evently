import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import axios from '../../axiosSetup';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const CreateEvent = ({ onEventCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [host, setHost] = useState(null);
  const navigate = useNavigate();
  const dateInputRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setHost(decodedToken.user_id);
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

    try {
      await axios.post('/events/', eventData);

      setTitle('');
      setDescription('');
      setDate('');
      setLocation('');

      // Call the callback to refresh the parent component
      if (onEventCreated) {
        onEventCreated();
      }

      // Navigate to /home
      navigate('/home');
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

  const handleDateClick = () => {
    dateInputRef.current.showPicker();
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
    dateInputRef.current.blur();  // Close the date picker by removing focus
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
            onChange={handleDateChange}
            required
            InputLabelProps={{
              shrink: true,
            }}
            inputRef={dateInputRef}
            onClick={handleDateClick}
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
          sx={{ bgcolor: 'primary' }}
          style={{ color: 'black' }} // Set text color to black
        >
          Create Event
        </Button>
      </form>
    </Box>
  );
};

CreateEvent.propTypes = {
  onEventCreated: PropTypes.func.isRequired,
};

export default CreateEvent;
