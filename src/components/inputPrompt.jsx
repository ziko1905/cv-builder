import { useState } from "react";
import "../styles/inputs.css"

export function CreationInput() {
    return (
        <div className="creation-input">
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
                <InputAndLabel label={"Date of birth: "} id="birthdate" name="userbirthdate"/>
                <InputAndLabel label={"Email: "} type="email" id="email" name="useremail"/>
                <InputAndLabel label={"Phone Number: "} type="number" id="phone" name="userphone"/>
            </form>
        </>
    )
}

function InputAndLabel({id, type='text', name, label, className}) {
    return (
        <>
            <div className={className}>
                {label && <label htmlFor={id}>{label}</label>}
                <input type={type} name={name} id={id}/>
            </div>
        </>
    )
}