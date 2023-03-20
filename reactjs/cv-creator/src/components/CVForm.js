import React from "react";
import LabelAndInput from "./LabelAndInput";

function CVForm(props) {
    const { name, email, phone, handleChangePersonalInfo, educations, editEducation, addNewEducation, removeEducation, experiences, addNewExperience, editExperience, removeExperience } = props

    function handleEditEducation(educationId) {
        return function (e) {
            editEducation(educationId, e.target.name, e.target.value)
        }
    }
    function handleEditExperience(expId) {
        return function (e) {
            editExperience(expId, e.target.name, e.target.value)
        }
    }
    return (
        <section>
            <form className="form">
                <fieldset className="personal-form">
                    <legend>Personal Info</legend>
                    <LabelAndInput label="name" inputType="text" inputName="name" inputValue={name} handleChange={handleChangePersonalInfo} />
                    <LabelAndInput label="email" inputType="email" inputName="email" inputValue={email} handleChange={handleChangePersonalInfo} />
                    <LabelAndInput label="phone" inputType="number" inputName="phone" inputValue={phone} handleChange={handleChangePersonalInfo} />
                </fieldset>
                <fieldset className="education-form">
                    <legend>Education</legend>
                    {educations.map(education => (
                        <div className="item" key={education.id}>
                            <LabelAndInput label="school" inputType="text" inputName="school" inputValue={education.school} handleChange={handleEditEducation(education.id)} />
                            <LabelAndInput label="date" inputType="text" inputName="date" inputValue={education.date} handleChange={handleEditEducation(education.id)} />
                            <button type="button" onClick={() => removeEducation(education.id)}>remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={addNewEducation}>add</button>
                </fieldset>
                <fieldset className="experience-form">
                    <legend>Experience</legend>
                    {experiences.map(exp => (
                        <div className="item" key={exp.id}>
                            <LabelAndInput label="company" inputType="text" inputName="company" inputValue={exp.company} handleChange={handleEditExperience(exp.id)} />
                            <LabelAndInput label="date" inputType="text" inputName="date" inputValue={exp.date} handleChange={handleEditExperience(exp.id)} />
                            <button type="button" onClick={() => removeExperience(exp.id)}>remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={addNewExperience}>add</button>
                </fieldset>
            </form>
        </section>
    )
}
export default CVForm