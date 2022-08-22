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
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from '../images/background.jpg';

import Copyright from './Copyright';
import Alert from './Alert';

const theme = createTheme();

export default function ForgottenPass() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate(0);
  };

  const handleSubmit = async (e) => {  
    e.preventDefault();

    const data = {
        email: email,
    }

    const headers = {
      'Content-Type': 'application/json',
    }

    axios.post(process.env.REACT_APP_API_URL + '/forgotten_pass', data, { headers: headers })
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
                Új jelszó kérése
            </Typography>
            <Typography component="p" color="primary" align="center">
                A jelszó megváltoztatásához kérjük add meg a bejelentkezési 
                e-mailcímet, kattints a gombra, majd várd a szükséges e-mailt a postaládádban. 
                A levélben található linkre kattintva adhatod meg új jelszavat!
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                required
                fullWidth
                id="email"
                label="E-mail cím"
                name="email"
                autoComplete="email"
                onChange={event => setEmail(event.target.value)}
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Új jelszó kérése
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/signin" variant="body2">
                    Mégsem cseréled le? Jelentkezz be!
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