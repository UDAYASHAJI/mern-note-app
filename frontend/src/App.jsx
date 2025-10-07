import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Navbar from './component/Navbar'
import Login from './view/Authentication/Login'
import SignUp from './view/Authentication/SignUp'
import Home from './view/Home'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/navbar' element={<Navbar/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/home' element={<Home/>}/>




      </Routes>
      
    </div>
  )
}

export default App
