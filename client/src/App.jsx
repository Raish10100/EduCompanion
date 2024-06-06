import { Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"

import './App.css'

function App() {

  return (
    <div className="app">
      <Routes >
           <Route path='/' element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App
