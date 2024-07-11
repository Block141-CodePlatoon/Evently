import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Card, CardContent, List, ListItem, ListItemText, Divider, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Import Delete Icon
import axios from '../../axiosSetup';
import AddGuestForm from 'components/AddGuestForm/AddGuestForm';

const EventPage = ({ eventId }) => {
  const [event, setEvent] = useState(null);
  const [guests, setGuests] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [guestToDelete, setGuestToDelete] = useState(null);

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

  const handleGuestDelete = async () => {
    try {
      await axios.delete(`/guests/${guestToDelete}/`);
      fetchGuestsData(); // Refresh the guest list after deletion
      setOpenDialog(false); // Close the dialog
    } catch (error) {
      console.error('Error deleting guest:', error);
    }
  };

  const handleOpenDialog = (guestId) => {
    setGuestToDelete(guestId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setGuestToDelete(null);
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
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete" onClick={() => handleOpenDialog(guest.id)}>
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
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
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this guest? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleGuestDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

EventPage.propTypes = {
  eventId: PropTypes.string.isRequired,
};

export default EventPage;
