import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar.jsx'
import SwapForm from './components/SwapForm'
// import { AuthProvider } from './contexts/AuthContext.js'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    {/* <AuthProvider> */}

      <Navbar/>
      <SwapForm/>
    {/* </AuthProvider> */}
    </>
  )
}

export default App
