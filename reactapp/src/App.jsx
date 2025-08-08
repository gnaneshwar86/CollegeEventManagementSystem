import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import RightSidebar from './components/RightSidebar';

import { Box } from '@mui/material';

function App() {
  return (
    <Router>
        <Box  sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '85vw',
          zIndex: 1200,
        }}>
          <Navbar />
        </Box>
        <Box sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: '20vw',
          zIndex: 1200,
        }}>
          <RightSidebar /> 
        </Box>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
    </Router>
  );
}

export default App;
