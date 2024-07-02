import React from 'react';
import { Box } from '@mui/material';
import DashboardLayout from 'components/DashboardLayout';
import DashboardNavbar from 'components/DashboardNavbar';
import Footer from 'components/Footer';

function NewEventLayout({ children }) {
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

export default NewEventLayout;
