import { useState } from "react";
import "../styles/inputs.css"

export function CreationInput() {
    return (
        <div className={["input-prompt", "creation-input"].join(" ")}>
            <GeneralForm />
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

function InputAndLabel({id, type='text', name, label, className="", chlClassName, divide=false}) {
    const LabelInput = () => <>
        {label && <label className={chlClassName} htmlFor={id}>{label}</label>}
        <input className={chlClassName} type={type} name={name} id={id}/>
    </>

    return !divide ? (
        <div className={className + " " + "input-div"}>
            <LabelInput />
        </div>
    ) : (
        <LabelInput />
    )
}