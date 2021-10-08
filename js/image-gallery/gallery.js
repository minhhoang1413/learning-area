const modal = document.querySelector("#modal");
//const imgGallery = document.querySelectorAll(".img-gallery");
const leftBtn = document.querySelector(".arrow-left");
const rightBtn = document.querySelector(".arrow-right");
const slides = document.querySelectorAll(".slide");
const imgThumbnails = document.querySelectorAll(".thumbnail");
const thumbnailsContainer = document.querySelector(".thumbnails");
let index=0;

document.querySelector(".img-container").addEventListener("click", e => {
    if(e.target && e.target.nodeName === "IMG") {
        //index = e.target.getAttribute("data-index");
        modal.classList.add("active");      
        turn_slide(e.target.getAttribute("data-index"))  ;
    }
});
document.querySelector(".close").addEventListener("click", e => {
    modal.classList.remove("active");
});
function turn_slide(newIndex){
    console.log(index,newIndex)
    slides[index].classList.remove("active");
    imgThumbnails[index].classList.remove("active");
    
    index = +newIndex;
    
    slides[newIndex].classList.add("active");
    imgThumbnails[newIndex].classList.add("active");

    thumbnailsContainer.scrollLeft = imgThumbnails[index].offsetLeft -128-thumbnailsContainer.clientWidth/300*150;
}
leftBtn.addEventListener("click", e => {
    if(index === 0) turn_slide(slides.length - 1);
    else turn_slide(+index - 1);
});
rightBtn.addEventListener("click", e => {
    if(index === slides.length - 1) turn_slide(0);
    else turn_slide(+index + 1);
});
imgThumbnails.forEach( img => img.addEventListener("click", function(){
        turn_slide(this.getAttribute("data-index"));
        
}));