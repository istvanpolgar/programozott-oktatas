import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Box
} from '@mui/material';

import Copyright from './Copyright';
import InfoArea from './InfoArea';
import Alert from './Alert';

const Text1 = styled('div')(({ theme }) => ({
  ...theme.typography.h4,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const Text2 = styled('div')(({ theme }) => ({
  ...theme.typography.h5,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

export default function Main(props) {
  let navigate = useNavigate();
  const [level, setLevel] = useState(0);
  const [sublevel, setSublevel] = useState(0);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate(0);
  };

  const handleStats = () => {
    navigate('/stats');
  };

  const handleWork = () => {
    navigate('/work');
  };

  const handleRead = () => {
    navigate('/read');
  };

  useEffect(()=>{
    const data = {};

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${props.token}`
    }

    axios.post(`${process.env.REACT_APP_API_URL}/stats`, data, { headers: headers })
    .then((response) => {
        if(response.data.code){
          setMessage(response.data.message);
          setOpen(true);
        }
        else {
          setLevel(response.data.level);
          setSublevel(response.data.sublevel);
        }
    });
  },[props.token]);

  return (
    <div>
      <InfoArea 
        token={props.token} 
        setToken={props.setToken}
        level={level}
        sublevel={sublevel}
      />
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        alignContent: 'center',
        width: 1
      }}>
          <Card sx={{ width: '30%', marginTop: 3}} onClick={handleStats}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="500"
                image="/pictures/stats.jpg"
                alt="statisztika"
              />
              <CardContent>
                <Text1 gutterBottom variant="h5" component="div">
                  Nézd át, hogy mit dolgoztál eddig
                </Text1>
                <Text2 variant="body2" color="text.secondary">
                  Nézd meg, hogy hol tartassz a gyakorlás folyamatában, mennyit gyakoroltál, illetve miket teljesítettél és mely részek várnak még rád
                </Text2>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card sx={{ width: '30%', marginTop: 3 }} onClick={handleWork}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="500"
                image="/pictures/work.jpg"
                alt="feladatok"
              />
              <CardContent>
                <Text1 gutterBottom variant="h5" component="div">
                  Gyakorolj
                </Text1>
                <Text2 variant="body2" color="text.secondary">
                  Gyakorold a számolást, a műveleteket és azok tulajdonságait alkalmazva oldj meg összetettebb feladatokat
                </Text2>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card sx={{ width: '30%', marginTop: 3 }} onClick={handleRead}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="500"
                image="/pictures/theory.jpg"
                alt="elméletek"
              />
              <CardContent>
                <Text1 gutterBottom variant="h5" component="div">
                  Tanulj
                </Text1>
                <Text2 variant="body2" color="text.secondary">
                  Merülj el a feladatokhoz tartozó elméleti tartalmakban, nézd meg a hozzájuk tartozó videókat, interaktív weboldalakat 
                </Text2>
              </CardContent>
            </CardActionArea>
          </Card>
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