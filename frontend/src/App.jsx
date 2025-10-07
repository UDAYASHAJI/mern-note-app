import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Navbar from './component/Navbar'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/navbar' element={<Navbar/>}/>
      </Routes>
      
    </div>
  )
}

export default App
