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
        }} className='post' disabled={formOpen}>Add CV</button>}
        {cvPresent && <button disabled={formOpen} onClick={handleCvToggle} className='post'>Edit</button>}
        {cvPresent && <button disabled={formOpen} onClick={resetCv} className='remove'>Delete</button>}
      </div>
      <Cv values={values}/>
      {formOpen && <CreationInput callBack={handleValues} values={values}/>}
    </div>
  )
}

export default App
