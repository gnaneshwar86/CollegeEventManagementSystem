import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';

function Home() {
  return (
    <Box sx={{ paddingTop: '5vh' }}>
      <Container>
        <Typography variant="h2" fontWeight="bold" color="#00809D">
          Welcome to EventMate
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Manage college events, student registrations, and participation easily.
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 3, backgroundColor: '#00809D', color: 'white' }}
          href="/events"
        >
          View Events
        </Button>
      </Container>
    </Box>
  );
}

export default Home;
