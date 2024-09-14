import { useState } from "react";
import "../styles/inputs.css"
import { getYearFromMonths } from "../general";

export function CreationInput() {
    const [values, setValues] = useState({firstname: "", lastname: "", birthdate: "", email: "", phone: "", shoolname: "", title: "", studystart: "", studyend: "", work: {}})
    const processes = [GeneralForm, EductionForm, WorkForm]
    const callBacks = [{onChange: handleValues}, {onChange: handleValues}, {submitCallback: handleWorkSubmit}]
    const [processId, setProcessId] = useState(0);
    const CurrFrom = processes[processId]
    const currCallback = callBacks[processId]

    function handleValues(e) {
        let chgVal = e.target.id
        const newValues = {...values}
        newValues[chgVal] = e.target.value
        setValues(newValues)
    }

    function handlePrevProcess() {
        if (processId > 0) setProcessId(processId - 1)
    }

    function handleNextProcess() {
        if (processId < processes.length - 1) setProcessId(processId + 1)
    }

    function handleWorkSubmit(e, work) {
        e.preventDefault()
        console.log("Submitting...")
        const newValues = {...values}
        newValues.work = work
        console.log(newValues)
        setValues(newValues)
    }

    function handleSubmit() {

    }

    return (
        <div className={["input-prompt", "creation-input"].join(" ")}>
            <div className="progress-bar">
                {processes.map((value, index) => {
                    if (index == processId) return <div key={index} className="act"></div>
                    else return  <div key={index} className="dis"></div>
                })}
            </div>
            <CurrFrom callBacks={currCallback} values={values}/>
            <div className="buttons-div">
                <button onClick={handlePrevProcess}>Prev</button>
                {processId < processes.length - 1 
                    ? <button onClick={handleNextProcess}>Next</button>
                    : <button className="submit" onClick={handleSubmit}>Submit</button>}
            </div>
        </div>
    )
}

function GeneralForm({callBacks, values}) {

    return (
        <>
            <h2>General Information</h2>
            <form action="">
                <InputAndLabel {...callBacks} value={values.firstname} label={"First Name: "} id="firstname" name="user-first-name"/>
                <InputAndLabel {...callBacks} value={values.lastname} label={"Last Name: "} id="lastname" name="userlastname"/>
                <InputAndLabel {...callBacks} value={values.birthdate} chlClassName={"grid-wide"} divide={true} label={"Date of birth: "} type="date" id="birthdate" name="userbirthdate"/>
                <InputAndLabel {...callBacks} value={values.email} className={"grid-wide"} label={"Email: "} type="email" id="email" name="useremail"/>
                <InputAndLabel {...callBacks} value={values.phone} className={"grid-wide"} label={"Phone Number: "} type="number" id="phone" name="userphone"/>
            </form>
        </>
    )
}

function EductionForm({callBacks, values}) {
    const date = new Date()
    return (
        <>
        <h2>Education Information</h2>
        <form className="edu-form" action="">
            <InputAndLabel {...callBacks} value={values.schoolname} label={"School name: "} id={"schoolname"} name={"userschoolname"}/>
            <InputAndLabel {...callBacks} value={values.title} label={"Title: "} id={"title"} name={"usertitle"}/>
            <div className="study-years-div">
                <InputAndLabel {...callBacks} value={values.studystart} min={"1900"} max={date.getFullYear()} type="number" label={"Studying started(year): "} id={"studystart"} name={"userstudystart"}/>
                <InputAndLabel {...callBacks} value={values.studyend} min={"1900"} max={date.getFullYear()} type="number" label={"Ended(year): "} id={"studyend"} name={"userstudyend"}/>
            </div>
        </form>
        </>
    )
}

function WorkForm({callBacks, values}) {
    const [unitCreationDisplay, setUnitCreation] = useState(false)
    const [workId, setWorkId] = useState()
    const [nextId, setNextId] = useState(0)
    const experiences = values.work;

    function handleAdding() {
        setUnitCreation(true)
        setNextId((nextId) => nextId+1)
        setWorkId(nextId)
    }

    function handleCancel() {
        setUnitCreation(false)
    }

    function handleSubmit(e, callBack, id) {
        e.preventDefault()
        const formData = Object.fromEntries(new FormData(e.target))
        formData["work-time"] = getYearFromMonths(formData["work-time"]) 
        experiences[id] = formData;
        callBack(e, experiences)
        handleCancel()
    }

    return (
        <>
            {unitCreationDisplay && <UnitCreation work={values.work} workId={workId} submitCallback={(e) => handleSubmit(e, callBacks.submitCallback, workId)} cancelCallback={handleCancel}/>}
            <h2>Work Information</h2>
            <div className="work-header">
                <h3>Experience:</h3>
                <div onClick={handleAdding} className="add-button-div"><button className="add-button">Add Experience</button></div>
            </div>
            <div className="experience-div">
                {Object.values(values.work).map((value, key) => <WorkUnit editCallback={(e) => handleSubmit(e, callBack.submitCallback)} key={key} {...value}/>)}
            </div>
        </>
    )
}

function UnitCreation({cancelCallback, submitCallback, workId, work}) {
    console.log()
    return (
        <form onSubmit={submitCallback} className="unit-div">
            <h3 className="grid-wide">Add work experience</h3>
            <InputAndLabel value={work[workId] ? work[workId].company : undefined} divide={true} label={"Company name: "} name={`company`} id={`company`}/>
            <InputAndLabel value={work[workId] ? work[workId].position : undefined} divide={true} label={"Position in company: "} name={`position`} id={`position`}/>
            <InputAndLabel value={work[workId] ? work[workId].workTime : undefined} divide={true} label={"Employment time(in months): "} name={`workTime`} id={`work-time`}/>
            <label htmlFor={`workDesc`}>Job description: </label>
            <textarea value={work[workId] ? work[workId].workTime : undefined} name={`workDesc`} id={`work-desc`}></textarea>
            <div className="buttons-div">
                <button onClick={cancelCallback} className="cancel">Cancel</button>
                <button type="submit" className="submit">Submit</button>
            </div>
        </form>
    )
}

function WorkUnit({company, position, workTime, workDesc}) {
    return (
        <div className="work-unit">
            <h4>{company}</h4>
            <h6>{position}, {workTime}</h6>
            {!!workDesc && <p>{workDesc}</p>}
            <div className="buttons-div">
                <button className="cancel">Edit</button>
                <button className="delete">Delete</button>
            </div>
        </div>
    )
}

function InputAndLabel({id, type='text', name, label, className="", onChange, chlClassName, divide=false, min, max, value}) {
    return !divide ? (
        <div className={className + " " + "input-div"}>
            <LabelInput id={id} type={type} name={name} label={label} onChange={onChange} chlClassName={chlClassName} min={min} max={max} value={value}/>
        </div>
    ) : (
        <LabelInput id={id} type={type} name={name} label={label} onChange={onChange} chlClassName={chlClassName} min={min} max={max} value={value}/>
    )
}

function LabelInput({id, type, name, label, onChange, chlClassName, min, max, value}) {
    return (
        <>
            {label && <label className={chlClassName} htmlFor={id}>{label}</label>}
            <input onChange={onChange} value={value} className={chlClassName} type={type} name={name} id={id} min={min} max={max}/>
        </>
    )
}
