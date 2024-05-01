import React from 'react'
import './App.css'

import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Homepage from './components/Homepage/Homepage'
import Busspass from './components/Busspass/Busspass'



const App = () => {
  return (
    <div > 
    <Router>
      <Routes>
          <Route path="/" exact element={<Homepage />} />
          <Route path="/Busspass" element={<Busspass />} /> 
      </Routes>
    </Router>
  </div>
  )
}

export default App