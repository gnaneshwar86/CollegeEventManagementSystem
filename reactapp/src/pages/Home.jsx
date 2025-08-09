import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';

function Home() {
  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        paddingTop: '10vh', 
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h2" fontWeight="bold" color="#00809D" gutterBottom>
              Welcome to EventMate
              College Event Management
              Home
              Student Dashboard
              All Events
              
            </Typography>
            <Typography variant="h6" color="text.secondary" >
              Your one-stop solution for managing college events, registrations, and student participation seamlessly.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{ backgroundColor: '#00809D', color: 'white', marginTop: '20px' }}
              href="/events"
            >
              View Events
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;
