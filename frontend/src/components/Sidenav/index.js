import { useState, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Icon from '@mui/material/Icon';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDButton from 'components/MDButton';
import SidenavCollapse from './SidenavCollapse';
import SidenavRoot from './SidenavRoot';
import sidenavLogoLabel from './styles/sidenav';
import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
} from 'context';

import EventPage from 'components/EventPage/EventPage'; // Ensure correct path
import CreateEvent from 'components/CreateEvent/CreateEvent'; // Ensure correct path
import Dashboard from 'layouts/dashboard'; // Ensure correct path
import NewEventsLayout from 'layouts/newevents'; // Ensure correct path

function Sidenav({ color, brand, brandName, routes, ...rest }) {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;
  const [userRoutes, setUserRoutes] = useState([]);
  const location = useLocation();
  const collapseName = location.pathname.replace('/', '');

  let textColor = 'white';

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = 'dark';
  } else if (whiteSidenav && darkMode) {
    textColor = 'inherit';
  }

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      setTransparentSidenav(dispatch, window.innerWidth < 1200 ? false : transparentSidenav);
      setWhiteSidenav(dispatch, window.innerWidth < 1200 ? false : whiteSidenav);
    }

    window.addEventListener('resize', handleMiniSidenav);

    handleMiniSidenav();

    return () => window.removeEventListener('resize', handleMiniSidenav);
  }, [dispatch, location]);

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const response = await axios.get('/api/events/');
        const events = response.data.result.map(event => ({
          type: 'collapse',
          name: event.name,
          key: event.id.toString(),
          icon: <Icon>event</Icon>,
          route: `/events/${event.id}`,
          component: (
            <NewEventsLayout>
              <EventPage eventId={event.id} />
            </NewEventsLayout>
          ),
        }));
        setUserRoutes(events);
      } catch (error) {
        console.error('Error fetching user events:', error);
      }
    };

    fetchUserEvents();
  }, []);

  const renderRoutes = [
    // Static "Create Event" button
    ...routes,
    // Dynamically fetched user events
    ...userRoutes,
  ].map(({ type, name, icon, title, key, href, route }) => {
    let returnValue;

    if (type === 'collapse') {
      returnValue = href ? (
        <Link
          href={href}
          key={key}
          target='_blank'
          rel='noreferrer'
          sx={{ textDecoration: 'none' }}
        >
          <SidenavCollapse
            name={name}
            icon={icon}
            active={key === collapseName}
          />
        </Link>
      ) : (
        <NavLink key={key} to={route}>
          <SidenavCollapse name={name} icon={icon} active={key === collapseName} />
        </NavLink>
      );
    } else if (type === 'title') {
      returnValue = (
        <MDTypography
          key={key}
          color={textColor}
          display='block'
          variant='caption'
          fontWeight='bold'
          textTransform='uppercase'
          pl={3}
          mt={2}
          mb={1}
          ml={1}
        >
          {title}
        </MDTypography>
      );
    } else if (type === 'divider') {
      returnValue = (
        <Divider
          key={key}
          light={
            (!darkMode && !whiteSidenav && !transparentSidenav) ||
            (darkMode && !transparentSidenav && whiteSidenav)
          }
        />
      );
    }

    return returnValue;
  });

  return (
    <SidenavRoot
      {...rest}
      variant='permanent'
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <MDBox pt={3} pb={1} px={4} textAlign='center'>
        <MDBox
          display={{ xs: 'block', xl: 'none' }}
          position='absolute'
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: 'pointer' }}
        >
          <MDTypography variant='h6' color='secondary'>
            <Icon sx={{ fontWeight: 'bold' }}>close</Icon>
          </MDTypography>
        </MDBox>
        <MDBox component={NavLink} to='/' display='flex' alignItems='center'>
          {brand && <MDBox component='img' src={brand} alt='Brand' width='2rem' />}
          <MDBox
            width={!brandName && '100%'}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <MDTypography component='h6' variant='button' fontWeight='medium' color={textColor}>
              {brandName}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
      <Divider
        light={
          (!darkMode && !whiteSidenav && !transparentSidenav) ||
          (darkMode && !transparentSidenav && whiteSidenav)
        }
      />
      <List>{renderRoutes}</List>
      <MDBox p={2} mt='auto'>
        <MDButton
          component='a'
          href='https://github.com/'
          target='_blank'
          rel='noreferrer'
          variant='gradient'
          color={sidenavColor}
          fullWidth
        >
          upgrade to pro
        </MDButton>
      </MDBox>
    </SidenavRoot>
  );
}

Sidenav.defaultProps = {
  color: 'info',
  brand: '',
};

Sidenav.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary', 'info', 'success', 'warning', 'error', 'dark']),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
