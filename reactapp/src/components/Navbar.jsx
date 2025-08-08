import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

function Navbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#00809D', height: '12vh' }}>
      <Toolbar sx={{ height: '100%', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ flexGrow: 1}}>
          EventMate
        </Typography>
        <Box>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Events</Button>
          <Button color="inherit">Register</Button>
          <Button color="inherit">Login</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
