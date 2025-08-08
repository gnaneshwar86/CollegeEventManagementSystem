import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import RightSidebar from './components/RightSidebar';
import { Box } from '@mui/material';
import Events from './pages/Events';

function App() {
  return (
    <Router>
      <Navbar />
      <RightSidebar />
      <Box sx={{ paddingTop: '10vh', paddingRight: '200px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
