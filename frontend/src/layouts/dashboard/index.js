// layouts/dashboard/index.js

import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import DashboardLayout from 'components/DashboardLayout';
import DashboardNavbar from 'components/DashboardNavbar';
import Footer from 'components/Footer';
import CustomCalendar from 'components/CustomCalendar/CustomCalendar';
import dayjs from 'dayjs';
import axios from 'axios'; // Ensure axios is imported

function Dashboard({ children }) {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [events, setEvents] = useState([]);

  // Fetch user's current events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/events/'); // Use the correct API endpoint
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box p={3} display="flex" flexDirection="column" alignItems="center" flexGrow={1}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Evently Calendar
        </Typography>
        <Box flexGrow={1} display="flex" flexDirection="column" alignItems="center" width="100%">
          <CustomCalendar events={events} onDateSelect={handleDateSelect} selectedDate={selectedDate} />
          <Box mt={2}>
            <Typography variant="h6">Events on {selectedDate.format('MMMM DD, YYYY')}</Typography>
            {events
              .filter(event => dayjs(event.date).isSame(selectedDate, 'day'))
              .map(event => (
                <Typography key={event.id} variant="body2">
                  {event.label}
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
