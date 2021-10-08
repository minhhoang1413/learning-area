let swiperRoot = document.querySelector(".carousel");
let swiperWrapper = swiperRoot.querySelector(`.carousel__track`);
const slides = Array.from(swiperWrapper.children);
let nextBtn = swiperRoot.querySelector(".carousel__button--right");
let preBtn = swiperRoot.querySelector(".carousel__button--left");
let circleControl = swiperRoot.querySelector(".carousel__nav");
let num_item = slides.length;

let gap, item_width, num_item_per_page, numcircle, position;
init();
window.addEventListener('resize', init);
function init() {
    gap = slides[1].getBoundingClientRect().left - slides[0].getBoundingClientRect().right;
    item_width = slides[0].getBoundingClientRect().width;

    num_item_per_page = Math.round((swiperWrapper.getBoundingClientRect().width + gap) / (item_width + gap));
    numcircle = Math.ceil(num_item / num_item_per_page);

    position = Math.round(swiperWrapper.scrollLeft / (item_width + gap));
    create_circle_control();
    scroll();

}
function scroll() {
   // console.log("scroll")
    swiperWrapper.scrollTo({
        top: 0,
        left: position * (item_width + gap),
        behavior: 'smooth'
    });
    check_circle_active();
}
nextBtn.addEventListener("click", function () {
    if (position >= num_item - num_item_per_page){
        position = 0;
    } else position++;
    scroll();
    //check_circle_active();
});
preBtn.addEventListener("click", function () {
    if (position <= 0) {
        position = num_item - num_item_per_page;
    }else position--;
    scroll();
    //check_circle_active();
});
let isDown = false;
let startX;
let scrollLeft;
swiperWrapper.addEventListener("mousedown", function (ev) {
    isDown = true;
    startX = ev.pageX - swiperWrapper.offsetLeft;
    scrollLeft = swiperWrapper.scrollLeft;
});
function handle_mouse_up(ev) {
    if (isDown) {
        let x = ev.pageX - swiperWrapper.offsetLeft;
        let pos = swiperWrapper.scrollLeft / (item_width + gap);
        if (x < startX) {
            if (pos % 1 < 0.25) {
                position = Math.floor(pos);
            } else {
                position = Math.ceil(pos);
            }
        } else {
            if (pos % 1 > 0.75) {
                position = Math.ceil(pos);
            } else {
                position = Math.floor(pos);
            }
        }

        scroll();
        //check_circle_active();
        isDown = false;
    }
}
swiperWrapper.addEventListener("mouseleave", handle_mouse_up);
swiperWrapper.addEventListener("mouseup", handle_mouse_up);
swiperWrapper.addEventListener("mousemove", function (ev) {
    if (!isDown) return;
    ev.preventDefault();
    let x = ev.pageX - swiperWrapper.offsetLeft;
    let walk = x - startX;
    swiperWrapper.scrollLeft = scrollLeft - walk;
    //check_circle_active();
});


/*let num_item = teamCenter.scrollWidth / (item1.getBoundingClientRect().width + gap) ;*/
function create_circle_control() {
    circleControl.replaceChildren();
    for (let index = 0; index < numcircle; index++) {
        const circle = document.createElement("button");
        circle.className = "carousel__indicator";
        circle.setAttribute("data-index", index);
        circleControl.appendChild(circle);
    }
}

function check_circle_active() {
    let circleActive = Math.floor(position / num_item_per_page);
    if (position + num_item_per_page === num_item) {
        circleActive = numcircle - 1;
    }
    for (let i = 0; i < circleControl.children.length; i++) {
        if (circleControl.children[i].className.indexOf("current-slide") != -1) {
            circleControl.children[i].className = "carousel__indicator";
        }

    }
    circleControl.children[circleActive].className = "carousel__indicator current-slide";
    //console.log(circleActive)
    //circleControl.querySelector(`span:nth-child(${circleActive + 1})`).classList.add("active");
}

circleControl.addEventListener("click", function (ev) {
    if (ev.target && ev.target.nodeName == "BUTTON") {
        let pos = ev.target.getAttribute("data-index") * num_item_per_page;
        if (pos + num_item_per_page > num_item - 1) {
            position = num_item - num_item_per_page;
        } else {
            position = pos;
        }
        scroll();
        //check_circle_active();
    }
});