import { useState, useEffect, useMemo } from 'react';
import { Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Icon from '@mui/material/Icon';
import MDBox from 'components/MDBox';
import Sidenav from 'components/Sidenav';
import Configurator from 'components/Configurator';
import theme from 'assets/theme';
import themeRTL from 'assets/theme/theme-rtl';
import themeDark from 'assets/theme-dark';
import themeDarkRTL from 'assets/theme-dark/theme-rtl';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import routes from 'routes';
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from 'context';
import brandWhite from 'assets/images/logo-ct.svg';
import brandDark from 'assets/images/logo-ct-dark.svg';
import Login from 'components/Login/Login';
import Signup from 'components/Signup/Signup';
import NewEventLayout from 'layouts/newevents';
import CreateEvent from 'components/CreateEvent/CreateEvent';
import EventPage from 'components/EventPage/EventPage';

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  const [eventCreated, setEventCreated] = useState(false); // State for tracking event creation

  useMemo(() => {
    const cacheRtl = createCache({
      key: 'rtl',
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  useEffect(() => {
    document.body.setAttribute('dir', direction);
  }, [direction]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <MDBox>
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  const shouldRenderSidenav = !['/login', '/signup'].includes(pathname);

  const handleEventCreated = () => {
    setEventCreated((prev) => !prev); // Toggle the state to force a rerender
  };

  return direction === 'rtl' ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
        <CssBaseline />
        {shouldRenderSidenav && layout === 'dashboard' && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
              brandName="Evently"
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
              eventCreated={eventCreated} // Pass the state to Sidenav
            />
            <Configurator />
            {configsButton}
          </>
        )}
        {layout === 'vr' && <Configurator />}
        <Routes>
          {getRoutes(routes)}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/home" />} />
          <Route
            path="/create-event"
            element={<NewEventLayout><CreateEvent onEventCreated={handleEventCreated} /></NewEventLayout>}
          />
          <Route path="/events/:id" element={<NewEventLayout><EventPageWrapper /></NewEventLayout>} />
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {shouldRenderSidenav && layout === 'dashboard' && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="Evently"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
            eventCreated={eventCreated} // Pass the state to Sidenav
          />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === 'vr' && <Configurator />}
      <Routes>
        {getRoutes(routes)}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/home" />} />
        <Route
          path="/create-event"
          element={<NewEventLayout><CreateEvent onEventCreated={handleEventCreated} /></NewEventLayout>}
        />
        <Route path="/events/:id" element={<NewEventLayout><EventPageWrapper /></NewEventLayout>} />
      </Routes>
    </ThemeProvider>
  );
}

// EventPageWrapper to pass eventId prop
const EventPageWrapper = () => {
  const { id } = useParams();
  return <EventPage eventId={id} />;
};
