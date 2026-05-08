import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import UserLayout from './protectedRoutes/UserLayout'
import AppLayout from './protectedRoutes/AppLayout'
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
import {Toaster} from "react-hot-toast"


function App() {

  return (
    <section className="App">
      <Toaster/>
      <Routes>
        {/* auth layouts */}
        <Route path='/' element={<UserLayout />} >
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>


        {/* app layouts */}
        <Route path='/' element={<AppLayout/>} >
          <Route index element={<Home/>} />
          <Route path='/profile' element={<Profile/>} />

        </Route>
      </Routes> 
    </section>
  )
}

export default App
