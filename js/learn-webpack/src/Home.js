import './css/home.css'

function Home() {
    const homePage = document.createElement('section')
    homePage.classList.add('home-section')
    homePage.innerHTML = `
        <div class="header-wrapper">
            <h1>Come on down for some delicious cuisine!</h1>
            <p>Tasty and affordable!</p>
            <button>Order Now</button>
        </div>
    `
    return homePage
}
export default Home