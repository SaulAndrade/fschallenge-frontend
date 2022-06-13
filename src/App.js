import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import SecondPage from './pages/SecondPage'

import classes from './App.module.css'

function App() {
  return (
    <div className={classes.Layout}>
      <Routes>
          <Route path='*' element={ <Navigate to='/'/> } />  
          <Route path='/' element={ <LoginPage /> } />  
          <Route path='/main' element={ <MainPage /> } />
          <Route path='/details' element={ <SecondPage /> } />
      </Routes>
    </div>
  );
}

export default App;
