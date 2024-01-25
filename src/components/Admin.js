import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import LinearProgress from '@mui/joy/LinearProgress';
import Typography from '@mui/joy/Typography';

import {
  Box,
  Divider
} from '@mui/material';

import Copyright from './Copyright';
import Alert from './Alert';

const Text1 = styled('div')(({ theme }) => ({
    ...theme.typography.h4,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2,2,2,0),
}));

const Text2 = styled('div')(({ theme }) => ({
    ...theme.typography.h5,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1,1,1,2),
}));

const Text3 = styled('div')(({ theme }) => ({
    ...theme.typography.h6,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1,1,1,2),
}));

export default function Admin() {
    let navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [users,setUsers] = useState([]);
    const [alllevels,setAlllevels] = useState(0);
    const [allsublevels,setAllsublevels] = useState(0);
    const [allexercises,setAllexercises] = useState(0);

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
        navigate(0);
    };
    
    useEffect(()=>{
        const data = {};

        const headers = {
            'Content-Type': 'application/json'
        }

        axios.post(`${process.env.REACT_APP_API_URL}/admin`, data, { headers: headers })
        .then((response) => { 
            if(response.data.code){
                setMessage(response.data.message);
                setOpen(true);
            }
            else {
                let us = [];
                for(let i=0; i<response.data.users.length; i++) {
                    us.push(response.data.users[i]);
                }
                
                setUsers(us);
                setAlllevels(response.data.alllevels);
                setAllsublevels(response.data.allsublevels);
                setAllexercises(response.data.allexercises);
            }
        });
    },[]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            window.location.reload();
        }, 7000);
        return () => clearInterval(intervalId);
    }, []);
    return (
        <div>
            <Box sx={{ 
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                width: 0.98,
                m: 1,
                p: 1
            }}>
                <Text1> Diákok adatai </Text1>
                {
                    users.map((u,i) => (
                        <div key={i}>
                            <Divider sx={{paddingTop: 2, paddingBottom: 2, width: 1}}/>
                            <Text2> {i+1}. {u.name} </Text2>
                            <Divider sx={{width: 1}}/>
                            <Text3> Fejezet - {u.levelname} </Text3>
                            <LinearProgress
                                determinate
                                variant="outlined"
                                color="success"
                                size="sm"
                                value={Math.round((100/alllevels)*(u.level-1))}
                                sx={{
                                    '--LinearProgress-radius': '0px',
                                    '--LinearProgress-progressThickness': '4vh',
                                    '--LinearProgress-thickness': '5vh',
                                    boxShadow: 'sm',
                                    borderColor: 'neutral.500',
                                }}
                            >
                                <Typography
                                    level="body-xs"
                                    fontWeight="xl"
                                    fontSize="2vh"
                                    textColor="rgb(56, 142, 60)"
                                    sx={{ mixBlendMode: 'difference' }}
                                >
                                    {`${Math.round(100*(u.level-1)/alllevels)}%`} TELJESÍTVE
                                </Typography>
                            </LinearProgress>
                            <Text3> Egység - {u.sublevelname} </Text3>
                            <LinearProgress
                                determinate
                                variant="outlined"
                                color="success"
                                size="sm"
                                value={Math.round((100/allsublevels)*u.sublevel)}
                                sx={{
                                    '--LinearProgress-radius': '0px',
                                    '--LinearProgress-progressThickness': '4vh',
                                    '--LinearProgress-thickness': '5vh',
                                    boxShadow: 'sm',
                                    borderColor: 'neutral.500',
                                }}
                            >
                                <Typography
                                    level="body-xs"
                                    fontWeight="xl"
                                    fontSize="2vh"
                                    textColor="rgb(56, 142, 60)"
                                    sx={{ mixBlendMode: 'difference' }}
                                >
                                    {`${Math.round(100*u.sublevel/allsublevels)}%`} TELJESÍTVE
                                </Typography>
                            </LinearProgress>
                            <Text3> Feladat - {u.actualexercise}. feladat (Össesen {u.exercise-1} feladat teljesítve) </Text3>
                            <LinearProgress
                                determinate
                                variant="outlined"
                                color="success"
                                size="sm"
                                value={Math.round((100/allexercises)*u.exercise)}
                                sx={{
                                    '--LinearProgress-radius': '0px',
                                    '--LinearProgress-progressThickness': '4vh',
                                    '--LinearProgress-thickness': '5vh',
                                    boxShadow: 'sm',
                                    borderColor: 'neutral.500',
                                }}
                            >
                                <Typography
                                    level="body-xs"
                                    fontWeight="xl"
                                    fontSize="2vh"
                                    textColor="rgb(56, 142, 60)"
                                    sx={{ mixBlendMode: 'difference' }}
                                >
                                    {`${Math.round(100*u.exercise/allexercises)}%`} TELJESÍTVE
                                </Typography>
                            </LinearProgress>
                        </div>
                    ))
                }
            </Box>
            <Alert 
                open={open}
                handleClose={handleClose}
                handleClickOpen={handleOpen}
                text={message}
            />
            <Copyright sx={{ mt: 5 }} />
        </div>
    );
}