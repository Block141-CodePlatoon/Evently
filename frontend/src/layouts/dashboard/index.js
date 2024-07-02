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
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={8} lg={6}>
            <Box textAlign="center">
              <Typography variant="h4" gutterBottom>
                Evently Dashboard Placeholder
              </Typography>
              <Typography variant="body1">
                Pick a tab in the navigation bar to explore.
              </Typography>
            </Box>
          </Grid>
        </Grid>
        {children}
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
