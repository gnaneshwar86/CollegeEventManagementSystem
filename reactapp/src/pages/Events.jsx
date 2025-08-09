import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';

const dummyEvents = [
  {
    eventId: 1,
    name: 'Tech Fest',
    description: 'Annual technology and innovation event.',
    date: '2025-09-01',
    venue: 'Main Auditorium',
  },
  {
    eventId: 2,
    name: 'Cultural Night',
    description: 'Showcase of music, dance, and drama.',
    date: '2025-09-10',
    venue: 'Open Air Theatre',
  },
];

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch from backend later
    // axios.get('/api/events')
    //   .then(res => setEvents(res.data.content))
    //   .catch(err => console.error(err));
    setEvents(dummyEvents); // using dummy data for now
  }, []);

  return (
    <Box sx={{ paddingTop: '12vh', backgroundColor: '#f5f5f5', minHeight: '90vh' }}>
      <Container>
        <Typography variant="h4" fontWeight="bold" color="#00809D" gutterBottom>
          Upcoming Events
        </Typography>

        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.eventId}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {event.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {event.description}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Date:</strong> {event.date}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Venue:</strong> {event.venue}
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ marginTop: 2, backgroundColor: '#00809D' }}
                    href={`/register?eventId=${event.eventId}`}
                  >
                    Register
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Events;
