import { Routes, Route, Navigate } from 'react-router-dom'
import logo from './assets/img/logo.svg'
import classes from './App.module.css'

import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import SecondPage from './pages/SecondPage'

function App() {
  return (
    <Routes>
      <Route path='*' element={ <Navigate to='/'/> } />  
      <Route path='/' element={ <LoginPage /> } />  
      <Route path='/main' element={ <MainPage /> } />
      <Route path='/details' element={ <SecondPage /> } />
    </Routes>
  );
}

export default App;
