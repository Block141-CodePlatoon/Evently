import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, TextField, Button, Typography } from '@mui/material';
import axios from '../../axiosSetup';

const AddGuestForm = ({ eventId, onGuestAdded }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/guests/', {
        name,
        email,
        event: eventId,
      });
      console.log('Guest added:', response.data);
      onGuestAdded(); // Notify parent to refresh the guest list
      setName('');
      setEmail('');
    } catch (error) {
      console.error('Error adding guest:', error);
      setError('Failed to add guest. Please try again.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6">Add Guest</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Add Guest
      </Button>
    </Box>
  );
};

AddGuestForm.propTypes = {
  eventId: PropTypes.number.isRequired,
  onGuestAdded: PropTypes.func.isRequired,
};

export default AddGuestForm;
