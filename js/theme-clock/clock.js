const themeBtn = document.querySelector('.theme-btn');
const hourNeedle = document.querySelector(".hour");
const minNeedle = document.querySelector(".minute");
const secondNeedle = document.querySelector(".second");
const timeEle = document.querySelector(".time");
const dateEle = document.querySelector(".date");

const months = ["jan", "feb", "march", "april", "may", "june", "july", "aug", "sep", "oct", "nov", "dec"];
const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
function setTime() {
    const time = new Date();

    let month = time.getMonth();
    let date = time.getDate();
    let day = time.getDay();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();

    let hourText = hour > 9 ? hour : "0" + hour;
    let minText = min > 9 ? min : "0" + min;
    timeEle.textContent = hourText + ":" + minText;

    dateEle.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${date}</span>`;

    secondNeedle.style.setProperty("--angle", sec*6+"deg");
    minNeedle.style.setProperty("--angle", min*6+"deg");
    hourNeedle.style.setProperty("--angle", (hour*30+min*0.5)+"deg");
}
setTime();
setInterval(setTime,1000);
themeBtn.addEventListener("click", e => {
    if (document.body.className === "dark") {
        themeBtn.textContent = "Dark mode"
        document.body.className = "";
    }
    else {
        themeBtn.textContent = "Light mode"
        document.body.className = "dark";
    }
});