import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import MyCard from './MyCard';

const titles = [
  "Diák vagy?",
  "Szeretnéd fejleszteni számolási készséged?",
  "Még nem regisztráltál?",
  "Ma még nem gyakoroltál?"
];
const descriptions = [
  "Csatlakozz hozzánk, hogy feljezdhesd önállóan a számolási készséged!",
  "Gyere és próbálj ki egy olyan gyakorlási lehetőséget, ahol nem szükséges tanári jelenlét!",
  "Gyere és légy tagja ingyen a gyakorlóközösségnek!",
  "Jelentkezz be és kedj neki a gyakorlásnak vagy folytasd, ahol abbahagytad!"
];
const buttontitles = [ 
  "Csatlakozom",
  "Kipróbálom",
  "Regisztrálok",
  "Bejelentkezés"
];
const images = [
  "/pictures/one.jpg", 
  "/pictures/two.jpg",
  "/pictures/three.jpg",
  "/pictures/four.jpg"
];

let res;

export default function Firstpage() {
  let navigate = useNavigate();
  const [activeDot, setActiveDot] = useState(0);
  const [manualChange, setManualChange] = useState(false);

  useEffect(()=>{
    if(!manualChange)
      clearTimeout(res);
    else
    {
      clearTimeout(res);
      setManualChange(false);
    }
    res = setTimeout(() => {
      if( activeDot === titles.length-1)
        setActiveDot(0)
      else
        setActiveDot(activeDot + 1)
    }, 7000);
  },[activeDot, manualChange]);

  const handleRoot = (index) => {
    clearTimeout(res);
    switch(index){
      case 0: navigate('/signup', { replace: true }); break;
      case 1: navigate('/signup', { replace: true }); break;
      case 2: navigate('/signup', { replace: true }); break;
      case 3: navigate('/signin', { replace: true }); break;
      default: break;
    }
  }

  return (
    <div>
      <MyCard
        length={titles.length}
        title={titles[activeDot]}
        image={images[activeDot]}
        description={descriptions[activeDot]}
        buttontitle={buttontitles[activeDot]}
        activeDot={activeDot}
        setActiveDot={setActiveDot}
        setManualChange={setManualChange}
        handleRoot={handleRoot}
      />
    </div>
)}