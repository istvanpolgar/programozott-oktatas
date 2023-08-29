import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {
  Box
} from '@mui/material';

import Copyright from './Copyright';
import InfoArea from './InfoArea';
import Alert from './Alert';
import Steppers from './Steppers';

export default function Workspace(props) {
  let navigate = useNavigate();
  const [natural, setNatural] = useState([]);
  const [integer, setInteger] = useState([]);
  const [rational, setRational] = useState([]);
  const [real, setReal] = useState([]);
  const [titles, setTitles] = useState([]);
  const [actually, setActually] = useState([]);
  const [actExercises, setActExercises] = useState([]);
  const [actUrl, setActUrl] = useState([]);
  const [nanswers, setNanswers] = useState([]);
  const [ianswers, setIanswers] = useState([]);
  const [raanswers, setRaanswers] = useState([]);
  const [reanswers, setReanswers] = useState([]);
  const [actAnswers, setActAnswers] = useState([]);
  const [level, setLevel] = useState(0);
  const [sublevel, setSublevel] = useState(0);
  const [exercise, setExercise] = useState(0);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate(0);
  };

  const saveLevel = () => {
      const data = {
        level: level
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.token}`
      }
  
      axios.post(`${process.env.REACT_APP_API_URL}/savelevel`, data, { headers: headers })
      .then((response) => {
        if(response.data.code){
          setMessage(response.data.message);
          setOpen(true);
        }
        else
          setMessage("Befejezted a " + titles[level-1] + " szintet! Átléptél a " + titles[level] + " szintre.");
          setOpen(true);
      });
  };

  const saveSublevel = () => {
    console.log(sublevel);
    const data = {
      sublevel: sublevel
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${props.token}`
    }

    axios.post(`${process.env.REACT_APP_API_URL}/savesublevel`, data, { headers: headers })
    .then((response) => {
      if(response.data.code){
        setMessage(response.data.message);
        setOpen(true);
      }
      else
      setMessage("Befejezted a " + actually[sublevel-1] + " szintet! Átléptél a " + actually[sublevel] + " szintre.");
        setOpen(true);
    });
  };

  const saveExercise = () => {
    console.log(sublevel);
    const data = {
      exercise: exercise
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${props.token}`
    }

    axios.post(`${process.env.REACT_APP_API_URL}/saveexercise`, data, { headers: headers })
    .then((response) => {
      if(response.data.code){
        setMessage(response.data.message);
        setOpen(true);
      }
      else
        setMessage("Helyesen válaszoltál! Jöhet a következő feladat");
        setOpen(true);
    });
  };

  useEffect(()=>{
    const data = {};

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${props.token}`
    }

    axios.post(`${process.env.REACT_APP_API_URL}/stats`, data, { headers: headers })
    .then((response) => {
        let act = [];
        let actex = [];
        let actansw = []; 
        let acturl = []; 
        if(response.data.code){
          setMessage(response.data.message);
          setOpen(true);
        }
        else {
          setLevel(response.data.level);
          setSublevel(response.data.sublevel);
          setExercise(response.data.exercise);
          setTitles(response.data.titles);
          setNatural(response.data.natural);
          setInteger(response.data.integer);
          setRational(response.data.rational);
          setReal(response.data.real);
          setNanswers(response.data.nanswers);
          /*setIanswers(response.data.ianswers);
          setRaanswers(response.data.raanswers);
          setReanswers(response.data.reanswers);*/
          if(response.data.level === 1) {
            for(let i=0; i<response.data.natural.length; i++){
              act.push(response.data.natural[i].title);
              actex.push(response.data.natural[i].exercise);
              acturl.push(response.data.natural[i].url);
            }
            for(let i=0; i<response.data.nanswers.length; i++)
              actansw.push(response.data.nanswers[i]);
          }
          if(response.data.level === 2) {
            for(let i=0; i<response.data.integer.length; i++){
              act.push(response.data.integer[i].title);
              actex.push(response.data.integer[i].exercise);
              acturl.push(response.data.integer[i].url);
            }
            for(let i=0; i<response.data.ianswers.length; i++)
              actansw.push(response.data.ianswers[i]);
          }
          if(response.data.level === 3) {
            for(let i=0; i<response.data.rational.length; i++){
              act.push(response.data.rational[i].title);
              actex.push(response.data.rational[i].exercise);
              acturl.push(response.data.rational[i].url);
            }
            for(let i=0; i<response.data.raanswers.length; i++)
              actansw.push(response.data.raanswers[i]);
          }
          if(response.data.level === 4) {
            for(let i=0; i<response.data.real.length; i++){
              act.push(response.data.real[i].title);
              actex.push(response.data.real[i].exercise);
              acturl.push(response.data.real[i].url);
            }
            for(let i=0; i<response.data.reanswers.length; i++)
              actansw.push(response.data.reanswers[i]);
          }
          setActually(act);
          setActAnswers(actansw);
          setActExercises(actex);
          setActUrl(acturl);
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 0.95,
        p: 1
      }}>
          <Steppers
            titles={titles} 
            actually={actually} 
            actExercises={actExercises}
            actUrl={actUrl}
            token={props.token} 
            setToken={props.setToken}
            answers={actAnswers}
            level={level}
            setLevel={setLevel}
            saveLevel={saveLevel}
            sublevel={sublevel}
            setSublevel={setSublevel}
            saveSublevel={saveSublevel}
            exercise={exercise}
            setExercise={setExercise}
            saveExercise={saveExercise}
          />
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