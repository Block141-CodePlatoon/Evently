// components/EventPage/EventPage.js
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Card, CardContent, List, ListItem, ListItemText, Divider, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../axiosSetup';
import AddGuestForm from 'components/AddGuestForm/AddGuestForm';

const EventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [guests, setGuests] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAddGuestDialog, setOpenAddGuestDialog] = useState(false);
  const [guestToDelete, setGuestToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id || id === ':id') {
        console.warn('Invalid event ID:', id);
        return;
      }
      console.log(`Fetching event data for ID: ${id}`);
      try {
        const eventResponse = await axios.get(`/events/${id}/`);
        console.log('Event response received:', eventResponse.data);
        setEvent(eventResponse.data.result);

        const guestsResponse = await axios.get(`/events/${id}/guests/`);
        console.log('Guests response received:', guestsResponse.data);
        setGuests(guestsResponse.data.result);
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response && error.response.status === 404) {
          navigate('/home'); 
        }
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleGuestAdded = async () => {
    try {
      const guestsResponse = await axios.get(`/events/${id}/guests/`);
      setGuests(guestsResponse.data.result);
      setOpenAddGuestDialog(false);
    } catch (error) {
      console.error('Error fetching guests data:', error);
    }
  };

  const handleGuestDelete = async () => {
    try {
      await axios.delete(`/guests/${guestToDelete}/`);
      const guestsResponse = await axios.get(`/events/${id}/guests/`);
      setGuests(guestsResponse.data.result);
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error('Error deleting guest:', error);
    }
  };

  const handleOpenDeleteDialog = (guestId) => {
    setGuestToDelete(guestId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setGuestToDelete(null);
  };

  const handleOpenAddGuestDialog = () => {
    setOpenAddGuestDialog(true);
  };

  const handleCloseAddGuestDialog = () => {
    setOpenAddGuestDialog(false);
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
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Guest List</Typography>
            <IconButton edge="end" aria-label="add" onClick={handleOpenAddGuestDialog}>
              <AddIcon />
            </IconButton>
          </Box>
          <List>
            {guests.length === 0 ? (
              <Typography variant="body2">No guests found.</Typography>
            ) : (
              guests.map((guest) => (
                <React.Fragment key={guest.id}>
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete" onClick={() => handleOpenDeleteDialog(guest.id)}>
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={`${guest.first_name} ${guest.last_name}`} secondary={guest.email} />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))
            )}
          </List>
        </CardContent>
      </Card>
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this guest? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleGuestDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openAddGuestDialog}
        onClose={handleCloseAddGuestDialog}
      >
        <DialogTitle>Add Guest</DialogTitle>
        <DialogContent>
          <AddGuestForm eventId={event.id} onGuestAdded={handleGuestAdded} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddGuestDialog} color="primary">
            Cancel
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
