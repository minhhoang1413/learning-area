import './css/index.css'
import Header from "./Header";
import Home from "./home";
import Menu from "./menu";
import Contact from "./Contact";

const root = document.querySelector('#root')

const headerComponent = Header()
const homePage = Home()
const menuPage = Menu()
const contactPage = Contact()

root.appendChild(headerComponent)

let activePage = homePage
let activeLink = document.querySelector('#home-page')
root.appendChild(activePage)
activeLink.classList.add('active')

root.addEventListener('click', e => {
    if (!e.target.classList.contains('link')) {
        return
    }

    if (e.target.id === 'home-page') {
        changeActivePage(e.target, homePage)
    }
    else if (e.target.id === 'menu-page') {
        changeActivePage(e.target, menuPage)
    }
    else if (e.target.id === 'contact-page') {
        changeActivePage(e.target, contactPage)
    }
})
function changeActivePage(link, page) {
    if (page === activePage) {
        return
    }
    activeLink.classList.remove('active')
    activeLink = link
    activeLink.classList.add('active')
    root.replaceChild(page, activePage)
    activePage = page
}