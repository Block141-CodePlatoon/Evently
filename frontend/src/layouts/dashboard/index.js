// layouts/dashboard/index.js
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import DashboardLayout from 'components/DashboardLayout';
import DashboardNavbar from 'components/DashboardNavbar';
import Footer from 'components/Footer';
import CustomCalendar from 'components/CustomCalendar/CustomCalendar';
import dayjs from 'dayjs';
import axios from '../../axiosSetup'; 
import { useNavigate } from 'react-router-dom'; 
import MyAccount from 'components/MyAccount/MyAccount'; // Ensure correct path

function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [events, setEvents] = useState([]);
  const [viewingAccount, setViewingAccount] = useState(false); // State to control account view
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/events/'); 
        const validEvents = Array.isArray(response.data.result)
          ? response.data.result.filter(event => event.id) // Ensure event ID is valid
          : [];
        setEvents(validEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents([]); 
      }
    };

    fetchEvents();
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`); 
  };

  return (
    <DashboardLayout>
      <DashboardNavbar setViewingAccount={setViewingAccount} /> {/* Pass the state setter */}
      <Box p={3} display="flex" flexDirection="column" alignItems="center" flexGrow={1}>
        {viewingAccount ? (
          <MyAccount />
        ) : (
          <>
            <Typography variant="h4" gutterBottom textAlign="center">
              Evently Calendar
            </Typography>
            <Box flexGrow={1} display="flex" flexDirection="column" alignItems="center" width="100%">
              <CustomCalendar 
                events={events} 
                onDateSelect={handleDateSelect} 
                selectedDate={selectedDate} 
                onEventClick={handleEventClick} 
              />
              <Box mt={2}>
                <Typography variant="h6">Events on {selectedDate.format('MMMM DD, YYYY')}</Typography>
                {events
                  .filter(event => dayjs(event.date).isSame(selectedDate, 'day'))
                  .map(event => (
                    <Typography key={event.id} variant="body2" onClick={() => handleEventClick(event.id)}>
                      {event.title}
                    </Typography>
                  ))}
              </Box>
            </Box>
          </>
        )}
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
