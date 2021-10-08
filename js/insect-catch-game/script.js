const screens = document.querySelectorAll(".screen");
const timeEle = document.querySelector(".time-count");
const scoreEle = document.querySelector(".score-count");
let selectInsect;
let timeInterval;
let insectInterval;
const width = window.innerWidth;
const height = window.innerHeight;
function changeScreen(multi) {
    screens.forEach(screen => {
        screen.style.transform = `translateY(${-100 * multi}%)`;
    })
}
document.querySelector(".play-btn").addEventListener("click", () => {
    changeScreen(1);
});
document.querySelector(".play-again-btn").addEventListener("click", () => {
    changeScreen(1);
    document.querySelector(".play-again-btn").classList.remove("show");
});
document.querySelectorAll(".choose-insect-btn")
    .forEach(button => button.addEventListener("click", () => {
        changeScreen(2);
        let img = button.querySelector("img");
        selectInsect = img.src;
        // selectInsect = "1.jpg";
        
        setTimeout(() => {
            startGame();
        }, 2000);
}));
let timeup = false;
function startGame(){
    timeup = false;
    scoreEle.textContent = "0";
    setTimeCount(30);
    // insectInterval = setInterval(() => {
    //     setTimeout(() => {
    //         createInsect();
    //     }, Math.random()*500);
    // }, 500);
    createInsect();
    
    
}
function setTimeCount(sec){
    timeEle.textContent=sec;
    timeInterval = setInterval(() => {
        sec -= 1;
        timeEle.textContent = sec > 9 ? sec : "0"+sec;
        if (sec === 0) {
            clearInterval(timeInterval);
            //clearInterval(insectInterval);
            timeup = true;
            setEndGame();
        }
    }, 1000);
}
function createInsect(){
    let pos = getRandomPostion();
    let img = document.createElement("img");
    img.src = selectInsect;
    img.style.left = pos.x + "px";
    img.style.top = pos.y + "px";
    img.addEventListener("click", increaseScore);
    setTimeout(() => {
        img.remove();
    }, getRandom(1000 ,2000));
    screens[2].appendChild(img);
    if (! timeup) {
        setTimeout(() => {
            createInsect();
        }, getRandom(200,500));
    }
}
function increaseScore(e){
    if(timeup)return;
    e.target.className = "hit";
    scoreEle.textContent = Number(scoreEle.textContent) + 1 ;
    let hammer = document.createElement("span");
    hammer.className = "hammer";
    hammer.style.left =(50 + parseInt(this.style.left) )+ "px";
    hammer.style.top = (parseInt(this.style.top) - 50) +"px";
    screens[2].appendChild(hammer);
    setTimeout(() => {
        hammer.remove();
    }, 200);
}
function setEndGame(){
    document.querySelector(".play-again-btn").classList.add("show");
    
}
function getRandomPostion(){
    let x = getRandom(10, width-110);
    let y = getRandom(100, height-100);
   // console.log(x,y);
    return {x,y};
}
function getRandom(min,max){
    return (Math.random() * (max - min) + min);
}
// const cursor = document.querySelector("#cursor")
// document.querySelector(".game-container").addEventListener("mousemove", e => {
//     console.log(e.clientX,e.clientY);
//    cursor.style.left = e.clientX+  "px";
//    cursor.style.top = e.clientY + "px";
// });