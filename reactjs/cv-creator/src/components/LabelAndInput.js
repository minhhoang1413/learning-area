import React, { useId } from "react";

function LabelAndInput({ label, inputType, inputName, inputValue, handleChange }) {
    const id = useId()
    return (
        <div className="form-ele">
            <label htmlFor={id}>{label}</label>
            <input id={id} value={inputValue} onChange={handleChange} type={inputType} name={inputName} />
        </div>
    )
}

export default LabelAndInput