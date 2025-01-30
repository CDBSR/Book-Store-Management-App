import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Hello } from './components/Hello'
import { Navbar } from './components/Navbar'
import {Home} from './pages/Home'
import { Login } from './pages/Login'
import { Route, Routes } from 'react-router-dom'
// import { Navbar } from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* < Navbar/> */}
    {/* <Login /> */}
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/books' element={<Home />}></Route>
    </Routes>
    </>
  )
}

export default App
