import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { getStudents } from '../services/studentService';

function StudentsPage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents().then(setStudents).catch(console.error);
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h3" color="#00809D" gutterBottom>
        Students
      </Typography>
      <List>
        {students.map((student) => (
          <ListItem key={student.id}>
            <ListItemText primary={student.name} secondary={student.email} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default StudentsPage;
