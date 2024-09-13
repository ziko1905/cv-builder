import { useState } from "react";
import "../styles/inputs.css"

export function CreationInput() {
    const processes = ["general", "education"]
    const [processId, setProcessId] = useState(0);
    const process = processes[processId]

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
            {process === "general" && <GeneralForm />}
            {process === "education" && <EductionForm />}
            <div className="buttons-div">
                <button onClick={handlePrevProcess}>Prev</button>
                {processId < processes.length - 1 
                    ? <button onClick={handleNextProcess}>Next</button>
                    : <button className="submit" onClick={handleSubmit}>Submit</button>}
            </div>
        </div>
    )
}

function GeneralForm() {
    return (
        <>
            <h2>General Information</h2>
            <form action="">
                <InputAndLabel label={"First Name: "} id="firstname" name="user-first-name"/>
                <InputAndLabel label={"Last Name: "} id="lastname" name="userlastname"/>
                <InputAndLabel chlClassName={"grid-wide"} divide={true} label={"Date of birth: "} type="date" id="birthdate" name="userbirthdate"/>
                <InputAndLabel className={"grid-wide"} label={"Email: "} type="email" id="email" name="useremail"/>
                <InputAndLabel className={"grid-wide"} label={"Phone Number: "} type="number" id="phone" name="userphone"/>
            </form>
        </>
    )
}

function EductionForm() {
    const date = new Date()
    return (
        <>
        <h2>Education Information</h2>
        <form className="edu-form" action="">
            <InputAndLabel label={"School name: "} id={"schoolname"} name={"userschoolname"}/>
            <InputAndLabel label={"Title: "} id={"title"} name={"usertitle"}/>
            <div className="study-years-div">
                <InputAndLabel min={"1900"} max={date.getFullYear()} type="number" label={"Studying started(year): "} id={"studystart"} name={"userstudystart"}/>
                <InputAndLabel min={"1900"} max={date.getFullYear()} type="number" label={"Ended(year): "} id={"studyend"} name={"userstudyend"}/>
            </div>
        </form>
        </>
    )
}

function InputAndLabel({id, type='text', name, label, className="", chlClassName, divide=false, min, max}) {
    const LabelInput = () => <>
        {label && <label className={chlClassName} htmlFor={id}>{label}</label>}
        <input className={chlClassName} type={type} name={name} id={id} min={min} max={max}/>
    </>

    return !divide ? (
        <div className={className + " " + "input-div"}>
            <LabelInput />
        </div>
    ) : (
        <LabelInput />
    )
}