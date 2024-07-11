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

function Dashboard({ children }) {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [events, setEvents] = useState([]); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log("Fetching from /events/");
        const response = await axios.get('/events/'); 
        setEvents(Array.isArray(response.data.result) ? response.data.result : []);
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
      <DashboardNavbar />
      <Box p={3} display="flex" flexDirection="column" alignItems="center" flexGrow={1}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Evently Calendar
        </Typography>
        <Box flexGrow={1} display="flex" flexDirection="column" alignItems="center" width="100%">
          <CustomCalendar 
            events={events} 
            onDateSelect={handleDateSelect} 
            selectedDate={selectedDate} 
            onEventClick={handleEventClick} // Pass the handleEventClick to CustomCalendar
          />
          <Box mt={2}>
            <Typography variant="h6">Events on {selectedDate.format('MMMM DD, YYYY')}</Typography>
            {events
              .filter(event => dayjs(event.date).isSame(selectedDate, 'day'))
              .map(event => (
                <Typography key={event.id} variant="body2" onClick={() => handleEventClick(event.id)}>
                  {event.title} {/* Changed from event.label to event.title */}
                </Typography>
              ))}
          </Box>
        </Box>
        {children}
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
