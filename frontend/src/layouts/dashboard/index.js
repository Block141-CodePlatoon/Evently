// layouts/dashboard/index.js

import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import DashboardLayout from 'components/DashboardLayout';
import DashboardNavbar from 'components/DashboardNavbar';
import Footer from 'components/Footer';
import CustomCalendar from 'components/CustomCalendar/CustomCalendar';
import dayjs from 'dayjs';
import axios from '../../axiosSetup'; // Ensure axios is imported from axiosSetup.js

function Dashboard({ children }) {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [events, setEvents] = useState([]); // Initialize as an empty array

  // Fetch user's current events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log("Fetching from /events/");
        const response = await axios.get('/events/'); // Use the correct API endpoint without /api
        console.log("Events data:", response.data); // Log the events data
        // Ensure the response data is an array
        setEvents(Array.isArray(response.data.result) ? response.data.result : []);
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents([]); // Ensure events is set to an empty array in case of an error
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
