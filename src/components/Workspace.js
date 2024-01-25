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
  const [actually2, setActually2] = useState([]);
  const [actExercises, setActExercises] = useState([]);
  const [actExercises2, setActExercises2] = useState([]);
  const [actChanges, setActChanges] = useState([]);
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

  const saveLevel = (l,tip) => {
      const data = {
        level: l,
        tip: tip
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
            if(response.data.tip === 1){
                setMessage("Befejezted a " + titles[level-1] + " fejezetet. Átlépsz a " + titles[l-1] + " fejezetre!");
                setOpen(true);
            }
            if(response.data.tip === 2){
                setMessage("Visszalépsz a " + titles[response.data.level-1] + " fejezetre!");
                setOpen(true);
            }
      });
  };

  const saveSublevel = (sl, tip) => {
    const data = {
      sublevel: sl,
      tip: tip
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
        if(level !== response.data.level)
        {
            setMessage("Visszalépsz a " + titles[response.data.level-1] + " fejezetre!");
            setOpen(true);
        }
        else
            if(response.data.tip === 1){
                setMessage("Befejezted a " + actually[sublevel-1] + " egységet. Átlépsz a " + actually[sl-1] + " egységre!");
                setOpen(true);
            }
            if(response.data.tip === 2){
                setMessage("Visszalépsz a " + actually[sl-1] + " egységre!");
                setOpen(true);
            }
    });
  };

  const saveExercise = (ex, tip) => {
    const data = {
      exercise: ex,
      tip: tip
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
        if(response.data.tip === 1){
            setMessage("Helyesen válaszoltál! Jöhet a következő feladat!");
            setOpen(true);
        }
        if(response.data.tip === 2){
            setMessage("Visszalépsz az első feladatra!");
            setOpen(true);
        }
        if(response.data.tip === 3){
            setMessage("Elülről kezded az egész fejezetet!");
            setOpen(true);
        }
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
        let act2 = [];
        let actex = [];
        let actex2 = [];
        let actch = [];
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
                act2.push(response.data.natural[i].title2);
                actex.push(response.data.natural[i].exercise);
                actex2.push(response.data.natural[i].exercise2);
                actch.push(response.data.natural[i].change);
                acturl.push(response.data.natural[i].url);
            }
            for(let i=0; i<response.data.nanswers.length; i++)
              actansw.push(response.data.nanswers[i]);
          }
          if(response.data.level === 2) {
            for(let i=0; i<response.data.integer.length-1; i++){
                act.push(response.data.integer[i].title);
                act2.push(response.data.integer[i].title2);
                actex.push(response.data.integer[i].exercise);
                actex2.push(response.data.integer[i].exercise2);
                actch.push(response.data.integer[i].change);
                acturl.push(response.data.integer[i].url);
            }
            for(let i=0; i<response.data.ianswers.length; i++)
              actansw.push(response.data.ianswers[i]);
          }
          if(response.data.level === 3) {
            for(let i=0; i<response.data.rational.length-1; i++){
                act.push(response.data.rational[i].title);
                act2.push(response.data.rational[i].title2);
                actex.push(response.data.rational[i].exercise);
                actex2.push(response.data.rational[i].exercise2);
                actch.push(response.data.rational[i].change);
                acturl.push(response.data.rational[i].url);
            }
            for(let i=0; i<response.data.raanswers.length; i++)
              actansw.push(response.data.raanswers[i]);
          }
          if(response.data.level === 4) {
            for(let i=0; i<response.data.real.length-1; i++){
                act.push(response.data.real[i].title);
                act2.push(response.data.real[i].title2);
                actex.push(response.data.real[i].exercise);
                actex2.push(response.data.real[i].exercise2);
                actch.push(response.data.real[i].change);
                acturl.push(response.data.real[i].url);
            }
            for(let i=0; i<response.data.reanswers.length; i++)
                actansw.push(response.data.reanswers[i]);
          }
          setActually(act);
          setActually2(act2);
          setActAnswers(actansw);
          setActExercises(actex);
          setActExercises2(actex2);
          setActChanges(actch);
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
                        text: '6 \\cdot 8'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '7 \\cdot 28'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '24 \\cdot 53'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '42 \\cdot 327'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '162 \\cdot 517'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: '7 \\cdot 32 \\cdot 2'
                    });
                    excs.push({
                        title: '7. Feladat',
                        text: '12 \\cdot 9 \\cdot 10'
                    });
                    excs.push({
                        title: '8. Feladat',
                        text: '32 \\cdot 5 \\cdot 4 \\cdot 100'
                    });
                    excs.push({
                        title: '9. Feladat',
                        text: '1 \\cdot 2 \\cdot 3 \\cdot 4 \\cdot 5 \\cdot 6 \\cdot 7'
                    });
                    break;
                }
                case 4: {
                    excs.push({
                        title: '1. Feladat',
                        text: '16 : 4'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '321 : 3'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '2624 : 4'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '756 : 12'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '1817 : 79'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: '0 : 2023'
                    });
                    excs.push({
                        title: '7. Feladat',
                        text: '16416 : 19 : 27 : 16'
                    });
                    break;
                }
                case 5: {
                    excs.push({
                        title: '1. Feladat',
                        text: '2^5'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '5^2'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '2023^0'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '3^3 \\cdot 3^2',
                        a: '3^6',
                        b: '3^5',
                        c: '9 \\cdot 6',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '{13}^2 \\cdot {13}^6 \\cdot {13}^2',
                        a: '{13}^10',
                        b: '{13}^{24}',
                        c: '26 \\cdot 78 \\cdot 26',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: '7^6 : 7^3',
                        a: '7^2',
                        b: '7^3',
                        c: '42 : 21',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '7. Feladat',
                        text: '{31}^{13} : {31}^7 : {31}^2',
                        a: '{31}^3',
                        b: '{31}^4',
                        c: '403 : 217 : 62',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '8. Feladat',
                        text: '7^5 \\cdot 7^{12} : 7^3',
                        a: '7^{20}',
                        b: '7^{14}',
                        c: '35 \\cdot 84 : 21',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '9. Feladat',
                        text: '\\big(4^2\\big)^3',
                        a: '4^6',
                        b: '4^5',
                        c: '8^3',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '10. Feladat',
                        text: '\\Big[\\big(2^{13}\\big)^3\\Big]^9',
                        a: '2^{26}',
                        b: '{8192}^27',
                        c: '2^{351}',
                        d: 'egyéb'
                    });
                    break;
                }
                case 6: {
                    excs.push({
                        title: '1. Feladat',
                        text: '36 - 12 + 18',
                        a: '42',
                        b: '6',
                        c: 'egyéb'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '5 + 6 \\cdot 3 + 13',
                        a: '176',
                        b: '46',
                        c: '101',
                        d: '36',
                        e: 'egyéb'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '16 \\cdot 12 : 6 - 4',
                        a: '36',
                        b: '28',
                        c: 'egyéb'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '64 : 16 \\cdot 4 +23',
                        a: '24',
                        b: '108',
                        c: '39',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '7^5 \\cdot 7^{12} : 7^3 \\cdot 7^2',
                        a: '7^{16}',
                        b: '7^{40}',
                        c: '7^{12}',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: '3 + 5^2 - 4 + 3^2',
                        a: '15',
                        b: '48',
                        c: '69',
                        d: '33',
                        e: 'egyéb'
                    });
                    break;
                }
                case 7: {
                    excs.push({
                        title: '1. Feladat',
                        text: '68 - (21 + 13) - 5',
                        a: '55',
                        b: '39',
                        c: '29',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '(5 + 6) \\cdot (3 + 13)',
                        a: '176',
                        b: '46',
                        c: '101',
                        d: '36',
                        e: 'egyéb'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '7^5 \\cdot 7^{12} : \\big(7^3 \\cdot 7^2\\big)',
                        a: '7^{16}',
                        b: '7^{40}',
                        c: '7^{12}',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '\\bigg(3 + 5\\big)^2 - 4 + 3^2',
                        a: '15',
                        b: '48',
                        c: '69',
                        d: '33',
                        e: 'egyéb'
                    });
                    break;
                }
                case 8: {
                    excs.push({
                        title: '1. Feladat',
                        text: '5 \\cdot (13 + 43)',
                        a: '180',
                        b: '280',
                        c: 'egyéb'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '(45 - 4) \\cdot 9',
                        a: '369',
                        b: '9',
                        c: 'egyéb'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '7 \\cdot (13 + 42) \\cdot 3',
                        a: '1155',
                        b: '216',
                        c: '299',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '(19 - 12) \\cdot (27 - 15)',
                        a: '<0',
                        b: '84',
                        c: 'egyéb'
                    });
                    break;
                }
                case 9: {
                    excs.push({
                        title: '1. Feladat',
                        text: '2022 \\cdot (3x-2x-x)',
                        a: '0',
                        b: '2022x',
                        c: '4044x',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '3a + 4a - 5a + a',
                        a: 'a',
                        b: '2a',
                        c: '3a',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '7 \\cdot (a + b) - 4 \\cdot (a + b)',
                        a: '3a + 3b',
                        b: '3a + 11b',
                        c: '3a + 2b',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '3a^2 \\cdot (a + 1) + 2a \\cdot (5 - a)',
                        a: '3a^3 + 9a + 1',
                        b: '7a^2 + 7a',
                        c: '3a^3 + a^2 + 10a',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '\\bigg(c^5 \\cdot c^{12}\\bigg) : \\bigg(c^3 \\cdot c^2\\bigg)',
                        a: 'c^{16}',
                        b: 'c^{40}',
                        c: 'c^{12}',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: '\\Bigg[\\bigg(y^6 : y^2\\bigg)^4 \\cdot y^3\\Bigg]^2',
                        a: 'y^{38}',
                        b: 'y^{30}',
                        c: 'y^9',
                        d: 'egyéb'
                    });
                    break;
                }
                case 10: {
                    excs.push({
                        title: '1. Feladat',
                        text: '(18 + 10 \\cdot 15) : 4 - 6 \\cdot 7',
                        a: '693',
                        b: '63',
                        c: '0',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '2012 - \\Bigg\\{201 + 2 \\cdot \\Bigg[20 - 12 : \\bigg(2^0 + 1^2\\bigg)\\Bigg]\\Bigg\\}',
                        a: '1795',
                        b: '1783',
                        c: '1200',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '7^{2012}\\Bigg[5 \\cdot 7^{2010} + \\bigg(9^2 - 6^2 - 1^2011\\bigg)  \\cdot 7^{2010}\\Bigg]',
                        a: '\\notin \\mathbb{N}',
                        b: '1',
                        c: '>10000',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '\\bigg(8 \\cdot 3 - 6\\bigg) : \\bigg(2 \\cdot 3^2\\bigg) + \\bigg(352 - 350 : 2\\bigg)',
                        a: '178',
                        b: '<0',
                        c: '2',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '4^3 + 4^{10} : 4^8 \\cdot 4 + 4 \\cdot 4^7 : 4^5 + 4^{10} : \\bigg(3 \\cdot 4^5 + 4^5\\bigg) + 16 \\cdot 4^2',
                        a: '2 \\cdot 4^3',
                        b: '4^7',
                        c: '704',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: '1 + 2 + 3 + \\ldots + 100'
                    });
                    excs.push({
                        title: '7. Feladat',
                        text: '2 + 4 + 6 + \\ldots + 500'
                    });
                    excs.push({
                        title: '8. Feladat',
                        text: '1 + 2^2 + 2^3 + \\ldots + 2^{10}'
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
                    excs.push({
                        title: '1. Feladat',
                        text: '12 + 8'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '7 + (-3)'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '7 + (-12)'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '(-2) + (-5)'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '(-27) + 41'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: '(-18) + 11'
                    });
                    excs.push({
                        title: '7. Feladat',
                        text: '7 + (-3)'
                    });
                    excs.push({
                        title: '8. Feladat',
                        text: '7 + (-12)'
                    });
                    excs.push({
                        title: '9. Feladat',
                        text: '(-2) + (-5)'
                    });
                    excs.push({
                        title: '10. Feladat',
                        text: '(-27) + 41'
                    });
                    excs.push({
                        title: '11. Feladat',
                        text: '(-18) + 11'
                    });
                    excs.push({
                        title: '12. Feladat',
                        text: '(-125) + 274 + (-15)'
                    });
                    excs.push({
                        title: '13. Feladat',
                        text: '(-67) + (-37) + (-81)'
                    });
                    excs.push({
                        title: '14. Feladat',
                        text: '(-1) + (-2) + (-3) + \\ldots + (-10)'
                    });
                    excs.push({
                        title: '15. Feladat',
                        text: '(-5) + (-10) + (-15) + \\ldots + (-45)'
                    });
                    excs.push({
                        title: '16. Feladat',
                        text: '1 + (-2) + 3 + (-4) + \\ldots + 99 + (-100)'
                    });
                    excs.push({
                        title: '17. Feladat',
                        text: '(-1) + 2 + (-3) + 4 + \\ldots + (-99) + 100'
                    });
                    break;
                }
                case 2: {
                    excs.push({
                        title: '1. Feladat',
                        text: '35 - 27'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '25 - 31'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '(-9) - 13'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '12 - (-18)'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '(-8) - (-15)'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: '(-19) - (-5)'
                    });
                    excs.push({
                        title: '7. Feladat',
                        text: '25 - 31'
                    });
                    excs.push({
                        title: '8. Feladat',
                        text: '(-9) - 13'
                    });
                    excs.push({
                        title: '9. Feladat',
                        text: '12-(-18)'
                    });
                    excs.push({
                        title: '10. Feladat',
                        text: '(-8)-(-15)'
                    });
                    excs.push({
                        title: '11. Feladat',
                        text: '(-19)-(-5)'
                    });
                    excs.push({
                        title: '12. Feladat',
                        text: '28-(-12)-40'
                    });
                    excs.push({
                        title: '13. Feladat',
                        text: '102-68-41-5'
                    });
                    excs.push({
                        title: '14. Feladat',
                        text: '1-(-2)-(-3)-\\ldots-(-10)'
                    });
                    excs.push({
                        title: '15. Feladat',
                        text: '-10-(-10)-(-(-10))-(-(-(-10)))'
                    });
                    break;
                }
                case 3: {
                    excs.push({
                        title: '1. Feladat',
                        text: '12 \\cdot 8'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '(-12) \\cdot 8'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '(-12) \\cdot (-8)'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '12 \\cdot (-8)'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '(-12) \\cdot 8 \\cdot (-12) \\cdot 8'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: '(-12) \\cdot (-8) \\cdot (-12) \\cdot 8'
                    });
                    excs.push({
                        title: '7. Feladat',
                        text: '(-12) \\cdot 8 \\cdot 12 \\cdot 8'
                    });
                    excs.push({
                        title: '8. Feladat',
                        text: '(-12) \\cdot (-8) \\cdot (-12) \\cdot (-8)'
                    });
                    excs.push({
                        title: '9. Feladat',
                        text: '(-12) \\cdot 8'
                    });
                    excs.push({
                        title: '10. Feladat',
                        text: '(-12) \\cdot (-8)'
                    });
                    excs.push({
                        title: '11. Feladat',
                        text: '12 \\cdot (-8)'
                    });
                    excs.push({
                        title: '12. Feladat',
                        text: '(-12) \\cdot 8 \\cdot (-12) \\cdot 8'
                    });
                    excs.push({
                        title: '13. Feladat',
                        text: '(-12) \\cdot (-8) \\cdot (-12) \\cdot 8'
                    });
                    excs.push({
                        title: '14. Feladat',
                        text: '(-12) \\cdot 8 \\cdot 12 \\cdot 8'
                    });
                    excs.push({
                        title: '15. Feladat',
                        text: '(-12) \\cdot (-8) \\cdot (-12) \\cdot (-8)'
                    }); 
                    excs.push({
                        title: '16. Feladat',
                        text: '1 \\cdot (-2) \\cdot 3 \\cdot (-4) \\cdot 5'
                    });
                    excs.push({
                        title: '17. Feladat',
                        text: '(-1) \\cdot (-2) \\cdot (-3) \\cdot (-4) \\cdot (-5)'
                    });               
                    break;
                }
                case 4: {
                    excs.push({
                        title: '1. Feladat',
                        text: '81:3'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '(-81):3'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '81:(-3)'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '(-81):(-3)'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '17017:(-7):13:17'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: '17017:(-7):11:(-13):17'
                    });
                    excs.push({
                        title: '7. Feladat',
                        text: '17017:7:(-13):(-17)'
                    });
                    excs.push({
                        title: '8. Feladat',
                        text: '17017:(-7):11:(-13):(-17)'
                    });
                    excs.push({
                        title: '9. Feladat',
                        text: '(-17017):7:(-13):17'
                    });
                    excs.push({
                        title: '10. Feladat',
                        text: '(-5893):71'
                    });
                    excs.push({
                        title: '11. Feladat',
                        text: '4891:(-67)'
                    });
                    excs.push({
                        title: '12. Feladat',
                        text: '(-2639):(-91)'
                    });
                    excs.push({
                        title: '13. Feladat',
                        text: '0:(-205)'
                    });
                    excs.push({
                        title: '14. Feladat',
                        text: '(-17017):7:(-13):17'
                    });
                    excs.push({
                        title: '15. Feladat',
                        text: '17017:11:(-13):(-17)'
                    });
                    break;
                }
                case 5: {
                    excs.push({
                        title: '1. Feladat',
                        text: '6^{100}'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '\\big(-2\\big)^3'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '-2^3'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '\\big(-3\\big)^4'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '-3^4'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: '\\big(-1001\\big)^0'
                    });
                    excs.push({
                        title: '7. Feladat',
                        text: '\\big(-1\\big)^{10}'
                    });
                    excs.push({
                        title: '8. Feladat',
                        text: '\\big(-1\\big)^{11}'
                    });
                    excs.push({
                        title: '9. Feladat',
                        text: '-1^{12}'
                    });
                    excs.push({
                        title: '10. Feladat',
                        text: '\\big(-5\\big)^{55}'
                    });
                    excs.push({
                        title: '11. Feladat',
                        text: '\\big(-8\\big)^{90}'
                    });
                    excs.push({
                        title: '12. Feladat',
                        text: '\\big(-2\\big)^6'
                    });
                    excs.push({
                        title: '13. Feladat',
                        text: '\\big(-2\\big)^9'
                    });
                    excs.push({
                        title: '14. Feladat',
                        text: '-2^{10}'
                    });
                    excs.push({
                        title: '15. Feladat',
                        text: '\\big(-3\\big)^3'
                    });
                    excs.push({
                        title: '16. Feladat',
                        text: '\\big(-2023\\big)^0'
                    }); 
                    excs.push({
                        title: '17. Feladat',
                        text: '\\big(-12\\big)^4',
                        a: '-20736',
                        b: '20736',
                        c: 'egyéb'
                    });
                    excs.push({
                        title: '18. Feladat',
                        text: '-4^5',
                        a: '-1024',
                        b: '1024',
                        c: 'egyéb'
                    });
                    excs.push({
                        title: '19. Feladat',
                        text: '\\big(-3^2\\big)^3',
                        a: '729',
                        b: '-729',
                        c: 'egyéb'
                    });
                    excs.push({
                        title: '20. Feladat',
                        text: '\\Big(-\\big(-2^2\\big)^3\\Big)^2',
                        a: '4096',
                        b: '-4096',
                        c: 'egyéb'
                    });                   
                    break;
                }
                case 6: {
                    excs.push({
                        title: '1. Feladat',
                        text: '-4+4:2',
                        a: '0',
                        b: '-2',
                        c: 'egyéb'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '20:(-5)-2\\cdot(-5)^2+10',
                        a: '-44',
                        b: '56',
                        c: '-74',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '-6+240:40+0^{44}',
                        a: '194',
                        b: '1',
                        c: '0',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '\\big(-5\\big)^2+\\big(-1\\big)^3+(-8):2\\cdot(-10)',
                        a: '64',
                        b: '14',
                        c: '-16',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '-11^0+11^1+\\big(-11\\big)^1+1^{2012}+2012^0',
                        a: '2002',
                        b: '2013',
                        c: '1',
                        d: 'egyéb'
                    });
                    break;
                }
                case 7: {
                    excs.push({
                        title: '1. Feladat',
                        text: '(-8+14):(-6+4)',
                        a: 'nem egész szám',
                        b: '-3',
                        c: '3',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '(-10)\\cdot(2+2\\cdot3)',
                        a: '-14',
                        b: '-120',
                        c: '-80',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '13\\cdot\\big(13\\cdot13\\cdot13-13^3\\big)',
                        a: '0',
                        b: '13',
                        c: '2158',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '\\big(50-5^2\\big)\\cdot\\big(50-6^2\\big)\\cdot\\big(50-7^2\\big)',
                        a: '54720',
                        b: '350',
                        c: '7248819600',
                        d: 'egyéb'
                    });
                    break;
                }
                case 8: {
                    excs.push({
                        title: '1. Feladat',
                        text: '\\big(-1\\big)^{2n+3}, n \\in \\mathbb{N}',
                        a: '1',
                        b: '-1',
                        c: 'egyéb'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '\\big(-1\\big)^{2n+10}, n \\in \\mathbb{N}',
                        a: '1',
                        b: '-1',
                        c: 'egyéb'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '\\big(-1\\big)^{n^2+n}, n \\in \\mathbb{N}',
                        a: '1',
                        b: '-1',
                        c: 'egyéb'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '\\big(-1\\big)^n\\cdot\\big(-1\\big)^{n+1}\\cdot\\big(-1\\big)^{n+2}\\cdot\\big(-1\\big)^{n+3}, n \\in \\mathbb{N}',
                        a: '1',
                        b: '-1',
                        c: 'egyéb'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '\\Big[\\big(-1\\big)^n\\Big]^{n+1}\\cdot\\Big[\\big(-1\\big)^{n+7}\\Big]^{n+8}, n \\in \\mathbb{N}',
                        a: '1',
                        b: '-1',
                        c: 'egyéb'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: '\\big[(-x) \\cdot y^2 \\cdot z^5 \\big]^3',
                        a: 'x^3 \\cdot y^6 \\cdot z^{15}',
                        b: '-x^4 \\cdot y^5 \\cdot z^8',
                        c: '-x^3 \\cdot y^6 \\cdot z^{15}',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '7. Feladat',
                        text: '\\Big[\\big(-2\\big)^3 \\cdot \\big(-x\\big) \\cdot y^5 \\Big]^4',
                        a: '4096 \\cdot x^4 \\cdot y^{20}',
                        b: '-4096 \\cdot x^4 \\cdot y^{20}',
                        c: '128 \\cdot x^5 \\cdot y^9',
                        d: 'egyéb'
                    });
                    break;
                }
                case 9: {
                    excs.push({
                        title: '1. Feladat',
                        text: '(400-40+4):(-4)-(-400):4-(-40):(-4)-(-4):4',
                        a: '-182',
                        b: '182',
                        c: '0',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '-32:\\big[-2+6\\cdot(-5)\\big]+\\big(-49\\big):\\big(-7\\big)^2',
                        a: '-1',
                        b: '2',
                        c: '0',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '-5\\cdot\\big[-1+4\\cdot(-2+2\\cdot3)+2\\big]',
                        a: '-85',
                        b: '-70',
                        c: '-125',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '\\big(100-5^2\\big)\\cdot\\big(100-6^2\\big)\\cdot\\big(100-7^2\\big)\\cdot\\ldots\\cdot\\big(100-11^2\\big)',
                        a: '-1665619200',
                        b: 'nagyobb, mint 1000',
                        c: '0',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '(-2)^2+10\\cdot\\big[(-1)^{1000}+(-1)^{99}+2\\cdot(-2+2\\cdot3)\\big]',
                        a: '104',
                        b: '84',
                        c: '16',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: '\\big\\{3\\cdot5^2-3\\cdot\\big[4-(-3)^2-(-1)^5\\big]\\cdot\\big[4\\cdot2^4+8\\cdot(-2)^3\\big]\\big\\}\\cdot(-2)^3',
                        a: '42408',
                        b: '0',
                        c: '-600',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '8. Feladat',
                        text: '(-1)^1+(-1)^{1+2}+\\ldots+(-1)^{1+2+3+\\ldots+10}'
                    });
                    excs.push({
                        title: '9. Feladat',
                        text: '(-125+1^3)\\cdot(-125+2^3)\\cdot\\ldots\\cdot(-125+10^3)'
                    });
                    break;
                }
                default: 
            }
            break;
        }
        case 3: {
            switch(sublevel) {
                case 1: {
                    excs.push({
                        title: '1. Feladat',
                        text: '\\displaystyle \\sideset{^{4)}}{}{\\frac{2}{3}}'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '\\displaystyle \\sideset{^{3)}}{}{-\\frac{5}{2}}'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '\\displaystyle \\sideset{^{13)}}{}{\\frac{15}{9}}'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '\\displaystyle \\sideset{^{10)}}{}{\\frac{23}{17}}'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '\\displaystyle \\sideset{^{23)}}{}{-\\frac{52}{43}}'
                    });
                    break;
                }
                case 2: {
                    excs.push({
                        title: '1. Feladat',
                        text: '\\displaystyle \\frac{24}{16}^{(8}'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '\\displaystyle -\\frac{111}{27}^{(3}'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '\\displaystyle \\frac{675}{365}^{(5}'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '\\displaystyle -\\frac{3177}{657}^{(9}'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '\\displaystyle \\frac{2645}{5313}^{(23}'
                    });
                    break;
                }
                case 3: {
                    excs.push({
                        title: '1. Feladat',
                        text: '\\displaystyle \\frac{12}{3}'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '\\displaystyle \\frac{1}{20}'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '\\displaystyle \\frac{25}{2}'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '\\displaystyle -\\frac{35}{4}'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '\\displaystyle -\\frac{103}{5}'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: '\\displaystyle \\frac{97}{8}'
                    });
                    excs.push({
                        title: '7. Feladat',
                        text: '\\displaystyle \\frac{265}{16}'
                    });
                    excs.push({
                        title: '8. Feladat',
                        text: '\\displaystyle -\\frac{2}{3}'
                    });
                    excs.push({
                        title: '9. Feladat',
                        text: '\\displaystyle \\frac{73}{9}'
                    });
                    excs.push({
                        title: '10. Feladat',
                        text: '\\displaystyle \\frac{405}{99}'
                    });
                    excs.push({
                        title: '11. Feladat',
                        text: '\\displaystyle -\\frac{241}{90}'
                    });
                    excs.push({
                        title: '12. Feladat',
                        text: '\\displaystyle \\frac{3247}{990}'
                    });
                    excs.push({
                        title: '13. Feladat',
                        text: '\\displaystyle -\\frac{4127}{900}'
                    });
                    excs.push({
                        title: '14. Feladat',
                        text: '\\displaystyle \\frac{97524}{19800}'
                    });
                    break;
                }
                case 4: {
                    excs.push({
                        title: '1. Feladat',
                        text: '0,02'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '0,96'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '-5,8'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '17,12'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '-23,225'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: '0,(3)'
                    });
                    excs.push({
                        title: '7. Feladat',
                        text: '5,(6)'
                    });
                    excs.push({
                        title: '8. Feladat',
                        text: '-7,(02)'
                    });
                    excs.push({
                        title: '9. Feladat',
                        text: '-21,1(6)'
                    });
                    excs.push({
                        title: '10. Feladat',
                        text: '6,15(4)'
                    });
                    excs.push({
                        title: '11. Feladat',
                        text: '2,0(13)'
                    });
                    excs.push({
                        title: '12. Feladat',
                        text: '3,15(23)'
                    });
                    excs.push({
                        title: '13. Feladat',
                        text: '-0,3(125)'
                    });
                    break;
                }
                case 5: {
                    excs.push({
                        title: '1. Feladat',
                        text: '\\displaystyle \\frac{3}{8}+\\frac{4}{8}'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '\\displaystyle 7+\\frac{10}{3}'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '\\displaystyle \\frac{3}{7}+13'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '\\displaystyle \\frac{9}{11}+\\frac{13}{11}',
                        a: '22/11',
                        b: '2',
                        c: 'egyéb'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '\\displaystyle \\frac{3}{5}+\\frac{7}{10}',
                        a: '13/10',
                        b: '10/15',
                        c: '65/50',
                        d: '2/3',
                        e: 'egyéb'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: '\\displaystyle \\frac{7}{12}+\\frac{6}{4}',
                        a: '13/16',
                        b: '25/12',
                        c: '100/48',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '7. Feladat',
                        text: '\\displaystyle \\frac{7}{5}+\\frac{3}{4}',
                        a: '43/20',
                        b: '86/40',
                        c: '10/9',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '8. Feladat',
                        text: '\\displaystyle \\frac{5}{12}+\\frac{8}{9}',
                        a: '141/108',
                        b: '13/21',
                        c: '47/36',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '9. Feladat',
                        text: '\\displaystyle \\Big(-\\frac{5}{14}\\Big)+\\frac{12}{14}',
                        a: '7/14',
                        b: '17/14',
                        c: '1/2',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '10. Feladat',
                        text: '\\displaystyle \\Big(-\\frac{7}{20}\\Big)+\\Big(-\\frac{5}{4}\\Big)',
                        a: '-8/5',
                        b: '8/5',
                        c: '-32/20',
                        d: '32/20',
                        e: '-128/80',
                        f: '128/80',
                        g: '-24/16',
                        h: '-3/2',
                        i: 'egyéb'
                    });
                    excs.push({
                        title: '11. Feladat',
                        text: '\\displaystyle \\frac{3}{11}+\\Big(-\\frac{1}{8}\\Big)',
                        a: '4/19',
                        b: '2/34',
                        c: '13/88',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '12. Feladat',
                        text: '\\displaystyle 1+\\frac{1}{2}+\\frac{1}{2^2}+\\ldots+\\frac{1}{2^5}'
                    });
                    excs.push({
                        title: '13. Feladat',
                        text: '12+13,5'
                    });
                    excs.push({
                        title: '14. Feladat',
                        text: '3,2+4,3'
                    });
                    excs.push({
                        title: '15. Feladat',
                        text: '8,7+7,8'
                    });
                    excs.push({
                        title: '16. Feladat',
                        text: '9,12+23'
                    });
                    excs.push({
                        title: '17. Feladat',
                        text: '24,31+8,4'
                    });
                    excs.push({
                        title: '18. Feladat',
                        text: '15,8+8,74'
                    });
                    excs.push({
                        title: '19. Feladat',
                        text: '9,56+6,12'
                    });
                    excs.push({
                        title: '20. Feladat',
                        text: '11,64+9,28'
                    });
                    excs.push({
                        title: '21. Feladat',
                        text: '13,85+13,31'
                    });
                    excs.push({
                        title: '22. Feladat',
                        text: '9,87+7,89'
                    });
                    excs.push({
                        title: '23. Feladat',
                        text: '32,128+62,7'
                    });
                    excs.push({
                        title: '24. Feladat',
                        text: '71,68+52,318'
                    });
                    excs.push({
                        title: '25. Feladat',
                        text: '47,354+58,613'
                    });
                    excs.push({
                        title: '26. Feladat',
                        text: '16,514+39,358'
                    });
                    excs.push({
                        title: '27. Feladat',
                        text: '31,275+65,487'
                    });
                    excs.push({
                        title: '28. Feladat',
                        text: '34,567+98,765'
                    });
                    break;
                }
                case 6: {
                    excs.push({
                        title: '1. Feladat',
                        text: '\\displaystyle \\frac{3}{8}-\\frac{4}{8}'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '\\displaystyle 5-\\frac{2}{3}'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '\\displaystyle 7-\\frac{37}{4}'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '\\displaystyle \\frac{102}{5}-13'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '\\displaystyle \\frac{11}{37}-2'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: '\\displaystyle \\frac{5}{12}-\\frac{13}{12}',
                        a: '-8/12',
                        b: '-2/3',
                        c: '-8/0',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '7. Feladat',
                        text: '\\displaystyle \\frac{9}{5}-\\frac{7}{10}',
                        a: '11/10',
                        b: '-2/5',
                        c: '55/50',
                        d: '2/5',
                        e: 'egyéb'
                    });
                    excs.push({
                        title: '8. Feladat',
                        text: '\\displaystyle \\frac{7}{12}-\\frac{6}{4}',
                        a: '1/8',
                        b: '-11/12',
                        c: '-44/48',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '9. Feladat',
                        text: '\\displaystyle \\frac{7}{5}-\\frac{3}{4}',
                        a: '13/20',
                        b: '26/40',
                        c: '2',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '10. Feladat',
                        text: '\\displaystyle \\frac{5}{12}-\\frac{8}{9}',
                        a: '-51/108',
                        b: '-1',
                        c: '-17/36',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '11. Feladat',
                        text: '\\displaystyle \\Big(-\\frac{5}{14}\\Big)-\\frac{12}{14}',
                        a: '17/14',
                        b: '-7/14',
                        c: '-17/14',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '12. Feladat',
                        text: '\\displaystyle \\Big(-\\frac{7}{20}\\Big)-\\Big(-\\frac{5}{4}\\Big)',
                        a: '9/10',
                        b: '-9/10',
                        c: '-18/20',
                        d: '18/20',
                        e: '-72/80',
                        f: '72/80',
                        g: '-32/20',
                        h: '-8/5',
                        i: '-2/16',
                        j: '-1/8',
                        k: 'egyéb'
                    });
                    excs.push({
                        title: '13. Feladat',
                        text: '\\displaystyle \\frac{3}{11}-\\Big(-\\frac{1}{8}\\Big)',
                        a: '2/3',
                        b: '4/19',
                        c: '35/88',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '14. Feladat',
                        text: '16-7,3'
                    });
                    excs.push({
                        title: '15. Feladat',
                        text: '7,25-16'
                    });
                    excs.push({
                        title: '16. Feladat',
                        text: '16-7,743'
                    });
                    excs.push({
                        title: '17. Feladat',
                        text: '73,5-37'
                    });
                    excs.push({
                        title: '18. Feladat',
                        text: '37,3-73,5'
                    });
                    excs.push({
                        title: '19. Feladat',
                        text: '37,8 -73,5'
                    });
                    excs.push({
                        title: '20. Feladat',
                        text: '73,5-37,15'
                    });
                    excs.push({
                        title: '21. Feladat',
                        text: '73,5-37,71'
                    });
                    excs.push({
                        title: '22. Feladat',
                        text: '73,5-37,246'
                    });
                    excs.push({
                        title: '23. Feladat',
                        text: '37,837-73,5'
                    });
                    excs.push({
                        title: '24. Feladat',
                        text: '81,62-62,4'
                    });
                    excs.push({
                        title: '25. Feladat',
                        text: '62,9-81,62'
                    });
                    excs.push({
                        title: '26. Feladat',
                        text: '62,52-81,62'
                    });
                    excs.push({
                        title: '27. Feladat',
                        text: '81,62-62,35'
                    });
                    excs.push({
                        title: '28. Feladat',
                        text: '81,62-62,86'
                    });
                    excs.push({
                        title: '29. Feladat',
                        text: '81,62-62,118'
                    });
                    excs.push({
                        title: '30. Feladat',
                        text: '62,234-81,62'
                    });
                    excs.push({
                        title: '31. Feladat',
                        text: '81,62-62,938'
                    });
                    excs.push({
                        title: '32. Feladat',
                        text: '57,2-97,521'
                    });
                    excs.push({
                        title: '33. Feladat',
                        text: '97,521-57,7'
                    });
                    excs.push({
                        title: '34. Feladat',
                        text: '97,521-57,32'
                    });
                    excs.push({
                        title: '35. Feladat',
                        text: '57,15 -97,521'
                    });
                    excs.push({
                        title: '36. Feladat',
                        text: '97,521-57,89'
                    });
                    excs.push({
                        title: '37. Feladat',
                        text: '97,521-57,101'
                    });
                    excs.push({
                        title: '38. Feladat',
                        text: '57,214-97,521'
                    });
                    excs.push({
                        title: '39. Feladat',
                        text: '57,241 -97,521'
                    });
                    excs.push({
                        title: '40. Feladat',
                        text: '97,521-57,356'
                    });
                    excs.push({
                        title: '41. Feladat',
                        text: '97,521-57,701'
                    });
                    excs.push({
                        title: '42. Feladat',
                        text: '97,521-57,615'
                    });
                    excs.push({
                        title: '43. Feladat',
                        text: '57,831-97,521'
                    });
                    excs.push({
                        title: '44. Feladat',
                        text: '97,521-57,967'
                    });
                    excs.push({
                        title: '45. Feladat',
                        text: '97,521-57,1234'
                    });
                    break;
                }
                case 7: {
                    excs.push({
                        title: '1. Feladat',
                        text: '\\displaystyle \\frac{3}{5}\\cdot\\frac{2}{7}'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '\\displaystyle \\frac{4}{3}\\cdot\\Big(-\\frac{7}{5}\\Big)'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '\\displaystyle \\frac{1}{9}\\cdot\\frac{1}{8}'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '\\displaystyle \\Big(-\\frac{3}{5}\\Big)\\cdot\\big(-7\\big)'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '\\displaystyle  \\frac{1}{13}\\cdot49'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: '\\displaystyle \\frac{1}{2}\\cdot\\frac{2}{3}\\cdot\\frac{3}{4}\\cdot\\ldots\\cdot\\frac{2023}{2024}'
                    });
                    excs.push({
                        title: '7. Feladat',
                        text: '\\displaystyle \\frac{7}{13}\\cdot\\Big(-\\frac{13}{7}\\Big)',
                        a: '-91/91',
                        b: '1',
                        c: '91/91',
                        d: '-1',
                        e: 'egyéb'
                    });
                    excs.push({
                        title: '8. Feladat',
                        text: '\\displaystyle \\frac{8}{15}\\cdot\\frac{5}{6}',
                        a: '40/90',
                        b: '4/9',
                        c: '8/18',
                        d: '20/45',
                        e: 'egyéb'
                    });
                    excs.push({
                        title: '9. Feladat',
                        text: '\\displaystyle \\frac{18}{12}\\cdot\\frac{6}{9}',
                        a: '1',
                        b: '9/9',
                        c: '6/6',
                        d: '12/12',
                        e: '18/18',
                        f: 'egyéb'
                    });
                    excs.push({
                        title: '10. Feladat',
                        text: '\\displaystyle \\Big(-\\frac{65}{28}\\Big)\\cdot\\Big(-\\frac{42}{25}\\Big)',
                        a: '195/50',
                        b: '273/70',
                        c: '39/10',
                        d: '78/20',
                        e: '-78/20',
                        f: '2730/700',
                        g: '-39/10',
                        h: 'egyéb'
                    });
                    excs.push({
                        title: '11. Feladat',
                        text: '\\displaystyle 32\\cdot\\frac{17}{24}',
                        a: '544/768',
                        b: '68/3',
                        c: '544/24',
                        d: '136/6',
                        e: '272/12',
                        f: 'egyéb'
                    });
                    excs.push({
                        title: '12. Feladat',
                        text: '3\\cdot 8,6'
                    });
                    excs.push({
                        title: '13. Feladat',
                        text: '12,3\\cdot 5'
                    });
                    excs.push({
                        title: '14. Feladat',
                        text: '9,7\\cdot 13,2'
                    });
                    excs.push({
                        title: '15. Feladat',
                        text: '6,24\\cdot 11,9'
                    });
                    excs.push({
                        title: '16. Feladat',
                        text: '7,8\\cdot 10,99'
                    });
                    excs.push({
                        title: '17. Feladat',
                        text: '12,34\\cdot 7,12'
                    });
                    excs.push({
                        title: '18. Feladat',
                        text: '4,754\\cdot 18,54'
                    });
                    excs.push({
                        title: '19. Feladat',
                        text: '0,123\\cdot 0,321'
                    });
                    excs.push({
                        title: '20. Feladat',
                        text: '(-8)\\cdot 3,57'
                    });
                    excs.push({
                        title: '21. Feladat',
                        text: '100\\cdot (-67,2574)'
                    });
                    excs.push({
                        title: '22. Feladat',
                        text: '(-82,204)\\cdot (-1000)'
                    });
                    excs.push({
                        title: '23. Feladat',
                        text: '-7,254\\cdot (-9,1)'
                    });
                    excs.push({
                        title: '24. Feladat',
                        text: '1,(3)\\cdot 1,2'
                    });
                    excs.push({
                        title: '25. Feladat',
                        text: '(-0,8(3))\\cdot 0,75'
                    });
                    excs.push({
                        title: '26. Feladat',
                        text: '1,0(6)\\cdot (-0,0(8))'
                    });
                    break;
                }
                case 8: {
                    excs.push({
                        title: '1. Feladat',
                        text: '\\displaystyle \\frac{4}{3}:\\frac{5}{7}'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '\\displaystyle \\Big(-\\frac{2}{13}\\Big):\\frac{7}{9}'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '\\displaystyle \\frac{1}{21}:\\frac{1}{31}'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '\\displaystyle \\Big(-\\frac{8}{11}\\Big):\\big(-9\\big)'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '\\displaystyle 17:\\frac{1}{4}'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: '\\displaystyle \\frac{5}{13}:\\frac{1}{5}'
                    });
                    excs.push({
                        title: '7. Feladat',
                        text: '\\displaystyle \\frac{12}{25}:\\Big(-\\frac{6}{25}\\Big)',
                        a: '-300/150',
                        b: '2',
                        c: '300/150',
                        d: '-2',
                        e: 'egyéb'
                    });
                    excs.push({
                        title: '8. Feladat',
                        text: '\\displaystyle \\frac{16}{25}:\\frac{8}{15}',
                        a: '30/25',
                        b: '6/5',
                        c: '48/40',
                        d: '240/200',
                        e: 'egyéb'
                    });
                    excs.push({
                        title: '9. Feladat',
                        text: '\\displaystyle \\frac{1}{40}:\\frac{1}{64}',
                        a: '8/5',
                        b: '16/10',
                        c: '32/20',
                        d: '64/40',
                        e: 'egyéb'
                    });
                    excs.push({
                        title: '10. Feladat',
                        text: '\\displaystyle \\Big(-\\frac{108}{114}\\Big):\\Big(-\\frac{81}{36}\\Big)',
                        a: '-216/513',
                        b: '144/342',
                        c: '24/57',
                        d: '72/171',
                        e: '-72/717',
                        f: '216/513',
                        g: '-24/57',
                        h: 'egyéb'
                    });
                    excs.push({
                        title: '11. Feladat',
                        text: '\\displaystyle 105:\\frac{175}{2}',
                        a: '6/5',
                        b: '30/25',
                        c: '42/35',
                        d: '210/175',
                        e: 'egyéb'
                    });
                    excs.push({
                        title: '12. Feladat',
                        text: '25,5:3'
                    });
                    excs.push({
                        title: '13. Feladat',
                        text: '61,5:12,3'
                    });
                    excs.push({
                        title: '14. Feladat',
                        text: '128,04:13,2'
                    });
                    excs.push({
                        title: '15. Feladat',
                        text: '74,256:11,9'
                    });
                    excs.push({
                        title: '16. Feladat',
                        text: '85,722:10,99'
                    });
                    excs.push({
                        title: '17. Feladat',
                        text: '87,8608:7,12'
                    });
                    excs.push({
                        title: '18. Feladat',
                        text: '88,13916:18,54'
                    });
                    excs.push({
                        title: '19. Feladat',
                        text: '0,039483:0,321'
                    });
                    excs.push({
                        title: '20. Feladat',
                        text: '(-28,56):3,57'
                    });
                    excs.push({
                        title: '21. Feladat',
                        text: '(-6725,74):100'
                    });
                    excs.push({
                        title: '22. Feladat',
                        text: '(-8220,4):(-1000)'
                    });
                    excs.push({
                        title: '23. Feladat',
                        text: '-66,0114:9,1'
                    });
                    excs.push({
                        title: '24. Feladat',
                        text: '1,(3):1,6'
                    });
                    excs.push({
                        title: '25. Feladat',
                        text: '(-0,8(3)):0,625'
                    });
                    excs.push({
                        title: '26. Feladat',
                        text: '1,0(6):(-0,09(481))'
                    });
                    break;
                }
                case 9: {
                    excs.push({
                        title: '1. Feladat',
                        text: '\\displaystyle \\Big(\\frac{2}{5}\\Big)^3'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '\\displaystyle \\Big(\\frac{1}{3}\\Big)^5'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '\\displaystyle \\Big(\\frac{2023}{2024}\\Big)^0'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '\\displaystyle \\Big(\\frac{123}{321}\\Big)^1'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '\\displaystyle \\Big(-\\frac{5}{4}\\Big)^3'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: '\\displaystyle \\Big(-\\frac{7}{3}\\Big)^4'
                    });
                    excs.push({
                        title: '7. Feladat',
                        text: '\\displaystyle \\Big(-\\frac{9}{11}\\Big)^0'
                    });
                    excs.push({
                        title: '8. Feladat',
                        text: '\\displaystyle \\Big(-\\frac{13}{6}\\Big)^1'
                    });
                    excs.push({
                        title: '9. Feladat',
                        text: '\\displaystyle \\Big(\\frac{2}{3}\\Big)^{-1}'
                    });
                    excs.push({
                        title: '10. Feladat',
                        text: '\\displaystyle \\Big(\\frac{4}{5}\\Big)^{-3}'
                    });
                    excs.push({
                        title: '11. Feladat',
                        text: '\\displaystyle \\Big(-\\frac{7}{4}\\Big)^{-2}'
                    });
                    excs.push({
                        title: '12. Feladat',
                        text: '\\displaystyle \\Big(-\\frac{1}{2}\\Big)^{-7}'
                    });
                    excs.push({
                        title: '13. Feladat',
                        text: '\\displaystyle \\Big[\\Big(-\\frac{1}{2}\\Big)^3\\Big]^2'
                    });
                    excs.push({
                        title: '14. Feladat',
                        text: '\\displaystyle \\Big[\\Big(-\\frac{2}{3}\\Big)^2\\Big]^3'
                    });
                    excs.push({
                        title: '15. Feladat',
                        text: '\\displaystyle \\Big[\\Big(-\\frac{5}{4}\\Big)^2\\Big]^2'
                    });
                    excs.push({
                        title: '16. Feladat',
                        text: '\\displaystyle \\Big[\\Big(-\\frac{1}{2}\\Big)^3\\Big]^3'
                    });
                    excs.push({
                        title: '17. Feladat',
                        text: '(2,9)^{2}'
                    });
                    excs.push({
                        title: '18. Feladat',
                        text: '(-0,12)^{2}'
                    });
                    excs.push({
                        title: '19. Feladat',
                        text: '(-3,4)^{3}'
                    });
                    excs.push({
                        title: '20. Feladat',
                        text: '(-8,354)^{0}'
                    });
                    excs.push({
                        title: '21. Feladat',
                        text: '(11,32)^{1}'
                    });
                    excs.push({
                        title: '22. Feladat',
                        text: '(2,34)^{3}'
                    });
                    excs.push({
                        title: '23. Feladat',
                        text: '(0,1)^{5}'
                    });
                    excs.push({
                        title: '24. Feladat',
                        text: '(-0,01)^{3}'
                    });
                    break;
                }
                case 10: {
                    excs.push({
                        title: '1. Feladat',
                        text: '\\displaystyle -\\frac{7}{12}+\\frac{3}{4}-\\frac{1}{6}'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '0,25-0,37-1,18'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '3,5-3,(5)+0,4-0,0(1)'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '\\displaystyle 1,25-\\frac{2}{3}+0,75'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '\\displaystyle -\\frac{5}{6}-\\frac{1}{7}\\cdot \\Big( -\\frac{5}{4} \\Big)',
                        a: '-85/84',
                        b: '0',
                        c: '-55/84',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: '\\displaystyle \\frac{3}{2}:\\frac{3}{7}-\\frac{11}{5}\\cdot \\frac{23}{11}+\\frac{1}{10}',
                        a: '-330/330',
                        b: '-1',
                        c: '-15/7',
                        d: '-729/2728',
                        e: 'egyéb'
                    });
                    excs.push({
                        title: '7. Feladat',
                        text: '\\displaystyle \\Big( -\\frac{18}{25} \\Big):\\Big( -\\frac{27}{5} \\Big):\\Big( -\\frac{3}{10} \\Big)',
                        a: '4/9',
                        b: '-100/225',
                        c: '-4/9',
                        d: '-28/63',
                        e: '-20/45',
                        f: 'egyéb'
                    });
                    break;
                }
                case 11: {
                    excs.push({
                        title: '1. Feladat',
                        text: '\\displaystyle \\Big( \\frac{1}{3}-\\frac{1}{18} \\Big):\\Big( -\\frac{5}{9} \\Big)',
                        a: '1/2',
                        b: '-5/10',
                        c: '-1/2',
                        d: '-9/18',
                        e: '-25/162',
                        f: 'egyéb'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '\\displaystyle \\Big( \\frac{2}{3}-\\frac{3}{2} \\Big)\\cdot \\Big( \\frac{3}{5}-\\frac{5}{3} \\Big)-1',
                        a: '-2/18',
                        b: '7/9',
                        c: '-5/45',
                        d: '-17/9',
                        e: '-1/9',
                        f: 'egyéb'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '\\displaystyle 1-\\frac{3}{5}-\\Big( \\frac{1}{3}-\\frac{1}{2}-\\frac{1}{5} \\Big)\\cdot \\Big( \\frac{1}{4}-1 \\Big)',
                        a: '5/40',
                        b: '27/40',
                        c: '1/8',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '[0,(3)-0,1(6)]:{{(-1,5)}^{2}}',
                        a: '9/24',
                        b: '2/27',
                        c: '4/45',
                        d: '-2/27',
                        e: '-16/27',
                        f: 'egyéb'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '(0,5-0,72)\\cdot (0,5+0,5\\cdot 0,72+0,72)+0,72',
                        a: '0,4032',
                        b: '-0,506',
                        c: '1,0676',
                        d: 'egyéb'
                    });
                    break;
                }
                case 12: {
                    excs.push({
                        title: '1. Feladat',
                        text: '\\displaystyle 1-\\Big( -\\frac{2}{3}-\\frac{1}{2} \\Big):\\Big\\{ -\\frac{3}{5}+\\Big[ \\frac{7}{12}:\\Big( \\frac{1}{3}-\\frac{1}{2} \\Big)-\\frac{1}{6} \\Big]\\cdot \\frac{1}{11} \\Big\\}',
                        a: '5/4',
                        b: '-1/4',
                        c: '65/28',
                        d: '9/4',
                        e: 'egyéb'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '\\displaystyle 3,24:1,8-0,5\\cdot [2,25:1,5-5\\cdot (0,4-8,1:9)]',
                        a: '5,05',
                        b: '1,37',
                        c: '-0,2',
                        d: 'egyéb'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '\\displaystyle \\Big[ \\frac{1}{6}+\\Big( 0,5+\\frac{2}{7} \\Big):\\Big( \\frac{1}{14}-1,25 \\Big) \\Big]:\\Big( \\frac{6}{5}-1,8 \\Big)',
                        a: '5/6',
                        b: '-10/9',
                        c: '-5/6',
                        d: '10/9',
                        e: 'egyéb'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '\\displaystyle  \\Big( 1-\\frac{1}{2} \\Big)\\cdot \\Big( 1-\\frac{1}{3} \\Big)\\cdot \\Big( 1-\\frac{1}{4} \\Big)\\cdot \\ldots \\cdot \\Big( 1-\\frac{1}{2023} \\Big)',
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '\\displaystyle \\frac{1}{1\\cdot 2}+\\frac{1}{2\\cdot 3}+\\frac{1}{3\\cdot 4}+\\ldots +\\frac{1}{99\\cdot 100}',
                    });
                    break;
                }
                default: 
            }
            break;
        }
        case 4: {
            switch(sublevel) {
                case 1: {
                    excs.push({
                        title: '1. Feladat',
                        text: '\\sqrt{625}'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '\\sqrt{6241}'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '\\sqrt{4489}'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '\\sqrt{32761}'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '\\sqrt{7}'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: '\\sqrt{67}'
                    });
                    excs.push({
                        title: '7. Feladat',
                        text: '\\sqrt{123}'
                    });
                    excs.push({
                        title: '8. Feladat',
                        text: '\\sqrt{9876}'
                    });
                    excs.push({
                        title: '9. Feladat',
                        text: '\\sqrt{123456789}'
                    });
                    excs.push({
                        title: '10. Feladat',
                        text: '\\sqrt{78325}'
                    });
                    excs.push({
                        title: '11. Feladat',
                        text: '\\sqrt{783,25}'
                    });
                    excs.push({
                        title: '12. Feladat',
                        text: '\\sqrt{7,8325}'
                    });
                    break;
                }
                case 2: {
                    excs.push({
                        title: '1. Feladat',
                        text: '2\\sqrt{3}'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '3\\sqrt{2}'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '4\\sqrt{5}'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '5\\sqrt{11}'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '11\\sqrt{3}'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: '17\\sqrt{13}'
                    });
                    excs.push({
                        title: '7. Feladat',
                        text: '19\\sqrt{23}'
                    });
                    excs.push({
                        title: '8. Feladat',
                        text: '2^4\\sqrt{3}'
                    });
                    excs.push({
                        title: '9. Feladat',
                        text: '5^2\\sqrt{2}'
                    });
                    break;
                }
                case 3: {
                    excs.push({
                        title: '1. Feladat',
                        text: '\\sqrt{24}'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '\\sqrt{32}'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '\\sqrt{175}'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '\\sqrt{71}'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '\\sqrt{1584}'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: '\\sqrt{1127}'
                    });
                    excs.push({
                        title: '7. Feladat',
                        text: '\\sqrt{588}'
                    });
                    excs.push({
                        title: '8. Feladat',
                        text: '\\sqrt{7267}'
                    });
                    excs.push({
                        title: '9. Feladat',
                        text: '\\sqrt{15300}'
                    });
                    excs.push({
                        title: '10. Feladat',
                        text: '\\sqrt{65219}'
                    });
                    break;
                }
                case 4: {
                    excs.push({
                        title: '1. Feladat',
                        text: '|-48|'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '|159|'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '|0|'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '|3+\\sqrt{5}|'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '|1-\\sqrt{2}|'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: '|2-\\sqrt{3}|'
                    });
                    excs.push({
                        title: '7. Feladat',
                        text: '|\\sqrt{3}-1|'
                    });
                    excs.push({
                        title: '8. Feladat',
                        text: '|\\sqrt{5}-3|'
                    });
                    excs.push({
                        title: '9. Feladat',
                        text: '|\\sqrt{5}-\\sqrt{3}|'
                    });
                    excs.push({
                        title: '10. Feladat',
                        text: '|\\sqrt{7}-\\sqrt{11}|'
                    });
                    excs.push({
                        title: '11. Feladat',
                        text: '|5-\\sqrt{2}-\\sqrt{3}|'
                    });
                    excs.push({
                        title: '12. Feladat',
                        text: '|\\sqrt{2}+\\sqrt{3}-3|'
                    });
                    excs.push({
                        title: '13. Feladat',
                        text: '\\sqrt{(1+\\sqrt{2})^2}'
                    });
                    excs.push({
                        title: '14. Feladat',
                        text: '\\sqrt{(1-\\sqrt{2})^2}'
                    });
                    excs.push({
                        title: '15. Feladat',
                        text: '\\sqrt{(\\sqrt{2}-1)^2}'
                    });
                    excs.push({
                        title: '16. Feladat',
                        text: '\\sqrt{(2-\\sqrt{2})^2}'
                    });
                    break;
                }
                case 5: {
                    excs.push({
                        title: '1. Feladat',
                        text: '2\\sqrt{3}+7\\sqrt{3}'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '\\sqrt{7}+4\\sqrt{7}'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '3\\sqrt{11}+2\\sqrt{5}'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '5+\\sqrt{2}+12\\sqrt{2}+15'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '3\\sqrt{3}+\\sqrt{5}+2\\sqrt{5}+7\\sqrt{3}'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: '9\\sqrt{5}+27+5\\sqrt{7}+6\\sqrt{5}+9+\\sqrt{7}'
                    });
                    excs.push({
                        title: '7. Feladat',
                        text: '\\sqrt{8}+\\sqrt{32}',
                        a: '\\sqrt{8}+\\sqrt{32}',
                        b: '\\sqrt{40}',
                        c: '6\\sqrt{2}',
                        d: '2\\sqrt{10}',
                        e: '20\\sqrt{2}',
                        f: 'egyéb'
                    });
                    excs.push({
                        title: '8. Feladat',
                        text: '4\\sqrt{12}+\\sqrt{75}',
                        a: '13\\sqrt{3}',
                        b: '4\\sqrt{12}+\\sqrt{75}',
                        c: '4\\sqrt{12}+5\\sqrt{3}',
                        d: '8\\sqrt{3}+\\sqrt{75}',
                        e: '4\\sqrt{87}',
                        f: 'egyéb'
                    });
                    excs.push({
                        title: '9. Feladat',
                        text: '\\sqrt{2}+\\sqrt{8}+\\sqrt{32}+\\sqrt{50}',
                        a: '12\\sqrt{2}',
                        b: '\\sqrt{92}',
                        c: '46\\sqrt{2}',
                        d: '2\\sqrt{23}',
                        e: 'egyéb'
                    });
                    excs.push({
                        title: '10. Feladat',
                        text: '\\sqrt{1}+\\sqrt{3}+\\sqrt{9}+\\sqrt{27}+\\sqrt{81}+\\sqrt{243}',
                        a: '\\sqrt{364}',
                        b: '\\sqrt{273}+13',
                        c: '2\\sqrt{91}',
                        d: '13\\sqrt{3}+13',
                        e: 'egyéb'
                    });
                    excs.push({
                        title: '11. Feladat',
                        text: '\\displaystyle \\frac{\\sqrt{3}}{2}+\\frac{\\sqrt{2}}{3}',
                        a: '\\displaystyle \\frac{3\\sqrt{3}+2\\sqrt{2}}{6}',
                        b: '\\displaystyle \\frac{\\sqrt{3}+\\sqrt{2}}{6}',
                        c: '\\displaystyle \\frac{\\sqrt{5}}{5}',
                        d: '\\sqrt{5}',
                        e: 'egyéb'
                    });
                    break;
                }
                case 6: {
                    excs.push({
                        title: '1. Feladat',
                        text: '5\\sqrt{7}-8\\sqrt{7}'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '9\\sqrt{3}-3\\sqrt{3}'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '\\sqrt{13}-\\sqrt{144}'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '27\\sqrt{2}-13\\sqrt{2}-8\\sqrt{2}-11\\sqrt{2}-1'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '7-(-\\sqrt{3})-\\sqrt{3}-5'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: '\\sqrt{1}-\\sqrt{5}-\\sqrt{25}-\\sqrt{125}-\\sqrt{625}'
                    });
                    excs.push({
                        title: '7. Feladat',
                        text: '\\sqrt{12}-\\sqrt{48}',
                        a: '\\sqrt{-36}',
                        b: '-2\\sqrt{3}',
                        c: '-\\sqrt{36}',
                        d: '-6',
                        e: '-12\\sqrt{2}',
                        f: '\\sqrt{12}-\\sqrt{48}',
                        g: 'egyéb'
                    });
                    excs.push({
                        title: '8. Feladat',
                        text: '3\\sqrt{32}-\\sqrt{128}',
                        a: '3\\sqrt{-96}',
                        b: '3\\sqrt{32}-\\sqrt{128}',
                        c: '3\\sqrt{32}-8\\sqrt{2}',
                        d: '4\\sqrt{2}',
                        e: '-3\\sqrt{96}',
                        f: 'egyéb'
                    });
                    excs.push({
                        title: '9. Feladat',
                        text: '\\sqrt{162}-\\sqrt{98}-\\sqrt{72}-\\sqrt{50}-\\sqrt{18}-\\sqrt{2}',
                        a: '\\sqrt{-78}',
                        b: '6-\\sqrt{2}',
                        c: '-\\sqrt{78}',
                        d: '-13\\sqrt{2}',
                        e: 'egyéb'
                    });
                    excs.push({
                        title: '10. Feladat',
                        text: '\\displaystyle \\frac{\\sqrt{5}}{2}-\\frac{\\sqrt{2}}{5}',
                        a: '\\displaystyle \\frac{\\sqrt{5}-\\sqrt{2}}{10}',
                        b: '\\displaystyle \\frac{5\\sqrt{5}-2\\sqrt{2}}{10}',
                        c: '\\displaystyle -\\frac{\\sqrt{3}}{3}$',
                        d: '-\\sqrt{3}',
                        e: 'egyéb'
                    });
                    break;
                }
                case 7: {
                    excs.push({
                        title: '1. Feladat',
                        text: '\\sqrt{3} \\cdot \\sqrt{5}'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '\\sqrt{8} \\cdot \\sqrt{12}'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '-\\sqrt{169} \\cdot \\sqrt{50}'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '-\\sqrt{45} \\cdot \\sqrt{75} \\cdot (-\\sqrt{60})'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '-\\sqrt{72} \\cdot \\sqrt{98} \\cdot \\sqrt{27}'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: '\\sqrt{2} \\cdot \\sqrt{3} \\cdot \\sqrt{4} \\cdot \\sqrt{5} \\cdot \\sqrt{6} \\cdot \\sqrt{7} \\cdot \\sqrt{8} \\cdot \\sqrt{9} \\cdot \\sqrt{10}'
                    });
                    excs.push({
                        title: '7. Feladat',
                        text: '3\\sqrt{21} \\cdot 2\\sqrt{7}',
                        a: '6\\sqrt{147}',
                        b: '5\\sqrt{147}',
                        c: '42\\sqrt{3}',
                        d: '35\\sqrt{3}',
                        e: 'egyéb'
                    });
                    excs.push({
                        title: '8. Feladat',
                        text: '\\sqrt{80} \\cdot \\sqrt{45}',
                        a: '\\sqrt{3600}',
                        b: '12\\sqrt{25}',
                        c: '144\\sqrt{5}',
                        d: '60',
                        e: 'egyéb'
                    });
                    excs.push({
                        title: '9. Feladat',
                        text: '(-\\sqrt{2}) \\cdot 2\\sqrt{6} \\cdot \\sqrt{3}',
                        a: '-12',
                        b: '12',
                        c: '-2\\sqrt{36}',
                        d: '12\\sqrt{6}',
                        e: 'egyéb'
                    });
                    excs.push({
                        title: '10. Feladat',
                        text: '\\displaystyle \\frac{\\sqrt{12}}{3} \\cdot \\frac{\\sqrt{18}}{2}',
                        a: '\\sqrt{6}',
                        b: '\\displaystyle \\frac{\\sqrt{216}}{6}',
                        c: '\\displaystyle \\frac{6\\sqrt{6}}{6}',
                        d: '6\\sqrt{6}',
                        e: 'egyéb'
                    });
                    break;
                }
                case 8: {
                    excs.push({
                        title: '1. Feladat',
                        text: '\\sqrt{24}:\\sqrt{6}'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '\\sqrt{72}:\\sqrt{3}'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '-\\sqrt{350}:\\sqrt{7}'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '-\\sqrt{245}:(-7)'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '-\\sqrt{704}:4'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: '\\sqrt{243}:\\sqrt{3}'
                    });
                    excs.push({
                        title: '7. Feladat',
                        text: '\\displaystyle \\frac{3}{\\sqrt{5}}:\\frac{2}{\\sqrt{45}}',
                        a: '\\displaystyle \frac{3\\sqrt{9}}{2}',
                        b: '6/15',
                        c: '2/5',
                        d: '9/2',
                        e: '\\displaystyle \\frac{3\\sqrt{45}}{2\\sqrt{5}}',
                        f: 'egyéb'
                    });
                    excs.push({
                        title: '8. Feladat',
                        text: '\\displaystyle \\frac{7\\sqrt{3}}{5}:\\frac{1}{\\sqrt{75}}',
                        a: '1/7',
                        b: '\\displaystyle \\frac{7\\sqrt{144}}{5}',
                        c: '21',
                        d: '7\\sqrt{9}',
                        e: '\\displaystyle \\frac{7\\sqrt{3}}{5\\sqrt{75}}',
                        f: 'egyéb'
                    });
                    break;
                }
                case 9: {
                    excs.push({
                        title: '1. Feladat',
                        text: '\\displaystyle \\frac{1}{\\sqrt{2}}'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '\\displaystyle \\frac{3}{\\sqrt{3}}'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '\\displaystyle -\\frac{8}{\\sqrt{6}}'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '\\displaystyle -\\frac{1}{\\sqrt{2}+1}'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '\\displaystyle \\frac{4}{\\sqrt{5}-1}'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: '\\displaystyle -\\frac{3}{\\sqrt{5}+\\sqrt{2}}'
                    });
                    excs.push({
                        title: '7. Feladat',
                        text: '\\displaystyle \\frac{1}{1+\\sqrt{2}+\\sqrt{3}}',
                        a: 'nem lehet gyökteleníteni',
                        b: '\\displaystyle -\\frac{1-\\sqrt{2}-\\sqrt{3}}{4+2\\sqrt{6}}',
                        c: '\\displaystyle \\frac{2+5\\sqrt{2}-4\\sqrt{3}+\\sqrt{6}}{6}',
                        d: '\\displaystyle \\frac{2+\\sqrt{2}-\\sqrt{6}}{4}',
                        e: '0',
                        f: 'egyéb'
                    });
                    excs.push({
                        title: '8. Feladat',
                        text: '\\displaystyle \\frac{3}{\\sqrt{2}+\\sqrt{3}+\\sqrt{5}}',
                        a: 'nem lehet gyökteleníteni',
                        b: '\\displaystyle \\frac{3\\sqrt{2}+2\\sqrt{3}-\\sqrt{30}}{4}',
                        c: '\\displaystyle \\frac{9\\sqrt{2}+6\\sqrt{3}-3\\sqrt{30}}{12}',
                        d: '\\displaystyle \\frac{3\\sqrt{2}+3\\sqrt{3}-3\\sqrt{5}}{2\\sqrt{6}}',
                        e: '0',
                        f: 'egyéb'
                    });
                    break;
                }
                case 10: {
                    excs.push({
                        title: '1. Feladat',
                        text: '(\\sqrt{2})^4'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '\\sqrt{3^6}'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '(\\sqrt{5})^3'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '\\sqrt{2^7}'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '(-\\sqrt{6^3})^2'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: '(-\\sqrt{7})^5'
                    });
                    excs.push({
                        title: '7. Feladat',
                        text: '(2\\sqrt{7})^3',
                        a: '14\\sqrt{7}',
                        b: '56\\sqrt{7}',
                        c: '8\\sqrt{343}',
                        d: '2\\sqrt{343}',
                        e: 'egyéb'
                    });
                    excs.push({
                        title: '8. Feladat',
                        text: '\\big[(-\\sqrt{2})^4\\big]^3',
                        a: '-64',
                        b: '\\sqrt{4096}',
                        c: '-\\sqrt{4096}',
                        d: '64',
                        e: 'egyéb'
                    });
                    excs.push({
                        title: '9. Feladat',
                        text: '\\displaystyle \\Big(\\frac{1}{\\sqrt{3}}\\Big)^{-5}',
                        a: '9\\sqrt{3}',
                        b: '\\displaystyle \\frac{1}{9\\sqrt{3}}',
                        c: '-9\\sqrt{3}',
                        d: '\\sqrt{243}',
                        e: 'egyéb'
                    });
                    excs.push({
                        title: '10. Feladat',
                        text: '(\\sqrt{7})^{50}',
                        a: '\\sqrt{7^{50}}',
                        b: '7^{48}',
                        c: '7^{25}',
                        d: 'egyéb'
                    });
                    break;
                }
                case 11: {
                    excs.push({
                        title: '1. Feladat',
                        text: '\\sqrt{90}:3\\cdot\\sqrt{5}',
                        a: '5\\sqrt{6}',
                        b: '\\sqrt{50}',
                        c: '\\sqrt{10}\\cdot\\sqrt{5}',
                        d: '5\\sqrt{2}',
                        e: 'egyéb'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '\\sqrt{27}-\\sqrt{15}+\\sqrt{3} \\cdot \\sqrt{5}',
                        a: '3\\sqrt{3}',
                        b: '\\sqrt{27}',
                        c: '5\\sqrt{3}',
                        d: '9\\sqrt{3}',
                        e: 'egyéb'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '\\sqrt{35}:\\sqrt{7}-\\sqrt{160}:(\\sqrt{2})^5',
                        a: '\\sqrt{-33}',
                        b: '\\sqrt{27}',
                        c: '0',
                        d: '\\sqrt{15}',
                        e: 'egyéb'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '\\sqrt{50}:(-5)+(\\sqrt{3})^3\\cdot\\sqrt{6}:3^2',
                        a: '\\sqrt{2}',
                        b: '0',
                        c: '-\\sqrt{2}+\\sqrt{162}:9',
                        d: '4\\sqrt{2}',
                        e: 'egyéb'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '\\sqrt{12}:\\sqrt{3}+\\sqrt{32}:\\sqrt{2}-\\sqrt{3^2+4^2}',
                        a: '\\sqrt{-5}',
                        b: '-1',
                        c: '2\\sqrt{5}-5',
                        d: '1',
                        e: 'egyéb'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: '\\displaystyle \\sqrt{2+\\frac{1}{4}}\\cdot\\sqrt{\\frac{4}{16+9}}\\cdot(\\sqrt{0,36})^{-1}',
                        a: '9/25',
                        b: '1',
                        c: '\\sqrt{2}+1/3',
                        d: '18/50',
                        e: 'egyéb'
                    });
                    break;
                }
                case 12: {
                    excs.push({
                        title: '1. Feladat',
                        text: '\\sqrt{3}\\cdot(\\sqrt{3}-\\sqrt{2})+\\sqrt{6}',
                        a: '3-\\sqrt{2}+\\sqrt{6}',
                        b: '3',
                        c: '1',
                        d: '\\sqrt{9}',
                        e: 'egyéb'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '(\\sqrt{3+7})^2-(\\sqrt{27}-\\sqrt{3})^2',
                        a: '-2',
                        b: '-20',
                        c: '-14',
                        d: '\\sqrt{58}-12',
                        e: 'egyéb'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '(\\sqrt{45}+\\sqrt{12})\\cdot(\\sqrt{45}-\\sqrt{12})',
                        a: '3\\sqrt{5}+6\\sqrt{15}-2\\sqrt{3}',
                        b: '-33',
                        c: '33',
                        d: '57',
                        e: 'egyéb'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '\\sqrt{2}:(\\sqrt{8}+\\sqrt{18}-\\sqrt{6}\\cdot\\sqrt{3})',
                        a: '1/2',
                        b: '\\displaystyle \\frac{1}{\\sqrt{30}}',
                        c: '\\displaystyle \\frac{\\sqrt{2}}{\\sqrt{8}}',
                        d: '\\displaystyle \\frac{1}{\\sqrt{2}}',
                        e: 'egyéb'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '\\sqrt{3}\\cdot(2\\sqrt{12}-\\sqrt{75})-\\sqrt{5}\\cdot(\\sqrt{20}-\\sqrt{45})',
                        a: '8',
                        b: '-8',
                        c: '2',
                        d: '2-5\\sqrt{3}-3\\sqrt{5}',
                        e: 'egyéb'
                    });
                    break;
                }
                case 13: {
                    excs.push({
                        title: '1. Feladat',
                        text: '\\displaystyle \\Bigg[(\\sqrt{2})^5:(-\\sqrt{2})^3-2\\cdot(\\sqrt{2})^3:\\Big(\\frac{1}{\\sqrt{2}}\\Big)^{-2}\\Bigg]\\cdot(-2+2\\sqrt{2})',
                        a: '-12+4\\sqrt{2}',
                        b: '4',
                        c: '-28+12\\sqrt{2}',
                        d: '-4',
                        e: 'egyéb'
                    });
                    excs.push({
                        title: '2. Feladat',
                        text: '\\sqrt{2,3(5)+3,5(2)+5,2(3)}\\cdot1,2',
                        a: '\\text{az eredmény irracionális}',
                        b: '120/30',
                        c: '12/3',
                        d: '4',
                        e: 'egyéb'
                    });
                    excs.push({
                        title: '3. Feladat',
                        text: '|3-\\sqrt{5}|+|\\sqrt{5}+\\sqrt{3}|+|\\sqrt{3}-2|',
                        a: '2\\sqrt{3}+2\\sqrt{5}-5',
                        b: '5',
                        c: '2\\sqrt{5}-1',
                        d: '2\\sqrt{3}+1',
                        e: 'egyéb'
                    });
                    excs.push({
                        title: '4. Feladat',
                        text: '\\displaystyle \\frac{3}{\\sqrt{2}}-\\frac{\\sqrt{9}}{\\sqrt{32}}+\\frac{\\sqrt{49}}{\\sqrt{8}}-\\frac{\\sqrt{25}}{\\sqrt{2}}',
                        a: '\\displaystyle \\frac{3\\sqrt{2}}{8}',
                        b: '\\displaystyle \\frac{3}{4\\sqrt{2}}',
                        c: '\\displaystyle \\frac{1}{\\sqrt{2}}',
                        d: '\\displaystyle \\frac{3}{\\sqrt{32}}',
                        e: 'egyéb'
                    });
                    excs.push({
                        title: '5. Feladat',
                        text: '16+4\\cdot\\big\\{2+\\sqrt{2}\\cdot\\big[\\sqrt{2}+3(\\sqrt{27}-3\\sqrt{3})\\big]-7^0\\big\\}:(-1)^7',
                        a: '28',
                        b: '4',
                        c: '0',
                        d: '-4',
                        e: 'egyéb'
                    });
                    excs.push({
                        title: '6. Feladat',
                        text: '\\sqrt{\\sqrt{2}(\\sqrt{2}+\\sqrt{3})+\\sqrt{3}(\\sqrt{2}+\\sqrt{3})}+\\sqrt{\\sqrt{3}(\\sqrt{3}-\\sqrt{2})-\\sqrt{2}(\\sqrt{3}-\\sqrt{2})}',
                        a: '\\sqrt{13+2\\sqrt{6}}+\\sqrt{13-2\\sqrt{6}}',
                        b: '2\\sqrt{3}',
                        c: '\\sqrt{3}$',
                        d: '2\\sqrt{2}',
                        e: 'egyéb'
                    });
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
              actually2={actually2}
              actExercises={actExercises}
              actExercises2={actExercises2}
              actChanges={actChanges}
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