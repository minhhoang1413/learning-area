const startForm = document.querySelector("#start-form");
const splashPage = document.querySelector("#splash-page");
const countdownPage = document.querySelector("#countdown-page");
const countdown = document.querySelector(".countdown");
const gamePage = document.querySelector("#game-page");
const timePlayedEle = document.querySelector(".time-played");
const wrongBtn = document.querySelector(".wrong");
const rightBtn = document.querySelector(".right");
const itemContainer = document.querySelector('.item-container');
const scorePage = document.querySelector("#score-page");
const resultPage = document.querySelector('#result-page');
let questionNumber;
let questionType;
let timePlayed = 0;
let timePlayedInterval;
let currentQuestion = 0;
let equationsArray = [];
let userAnswerArray = [];
let bestScoreArray ;
startForm.addEventListener("submit", e => {
    e.preventDefault();
    questionNumber = Number(startForm.querySelector("input[name='level']:checked").value);
    questionType = startForm.querySelector("input[name='qtype']:checked").value;
    //console.log(questionNumber);
    showCountdownPage();
});
function showCountdownPage() {
    splashPage.className = "card hide";
    countdownPage.className = "card";
    let count = 3;
    countdown.textContent = count;
    let countdownPageInterval = setInterval(() => {
        if (count > 0) {
            count -= 1;
            countdown.textContent = count;
        } else if (count === 0) {
            countdown.textContent = "GO";
            count = -2;
        } else {
            clearInterval(countdownPageInterval);
            showGamePage();
        }
    }, 1000);
}
function showGamePage() {

    countdownPage.className = "card hide";
    gamePage.className = "card";
    if (questionType === "plus" || questionType === "sub") {
        createAddSubQuestions();
    } else {
        createMulDivQuestions();
    }
    showQuestions();
    document.querySelector("#answer").textContent = currentQuestion + "/" + questionNumber;
    timePlayedInterval = setInterval(() => {
        timePlayed += 0.1;
        timePlayedEle.textContent = timePlayed.toFixed(1) + "s";
    }, 100);
}
wrongBtn.addEventListener("click", () => {
    nextQuestion(false);
});
rightBtn.addEventListener("click", () => {
    nextQuestion(true);
});
function nextQuestion(answer) {
    currentQuestion++;
    document.querySelector("#answer").textContent = currentQuestion + "/" + questionNumber;
    userAnswerArray.push(answer);
    if (currentQuestion == questionNumber) {
        showScorePage();
        clearInterval(timePlayedInterval);
    } else {
        itemContainer.scroll(0, 50 * currentQuestion);
    }
}
function showScorePage() {
    gamePage.className = "card hide";
    scorePage.className = "card";
    document.querySelector(".base-time").textContent = "Base Time: " + timePlayed.toFixed(1) + "s";
    let penTime = 0;
    for (let index = 0; index < questionNumber; index++) {
        if (userAnswerArray[index] !== equationsArray[index].check) {
            penTime += 5;
        }
    }
    let finalTime = (timePlayed + penTime).toFixed(1);
    updateSavedBestScores(finalTime);
    document.querySelector(".pen-time").textContent = "Penalty: +" + penTime + "s";
    document.querySelector(".final-time").textContent = finalTime + "s";
}
document.querySelector("#result-btn").addEventListener("click", showResultPage);
const resultDetail = document.querySelector(".result-detail");
function showResultPage(){
    scorePage.className = "card hide";
    resultPage.className = "card";
    resultDetail.replaceChildren();
    let rightAnswer = questionNumber;
    for (let index = 0; index < questionNumber; index++) {
        let item = document.createElement("p");
        item.textContent = equationsArray[index].question + "   " +userAnswerArray[index] ;
        if (userAnswerArray[index] !== equationsArray[index].check) {
            item.className = "wrong";
            rightAnswer -= 1;
        }
        resultDetail.appendChild(item);
    }
    document.querySelector("#result-page .title").textContent = rightAnswer+"/"+questionNumber;
}
function createMulDivQuestions() {
    for (let index = 0; index < questionNumber; index++) {
        let firstNum = getRandom(2, 9);
        let secondNum = getRandom(2, 9);
        let result;
        let check;
        if (getRandom(0, 1)) {
            result = firstNum * secondNum;
            check = true;
        } else {
            wrongResult = [];
            wrongResult[0] = firstNum * (secondNum + 1);
            wrongResult[1] = (firstNum + 1) * secondNum;
            wrongResult[2] = firstNum * (secondNum - 1);
            wrongResult[3] = (firstNum - 1) * secondNum;
            wrongResult[4] = (firstNum + 1) * (secondNum - 1);
            wrongResult[5] = (firstNum - 1) * (secondNum + 1);
            result = wrongResult[getRandom(0, 5)];
            check = false;
        }
        let question;
        if (questionType == "mul") {
            question = `${firstNum} x ${secondNum} = ${result}`;
        } else {
            question = `${result} / ${secondNum} = ${firstNum}`
        }
        
        equationsArray.push({ question, check });

    }
}
function createAddSubQuestions() {
    for (let index = 0; index < questionNumber; index++) {
        let firstNum = getRandom(2, 49);
        let secondNum = getRandom(2, 49);
        let result;
        let check;
        if (getRandom(0, 1)) {
            result = firstNum + secondNum;
            check = true;
        } else {
            wrongResult = [];
            
            wrongResult[0] = firstNum + (secondNum + 10);
            wrongResult[1] = (firstNum + 10) + secondNum;
            wrongResult[2] = firstNum + (secondNum - 10);
            wrongResult[3] = (firstNum - 10) + secondNum;
            wrongResult[4] = firstNum + (secondNum + getRandom(1,2));
            wrongResult[5] = (firstNum + getRandom(1,2)) + secondNum;
            wrongResult[6] = firstNum + (secondNum - getRandom(1,2));
            wrongResult[7] = (firstNum - getRandom(1,2)) + secondNum;
            result = wrongResult[getRandom(0, 7)];
            check = false;
        }
        let question;
        if (questionType == "plus") {
            question = `${firstNum} + ${secondNum} = ${result}`;
        } else {
            question = `${result} - ${secondNum} = ${firstNum}`
        }
        
        equationsArray.push({ question, check });

    }
}
function showQuestions() {
    itemContainer.replaceChildren();
    let itemActive = document.createElement("p");
    itemActive.className = "item active";
    itemContainer.appendChild(itemActive);
    for (let index = 0; index < equationsArray.length; index++) {
        const equationObj = equationsArray[index];
        let item = document.createElement("p");
        item.className = "item";
        item.textContent = equationsArray[index].question;
        itemContainer.appendChild(item);
    }
    let itemPadding = document.createElement("p");
    itemPadding.className = "item padding";
    itemContainer.appendChild(itemPadding);
    itemContainer.scroll(0, 0);
}
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
document.querySelector("#play-again").addEventListener("click", showSplashPage);
function showSplashPage(){
    scorePage.className = "card hide";
    splashPage.className = "card";
    questionNumber = 0;
    timePlayed = 0;
    currentQuestion = 0;
    equationsArray = [];
    userAnswerArray = [];
    
    getSavedBestScores();
    
}
showSplashPage();
function getSavedBestScores(){
    if (localStorage.getItem("bestScores")) {
        bestScoreArray = JSON.parse(localStorage.getItem("bestScores"));
    } else {
        bestScoreArray = [
            {question : 10, bestScore: 0.0},
            {question : 20, bestScore: 0.0},
            {question : 30, bestScore: 0.0},
            {question : 40, bestScore: 0.0}
        ];
        localStorage.setItem("bestScores",JSON.stringify(bestScoreArray));
    }
    showSavedBestScores();
}
function showSavedBestScores(){
    document.querySelectorAll(".best-score-value").forEach( (ele,index) => {
        ele.textContent = bestScoreArray[index].bestScore + "s";
    });
}
function updateSavedBestScores(score){
    bestScoreArray.forEach(element => {
        if (element.question === questionNumber && (element.bestScore == 0 || element.bestScore > Number(score))) {
            element.bestScore = Number(score);
            //console.log(bestScoreArray);
            localStorage.setItem("bestScores",JSON.stringify(bestScoreArray));
            showSavedBestScores();
        }
    });
}
document.querySelector("#result-page button").addEventListener("click", e => {
    resultPage.className = "card hide";
    showSplashPage();
});