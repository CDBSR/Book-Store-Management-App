import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Hello } from './components/Hello'
import { Navbar } from './components/Navbar'
// import { Navbar } from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    < Navbar/>
    </>
  )
}

export default App
