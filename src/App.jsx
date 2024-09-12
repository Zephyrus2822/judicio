import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Prisoner from './components/Prisoner'
import Tablee from './components/Tablee'
import AddPrisoner from './components/AddPrisoner'
import UpdatePrisoner from './components/UpdatePrisoner'
import AboutBail from './components/AboutBail'





function App() {
  const [count, setCount] = useState(0)

  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/prisoner' element={<Prisoner/>}></Route>
      <Route path='/verdictspassed' element={<Tablee/>}></Route>
      <Route path='/addprisoner' element={<AddPrisoner/>}></Route>
      <Route path='updateprisoner' element={<UpdatePrisoner/>}></Route>
      <Route path='/aboutbail' element={<AboutBail/>}></Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App
