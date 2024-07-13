// components/PrivateRoute/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isAuthenticated } from 'utils/auth';

const PrivateRoute = ({ element }) => {
  const authStatus = isAuthenticated();
  return authStatus ? element : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default PrivateRoute;
