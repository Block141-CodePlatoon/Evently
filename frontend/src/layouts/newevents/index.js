import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from '@mui/material/Icon'; 
import NewEventNavbar from 'components/NewEventNavbar';
import { useMaterialUIController } from 'context';
import Footer from 'components/Footer';
import Sidenav from 'components/Sidenav';
import axios from '../../axiosSetup'; 
import Dashboard from 'layouts/dashboard'; 
import CreateEvent from 'components/CreateEvent/CreateEvent'; 
import brandWhite from 'assets/images/logo-ct.svg';
import brandDark from 'assets/images/logo-ct-dark.svg'; 

const dummyRoutes = [
  {
    type: "collapse",
    name: "Home",
    key: "home",
    icon: <Icon>home</Icon>,
    route: "/home",
    component: <Dashboard />, 
  },
  {
    type: "collapse",
    name: "Create Event",
    key: "create-event",
    icon: <Icon>add</Icon>,
    route: "/create-event",
    component: <CreateEvent />, 
  },
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
        color="info" 
        brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
        brandName="Evently"
        routes={dummyRoutes} 
      />
      <Box
        sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          marginLeft: pxToRem(120), 
          [breakpoints.up('xl')]: {
            marginLeft: pxToRem(274),
          },
        })}
      >
        <NewEventNavbar eventName={eventName} /> 
        <Box component="main" flexGrow={1} p={3} mt={3}>
          {React.cloneElement(children, { eventName })} 
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
