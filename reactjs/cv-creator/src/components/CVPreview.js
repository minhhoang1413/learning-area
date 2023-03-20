import React from "react";

function CVPreview(props) {
    const { name, email, phone, educations, experiences } = props
    return (
        <section className="preview">
            <h1>{name}</h1>
            <p>{email}</p>
            <p>{phone}</p>
            <h3>Education</h3>
            <ul>
                {educations.map(e => (
                    <li>{e.date} {e.school}</li>
                ))}
            </ul>
            <h3>Experience</h3>
            <ul>
                {experiences.map(e => (
                    <li>{e.date} {e.company}</li>
                ))}
            </ul>
        </section>
    )
}

export default CVPreview