import React from 'react';
import { List, ListItem, Paper, Typography } from '@mui/material';

function RightSidebar() {
  return (
    <Paper
      elevation={3}
      sx={{
        width: '15vw',
        position: 'fixed',
        top: '10vh',
        right: 0,
        bottom: 0,
        backgroundColor: '#00809D',
        paddingTop: '1rem',
        zIndex: 1000,
        borderRadius: 0,
        color: '#FFD700',
      }}
    >
      <List>
        {['HOME', 'EVENTS'].map((text) => (
          <ListItem
            key={text}
            disablePadding
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              padding: '0.75rem 1rem',
              cursor: 'pointer',
              transition: 'background-color 0.3s, color 0.3s',
              '&:hover': {
                backgroundColor: '#FFD700',
                color: '#00809D',
              },
            }}
          >
            <Typography
              variant="button"
              sx={{
                fontWeight: 'bold',
                fontSize: '1.1rem',
                color: 'inherit', // Inherit hover color
                textAlign: 'center',
              }}
            >
              {text}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default RightSidebar;
