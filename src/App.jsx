import { useState } from 'react'
import { Cv } from "./components/cv"
import './App.css'
import info from "./assets/preset"

function App() {
  return (
    <>
      <Cv values={info}/>
    </>
  )
}

export default App
