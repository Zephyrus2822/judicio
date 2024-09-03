import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Prisoner from './components/Prisoner'


function App() {
  const [count, setCount] = useState(0)

  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/prisoner' element={<Prisoner/>}></Route>
      {/* <Route path='/database' element={<db-one/>}></Route> */}
    </Routes>
   </BrowserRouter>
  )
}

export default App
