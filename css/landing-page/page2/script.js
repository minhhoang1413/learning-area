const menuBtn = document.querySelector('#menu-btn');
const nav = document.querySelector('nav');

menuBtn.addEventListener('click', e=> {
    menuBtn.classList.toggle('turn');
    nav.classList.toggle('show');
})