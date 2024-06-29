import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import DashboardLayout from 'components/DashboardLayout';
import DashboardNavbar from 'components/DashboardNavbar';
import Footer from 'components/Footer';

function Dashboard({ children }) {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box p={3}>
        {children}
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
