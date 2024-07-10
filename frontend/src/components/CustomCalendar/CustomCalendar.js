// components/CustomCalendar.js

import React from 'react';
import { Box, Grid, Typography, Paper, Button } from '@mui/material';
import dayjs from 'dayjs';

const CustomCalendar = ({ events, onDateSelect, selectedDate, onEventClick }) => {
  const [currentMonth, setCurrentMonth] = React.useState(dayjs().startOf('month'));

  const startOfMonth = currentMonth.startOf('month');
  const endOfMonth = currentMonth.endOf('month');
  const startDate = startOfMonth.startOf('week');
  const endDate = endOfMonth.endOf('week');

  const dates = [];
  let currentDate = startDate;

  while (currentDate.isBefore(endDate)) {
    dates.push(currentDate);
    currentDate = currentDate.add(1, 'day');
  }

  const getEventsForDate = (date) => {
    return events.filter(event => dayjs(event.date).isSame(date, 'day'));
  };

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button onClick={handlePrevMonth}>Previous</Button>
        <Typography variant="h6">{currentMonth.format('MMMM YYYY')}</Typography>
        <Button onClick={handleNextMonth}>Next</Button>
      </Box>
      <Grid container spacing={1}>
        {dates.map((date, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Paper
              variant="outlined"
              sx={{
                height: '100%',
                padding: 2,
                cursor: 'pointer',
                borderColor: date.isSame(selectedDate, 'day') ? 'blue' : 'transparent',
                borderWidth: date.isSame(selectedDate, 'day') ? 2 : 1,
                borderStyle: 'solid'
              }}
              onClick={() => onDateSelect(date)}
            >
              <Typography variant="body1" color={date.isSame(dayjs(), 'day') ? 'primary' : 'textPrimary'}>
                {date.format('D')}
              </Typography>
              {getEventsForDate(date).map(event => (
                <Typography
                  key={event.id}
                  variant="body2"
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      color: 'blue',
                      textDecoration: 'underline',
                    },
                  }}
                  onClick={() => onEventClick(event.id)}
                >
                  {event.title}
                </Typography>
              ))}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CustomCalendar;
