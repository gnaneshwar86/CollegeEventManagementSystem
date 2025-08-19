import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

function Navbar() {
  return (
    <AppBar position="fixed" sx={{ height: '10vh', backgroundColor: '#FFD700', zIndex: 1000, color: '#00809D', fontWeight: 'bold' }}>
      <Toolbar sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        }}>
        <Typography variant="h4" noWrap>
          EventMate Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
