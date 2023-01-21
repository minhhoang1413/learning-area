import './css/contact.css'
import clockIcon from './images/clock.svg'
import phoneIcon from './images/telephone.svg'
import mapIcon from './images/map.svg'
import geoIcon from './images/geo-alt.svg'

function Contact() {

    const contactPage = document.createElement('section')
    contactPage.classList.add('contact-section')
    contactPage.innerHTML = `
    <h1>Contact Us</h1>
    <div class="contact-wrapper">
        <div>
            <p> 
                <img src="${geoIcon}" /> 
                123 Lorem ipsum dolor sit amet.
            </p>
            <p> 
                <img src="${clockIcon}" /> 
                Lorem ipsum dolor sit amet
            </p>
            <p> 
                <img src="${phoneIcon}" /> 
                Lorem ipsum dolor sit amet
            </p>
        </div>
        <img src="${mapIcon}" />
    </div>
    `


    return contactPage
}
export default Contact