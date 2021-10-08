const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const prevBtn = document.querySelector(".carousel__button--left");
const nextBtn = document.querySelector(".carousel__button--right");
const dotNav = document.querySelector(".carousel__nav");
const dots = Array.from(dotNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

function setSlidePosition(slide, index) {
    slide.style.left = index * slideWidth + "px";
}
slides.forEach(setSlidePosition);

function moveToSlide(currentSlide, targetSlide) {
    track.style.transform = `translateX(-${targetSlide.style.left})`;
    currentSlide.classList.remove("current-slide");
    targetSlide.classList.add("current-slide");   
}

nextBtn.addEventListener("click", e => {
    const currentSlide = track.querySelector(".current-slide");
    let nextSlide = currentSlide.nextElementSibling;

    const currentDot =  dotNav.querySelector(".current-slide");
    let nextDot = currentDot.nextElementSibling;

    if (!nextSlide) {
        nextSlide = slides[0];
        nextDot = dots[0];
    }
    moveToSlide(currentSlide,nextSlide);
    
    
    updateDot(currentDot,nextDot);
});
prevBtn.addEventListener("click", e => {
    const currentSlide = track.querySelector(".current-slide");
    let prevSlide = currentSlide.previousElementSibling;

    const currentDot =  dotNav.querySelector(".current-slide");
    let prevDot = currentDot.previousElementSibling;

    if (!prevSlide) {
        prevSlide = slides[slides.length -1];
        prevDot = dots[dots.length-1]
    }
    moveToSlide(currentSlide,prevSlide);  
    
   
    updateDot(currentDot,prevDot);
    
});

dotNav.addEventListener("click", e => {
    const targetDot = e.target.closest("button");
    if (! targetDot) return;
    const currentSlide =  track.querySelector(".current-slide");
    const currentDot =  dotNav.querySelector(".current-slide");
    const targetIndex = dots.findIndex( dot => dot === targetDot);
    const targetSlide = slides[targetIndex];
    moveToSlide(currentSlide,targetSlide);
    updateDot(currentDot,targetDot);
    
});
function updateDot(currentDot,targetDot) {
    currentDot.classList.remove("current-slide");
    targetDot.classList.add("current-slide");
}
