import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await registerStudent(form);
      alert('Registration successful');
    } catch (err) {
      console.error(err);
      alert('Error registering student');
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth margin="normal" label="Name" name="name" value={form.name} onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Email" name="email" value={form.email} onChange={handleChange} />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Submit</Button>
      </form>
    </Box>
  );
}

export default RegisterPage;
