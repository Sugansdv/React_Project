import React from 'react';
import { ThemeProvider } from './Contexts/ThemeContext';
import { WeatherProvider } from './Contexts/WeatherContext'; 
import Proj1 from './Components/Proj1';
import Proj2 from './Components/Proj2';
import Proj3 from './Components/Proj3';
import Proj4 from './Components/Proj4';
import Proj5 from './Components/Proj5';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <>
    <nav className="navbar navbar-dark bg-dark p-3">
        <span className="navbar-brand h1"></span>
        <span className="navbar-brand h1 px-1">Suganya S</span>
        <span className="text-light fw-bold px-1">Day_15 Project</span>
         <span className="text-light"></span>
      </nav>
    <ThemeProvider>
      <WeatherProvider>
        <Proj1 />
        <br />
        <hr />
        <Proj2 />
         <br />
        <hr />
        <Proj3 />
         <br />
        <hr />
        <Proj4 />
         <br />
        <hr />
        <Proj5 />
      </WeatherProvider>
    </ThemeProvider>
    </>
  );
}

export default App;
