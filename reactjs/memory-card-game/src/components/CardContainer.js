import React from "react";

function CardContainer(props) {
    const { imageArray, handleClick } = props

    return (
        <div className="card-container">
            {imageArray.map(imgObj => (
                <div className="card" key={imgObj.src} onClick={() => handleClick(imgObj.src)}>
                    <img src={imgObj.src} alt={imgObj.text} />
                    <p>{imgObj.text}</p>
                </div>
            ))}
        </div>
    )
}

export default CardContainer