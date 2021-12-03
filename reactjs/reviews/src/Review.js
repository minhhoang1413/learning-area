import { useState } from 'react'
import data from './data'
import { FaQuoteRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
const Review = () => {
    const [index, setIndex] = useState(0)
    const { name, job, image, text } = data[index]
    return (
        <article className='review'>
            <div className="img-container">
                <img src={image} alt={name} className="person-img" />
                <span className="quote-icon">
                    <FaQuoteRight />
                </span>
            </div>
            <h4 className="author">{name}</h4>
            <p className="job">{job}</p>
            <p className="info">{text}</p>
            <div className="button-container">
                <button className="prev-btn" onClick={() => setIndex((data.length + (index - 1))% data.length)}>
                    <FaChevronLeft />
                </button>
                <button className="next-btn" onClick={() => setIndex((index + 1) % data.length)}>
                    <FaChevronRight />
                </button>
            </div>
            <button className="random-btn" onClick={()=>setIndex(Math.floor(Math.random()*data.length))}>Random</button>
        </article>
    )
}
export default Review