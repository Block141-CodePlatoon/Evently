import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from '@mui/material/Icon'; // Import Icon
import NewEventNavbar from 'components/NewEventNavbar';
import { useMaterialUIController } from 'context';

import Footer from 'components/Footer';
import Sidenav from 'components/Sidenav';
import axios from '../../axiosSetup'; // Ensure axios is imported from axiosSetup.js
import Dashboard from 'layouts/dashboard'; // Import Dashboard or define it if it is a local component
import CreateEvent from 'components/CreateEvent/CreateEvent'; // Import CreateEvent if it exists
import brandWhite from 'assets/images/logo-ct.svg'; // Import brand logo
import brandDark from 'assets/images/logo-ct-dark.svg'; // Import brand logo

const dummyRoutes = [
  {
    type: "collapse",
    name: "Home",
    key: "home",
    icon: <Icon>home</Icon>,
    route: "/home",
    component: <Dashboard />, // Ensure this is the correct component
  },
  {
    type: "collapse",
    name: "Create Event",
    key: "create-event",
    icon: <Icon>add</Icon>,
    route: "/create-event",
    component: <CreateEvent />, // Ensure this is the correct component
  },
  // Add more routes as needed
];

function NewEventLayout2({ children }) {
  const [controller] = useMaterialUIController();
  const { id } = useParams();
  const [eventName, setEventName] = useState('');
  const {
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        console.log(`Fetching event data for event ID: ${id}`);
        const response = await axios.get(`/events/${id}/`);
        console.log('Fetched event data:', response.data);
        setEventName(response.data.result.title);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    if (id) {
      fetchEventData();
    }
  }, [id]);

  return (
    <>
      <Sidenav 
        color="info" // Adjust the color as needed
        brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite} // Use brandDark or brandWhite based on your theme
        brandName="Evently"
        routes={dummyRoutes} 
      />
      <Box
        sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          marginLeft: pxToRem(120), // Adjust this value based on your sidenav width
          [breakpoints.up('xl')]: {
            marginLeft: pxToRem(274),
          },
        })}
      >
        <NewEventNavbar eventName={eventName} /> {/* Pass eventName as a prop */}
        <Box component="main" flexGrow={1} p={3} mt={3}>
          {React.cloneElement(children, { eventName })} {/* Pass eventName as a prop to children */}
        </Box>
        <Footer />
      </Box>
    </>
  );
}

NewEventLayout2.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NewEventLayout2;
