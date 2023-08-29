import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import MathJax from 'react-mathjax';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
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
  Radio,
  Container
} from '@mui/material';

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
    ...theme.typography.subtitle1,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1,1,1,0),
    fontWeight: 'bold'
}));

const Exercise = styled('div')(({ theme }) => ({
    ...theme.typography.h5,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    fontWeight: 'bold'
}));

export default function Steppers(props) {
    const [answer, setAnswer] = useState("");
    const [exercises, setExercises] = useState([]);
   
    const handleReset = () => {
        props.setExercise(1);
        props.saveExercise();
    };

    const handleSubmit = async (e,i) => {  
        e.preventDefault();
        if(answer == props.answers[props.sublevel-1][0][i].answer)
        {
            if(props.sublevel === props.actually.length)
            {
                props.setLevel(props.level+1);
                props.saveLevel();
                props.setSublevel(1);
                props.saveSublevel();
                props.setExercise(1);
                props.saveExercise();
            }
            else
                if(props.exercise === exercises.length)
                {
                    props.setSublevel(props.sublevel+1);
                    props.saveSublevel();
                    props.setExercise(1);
                    props.saveExercise();
                }
                else
                {
                    props.setExercise(props.exercise+1);
                    props.saveExercise();
                }
        }
    }
    
    useEffect(()=>{
        let excs = [];
        switch(props.level) {
            case 1: {
                switch(props.sublevel) {
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
                switch(props.sublevel) {
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
                switch(props.sublevel) {
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
                switch(props.sublevel) {
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
    },[props.level, props.sublevel]);

    return (
        <Box sx={{ width: 0.75 }}>
            <Text1> {props.titles[props.level-1]} </Text1>
            <Text2> {props.actually[props.sublevel-1]} </Text2>
            <Container maxWidth="md">
                <div className='playerDiv'>
                    <ReactPlayer width='100%' controls={true} url={props.actUrl[props.sublevel-1]}/>
                </div>
            </Container>
            <Text3> {props.actExercises[props.sublevel-1]} </Text3>
            <Stepper activeStep={props.exercise-1} orientation="vertical">
            {
                exercises.map((ex, index) => (
                    <Step key={ex.title}>
                        <StepLabel> {ex.title} </StepLabel>
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
                props.exercise === exercises.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography> Minden feladatot teljesítettél. Átléphetsz a következő egységre!</Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Újrakezd
                    </Button>
                </Paper>
            )}
        </Box>
    );
}
