import React from 'react';
import { Box } from '@mui/material';
import NewEventLayoutt from 'components/NewEventLayoutLayout';
import NewEventNavbar from 'components/NewEventNavbar';
import Footer from 'components/Footer';

function NewEventLayout({ children }) {
  return (
    <DashboardLayout>
      <NewEventNavbar />
      <Box p={3}>
        {children}
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default NewEventLayout;
