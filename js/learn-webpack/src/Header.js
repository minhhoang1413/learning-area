import './css/header.css'
function Header() {
    const header = document.createElement('header')
    header.innerHTML = `
            <nav>
                <span class="logo">The Restaurant</span>
                <ul class="links">
                    <li class="link" id="home-page">Home</li>
                    <li class="link" id="menu-page">Menu</li>
                    <li class="link" id="contact-page">Contact</li>
                </ul>
            </nav>
    `
    return header
}
export default Header