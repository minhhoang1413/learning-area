const imageContainer = document.querySelector("#image-container");
const loader = document.querySelector("#loader");

let photoArr = [];
const count = 10;
const apiKey = "z2ocMm_D-clmsOq11BLye8hgYzUjN46z9ophZ6Y3wPM";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

getPhotos();
async function getPhotos(){
    let res = await fetch(apiUrl);
    photoArr = await res.json();
    displayPhotos();
}
function displayPhotos(){
    photoArr.forEach(photo => {
        let atag = document.createElement("a");
        atag.setAttribute("href", photo.links.html);
        atag.setAttribute("target","_blank");
        let img = document.createElement("img");
        img.src = photo.urls.regular;
        img.alt = photo.description;
        atag.appendChild(img);
        imageContainer.appendChild(atag);
    });
}
window.addEventListener("scroll", () => {
    if(window.innerHeight + window.scrollY > document.body.scrollHeight - 500){
        getPhotos();
    }
});