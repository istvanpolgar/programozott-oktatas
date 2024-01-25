import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import LinearProgress from '@mui/joy/LinearProgress';
import Typography from '@mui/joy/Typography';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';

import Copyright from './Copyright';
import InfoArea from './InfoArea';
import Alert from './Alert';

const Text1 = styled('div')(({ theme }) => ({
    ...theme.typography.h4,
    padding: theme.spacing(1),
}));

const Text2 = styled('div')(({ theme }) => ({
    ...theme.typography.h5,
    padding: theme.spacing(1),
}));

export default function Stats(props) {
    let navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [level, setLevel] = useState(0);
    const [sublevel, setSublevel] = useState(0);
    const [exercise, setExercise] = useState(0);
    const [titles, setTitles] = useState([]);
    const [sublevels, setSublevels] = useState(0);
    const [exercises, setExercises] = useState(0);
    const [allsublevels, setAllsublevels] = useState(0);
    const [allexercises, setAllexercises] = useState(0);

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
        navigate(0);
    };
    
    useEffect(()=>{
        const data = {};
        let x = [];

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
                let titl = [];
                let sl = 0;
                let ex = 0;
                let e = 0;
                setLevel(response.data.level);
                setSublevel(response.data.sublevel);
                setExercise(response.data.exercise);
                
                for(let i=0; i<response.data.natural.length; i++){
                    titl.push({ title: response.data.natural[i].title,
                        nr: response.data.nanswers[i][0].length-1});
                }
                x.push({title: response.data.titles[0], sub: titl});
                
                titl = [];
                for(let i=0; i<response.data.integer.length; i++){
                    titl.push({ title: response.data.integer[i].title,
                        nr: response.data.ianswers[i][0].length-1});
                }
                x.push({title: response.data.titles[1], sub: titl});

                titl = [];
                for(let i=0; i<response.data.rational.length; i++){
                    titl.push({ title: response.data.rational[i].title,
                        nr: response.data.raanswers[i][0].length-1});
                }
                x.push({title: response.data.titles[2], sub: titl});

                titl = [];
                for(let i=0; i<response.data.real.length; i++){
                    titl.push({ title: response.data.real[i].title,
                        nr: response.data.reanswers[i][0].length-1});
                }
                x.push({title: response.data.titles[3], sub: titl});
                
                x.forEach( (y,i) => {
                    if(i<response.data.level-1)
                        sl += y.sub.length;
                })
                sl += response.data.sublevel -1;

                x.forEach( (y,i) => {
                    y.sub.forEach( t => {
                        //console.log(t.nr)
                        ex += t.nr;
                    });
                    if(i < response.data.level - 1)
                        y.sub.forEach( t => {
                            e += t.nr;
                        });
                    else
                        if(i === response.data.level - 1)
                            y.sub.forEach( (t,j) => {
                                if(j < response.data.sublevel - 1)
                                    e += t.nr;
                            });
                })

                e += response.data.exercise -1;
                setExercises(e);
                setSublevels(sl);
                setTitles(x);
                setAllexercises(ex);
                setAllsublevels(response.data.natural.length+response.data.integer.length+response.data.rational.length+response.data.real.length);
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
                justifyContent: 'center',
                flexDirection: 'column',
                width: 0.98,
                m: 1,
                p: 1
            }}>
                <Text1> Fejezetek </Text1>
                <LinearProgress
                    determinate
                    variant="outlined"
                    color="success"
                    size="sm"
                    value={Math.round((100/titles.length)*(level-1))}
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
                        {`${Math.round(100*(level-1)/titles.length)}%`} TELJESÍTVE
                    </Typography>
                </LinearProgress>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Text2> Teljestett fejezetek (lenyitható) </Text2>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ 
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            width: 0.98,
                            m: 1,
                            p: 1
                        }}>
                            <List sx={{ width: '80%', bgcolor: 'rgb(255, 138, 101)' }}>
                                {
                                    titles.map((t,i)=>{
                                        if(i<level-1)
                                            return (
                                                <ListItem key={i}>
                                                    <ListItemIcon>
                                                        <CheckCircleIcon />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={t.title}
                                                        secondary={
                                                            <React.Fragment>
                                                                <Typography
                                                                    sx={{ display: 'inline' }}
                                                                    component="span"
                                                                    variant="body2"
                                                                    color="success.main"
                                                                >
                                                                    teljestve
                                                                </Typography>
                                                            </React.Fragment>
                                                        }
                                                    />
                                                </ListItem>
                                            )
                                        else if(i===level-1)
                                            return (
                                                <ListItem key={i}>
                                                    <ListItemIcon>
                                                        <PendingIcon />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={t.title}
                                                        secondary={
                                                            <React.Fragment>
                                                                <Typography
                                                                    sx={{ display: 'inline' }}
                                                                    component="span"
                                                                    variant="body2"
                                                                    color="error.main"
                                                                >
                                                                    folyamatban
                                                                </Typography>
                                                            </React.Fragment>
                                                        }
                                                    />
                                                </ListItem>
                                            )
                                        else
                                            return (
                                                <ListItem key={i}>
                                                    <ListItemIcon>
                                                        <PendingIcon />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={t.title}
                                                        secondary={
                                                            <React.Fragment>
                                                                <Typography
                                                                    sx={{ display: 'inline' }}
                                                                    component="span"
                                                                    variant="body2"
                                                                    color="error.main"
                                                                >
                                                                    nincs teljestve
                                                                </Typography>
                                                            </React.Fragment>
                                                        }
                                                    />
                                                </ListItem>
                                            )
                                    })
                                }
                            </List>
                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Text1> Egységek </Text1>
                <LinearProgress
                    determinate
                    variant="outlined"
                    color="success"
                    size="sm"
                    value={Math.round((100/allsublevels)*sublevels)}
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
                        {`${Math.round(100*sublevels/allsublevels)}%`} TELJESÍTVE
                    </Typography>
                </LinearProgress>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Text2> Teljestett egységek (lenyitható) </Text2>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ 
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            width: 0.98,
                            m: 1,
                            p: 1
                        }}>
                            <List sx={{ width: '80%', bgcolor: 'rgb(255, 138, 101)' }}>
                                {
                                    titles.map((t,i)=>{
                                        return (
                                            <>
                                            <ListItem key={i}>
                                                <ListItemText 
                                                    primary={t.title}
                                                />
                                            </ListItem>
                                            {
                                                t.sub.map((s,j)=>{
                                                    if(i<level-1)
                                                        return (
                                                            <ListItem key={j}>
                                                                <ListItemIcon>
                                                                    <CheckCircleIcon />
                                                                </ListItemIcon>
                                                                <ListItemText
                                                                    primary={s.title}
                                                                    secondary={
                                                                        <React.Fragment>
                                                                            <Typography
                                                                                sx={{ display: 'inline' }}
                                                                                component="span"
                                                                                variant="body2"
                                                                                color="success.main"
                                                                            >
                                                                                teljestve
                                                                            </Typography>
                                                                        </React.Fragment>
                                                                    }
                                                                />
                                                            </ListItem>
                                                        )
                                                    else if(i===level-1 && j<sublevel-1)
                                                            return (
                                                                <ListItem key={j}>
                                                                    <ListItemIcon>
                                                                        <CheckCircleIcon />
                                                                    </ListItemIcon>
                                                                    <ListItemText
                                                                        primary={s.title}
                                                                        secondary={
                                                                            <React.Fragment>
                                                                                <Typography
                                                                                    sx={{ display: 'inline' }}
                                                                                    component="span"
                                                                                    variant="body2"
                                                                                    color="success.main"
                                                                                >
                                                                                    teljestve
                                                                                </Typography>
                                                                            </React.Fragment>
                                                                        }
                                                                    />
                                                                </ListItem>
                                                            )
                                                        else if(i===level-1 && j===sublevel-1)
                                                            return (
                                                                <ListItem key={j}>
                                                                    <ListItemIcon>
                                                                        <CheckCircleIcon />
                                                                    </ListItemIcon>
                                                                    <ListItemText
                                                                        primary={s.title}
                                                                        secondary={
                                                                            <React.Fragment>
                                                                                <Typography
                                                                                    sx={{ display: 'inline' }}
                                                                                    component="span"
                                                                                    variant="body2"
                                                                                    color="success.main"
                                                                                >
                                                                                    folyamatban
                                                                                </Typography>
                                                                            </React.Fragment>
                                                                        }
                                                                    />
                                                                </ListItem>
                                                            )
                                                        else
                                                            return (
                                                                <ListItem key={j}>
                                                                    <ListItemIcon>
                                                                        <PendingIcon />
                                                                    </ListItemIcon>
                                                                    <ListItemText
                                                                        primary={s.title}
                                                                        secondary={
                                                                            <React.Fragment>
                                                                                <Typography
                                                                                    sx={{ display: 'inline' }}
                                                                                    component="span"
                                                                                    variant="body2"
                                                                                    color="success.main"
                                                                                >
                                                                                    nincs teljestve
                                                                                </Typography>
                                                                            </React.Fragment>
                                                                        }
                                                                    />
                                                                </ListItem>
                                                            )
                                                })
                                            }
                                            </>
                                        )
                                    })
                                }
                            </List>
                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Text1> Feladatok </Text1>
                <LinearProgress
                    determinate
                    variant="outlined"
                    color="success"
                    size="sm"
                    value={Math.round((100/allexercises)*exercises)}
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
                        {`${Math.round(100*exercises/allexercises)}%`} TELJESÍTVE
                    </Typography>
                </LinearProgress>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Text2> Teljestett feladatok (lenyitható) </Text2>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ 
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            width: 0.98,
                            m: 1,
                            p: 1
                        }}>
                            <List sx={{ width: '80%', bgcolor: 'rgb(255, 138, 101)' }}>
                                {
                                    titles.map((t,i)=>{
                                        return (
                                            <>
                                            <ListItem key={i}>
                                                <ListItemText
                                                    primary={t.title}
                                                />
                                            </ListItem>
                                            {
                                                t.sub.map((s,j)=>{
                                                    if(i<level-1)
                                                        return (
                                                            <ListItem key={j}>
                                                                <ListItemIcon>
                                                                    <CheckCircleIcon />
                                                                </ListItemIcon>
                                                                <ListItemText
                                                                    primary={`${s.title} - ${s.nr} feladat`}
                                                                    secondary={
                                                                        <React.Fragment>
                                                                            <Typography
                                                                                sx={{ display: 'inline' }}
                                                                                component="span"
                                                                                variant="body2"
                                                                                color="success.main"
                                                                            >
                                                                                teljestve
                                                                            </Typography>
                                                                        </React.Fragment>
                                                                    }
                                                                />
                                                            </ListItem>
                                                        )
                                                    else
                                                        if(i===level-1 && j<sublevel-1)
                                                            return (
                                                                <ListItem key={j}>
                                                                    <ListItemIcon>
                                                                        <CheckCircleIcon />
                                                                    </ListItemIcon>
                                                                    <ListItemText
                                                                        primary={`${s.title} - ${s.nr} feladat`}
                                                                        secondary={
                                                                            <React.Fragment>
                                                                                <Typography
                                                                                    sx={{ display: 'inline' }}
                                                                                    component="span"
                                                                                    variant="body2"
                                                                                    color="success.main"
                                                                                >
                                                                                    teljestve
                                                                                </Typography>
                                                                            </React.Fragment>
                                                                        }
                                                                    />
                                                                </ListItem>
                                                            )
                                                        else 
                                                            if(j===sublevel-1)
                                                                return (
                                                                    <ListItem key={j}>
                                                                        <ListItemIcon>
                                                                            <PendingIcon />
                                                                        </ListItemIcon>
                                                                        <ListItemText
                                                                            primary={`${s.title} - ${exercise-1} feladat`}
                                                                            secondary={
                                                                                <React.Fragment>
                                                                                    <Typography
                                                                                        sx={{ display: 'inline' }}
                                                                                        component="span"
                                                                                        variant="body2"
                                                                                        color="success.main"
                                                                                    >
                                                                                        folyamatban
                                                                                    </Typography>
                                                                                </React.Fragment>
                                                                            }
                                                                        />
                                                                    </ListItem>
                                                                )
                                                            else
                                                                return (
                                                                    <ListItem key={j}>
                                                                        <ListItemIcon>
                                                                            <PendingIcon />
                                                                        </ListItemIcon>
                                                                        <ListItemText
                                                                            primary={`${s.title} - 0 feladat`}
                                                                            secondary={
                                                                                <React.Fragment>
                                                                                    <Typography
                                                                                        sx={{ display: 'inline' }}
                                                                                        component="span"
                                                                                        variant="body2"
                                                                                        color="success.main"
                                                                                    >
                                                                                        nincs teljestve
                                                                                    </Typography>
                                                                                </React.Fragment>
                                                                            }
                                                                        />
                                                                    </ListItem>
                                                                )           
                                                    
                                                })
                                            }
                                            </>
                                        )
                                    })
                                }
                            </List>
                        </Box>
                    </AccordionDetails>
                </Accordion>
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