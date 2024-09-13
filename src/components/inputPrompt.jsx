import { useState } from "react";
import "../styles/inputs.css"

export function CreationInput() {
    const [values, setValues] = useState({firstname: "", lastname: "", birthdate: "", email: "", phone: "", shoolname: "", title: "", studystart: "", studyend: "", work: {}})
    const processes = [GeneralForm, EductionForm, WorkForm]
    const [processId, setProcessId] = useState(0);
    const CurrFrom = processes[processId]

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

    function handleSubmit() {

    }

    return (
        <div className={["input-prompt", "creation-input"].join(" ")}>
            <CurrFrom onChange={handleValues} values={values}/>
            <div className="buttons-div">
                <button onClick={handlePrevProcess}>Prev</button>
                {processId < processes.length - 1 
                    ? <button onClick={handleNextProcess}>Next</button>
                    : <button className="submit" onClick={handleSubmit}>Submit</button>}
            </div>
        </div>
    )
}

function GeneralForm({onChange, values}) {

    return (
        <>
            <h2>General Information</h2>
            <form action="">
                <InputAndLabel onChange={onChange} value={values.firstname} label={"First Name: "} id="firstname" name="user-first-name"/>
                <InputAndLabel onChange={onChange} value={values.lastname} label={"Last Name: "} id="lastname" name="userlastname"/>
                <InputAndLabel onChange={onChange} value={values.birthdate} chlClassName={"grid-wide"} divide={true} label={"Date of birth: "} type="date" id="birthdate" name="userbirthdate"/>
                <InputAndLabel onChange={onChange} value={values.email} className={"grid-wide"} label={"Email: "} type="email" id="email" name="useremail"/>
                <InputAndLabel onChange={onChange} value={values.phone} className={"grid-wide"} label={"Phone Number: "} type="number" id="phone" name="userphone"/>
            </form>
        </>
    )
}

function EductionForm({onChange, values}) {
    const date = new Date()
    return (
        <>
        <h2>Education Information</h2>
        <form className="edu-form" action="">
            <InputAndLabel onChange={onChange} value={values.schoolname} label={"School name: "} id={"schoolname"} name={"userschoolname"}/>
            <InputAndLabel onChange={onChange} value={values.title} label={"Title: "} id={"title"} name={"usertitle"}/>
            <div className="study-years-div">
                <InputAndLabel onChange={onChange} value={values.studystart} min={"1900"} max={date.getFullYear()} type="number" label={"Studying started(year): "} id={"studystart"} name={"userstudystart"}/>
                <InputAndLabel onChange={onChange} value={values.studyend} min={"1900"} max={date.getFullYear()} type="number" label={"Ended(year): "} id={"studyend"} name={"userstudyend"}/>
            </div>
        </form>
        </>
    )
}

function WorkForm({work}) {
    return (
        <>
        <h2>Work Information</h2>
        <div className="work-header">
            <h3>Experience:</h3>
            <div className="add-button-div"><button className="add-button">Add Experience</button></div>
        </div>
        <div className="experience-div">
            <WorkUnit company={"Meta"} position={"Junior Software Engineer"} length={36} description={"Pleasant Experience"}/>
            <WorkUnit company={"Netflix"} position={"Junior Software Engineer"} length={36} description={"Pleasant Experience"}/>
            <WorkUnit company={"Google"} position={"Junior Software Engineer"} length={36} description={"Pleasant Experience"}/>
            <WorkUnit company={"Google"} position={"Junior Software Engineer"} length={36} description={"Pleasant Experience"}/>
            <WorkUnit company={"Google"} position={"Junior Software Engineer"} length={36} description={"Pleasant Experience"}/>
        </div>
        </>
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

function UnitCreation() {
    return (
        <div className="unit-div">
            UnitCreation
        </div>
    )
}

function WorkUnit({company, position, length, description}) {
    return (
        <div className="work-unit">
            <h4>{company}</h4>
            <h6>{position}, {length}</h6>
            {!!description && <p>{description}</p>}
        </div>
    )
}