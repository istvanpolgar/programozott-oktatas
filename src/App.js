import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import useToken from './functions/useToken';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgottenPass from './components/ForgottenPass';
import Main from './components/Main';
import Firstpage from './components/Firstpage';

function App() {
  const {token, setToken} = useToken();

  if(!token)
    return(
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Firstpage />} />
            <Route path="/signin" element={
              <SignIn 
                setToken={setToken}
            />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgotten_pass" element={<ForgottenPass />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  else
    return(
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Firstpage />} />
            <Route path="/main" element={
              <Main 
                token={token}
                setToken={setToken}
              />} /> 
          </Routes>
        </BrowserRouter>
      </div>
    );
}

export default App;
