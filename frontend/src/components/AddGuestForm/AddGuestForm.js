import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import axios from '../../axiosSetup';

const WhiteTextButton = styled(Button)({
  color: 'white', // Ensure text color is white
});

const AddGuestForm = ({ eventId, onGuestAdded }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const guestData = {
      first_name: firstName,
      last_name: lastName,
      email,
      event: eventId,
    };

    try {
      const response = await axios.post('/guests/', guestData);
      onGuestAdded(); // Notify parent to refresh the guest list
      setFirstName('');
      setLastName('');
      setEmail('');
      setLoading(false);
    } catch (error) {
      console.error('Error adding guest:', error);
      if (error.response && error.response.data) {
        setError(`Failed to add guest: ${error.response.data.message || 'Please try again.'}`);
      } else {
        setError('Failed to add guest. Please try again.');
      }
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6">Add Guest</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
        disabled={loading}
      />
      <TextField
        label="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
        disabled={loading}
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
        disabled={loading}
      />
      <WhiteTextButton
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
      >
        {loading ? 'Adding...' : 'Add Guest'}
      </WhiteTextButton>
    </Box>
  );
};

AddGuestForm.propTypes = {
  eventId: PropTypes.number.isRequired,
  onGuestAdded: PropTypes.func.isRequired,
};

export default AddGuestForm;
