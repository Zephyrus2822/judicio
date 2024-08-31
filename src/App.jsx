import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './components/Login'
import Register from './components/Register'
import Hero from './components/Hero'


function App() {
  const [count, setCount] = useState(0)

  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Hero/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App
