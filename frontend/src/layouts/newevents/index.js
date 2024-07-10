import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import NewEventLayout from 'components/NewEventLayout';
import NewEventNavbar from 'components/NewEventNavbar';
import Footer from 'components/Footer';
import axios from '../../axiosSetup'; // Ensure axios is imported from axiosSetup.js

function NewEventLayout2({ children }) {
  const { id } = useParams();
  const [eventName, setEventName] = useState('');

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        console.log(`Fetching event data for event ID: ${id}`);
        const response = await axios.get(`/events/${id}/`);
        console.log('Fetched event data:', response.data);
        setEventName(response.data.title);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    if (id) {
      fetchEventData();
    }
  }, [id]);

  return (
    <NewEventLayout>
      <NewEventNavbar eventName={eventName} /> {/* Pass eventName as a prop */}
      <Box p={3}>
        {React.cloneElement(children, { eventName })} {/* Pass eventName as a prop to children */}
      </Box>
      <Footer />
    </NewEventLayout>
  );
}

NewEventLayout2.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NewEventLayout2;
