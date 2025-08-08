// RightSidebar.jsx
import React from 'react';
import { Drawer, List, ListItem, ListItemText, Toolbar, Box } from '@mui/material';


const RightSidebar = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width : '15vw',
          boxSizing: 'border-box',
          backgroundColor: '#FFD700',
          color: 'white',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' , color: 'black'}}>
        <List>
          {['Dashboard', 'Events', 'Profile', 'Settings'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default RightSidebar;
