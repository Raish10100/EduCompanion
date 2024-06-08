import { Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"

import './App.css'
import AboutUs from "./Pages/AboutUs"
import NotFound from "./Pages/NotFound"
import SignUp from "./Pages/SignUp"

function App() {

  return (
    <div className="app">
      <Routes >
           <Route path='/' element={<HomePage />} />
           <Route path='/about' element={<AboutUs />} />
           <Route path='/signup' element={<SignUp />} />


           <Route path='/*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
