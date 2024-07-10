import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import EventBreadcrumbs from "components/EventBreadcrumbs"; // Ensure correct import
import { navbar, navbarContainer, navbarRow, navbarIconButton, navbarMobileMenu } from "components/DashboardNavbar/styles";
import { useMaterialUIController, setTransparentNavbar, setMiniSidenav, setOpenConfigurator } from "context";
import axios from "axios"; // Ensure axios is correctly configured

function NewEventNavbar({ absolute, light, isMini, eventName }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const [accountMenu, setAccountMenu] = useState(null);
  const route = useLocation().pathname.split("/").slice(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    window.addEventListener("scroll", handleTransparentNavbar);
    handleTransparentNavbar();

    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);
  const handleOpenAccountMenu = (event) => setAccountMenu(event.currentTarget);
  const handleCloseAccountMenu = () => setAccountMenu(null);

  const handleLogout = () => {
    // Clear user data (example: localStorage)
    localStorage.removeItem("userToken"); // Adjust this as per your app's storage key
    // Redirect to sign-in page
    navigate("/login");
  };

  const renderNotificationMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <MenuItem onClick={handleCloseMenu}>
        <Icon>notifications</Icon>&nbsp;No new alerts
      </MenuItem>
    </Menu>
  );

  const renderAccountMenu = () => (
    <Menu
      anchorEl={accountMenu}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={Boolean(accountMenu)}
      onClose={handleCloseAccountMenu}
      sx={{ mt: 2 }}
    >
      <MenuItem onClick={handleCloseAccountMenu}>
        <Icon>account_circle</Icon>&nbsp;Profile
      </MenuItem>
      <MenuItem onClick={handleCloseAccountMenu}>
        <Icon>settings</Icon>&nbsp;My account
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <Icon>logout</Icon>&nbsp;Logout
      </MenuItem>
    </Menu>
  );

  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <EventBreadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} eventName={eventName} />
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox pr={1}>
              <MDInput label="Search here" />
            </MDBox>
            <MDBox color={light ? "white" : "inherit"}>
              <IconButton
                sx={navbarIconButton}
                size="small"
                disableRipple
                onClick={handleOpenAccountMenu}
              >
                <Icon sx={iconsStyle}>account_circle</Icon>
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <Icon sx={iconsStyle}>settings</Icon>
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <Icon sx={iconsStyle}>notifications</Icon>
              </IconButton>
              {renderNotificationMenu()}
              {renderAccountMenu()}
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

NewEventNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
  eventName: '', // Add default prop
};

NewEventNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
  eventName: PropTypes.string, // New prop
};

export default NewEventNavbar;
