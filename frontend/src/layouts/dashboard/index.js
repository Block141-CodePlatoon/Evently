import React, { useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';

function Dashboard() {
  const [word, setWord] = useState('stocks');

  const handleClick = () => {
    setWord(word === 'stocks' ? 'stonks' : 'stocks');
  };

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
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
