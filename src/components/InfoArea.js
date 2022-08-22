import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Button
} from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import PersonPinIcon from '@mui/icons-material/PersonPin';

import Alert from './Alert';

export default function InfoArea(props) {
    let navigate = useNavigate();

    const [user, setUser] = useState("");
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
        navigate(0);
    };

    const handleBack = () => {
        navigate('/main', { replace: true });
    };

    const handleSubmit = async (e) => {  
        e.preventDefault();
    
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${props.token}`
        }
    
        axios.post(process.env.REACT_APP_API_URL + '/signout', {}, { headers: headers })
        .then((response) => {
            if(response.data.code){
                setMessage(response.data.message);
                setOpen(true);
            }
            else{
                props.setToken("");
                navigate('../', { replace: true });
            }
        });
      } 

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${props.token}`
        }
    
        axios.post(process.env.REACT_APP_API_URL + '/getuser', {}, {headers: headers})
            .then((response) => {
            if(!response.data.code){
                setUser(response.data.user);
            }
            else
            {
                console.log(response.data.message);
            }
        });
    },[props.token]);

    return (
        <div>
            <Alert 
                open={open}
                handleClose={handleClose}
                handleClickOpen={handleOpen}
                text={message}
            />
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ bgcolor: "tomato" }}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="home"
                            onClick={handleBack}
                            sx={{ mr: 2 }}
                        >
                            <HomeIcon />
                        </IconButton>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <IconButton
                                size="large"
                                edge="end"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{ mr: 2 }}
                            >
                                <PersonPinIcon sx={{ mx: 2 }}/>
                                <Typography variant="h6" component="div" >
                                    {user}
                                </Typography>
                            </IconButton>
                            
                            <Button 
                                color="inherit"
                                onClick={handleSubmit}
                            >
                                Logout
                            </Button>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
}
