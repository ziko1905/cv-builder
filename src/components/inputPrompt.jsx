import { useState } from "react";
import "../styles/inputs.css"
import { getYearFromMonths } from "../general";

export function CreationInput() {
    const [values, setValues] = useState({firstname: "", lastname: "", birthdate: "", email: "", phone: "", schoolname: "", title: "", studystart: "", studyend: "", work: {}})
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
        const newValues = {...values}
        newValues.work = work
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
    console.log(values)
    return (
        <>
            <h2>General Information</h2>
            <form action="">
                <InputAndLabel {...callBacks} defaultValue={values.firstname} label={"First Name: "} id="firstname" name="user-first-name"/>
                <InputAndLabel {...callBacks} defaultValue={values.lastname} label={"Last Name: "} id="lastname" name="userlastname"/>
                <InputAndLabel {...callBacks} defaultValue={values.birthdate} chlClassName={"grid-wide"} divide={true} label={"Date of birth: "} type="date" id="birthdate" name="userbirthdate"/>
                <InputAndLabel {...callBacks} defaultValue={values.email} className={"grid-wide"} label={"Email: "} type="email" id="email" name="useremail"/>
                <InputAndLabel {...callBacks} defaultValue={values.phone} className={"grid-wide"} label={"Phone Number: "} type="tel" id="phone" name="userphone"/>
            </form>
        </>
    )
}

function EductionForm({callBacks, values}) {
    console.log(values)
    const date = new Date()
    return (
        <>
        <h2>Education Information</h2>
        <form className="edu-form" action="">
            <InputAndLabel {...callBacks} defaultValue={values.schoolname} label={"School name: "} id={"schoolname"} name={"userschoolname"}/>
            <InputAndLabel {...callBacks} defaultValue={values.title} label={"Title: "} id={"title"} name={"usertitle"}/>
            <div className="study-years-div">
                <InputAndLabel {...callBacks} defaultValue={values.studystart} min={"1900"} max={date.getFullYear()} type="number" label={"Studying started(year): "} id={"studystart"} name={"userstudystart"}/>
                <InputAndLabel {...callBacks} defaultValue={values.studyend} min={"1900"} max={date.getFullYear()} type="number" label={"Ended(year): "} id={"studyend"} name={"userstudyend"}/>
            </div>
        </form>
        </>
    )
}

function WorkForm({callBacks, values}) {
    console.log(values)
    const [unitCreationDisplay, setUnitCreation] = useState(false)
    const [workId, setWorkId] = useState()
    const [nextId, setNextId] = useState(0)
    const experiences = values.work;
    let workElements = [];
    for (const key in values.work) {
        workElements.push(<WorkUnit deleteCallback={(e) => handleDelete(e, key)} editCallback={() => handleWorkId(key)} key={key} {...values.work[key]}/>)
    }

    function handleAdding() {
        setUnitCreation(true)
        setNextId((nextId) => nextId+1)
        setWorkId(nextId)
    }

    function handleWorkId(id) {
        setUnitCreation(true)
        setWorkId(id)
    }

    function handleCancel() {
        setUnitCreation(false)
    }

    function handleSubmit(e, callBack, id) {
        e.preventDefault()
        const formData = Object.fromEntries(new FormData(e.target))
        formData["workTimeString"] = getYearFromMonths(formData["workTime"]) 
        experiences[id] = formData;
        callBack(e, experiences)
        handleCancel()
    }

    function handleDelete(e, id) {
        delete experiences[id]
        callBacks.submitCallback(e, experiences)
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
                {/* Needs changing bcs of new feator of editing and deleting work, index cant be passed as key */}
                {workElements}
            </div>
        </>
    )
}

function UnitCreation({cancelCallback, submitCallback, workId, work}) {
    return (
        <form onSubmit={submitCallback} className="unit-div">
            <h3 className="grid-wide">Add work experience</h3>
            <InputAndLabel defaultValue={work[workId] ? work[workId].company : undefined} divide={true} label={"Company name: "} name={`company`} id={`company`}/>
            <InputAndLabel defaultValue={work[workId] ? work[workId].position : undefined} divide={true} label={"Position in company: "} name={`position`} id={`position`}/>
            <InputAndLabel defaultValue={work[workId] ? work[workId].workTime : undefined} divide={true} label={"Employment time(in months): "} name={`workTime`} id={`work-time`}/>
            <label htmlFor={`workDesc`}>Job description: </label>
            <textarea defaultValue={work[workId] ? work[workId].workDesc : undefined} name={`workDesc`} id={`work-desc`}></textarea>
            <div className="buttons-div">
                <button onClick={cancelCallback} className="cancel">Cancel</button>
                <button type="submit" className="submit">Submit</button>
            </div>
        </form>
    )
}

function WorkUnit({company, position, workTimeString, workDesc, editCallback, deleteCallback}) {
    return (
        <div className="work-unit">
            <h4>{company}</h4>
            <h6>{position}, {workTimeString}</h6>
            {!!workDesc && <p>{workDesc}</p>}
            <div className="buttons-div">
                <button onClick={editCallback} className="cancel">Edit</button>
                <button onClick={deleteCallback} className="delete">Delete</button>
            </div>
        </div>
    )
}

function InputAndLabel({id, type='text', name, label, className="", onChange, chlClassName, divide=false, min, max, defaultValue}) {
    return !divide ? (
        <div className={className + " " + "input-div"}>
            <LabelInput id={id} type={type} name={name} label={label} onChange={onChange} chlClassName={chlClassName} min={min} max={max} defaultValue={defaultValue}/>
        </div>
    ) : (
        <LabelInput id={id} type={type} name={name} label={label} onChange={onChange} chlClassName={chlClassName} min={min} max={max} defaultValue={defaultValue}/>
    )
}

function LabelInput({id, type, name, label, onChange, chlClassName, min, max, defaultValue}) {
    return (
        <>
            {label && <label className={chlClassName} htmlFor={id}>{label}</label>}
            <input onChange={onChange} defaultValue={defaultValue} className={chlClassName} type={type} name={name} id={id} min={min} max={max}/>
        </>
    )
}
