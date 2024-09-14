import { useState } from 'react'
import { Cv } from "./components/cv"
import './App.css'
import { CreationInput } from './components/inputPrompt';

function App() {
  const [values, setValues] = useState(null)
  const [formOpen, setFormOpen] = useState(false)

  function handleValues(newValues) {
    setValues(newValues)
    handleFormToggle()
  }

  function handleFormToggle() {
    if (((values) => {
      !values})(values)) handleCvToggle()
    setFormOpen(!formOpen)
  }

  function resetCv() {
    setValues(null)
  }
  
  return (
    <div className="main">
      <div className='operation-btns'>
        {!values && <button onClick={() => {
          handleFormToggle()
        }} className='submit' disabled={formOpen}>Add CV</button>}
        {values && <button disabled={formOpen} onClick={handleFormToggle} >Edit</button>}
        {values && <button disabled={formOpen} onClick={resetCv} className='delete'>Delete</button>}
      </div>
      <Cv values={values}/>
      {formOpen && <CreationInput cancelCallback={handleFormToggle} submitCallback={handleValues} initVals={values}/>}
    </div>
  )
}

export default App
