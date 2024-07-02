import React from 'react';
import { Icon } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import Dashboard from 'layouts/dashboard'; // Ensure correct path
import NewEventsLayout from 'layouts/newevents'; // Ensure correct path
import EventPage from 'components/EventPage/EventPage'; // Ensure correct path
import CreateEvent from 'components/CreateEvent/CreateEvent'; // Ensure correct path

const routes = [
  {
    type: 'collapse',
    name: 'Home',
    key: 'home',
    icon: <HomeIcon />,
    route: '/home',
    component: <Dashboard />,
  },
  {
    type: 'collapse',
    name: 'Create Event',
    key: 'create-event',
    icon: <Icon>add</Icon>,
    route: '/create-event',
    component: (
      <NewEventsLayout>
        <CreateEvent />
      </NewEventsLayout>
    ),
  },
];

export default routes;
