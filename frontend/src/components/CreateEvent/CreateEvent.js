import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import axios from '../../axiosSetup';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

const CreateEvent = ({ onEventCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
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

    // Combine date and time correctly using dayjs
    const combinedDateTime = dayjs(`${date} ${time}`, 'YYYY-MM-DD HH:mm').format();

    const eventData = {
      title,
      description,
      date: combinedDateTime,
      location,
      host,
    };

    try {
      await axios.post('/events/', eventData);

      setTitle('');
      setDescription('');
      setDate('');
      setTime('');
      setLocation('');

      if (onEventCreated) {
        onEventCreated();
      }

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
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
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
            type="date"
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
            label="Time"
            type="time"
            value={time}
            onChange={handleTimeChange}
            required
            InputLabelProps={{
              shrink: true,
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
          sx={{ bgcolor: 'primary' }}
          style={{ color: 'black' }} 
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
