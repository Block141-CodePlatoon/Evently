import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Card, CardContent, List, ListItem, ListItemText, Divider } from '@mui/material';
import axios from '../../axiosSetup';
import AddGuestForm from 'components/AddGuestForm/AddGuestForm';

const EventPage = ({ eventId }) => {
  const [event, setEvent] = useState(null);
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`/events/${eventId}/`);
        console.log('Fetched event data:', response.data);
        setEvent(response.data.result);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    fetchEventData();
    fetchGuestsData(); // Initial fetch of guests data
  }, [eventId]);

  const fetchGuestsData = async () => {
    try {
      const response = await axios.get(`/events/${eventId}/guests/`);
      console.log('Fetched guests data:', response.data);
      setGuests(response.data.result);
    } catch (error) {
      console.error('Error fetching guests data:', error);
    }
  };

  const handleGuestAdded = () => {
    fetchGuestsData(); // Refresh the guest list when a new guest is added
  };

  if (!event) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        {event.title}
      </Typography>
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Event Details</Typography>
          <Typography variant="body1"><strong>Description:</strong> {event.description}</Typography>
          <Typography variant="body1"><strong>Date:</strong> {new Date(event.date).toLocaleString()}</Typography>
          <Typography variant="body1"><strong>Location:</strong> {event.location}</Typography>
        </CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6">Guest List</Typography>
          <List>
            {guests.length === 0 ? (
              <Typography variant="body2">No guests found.</Typography>
            ) : (
              guests.map((guest) => (
                <React.Fragment key={guest.id}>
                  <ListItem>
                    <ListItemText primary={guest.name} secondary={guest.email} />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))
            )}
          </List>
        </CardContent>
      </Card>
      <AddGuestForm eventId={event.id} onGuestAdded={handleGuestAdded} /> {/* Include the AddGuestForm */}
    </Box>
  );
};

EventPage.propTypes = {
  eventId: PropTypes.string.isRequired,
};

export default EventPage;
