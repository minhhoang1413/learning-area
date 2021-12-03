import { useState } from "react"

const Tour = ({ id, image, info, name, price, removeTour }) => {
    const [isReadMore, setIsReadMore] = useState(false)
    return (
        <article className="tour">
            <img src={image} />
            <div className="tour-info">
                <div className="tour-info-header">
                    <h4>{name}</h4>
                    <h4 className="tour-price">${price}</h4>
                </div>
                <p>
                    {isReadMore ? info : info.substring(0,200).concat('...')}
                    <button className="" onClick={()=>setIsReadMore(!isReadMore)}>{isReadMore? 'show less' : 'read more'}</button>
                </p>
                <button className="remove-btn" onClick={()=>removeTour(id)}>Not interest</button>
            </div>
          
        </article>
    )
}
export default Tour