import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

import Navbar from './components/Navbar';
import RightSidebar from './components/RightSidebar';
import Footer from './components/Footer';

import Home from './pages/Home';
import EventsPage from './pages/EventsPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import StudentsPage from './pages/StudentsPage';

function App() {
  return (
    <Router>
      <Navbar />
      <RightSidebar />

      <Box sx={{ paddingTop: '10vh', paddingRight: '15vw', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<StudentsPage />} />
        </Routes>
      </Box>

      <Footer />
    </Router>
  );
}

export default App;
