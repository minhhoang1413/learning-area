const API_KEY = "0421d4e73ee94415bb81c9944bfe4ad1";

const URL = "https://icanhazdadjoke.com";
getJoke();
document.querySelector("#joke-btn").addEventListener("click", e => {
    getJoke();
});
document.querySelector("#joke-speaker").addEventListener("click", e => {
    tellJoke();
});
async function getJoke() {
    let response = await fetch(URL, { headers: { Accept: "application/json" } });
    let data = await response.json();
    console.log(data);
    document.querySelector("#joke-text").textContent = data.joke;
    //tellJoke(data.joke);
}
function tellJoke() {
    
    let text = document.querySelector("#joke-text").textContent;
   // const jokeString = text.trim().replace(/ /g, '%20');
    VoiceRSS.speech({
        key: API_KEY,
        src: text,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}
