import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, TextField, Button, ButtonGroup, Container } from '@mui/material'
import '../App.css'

function LoginPage() {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [errors, setErrors] = useState({ email: '', password: '' });
  let [userData, setUserData] = useState([]);
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const navigate = useNavigate();
  const goToHomePage = () => {
    navigate("/");
  }
  const goToSignUpPage = () => {
    navigate("/signup");
  }

  const handleSubmit = (e) => {
    let valid = true;
    const newErrors = { email: '', password: '' };

    if (!regex.test(email)) {
      newErrors.email = "Invalid email address";
      valid = false;
    }

    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      valid = false;
    }

    if (valid) {
      setUserData([...userData, { email, password }]);
      setEmail('');
      setPassword('');
      newErrors.email = '';
      newErrors.password = '';
      setErrors(newErrors);
      goToHomePage();
    }
    else {
      setErrors(newErrors);
    }
  }

  return (
    <Container 
      maxWidth="sm" 
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        className="box"
        sx={{
          width: '70vh',
          height: '60vh',
          borderRadius: 2,
          bgcolor: 'white',
          boxShadow: 3,
          p: 3,
          textAlign: "center"
        }}
      >
        <h1 className='login'>Login</h1>

        <TextField
          required
          className='email'
          label="Email"
          type='email'
          variant="outlined"
          margin='normal'
          sx={{ marginBottom: '40px', width: '50vh' }}
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}
          error={!!errors.email}
          helperText={errors.email}
        />

        <TextField
          required
          className='password'
          label="Password"
          type='password'
          variant="outlined"
          margin='normal'
          sx={{ marginBottom: '20px', width: '50vh' }}
          value={password}
          onChange={(e) => { setPassword(e.target.value) }}
          error={!!errors.password}
          helperText={errors.password}
        />

        <ButtonGroup className='up' variant="text" aria-label="Basic button group">
          <Button className='forgot' variant="text" color='primary' size='small'>Forgot Password?</Button>
          <Button className='signup' onClick={goToSignUpPage} variant="text" color='primary' size='small' sx={{ fontWeight: 'bold' }}>Sign Up</Button>
        </ButtonGroup>

        <Button className='submit' onClick={handleSubmit} variant="contained" sx={{ mt: 3 }}>Sign In</Button>

      </Box>
    </Container>
  )
}

export default LoginPage;
