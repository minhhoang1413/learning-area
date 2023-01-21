import './css/menu.css'
import BurgerIcon from './images/burger.svg'

function Menu() {
    const menuPage = document.createElement('section')
    menuPage.classList.add('menu-section')
    menuPage.innerHTML = `
        <h1>Menu</h1>
        <div class="menu-wrapper">
            <div class="item">
                <img src="${BurgerIcon}" />
                <p class=""><span>Hamburger</span><span>1$</span></p>
                <p class="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, cumque.</p>
            </div>
            <div class="item">
                <img src="${BurgerIcon}" />
                <p class=""><span>Cheeseburger</span><span>1.1$</span></p>
                <p class="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, cumque.</p>
            </div>
            <div class="item">
                <img src="${BurgerIcon}" />
                <p class=""><span>Hamburger</span><span>1$</span></p>
                <p class="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, cumque.</p>
            </div>
            <div class="item">
                <img src="${BurgerIcon}" />
                <p class=""><span>Cheeseburger</span><span>1.1$</span></p>
                <p class="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, cumque.</p>
            </div>
            <div class="item">
                <img src="${BurgerIcon}" />
                <p class=""><span>Hamburger</span><span>1$</span></p>
                <p class="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, cumque.</p>
            </div>
            <div class="item">
                <img src="${BurgerIcon}" />
                <p class=""><span>Cheeseburger</span><span>1.1$</span></p>
                <p class="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, cumque.</p>
            </div>
            <div class="item">
                <img src="${BurgerIcon}" />
                <p class=""><span>Hamburger</span><span>1$</span></p>
                <p class="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, cumque.</p>
            </div>
            <div class="item">
                <img src="${BurgerIcon}" />
                <p class=""><span>Cheeseburger</span><span>1.1$</span></p>
                <p class="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, cumque.</p>
            </div>
        </div>
    `
    return menuPage
}
export default Menu