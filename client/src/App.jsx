import { Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"

import './App.css'
import AboutUs from "./Pages/AboutUs"
import NotFound from "./Pages/NotFound"

function App() {

  return (
    <div className="app">
      <Routes >
           <Route path='/' element={<HomePage />} />
           <Route path='/about' element={<AboutUs />} />


           <Route path='/*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
