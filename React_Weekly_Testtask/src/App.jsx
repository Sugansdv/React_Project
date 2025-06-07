import { useState } from 'react'
import './App.css'
import Project1 from './Components/Project1'
import Project2 from './Components/Project2'
import Project3 from './Components/Project3'
import Project4 from './Components/Project4'
import Project5 from './Components/Project5'

function App() {

  return (
    <>
    <nav className="navbar navbar-dark bg-dark p-3">
        <span className="navbar-brand h1"></span>
        <span className="navbar-brand h1 px-1">Suganya S</span>
        <span className="text-light fw-bold px-1">React_Weekly_Test / 07-06-2025</span>
         <span className="text-light"></span>
      </nav>
      <h3 className='text-center mt-5'>1. Counter with Auto-Increment </h3>
      <Project1 />
      <br />
      <hr />
       <h3 className='text-center mt-5'>2. To-Do List with LocalStorage </h3>
      <Project2 />
      <br />
      <hr />
       <h3 className='text-center mt-5'>3. Password Toggle Input </h3>
      <Project3 />
      <br />
      <hr />
       <h3 className='text-center mt-5'> 4. API Data Fetcher </h3>
      <Project4 />
      <br />
      <hr />
       <h3 className='text-center mt-5'> 5. Scroll to Top Button </h3>
      <Project5 />
      <br />
      <br />
    </>
  )
}

export default App
