import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import axios from '../../axiosSetup';

const WhiteTextButton = styled(Button)({
  color: 'white',
});

const AddGuestForm = ({ eventId, onGuestAdded }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      console.log('Guest data to be sent:', { name, email, event: eventId });
      const response = await axios.post('/guests/', {
        name,
        email,
        event: eventId,
      });
      console.log('Guest added:', response.data);
      onGuestAdded();
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
      <WhiteTextButton
        type="submit"
        variant="contained"
        color="primary"
      >
        Add Guest
      </WhiteTextButton>
    </Box>
  );
};

AddGuestForm.propTypes = {
  eventId: PropTypes.number.isRequired,
  onGuestAdded: PropTypes.func.isRequired,
};

export default AddGuestForm;
