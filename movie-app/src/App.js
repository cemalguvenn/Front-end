import React from 'react'
import Container from './layout/Container/Container'
import Navbar from './layout/Navbar/Navbar'
import './App.css'

const App = () => {
  return (
    <div className='app'>
      <Navbar/>
      <Container/>
    </div>
  )
}

export default App