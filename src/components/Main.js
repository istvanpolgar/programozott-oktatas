import React from 'react';
import {
  Box
} from '@mui/material';

import Copyright from './Copyright';
import InfoArea from './InfoArea';
import Stepper from './Stepper';

export default function Main(props) {

  return (
    <div>
      <InfoArea 
        token={props.token} 
        setToken={props.setToken} 
      />
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 0.95,
        p: 1
      }}>
          <Stepper  
            token={props.token} 
            setToken={props.setToken} 
          />
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </div>
  );
}