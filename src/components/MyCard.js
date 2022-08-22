import * as React from 'react';

import { 
  Typography, 
  Button,
  Fab,
  Box
} from '@mui/material';

import {
  NewCard,
  NewCardActionArea,
  NewCardActions,
  NewCardContent,
  NewCardMedia
} from "./NewCard";

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import { createTheme, responsiveFontSizes, ThemeProvider} from '@mui/material/styles';

let theme1 = createTheme();
theme1 = responsiveFontSizes(theme1);
const theme2 = createTheme();

export default function MyCard( props ) {
  let dots = [];

  for(let i = 0; i < props.length; i++)
      if( i === props.activeDot)
          dots[i] = true;
      else
          dots[i] = false;

  return (
    <ThemeProvider theme={theme2}>
      <NewCard sx={{ height: "100vh" }}> 
        <NewCardActionArea>
          <NewCardMedia
            component='img'
            alt={props.title}
            image={props.image}
            title={props.title}
          />
          <NewCardContent sx={{
            height: "25vh",
            color: "#ffffff",
            backgroundColor: "rgba(0,0,0,.4)",
            pt: 5,
            mt: 5
          }}>
            <ThemeProvider theme={theme1}>
              <Typography variant="h2" > {props.title} </Typography>
            </ThemeProvider>
            <ThemeProvider theme={theme1}>
              <Typography
                variant="h5"
                sx={{
                  color: "rgba(255,255,255,0.78)",
                  pl: 7, py: 2
                }}
              >
                {props.description}
              </Typography>
            </ThemeProvider>
          </NewCardContent>
        </NewCardActionArea>
        <Box sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 1,
          p: 1
        }}>
          { 
          dots.map((dot,i) => {
            if( props.activeDot === i)
              return (
                <Fab
                    key={i}
                    component="button"
                    disabled={dot}
                    sx={{
                      m: 1,
                      background: "transparent"
                    }}
                    size="small"
                >
                  <FiberManualRecordIcon sx={{color: "rgb(0,0,0)"}} key={i}/>
                </Fab>
              )
            else
              return (
                <Fab
                  key={i}
                  component="button"
                  disabled={dot}
                  onClick={ () => { 
                      props.setActiveDot(i);
                      props.setManualChange(true);
                  } }
                  sx={{
                    m: 1,
                    background: "transparent"
                  }}
                  size="small"
                >
                <FiberManualRecordIcon sx={{ color: "rgb(255,255,255)" }}  key={i}/>
                </Fab>
            )})
          }
        </Box>
        <NewCardActions sx={{
          width: 1,
          p: 10
        }}>
          <Button 
            sx={{
              width: "45%",
              fontSize: "5vh",
              color: "rgb(255,255,255)",
              borderColor: "rgb(255,255,255)",
              background: "rgba(0,0,0,0.6)",
            }}
            size="large" 
            variant="outlined" 
            onClick={() => { props.handleRoot(props.activeDot); }}
          >
            {props.buttontitle}
          </Button>
        </NewCardActions> 
      </NewCard>
    </ThemeProvider>
)}