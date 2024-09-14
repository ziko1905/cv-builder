import { useState } from 'react'
import { Cv } from "./components/cv"
import './App.css'
import { CreationInput } from './components/inputPrompt';

function App() {
  const [cvPresent, setCvPresent] = useState(false);
  const [values, setValues] = useState(null)
  const [formOpen, setFormOpen] = useState(false)

  function handleCvToggle() {
    setCvPresent(!cvPresent)
  }

  function handleValues(newValues) {
    setValues(newValues)
    handleFormToggle()
  }

  function handleFormToggle() {
    setFormOpen(!formOpen)
  }

  function resetCv() {
    setValues(null)
    handleCvToggle()
  }
  
  return (
    <div className="main">
      <div className='operation-btns'>
        {!cvPresent && <button onClick={() => {
          handleCvToggle()
          handleFormToggle()
        }} className='submit' disabled={formOpen}>Add CV</button>}
        {cvPresent && <button disabled={formOpen} onClick={handleFormToggle} >Edit</button>}
        {cvPresent && <button disabled={formOpen} onClick={resetCv} className='delete'>Delete</button>}
      </div>
      <Cv values={values}/>
      {formOpen && <CreationInput callBack={handleValues} initVals={values}/>}
    </div>
  )
}

export default App
