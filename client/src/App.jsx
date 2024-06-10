import { Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"

import './App.css'
import AboutUs from "./Pages/AboutUs"
import NotFound from "./Pages/NotFound"
import SignUp from "./Pages/SignUp"
import Login from "./Pages/Login"
import CourseList from "./Pages/Course/CourseList"
import Contact from "./Pages/Contact"
import Denied from "./Pages/Denied"
import CourseDescription from "./Pages/Course/CourseDescription"
import RequireAuth from "./Components/Auth/RequireAuth"
import CreateCourse from "./Pages/Course/CreateCourse"

function App() {

  return (
    <div className="app">
      <Routes >
           <Route path='/' element={<HomePage />} />
           <Route path='/about' element={<AboutUs />} />
            <Route path='/contact' element={<Contact />} />

           <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login/>} />

            <Route path='/courses' element={<CourseList />} />
            <Route path='/course/description' element={<CourseDescription />} />

            <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
              <Route path="/course/create" element={<CreateCourse />} /> 
            </Route>

            <Route path='/denied' element={<Denied/>} />
           <Route path='/*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
