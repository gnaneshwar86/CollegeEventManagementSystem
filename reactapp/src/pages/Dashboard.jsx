import React from 'react';
import { Box, Typography } from '@mui/material';

function Dashboard() {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h3" color="#00809D" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography>Overview of events, registrations, and students.</Typography>
    </Box>
  );
}

export default Dashboard;
