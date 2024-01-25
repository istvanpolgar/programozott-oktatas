import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import MathJax from 'react-mathjax';
import YoutubeVideo from './YoutubeVideo';

import Accordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

import {
  Box,
  TextField,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
backgroundColor:'#2979FF',
flexDirection: 'row-reverse',
'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
  transform: 'rotate(90deg)',
},
'& .MuiAccordionSummary-content': {
  marginLeft: theme.spacing(1),
},
}));

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

const Exercise = styled('div')(({ theme }) => ({
    ...theme.typography.h5,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    fontWeight: 'bold'
}));

export default function Steppers(props) {
    const [answer, setAnswer] = useState("");

    const handleReset = () => {
        props.saveExercise(1,3);
    };

    const handleSubmit = async (e,i) => {  
        e.preventDefault();
        if(answer !== '')
            if(answer == props.answers[props.sublevel-1][0][i].answer)
            {
                if(props.sublevel === props.actually.length)
                {
                    props.saveExercise(1,1);
                    props.saveSublevel(1,1);
                    props.saveLevel(props.level+1,1);
                }
                else
                    if(props.exercise === props.exercises.length)
                    {
                        props.saveExercise(1,1);
                        props.saveSublevel(props.sublevel+1,1);
                    }
                    else
                        props.saveExercise(props.exercise+1,1);
            }
            else
            {
                if(!props.answers[props.sublevel-1][0][i].to.a)
                {
                    props.saveExercise(1);
                    props.saveSublevel(props.answers[props.sublevel-1][0][i].subto,2);
                    props.saveLevel(props.answers[props.sublevel-1][0][i].to,2);
                }
                else
                {
                    props.saveExercise(1,2);
                    switch(answer)
                    {
                        case 'a':   props.saveSublevel(props.answers[props.sublevel-1][0][i].subto.a,2);
                                    props.saveLevel(props.answers[props.sublevel-1][0][i].to.a,2);
                                    break;
                        case 'b':   props.saveSublevel(props.answers[props.sublevel-1][0][i].subto.b,2);
                                    props.saveLevel(props.answers[props.sublevel-1][0][i].to.b,2);
                                    break;
                        case 'c':   props.saveSublevel(props.answers[props.sublevel-1][0][i].subto.c,2);
                                    props.saveLevel(props.answers[props.sublevel-1][0][i].to.c,2);
                                    break;
                        case 'd':   props.saveSublevel(props.answers[props.sublevel-1][0][i].subto.d,2);
                                    props.saveLevel(props.answers[props.sublevel-1][0][i].to.d,2);
                                    break;
                        case 'e':   props.saveSublevel(props.answers[props.sublevel-1][0][i].subto.e,2);
                                    props.saveLevel(props.answers[props.sublevel-1][0][i].to.e,2);
                                    break;
                        case 'f':   props.saveSublevel(props.answers[props.sublevel-1][0][i].subto.f,2);
                                    props.saveLevel(props.answers[props.sublevel-1][0][i].to.f,2);
                                    break;
                        case 'g':   props.saveSublevel(props.answers[props.sublevel-1][0][i].subto.g,2);
                                    props.saveLevel(props.answers[props.sublevel-1][0][i].to.g,2);
                                    break;
                        case 'h':   props.saveSublevel(props.answers[props.sublevel-1][0][i].subto.h,2);
                                    props.saveLevel(props.answers[props.sublevel-1][0][i].to.h,2);
                                    break;
                        case 'i':   props.saveSublevel(props.answers[props.sublevel-1][0][i].subto.i,2);
                                    props.saveLevel(props.answers[props.sublevel-1][0][i].to.i,2);
                                    break;
                        case 'j':   props.saveSublevel(props.answers[props.sublevel-1][0][i].subto.j,2);
                                    props.saveLevel(props.answers[props.sublevel-1][0][i].to.j,2);
                                    break;
                        case 'k':   props.saveSublevel(props.answers[props.sublevel-1][0][i].subto.k,2);
                                    props.saveLevel(props.answers[props.sublevel-1][0][i].to.k,2);
                                    break;
                        default: break;
                    }
                }
            }
    }

    if(props.exercises)
    {
        return (
            <Box sx={{ width: 0.75 }}>
                <Text1> {props.titles[props.level-1]} </Text1>
                <Text2> {
                    props.actChanges[props.sublevel-1] !==0 && props.actually2[props.sublevel-1] !== '' ?
                        props.exercise < props.actChanges[props.sublevel-1] ?
                            props.actually[props.sublevel-1]
                        : props.actually2[props.sublevel-1]
                    : props.actually[props.sublevel-1]
                } </Text2>
                <div> {
                    props.sublevel !== 0 ?
                        props.actUrl[props.sublevel-1]!=="" ? 
                            <>
                                <Accordion sx={{marginTop: 2, marginBottom: 2, padding: 1}}>
                                    <AccordionSummary
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        Nyisd le az oktatóvideókért
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {
                                            props.actUrl[props.sublevel-1].split(',').map( (url) => {
                                                return (
                                                    <YoutubeVideo embedId= {url}/>
                                                )
                                            })     
                                        }
                                    </AccordionDetails>
                                </Accordion>
                            </>
                        : null
                    : null
                } </div> 
                <Stepper activeStep={props.exercise-1} orientation="vertical">
                {
                    props.exercises.map((ex, index) => (
                        <Step key={ex.title}>
                            <StepLabel> {
                                index === props.exercise-1 ?
                                    props.actChanges[props.sublevel-1] !==0 && props.actExercises2[props.sublevel-1] !== '' ?
                                        props.exercise < props.actChanges[props.sublevel-1] ?
                                            ex.title + ' - ' + props.actExercises[props.sublevel-1]
                                        : ex.title + ' - ' + props.actExercises2[props.sublevel-1]
                                    : ex.title + ' - ' + props.actExercises[props.sublevel-1]
                                : ex.title
                            } </StepLabel>
                            <StepContent>
                                <Box component="form" noValidate onSubmit={e=>handleSubmit(e,index+1)} sx={{ mt: 1 }}>
                                    <Exercise>
                                        <MathJax.Provider>
                                            <MathJax.Node inline formula={ex.text} />
                                        </MathJax.Provider>
                                    </Exercise>
                                    {
                                        props.answers[props.sublevel-1][0][index+1].tip === 1 ?
                                            <TextField
                                                required
                                                fullWidth
                                                id={`answer${index}`}
                                                label="Eredmény"
                                                name={`answer${index}`}
                                                autoComplete="ide írd az eredményt"
                                                onChange={event => setAnswer(event.target.value)}
                                                autoFocus
                                            />
                                        :   <FormControl>
                                                <MathJax.Provider>
                                                    <FormLabel id="demo-radio-buttons-group-label">Melyik a helyes eredmény?</FormLabel>
                                                    <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"
                                                    >
                                                        {
                                                            ex.a ?
                                                                <FormControlLabel onChange={event => setAnswer(event.target.value)} value='a' control={<Radio />} label={<MathJax.Node inline formula={ex.a} />}/>
                                                            : null
                                                        }
                                                        {
                                                            ex.b ?
                                                                <FormControlLabel onChange={event => setAnswer(event.target.value)} value='b' control={<Radio />} label={<MathJax.Node inline formula={ex.b} />} />
                                                            : null
                                                        }
                                                        {
                                                            ex.c ?
                                                                <FormControlLabel onChange={event => setAnswer(event.target.value)} value='c' control={<Radio />} label={<MathJax.Node inline formula={ex.c} />} />
                                                            : null
                                                        }
                                                        {
                                                            ex.d ?
                                                                <FormControlLabel onChange={event => setAnswer(event.target.value)} value='d' control={<Radio />} label={<MathJax.Node inline formula={ex.d} />} />
                                                            : null
                                                        }
                                                        {
                                                            ex.e ?
                                                                <FormControlLabel onChange={event => setAnswer(event.target.value)} value='e' control={<Radio />} label={<MathJax.Node inline formula={ex.e} />} />
                                                            : null
                                                        }
                                                        {
                                                            ex.f ?
                                                                <FormControlLabel onChange={event => setAnswer(event.target.value)} value='f' control={<Radio />} label={<MathJax.Node inline formula={ex.f} />} />
                                                            : null
                                                        }
                                                        {
                                                            ex.g ?
                                                                <FormControlLabel onChange={event => setAnswer(event.target.value)} value='g' control={<Radio />} label={<MathJax.Node inline formula={ex.g} />} />
                                                            : null
                                                        }
                                                        {
                                                            ex.h ?
                                                                <FormControlLabel onChange={event => setAnswer(event.target.value)} value='h' control={<Radio />} label={<MathJax.Node inline formula={ex.h} />} />
                                                            : null
                                                        }
                                                        {
                                                            ex.i ?
                                                                <FormControlLabel onChange={event => setAnswer(event.target.value)} value='i' control={<Radio />} label={<MathJax.Node inline formula={ex.i} />} />
                                                            : null
                                                        }
                                                        {
                                                            ex.j ?
                                                                <FormControlLabel onChange={event => setAnswer(event.target.value)} value='j' control={<Radio />} label={<MathJax.Node inline formula={ex.j} />} />
                                                            : null
                                                        }
                                                        {
                                                            ex.k ?
                                                                <FormControlLabel onChange={event => setAnswer(event.target.value)} value='k' control={<Radio />} label={<MathJax.Node inline formula={ex.k} />} />
                                                            : null
                                                        }
                                                    </RadioGroup>
                                                </MathJax.Provider>
                                            </FormControl>
                                    }
                                    <Box sx={{ mb: 2 }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            OK
                                        </Button>
                                    </Box>
                                </Box>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {
                    props.exercise === props.exercises.length && (
                        <Paper square elevation={0} sx={{ p: 3 }}>
                            <Typography> Utolsó feladat! Ha helyesen válaszolsz átléphetsz a következő egységre!</Typography>
                            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                                Újrakezd
                            </Button>
                        </Paper>
                )}
            </Box>
        );
    }
}
