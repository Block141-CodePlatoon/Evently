// layouts/dashboard/index.js

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import DashboardLayout from 'components/DashboardLayout';
import DashboardNavbar from 'components/DashboardNavbar';
import Footer from 'components/Footer';
import CustomCalendar from 'components/CustomCalendar/CustomCalendar';
import dayjs from 'dayjs';

function Dashboard({ children }) {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const upcomingEvents = [
    {
      id: "event-1",
      label: "Team Meeting",
      groupLabel: "Project Discussion",
      user: "John Doe",
      color: "#f28f6a",
      startHour: "10:00 AM",
      endHour: "11:00 AM",
      date: "2024-07-10",
      createdAt: new Date(),
      createdBy: "Alice"
    },
    {
      id: "event-2",
      label: "Product Launch",
      groupLabel: "Marketing",
      user: "Jane Smith",
      color: "#099ce5",
      startHour: "02:00 PM",
      endHour: "03:00 PM",
      date: "2024-07-15",
      createdAt: new Date(),
      createdBy: "Bob"
    }
  ];

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
          <CustomCalendar events={upcomingEvents} onDateSelect={handleDateSelect} selectedDate={selectedDate} />
          <Box mt={2}>
            <Typography variant="h6">Events on {selectedDate.format('MMMM DD, YYYY')}</Typography>
            {upcomingEvents
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
