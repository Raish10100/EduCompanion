import { Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"

import './App.css'
import AboutUs from "./Pages/AboutUs"

function App() {

  return (
    <div className="app">
      <Routes >
           <Route path='/' element={<HomePage />} />
           <Route path='/about' element={<AboutUs />} />
      </Routes>
    </div>
  )
}

export default App
