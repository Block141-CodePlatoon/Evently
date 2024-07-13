import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

const EditEvent = ({ event, onEventEdited }) => {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [date, setDate] = useState('');
  const [location, setLocation] = useState(event.location);

  useEffect(() => {
    const formattedDate = dayjs(event.date).format('YYYY-MM-DDTHH:mm');
    setDate(formattedDate);
  }, [event.date]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEvent = {
      ...event,
      title,
      description,
      date,
      location,
    };
    onEventEdited(updatedEvent);
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
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
          sx={{ color: 'white' }}
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
