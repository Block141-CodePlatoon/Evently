import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import axios from '../../axiosSetup';
import { useNavigate } from 'react-router-dom';

const EditEvent = ({ event, onEventEdited }) => {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState(event.location);
  const navigate = useNavigate();
  const dateInputRef = useRef(null);

  useEffect(() => {
    const eventDate = dayjs(event.date);
    setDate(eventDate.format('YYYY-MM-DD'));
    setTime(eventDate.format('HH:mm'));
  }, [event.date]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Combine date and time into a single Date object
    const combinedDateTime = dayjs(`${date}T${time}`).format();

    const updatedEvent = {
      title,
      description,
      date: combinedDateTime,
      location,
    };

    try {
      await axios.put(`/events/${event.id}/`, updatedEvent);

      if (onEventEdited) {
        onEventEdited();
      }

      window.location.reload();
    } catch (error) {
      console.error('Error updating event:', error);
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
      <Typography variant="h4">Edit Event</Typography>
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
          Save Changes
        </Button>
      </form>
    </Box>
  );
};

EditEvent.propTypes = {
  event: PropTypes.object.isRequired,
  onEventEdited: PropTypes.func.isRequired,
};

export default EditEvent;
