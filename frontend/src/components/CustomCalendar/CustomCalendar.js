import React from 'react';
import { Box, Grid, Typography, Paper, Button } from '@mui/material';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import './CustomCalendar.css';

dayjs.extend(utc);
dayjs.extend(timezone);

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
    return events.filter(event => dayjs(event.date).tz(dayjs.tz.guess()).isSame(date, 'day'));
  };

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Box>
      <Box className="calendar-header">
        <Button onClick={handlePrevMonth}>Previous</Button>
        <Typography variant="h6">{currentMonth.format('MMMM YYYY')}</Typography>
        <Button onClick={handleNextMonth}>Next</Button>
      </Box>
      <Grid container spacing={1}>
        {daysOfWeek.map((day) => (
          <Grid item xs={12 / 7} key={day}>
            <Box className="calendar-day">
              <Typography variant="body1" align="right">{day}</Typography>
            </Box>
          </Grid>
        ))}
        {dates.map((date, index) => (
          <Grid item xs={12 / 7} key={index}>
            <Paper
              variant="outlined"
              className={`calendar-grid ${date.isSame(selectedDate, 'day') ? 'selected-date' : ''}`}
              onClick={() => onDateSelect(date)}
            >
              <Box display="flex" justifyContent="flex-end" alignItems="center">
                <Typography
                  variant="body1"
                  className={`day-number ${date.isSame(dayjs(), 'day') ? 'current-day' : date.month() !== currentMonth.month() ? 'non-current-day' : ''}`}
                  align="right"
                >
                  {date.format('D')}
                </Typography>
              </Box>
              {getEventsForDate(date).map(event => (
                <Typography
                  key={event.id}
                  variant="body2"
                  className="event-title"
                  onClick={() => onEventClick(event.id)}
                  align="right"
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
