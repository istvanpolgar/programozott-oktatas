import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { styled } from '@mui/material/styles';
import YoutubeVideo from './YoutubeVideo';
import {
  Box
} from '@mui/material';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

import Copyright from './Copyright';
import InfoArea from './InfoArea';
import Alert from './Alert';

const Accordion = styled((props) => (
        <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));
  
const AccordionSummary = styled((props) => (
        <MuiAccordionSummary
            expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
            {...props}
        />
    ))(({ theme }) => ({
    backgroundColor: 'rgba(255, 87, 34, 0.4)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
}));
  
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    backgroundColor: 'rgba(255, 87, 34, 0.4)',
}));

const Text = styled('div')(({ theme }) => ({
    ...theme.typography.h5,
    padding: theme.spacing(1),
}));

export default function Learn(props) {
    let navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [level, setLevel] = useState(0);
    const [sublevel, setSublevel] = useState(0);
    const [titles, setTitles] = useState([]);
    const [expanded1, setExpanded1] = useState('panel1');
    const [expanded2, setExpanded2] = useState('panel1');

    const handleChange1 = (panel) => (event, newExpanded) => {
        setExpanded1(newExpanded ? panel : false);
    };

    const handleChange2 = (panel) => (event, newExpanded) => {
        setExpanded2(newExpanded ? panel : false);
    };

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
                setLevel(response.data.level);
                setSublevel(response.data.sublevel);
                for(let i=0; i<response.data.natural.length; i++){
                    titl.push({ title: response.data.natural[i].title,
                                url: response.data.natural[i].url});
                }
                x.push({title: response.data.titles[0], sub: titl});
                titl = [];
                for(let i=0; i<response.data.integer.length-1; i++){
                    titl.push({ title: response.data.integer[i].title,
                                url: response.data.integer[i].url});
                }
                x.push({title: response.data.titles[1], sub: titl});
                titl = [];
                for(let i=0; i<response.data.rational.length-1; i++){
                    titl.push({ title: response.data.rational[i].title,
                                url:response.data.rational[i].url});
                }
                x.push({title: response.data.titles[2], sub: titl});
                titl = [];
                for(let i=0; i<response.data.real.length-1; i++){
                    titl.push({ title: response.data.real[i].title,
                                url:response.data.real[i].url});
                }
                x.push({title: response.data.titles[3], sub: titl});
                setTitles(x);
            }
        });
    },[props.token]);

    if(titles)
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
                    display: 'flex',
                    justifyContent: 'center',
                    width: 0.98,
                    m: 1,
                    p: 1
                }}>
                    <Box sx={{ 
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        width: 0.8,
                        m: 1,
                        p: 1
                    }}> {
                        titles.map((element,index) => {
                            return (
                                <Accordion key={index} expanded={expanded1 === `panel${index+1}`} onChange={handleChange1(`panel${index+1}`)}>
                                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                        <Text>{element.title}</Text>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                    {
                                        element.sub.map((tit, i) => {
                                            return (
                                                <Accordion key={index*10+i} expanded={expanded2 === `panel${i+1}`} onChange={handleChange2(`panel${i+1}`)}>
                                                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                                        <Text>{tit.title}</Text>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                    <div> {
                                                        tit.url ?
                                                        tit.url.split(',').map( (u) => {
                                                            return (
                                                                <YoutubeVideo embedId= {u}/>
                                                            )
                                                        }) : null
                                                    } </div>
                                                    </AccordionDetails>
                                                </Accordion>   
                                            )
                                        })
                                    }
                                    </AccordionDetails>
                                </Accordion>
                            )
                        })
                    } </Box>
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