const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('number');
const symbolsEl = document.getElementById('symbol');
const generateBtn = document.getElementById('generate-btn');
const clipboardEl = document.getElementById('clipboard');


const funcs = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}
generateBtn.addEventListener("click", e => {
    clipboardEl.classList.remove("copied");


    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

   resultEl.textContent = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
    //console.log(Object.keys(func)[0]);
});
function generatePassword(lower, upper, number, symbol, length) {

    let typeCount = lower + upper + number + symbol;
    if (typeCount == 0) return "";
    let typeArr = [{ lower }, { upper }, { number }, { symbol }].filter(type => Object.values(type)[0]);
    //console.log(typeArr);
    let generatedPw = [];
    for (let index = 0; index < typeCount; index++) {
        let func = funcs[Object.keys(typeArr[index])];
        //console.log(func());
        let randomIndex = getRandom(0, length - 1);
        if (!generatedPw[randomIndex]) {
            generatedPw[randomIndex] = func();
        }
    }
    for (let index = 0; index < length; index++) {
        let indexFunc = getRandom(0, typeCount - 1);
        let func = funcs[Object.keys(typeArr[indexFunc])];
        //console.log(func());   
        if (!generatedPw[index]) {
            generatedPw[index] = func();
        }

    }


   // console.log(generatedPw.join(""));
   return generatedPw.join("");
}
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)]
}
clipboardEl.addEventListener("click", e => {
    navigator.clipboard.writeText(resultEl.textContent).then(function() {
        /* clipboard successfully set */
        console.log("copied");
        clipboardEl.classList.add("copied");
      }, function() {
        /* clipboard write failed */
        console.log("fail");
      });
});