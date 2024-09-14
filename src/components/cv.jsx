import "../styles/cv.css"
export function Cv({values}) {
    return (
        <div className="cv">
            <BasicInfo values={values}/>
            <hr />
            <EducationInfo values={values}/>
            <hr />
        </div>
    )
}

function BasicInfo({values}) {
    const birthDate = new Date(values.birthdate)
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November"]
    const mailTo = `mailto:${values.email}`
    const tel = `tel:${values.phone}`
    return(
        <div className="info basic">
            <h1>{values.firstname + " " + values.lastname}</h1>
            <span>{`${birthDate.getDate()}. ${month[birthDate.getMonth()]}, ${birthDate.getFullYear()}`}</span>
            <div>
                <p>Email: <a href={mailTo}>{values.email}</a></p>
                <p>Phone: <a href="">{values.phone}</a></p>
            </div>
        </div>
    )
}

function EducationInfo({values}) {
    return (
        <div className="info education">
            <h3>Education: </h3>
            <div>
                <p>School name: {values.schoolname}</p>
                <p>Title achieved: {values.title}</p>
            </div>
            <p>Study period: {values.studystart} - {values.studyend}</p>
        </div>
    )
}