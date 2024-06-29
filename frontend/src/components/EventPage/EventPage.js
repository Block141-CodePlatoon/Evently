import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

const EventPage = ({ eventId }) => {
  return (
    <Box>
      <Typography variant="h4">Event {eventId}</Typography>
      <Typography variant="body1">
        Event details will be shown here.
      </Typography>
    </Box>
  );
};

EventPage.propTypes = {
  eventId: PropTypes.string.isRequired,
};

export default EventPage;
