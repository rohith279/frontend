// import { useState } from 'react'
import LandingPage from "./component/LandingPage/index"
import Dashboard from "./component/home/index"
import {Routes, Route } from 'react-router-dom';
function App() {

  return (
      <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/dashboard"
          element={
              <Dashboard />
          }
        />
      </Routes>
      </>
  )
}

export default App
