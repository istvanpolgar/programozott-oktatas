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
  const [exercises, setExercises] = useState([]);
  const [titles, setTitles] = useState([]);
  const [actually, setActually] = useState([]);
  const [actExercises, setActExercises] = useState([]);
  const [actUrl, setActUrl] = useState("");
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
            for(let i=0; i<response.data.integer.length-1; i++){
              act.push(response.data.integer[i].title);
              actex.push(response.data.integer[i].exercise);
              acturl.push(response.data.integer[i].url);
            }
            for(let i=0; i<response.data.ianswers.length; i++)
              actansw.push(response.data.ianswers[i]);
          }
          if(response.data.level === 3) {
            for(let i=0; i<response.data.rational.length-1; i++){
              act.push(response.data.rational[i].title);
              actex.push(response.data.rational[i].exercise);
              acturl.push(response.data.rational[i].url);
            }
            for(let i=0; i<response.data.raanswers.length; i++)
              actansw.push(response.data.raanswers[i]);
          }
          if(response.data.level === 4) {
            for(let i=0; i<response.data.real.length-1; i++){
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

  useEffect(()=>{
    let excs = [];
    switch(level) {
        case 1: {
            switch(sublevel) {
                case 1: {
                    excs.push({
                        title: '1. Feladat',
                        text: '6+7'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '24+63'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '15+37'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '642+269'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '23+514+7+86'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: '5+10+15+20+...+45'
                    });
                    break;
                }
                case 2: {
                    excs.push({
                        title: '1. Feladat',
                        text: '9-4'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '54-31'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '87-69'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '637-559'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '905-416'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: '324-85-124-15'
                    });
                    break;
                }
                case 3: {
                    excs.push({
                        title: '1. Feladat',
                        text: 'Adj össze kér számot!'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: 'Adj össze kér számot!'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: 'Adj össze kér számot!'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: 'Adj össze kér számot!'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: 'Adj össze kér számot!'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: 'Adj össze kér számot!'
                    });
                    excs.push({
                        title: '7. Feladat',
                        text: 'Adj össze kér számot!'
                    });
                    excs.push({
                        title: '8. Feladat',
                        text: 'Adj össze kér számot!'
                    });
                    excs.push({
                        title: '9. Feladat',
                        text: 'Adj össze kér számot!'
                    });
                    break;
                }
                case 4: {
                    excs.push({
                        title: '1. Feladat',
                        text: 'Adj össze két számot!'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: 'Adj össze két számot!'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: 'Adj össze két számot!'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: 'Adj össze két számot!'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: 'Adj össze két számot!'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: 'Adj össze kér számot!'
                    });
                    excs.push({
                        title: '7. Feladat',
                        text: 'Adj össze kér számot!'
                    });
                    break;
                }
                case 5: {
                    excs.push({
                        title: '1. Feladat',
                        text: 'Adj össze kér számot!'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: 'Adj össze kér számot!'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: 'Adj össze kér számot!'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: 'Adj össze kér számot!',
                        a: 'első',
                        b: 'második',
                        c: 'harmadik',
                        d: 'negyedik'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '3^3 \\cdot 3^2',
                        a: '3^6',
                        b: '3^5',
                        c: '9 \\cdot 6',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: 'Adj össze kér számot!',
                        a: 'első',
                        b: 'második',
                        c: 'harmadik',
                        d: 'negyedik'
                    });
                    excs.push({
                        title: '7. Feladat',
                        text: 'Adj össze kér számot!',
                        a: 'első',
                        b: 'második',
                        c: 'harmadik',
                        d: 'negyedik'
                    });
                    excs.push({
                        title: '8. Feladat',
                        text: 'Adj össze kér számot!',
                        a: 'első',
                        b: 'második',
                        c: 'harmadik',
                        d: 'negyedik'
                    });
                    excs.push({
                        title: '9. Feladat',
                        text: 'Adj össze kér számot!',
                        a: 'első',
                        b: 'második',
                        c: 'harmadik',
                        d: 'negyedik'
                    });
                    excs.push({
                        title: '10. Feladat',
                        text: 'Adj össze kér számot!',
                        a: 'első',
                        b: 'második',
                        c: 'harmadik',
                        d: 'negyedik'
                    });
                    break;
                }
                case 6: {
                    excs.push({
                        title: '1. Feladat',
                        text: 'Adj össze kér számot!',
                        a: 'első',
                        b: 'második',
                        c: 'harmadik'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: 'Adj össze kér számot!',
                        a: 'első',
                        b: 'második',
                        c: 'harmadik',
                        d: 'negyedik',
                        e: 'ötödik'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: 'Adj össze kér számot!',
                        a: 'első',
                        b: 'második',
                        c: 'harmadik'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: 'Adj össze kér számot!',
                        a: 'első',
                        b: 'második',
                        c: 'harmadik',
                        d: 'negyedik'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: 'Adj össze kér számot!',
                        a: 'első',
                        b: 'második',
                        c: 'harmadik',
                        d: 'negyedik'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: 'Adj össze kér számot!',
                        a: 'első',
                        b: 'második',
                        c: 'harmadik',
                        d: 'negyedik',
                        e: 'ötödik'
                    });
                    break;
                }
                case 7: {
                    excs.push({
                        title: '1. Feladat',
                        text: 'Adj össze kér számot!',
                        a: 'első',
                        b: 'második',
                        c: 'harmadik',
                        d: 'negyedik'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: 'Adj össze kér számot!',
                        a: 'első',
                        b: 'második',
                        c: 'harmadik',
                        d: 'negyedik',
                        e: 'ötödik'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: 'Adj össze kér számot!',
                        a: 'első',
                        b: 'második',
                        c: 'harmadik',
                        d: 'negyedik'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: 'Adj össze kér számot!',
                        a: 'első',
                        b: 'második',
                        c: 'harmadik',
                        d: 'negyedik',
                        e: 'ötödik'
                    });
                    break;
                }
                case 8: {
                    excs.push({
                        title: '1. Feladat',
                        text: 'Adj össze kér számot!',
                        a: 'első',
                        b: 'második',
                        c: 'harmadik'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: 'Adj össze kér számot!',
                        a: 'első',
                        b: 'második',
                        c: 'harmadik'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: 'Adj össze kér számot!',
                        a: 'első',
                        b: 'második',
                        c: 'harmadik',
                        d: 'negyedik',
                        e: 'ötödik'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: 'Adj össze kér számot!',
                        a: 'első',
                        b: 'második',
                        c: 'harmadik'
                    });
                    break;
                }
                case 9: {
                    excs.push({
                        title: '1. Feladat',
                        text: 'Adj össze kér számot!',
                        a: 'első',
                        b: 'második',
                        c: 'harmadik',
                        d: 'negyedik'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: 'Adj össze kér számot!',
                        a: 'első',
                        b: 'második',
                        c: 'harmadik',
                        d: 'negyedik'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: 'Adj össze kér számot!',
                        a: 'első',
                        b: 'második',
                        c: 'harmadik',
                        d: 'negyedik'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: 'Adj össze kér számot!',
                        a: 'első',
                        b: 'második',
                        c: 'harmadik',
                        d: 'negyedik'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: 'Adj össze kér számot!',
                        a: 'első',
                        b: 'második',
                        c: 'harmadik',
                        d: 'negyedik'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: 'Adj össze kér számot!',
                        a: 'első',
                        b: 'második',
                        c: 'harmadik',
                        d: 'negyedik'
                    });
                    break;
                }
                case 10: {
                    excs.push({
                        title: '1. Feladat',
                        text: 'Adj össze kér számot!',
                        a: 'első',
                        b: 'második',
                        c: 'harmadik',
                        d: 'negyedik'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: 'Adj össze kér számot!',
                        a: 'első',
                        b: 'második',
                        c: 'harmadik',
                        d: 'negyedik'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: 'Adj össze kér számot!',
                        a: 'első',
                        b: 'második',
                        c: 'harmadik',
                        d: 'negyedik'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: 'Adj össze kér számot!',
                        a: 'első',
                        b: 'második',
                        c: 'harmadik',
                        d: 'negyedik'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: 'Adj össze kér számot!',
                        a: 'első',
                        b: 'második',
                        c: 'harmadik',
                        d: 'negyedik'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: 'Adj össze kér számot!'
                    });
                    excs.push({
                        title: '7. Feladat',
                        text: 'Adj össze kér számot!'
                    });
                    excs.push({
                        title: '8. Feladat',
                        text: 'Adj össze kér számot!'
                    });
                    break;
                }
                default: 
            }
            break;
        }
        case 2: {
            switch(sublevel) {
                case 1: {

                    break;
                }
                case 2: {
                    
                    break;
                }
                case 3: {
                    
                    break;
                }
                case 4: {
                    
                    break;
                }
                case 5: {
                    
                    break;
                }
                case 6: {
                    
                    break;
                }
                case 7: {
                    
                    break;
                }
                case 8: {
                    
                    break;
                }
                case 9: {
                    
                    break;
                }
                default: 
            }
            break;
        }
        case 3: {
            switch(sublevel) {
                case 1: {
                
                    break;
                }
                case 2: {
                    
                    break;
                }
                case 3: {
                    
                    break;
                }
                case 4: {
                    
                    break;
                }
                case 5: {
                    
                    break;
                }
                case 6: {
                    
                    break;
                }
                case 7: {
                    
                    break;
                }
                case 8: {
                    
                    break;
                }
                case 9: {
                    
                    break;
                }
                case 10: {
                    
                    break;
                }
                case 11: {
                    
                    break;
                }
                case 12: {
                    
                    break;
                }
                default: 
            }
            break;
        }
        case 4: {
            switch(sublevel) {
                case 1: {

                    break;
                }
                case 2: {
                    
                    break;
                }
                case 3: {
                    
                    break;
                }
                case 4: {
                    
                    break;
                }
                case 5: {
                    
                    break;
                }
                case 6: {
                    
                    break;
                }
                case 7: {
                    
                    break;
                }
                case 8: {
                    
                    break;
                }
                case 9: {
                    
                    break;
                }
                case 10: {
                    
                    break;
                }
                case 11: {
                    
                    break;
                }
                case 12: {
                    
                    break;
                }
                case 13: {
                    
                    break;
                }
                default: 
            }
            break;
        }
        default: 
    }
    setExercises(excs);
  },[level, sublevel]);

  if(level!==0 && sublevel!==0 && actUrl!=="")
  {
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
              exercises={exercises}
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
}