import { useState } from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/Login'} element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
