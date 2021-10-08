
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b30d97371158d36a46f9be56c114795e&page=';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=b30d97371158d36a46f9be56c114795e&query="';
const API_KEY = "b30d97371158d36a46f9be56c114795e"
let moviesRoot = document.querySelector(".movies");
let search = document.querySelector("input[type=search]");
let pageDom = document.querySelector(".page");
let page = 1;
const select = document.querySelector("select");
getMovies(API_URL + page);
async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results);
}
function showMovies(movies) {
    moviesRoot.replaceChildren();
    movies.forEach(movie => {
        const { title, poster_path, vote_average, overview, release_date, original_language } = movie;
        const movieEle = document.createElement("div");
        movieEle.className = "movie";
        movieEle.innerHTML = `
            <img class="movie-image" src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="movie-overview">
                <h3>Overview</h3>
                <p>${overview}</p>
                <h3>Release Date</h3>
                <p>${release_date}</p>
                <h3>Language</h3>
                <p>${original_language}</p>
            </div>
            `;
        moviesRoot.appendChild(movieEle);
    });
}
function getClassByRate(rate) {
    if (rate >= 8) {
        return "green";
    } else if (rate >= 5) {
        return "yellow";
    } else return "red";
}
document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();
    let searchTerm = search.value;
    if (searchTerm && searchTerm.trim()) {
        getMovies(SEARCH_API + searchTerm);
    }
});
function getUrl(){
    let url = `https://api.themoviedb.org/3/movie/${select.value}?api_key=${API_KEY}&language=en-US&page=${page}`;

    getMovies(url);
    pageDom.textContent = page;
}
document.querySelector(".next-btn").addEventListener("click", e => {
    page += 1;
    getUrl()
    /*let url = `https://api.themoviedb.org/3/movie/${select.value}?api_key=${API_KEY}&language=en-US&page=${page}`;

    getMovies(url);
    pageDom.textContent = page;*/
});
document.querySelector(".pre-btn").addEventListener("click", e => {
    if (page > 1) {
        page -= 1;
        getUrl()
       /* let url = `https://api.themoviedb.org/3/movie/${select.value}?api_key=${API_KEY}&language=en-US&page=${page}`;

        getMovies(url);
        pageDom.textContent = page;*/
    }

});
document.querySelector("#movie_type").addEventListener("change", e => {
    page = 1;
    getUrl();
    /*pageDom.textContent = 1;
    let url = `https://api.themoviedb.org/3/movie/${e.target.value}?api_key=${API_KEY}&language=en-US&page=${page}`;
    //console.log(url);
    getMovies(url);*/
});