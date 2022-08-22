import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {
  Avatar, 
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from '../images/background.jpg';

import Copyright from './Copyright';
import Alert from './Alert';

const theme = createTheme();

export default function SignUp() {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [_password, set_Password] = useState("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate(0);
  };

  const handleClickShowPassword1 = () => {
    setShow1(!show1);
  };

  const handleClickShowPassword2 = () => {
    setShow2(!show2);
  };

  const handleSubmit = async (e) => {  
    e.preventDefault();

    const data = {
        name: name,
        email: email,
        password: password,
        _password: _password,
    }

    const headers = {
      'Content-Type': 'application/json',
    }

    axios.post(process.env.REACT_APP_API_URL + '/signup', data, { headers: headers })
    .then((response) => {
      if(response.data.code){
        setMessage(response.data.message);
        setOpen(true);
      }
      else{
        navigate('/signin', { replace: true });
      }
    });
  }   

  return (
    <ThemeProvider theme={theme}>
      <Alert 
          open={open}
          handleClose={handleClose}
          handleClickOpen={handleOpen}
          text={message}
      />
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${Image})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Regisztráció
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    sx={{ mt: 1 }}
                    required
                    fullWidth
                    id="name"
                    label="Diák neve"
                    name="name"
                    autoComplete="name"
                    onChange={event => setName(event.target.value)}
                    autoFocus
                />
                <TextField
                    sx={{ mt: 1 }}
                    required
                    fullWidth
                    id="email"
                    label="E-mail cím"
                    name="email"
                    autoComplete="email"
                    onChange={event => setEmail(event.target.value)}
                />
                <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
                  <InputLabel htmlFor="password">Jelszó</InputLabel>
                  <OutlinedInput
                    required
                    fullWidth
                    id="password"
                    label="Jelszó"
                    name="password"
                    autoComplete="current-password"
                    onChange={event => setPassword(event.target.value)}
                    type={show1 ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword1}
                          edge="end"
                        >
                          {show1 ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
                  <InputLabel htmlFor="_password">Jelszó újra</InputLabel>
                  <OutlinedInput
                    required
                    fullWidth
                    id="_password"
                    label="Jelszó újra"
                    name="_password"
                    autoComplete="conformation-password"
                    onChange={event => set_Password(event.target.value)}
                    type={show2 ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword2}
                          edge="end"
                        >
                          {show2 ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Regisztrálok
                </Button>
                <Grid container>
                    <Grid item>
                    <Link href="/signin" variant="body2">
                        {"Már regisztráltál? Jelentkezz be!"}
                    </Link>
                    </Grid>
                </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}