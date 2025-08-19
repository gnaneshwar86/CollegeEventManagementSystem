import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';

// Sample event data
const sampleEvents = [
  {
    id: 1,
    name: "Tech Fest 2025",
    date: "2025-09-05",
    description: "A grand festival of technology with workshops, coding contests, and exhibitions."
  },
  {
    id: 2,
    name: "Cultural Night",
    date: "2025-09-10",
    description: "An evening filled with dance, music, and cultural performances."
  },
  {
    id: 3,
    name: "Sports Meet",
    date: "2025-09-15",
    description: "Inter-college sports competitions across multiple disciplines."
  }
];

function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Simulate fetching data (replace with API call later)
    setTimeout(() => {
      setEvents(sampleEvents);
    }, 500);
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h3" fontWeight="bold" color="#00809D" gutterBottom>
        Upcoming Events
      </Typography>
      {events.length > 0 ? (
        events.map((event) => (
          <Card key={event.id} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold">{event.name}</Typography>
              <Typography color="text.secondary">{event.date}</Typography>
              <Typography sx={{ mt: 1 }}>{event.description}</Typography>
              <Button variant="contained" sx={{ mt: 2 }}>Register</Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>Loading events...</Typography>
      )}
    </Box>
  );
}

export default EventsPage;
