const form = document.querySelector("form");
const titleEle = document.querySelector("#title");
const dateEle = document.querySelector("#date-picker");
const inputContainer = document.querySelector(".input-container");
const countdownRoot = document.querySelector(".countdown");
const completeRoot = document.querySelector(".complete");
const listCountdown = document.querySelectorAll("#countdown-list span");
let countdownTitle ;
let countdownDate ;
let countdownActive;
let second = 1000;
let minute = second * 60;
let hour = minute *60;
let day = hour * 24;
//let countdownValue;
dateEle.setAttribute("min", new Date().toISOString().slice(0,16));
form.addEventListener("submit",updateCountdown);
function updateCountdown (e) {
    e.preventDefault();
    countdownTitle  = titleEle.value;
    countdownDate  = new Date(dateEle.value);
    saveCountdown = {title : countdownTitle , date : dateEle.value};
    localStorage.setItem("countdown", JSON.stringify(saveCountdown));
    //console.log(date);
    updateDOMCountdown();
}
function updateDOMCountdown(){
    inputContainer.hidden = true;
    countdownRoot.hidden = false;
    document.querySelector("#countdown-title").textContent = countdownTitle;
    document.querySelector("#complete-info").textContent = `${countdownTitle} finished on ${countdownDate}`;
    countdownActive = setInterval(function(){
        let elapsed = countdownDate.getTime() - new Date().getTime();
        let days =  Math.floor(elapsed / day);
        let hours = Math.floor((elapsed - days * day) / hour);
        let mins = Math.floor((elapsed - hours * hour) / minute);
        let secs = Math.floor(elapsed/second % 60);
        if(elapsed < 0) {
            countdownRoot.hidden = true;
            completeRoot.hidden = false;
            clearInterval(countdownActive);          
        } else {
            listCountdown[0].textContent = days;
            listCountdown[1].textContent = hours;
            listCountdown[2].textContent = mins;
            listCountdown[3].textContent = secs;
        }
    },1000);
}
document.querySelector("#countdown-button-reset").addEventListener("click",reset);
document.querySelector("#complete-button").addEventListener("click", reset);
function reset(){
    countdownRoot.hidden = true;
    completeRoot.hidden = true;
    inputContainer.hidden = false;
    clearInterval(countdownActive);
    countdownTitle ="";
    countdownDate = "";
    localStorage.removeItem("countdown");
}
function restorePreviousCountdown(){
    if(localStorage.getItem("countdown")){
        let previous =JSON.parse(localStorage.getItem("countdown"));
         countdownTitle = previous.title;
         countdownDate = new Date(previous.date);
        updateDOMCountdown();
    }
}
restorePreviousCountdown();