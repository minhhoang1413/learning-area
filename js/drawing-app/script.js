const canvas = document.querySelector("#canvas");
const decreaseBtn = document.querySelector(".decrease");
const increaseBtn = document.querySelector(".increase");
const eraserBtn = document.querySelector(".eraser");
const eraserAllBtn = document.querySelector(".eraser-all");
const downloadBtn = document.querySelector(".download");
const loadBtn = document.querySelector(".load");
const saveBtn = document.querySelector(".save");
const sizeEle = document.querySelector(".size");
const colorInput = document.querySelector(".color");
const bgcolorInput = document.querySelector(".bgcolor");
const cursor = document.querySelector(".cursor");
const ctx = canvas.getContext("2d");
//let size = 10;
sizeEle.textContent = 10;
colorInput.value = "#000000";
bgcolorInput.value = "#ffffff";
let drawArray = [];
//let color = colorInput.value;
const width = canvas.width = window.innerWidth - 100;
const height = canvas.height = window.innerHeight - 100;
let x;
let y;
let isPressed = false;
let isEraser = false;
canvas.addEventListener("mousedown", ev => {
    isPressed = true;
    x = ev.offsetX;
    y = ev.offsetY;
});
canvas.addEventListener("mouseup", ev => {
    isPressed = false;
    x = undefined;
    y = undefined;

    // cursor
    cursor.classList.remove("show");
    // 
});
canvas.addEventListener("mouseleave", ev => {
    isPressed = false;
    x = undefined;
    y = undefined;

    // cursor
    cursor.classList.remove("show");
    // 
});
canvas.addEventListener("mousemove", ev => {
    if (isPressed) {

        let x2 = ev.offsetX;
        let y2 = ev.offsetY;
        let size = sizeEle.textContent;
        let color = colorInput.value;
        //drawCircle(x2, y2,size);
        drawLine(x, y, x2, y2, size, color, isEraser);
        // drawArray.push({x,y,x,y,size:size});
        drawArray.push({ x, y, x2, y2, size, color, isEraser });
        x = x2;
        y = y2;
    }
    // cursor
    cursor.classList.add("show");
    cursor.style.left = ev.pageX + "px";
    cursor.style.top = ev.pageY + "px";
    // 
});
function drawCircle(x, y, size) {
    //console.log(x,y)
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    if (isEraser) ctx.fillStyle = bgcolorInput.value;
    else ctx.fillStyle = colorInput.value;
    ctx.fill();
}
function drawLine(x, y, x2, y2, size, color, isEraser) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    if (isEraser) ctx.strokeStyle = bgcolorInput.value;
    else ctx.strokeStyle = color;
    // ctx.lineWidth = 2 * sizeEle.textContent;
    ctx.lineWidth = 2 * size;
    ctx.lineCap = "round";
    ctx.stroke();

}
decreaseBtn.addEventListener("click", ev => {
    if (sizeEle.textContent == 10) return;
    else {
        let size = sizeEle.textContent - 10;
        sizeEle.textContent = size;

        // cursor
        cursor.style.width = size * 2 + "px";
        cursor.style.height = size * 2 + "px";
        // 
    }
});
increaseBtn.addEventListener("click", ev => {
    if (sizeEle.textContent == 50) return;
    else {
        let size = +sizeEle.textContent + 10;
        sizeEle.textContent = size;
        // cursor
        cursor.style.width = size * 2 + "px";
        cursor.style.height = size * 2 + "px";
        // 
    }
});
eraserAllBtn.addEventListener("click", ev => {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = bgcolorInput.value;
    ctx.fillRect(0, 0, width, height);
    drawArray = [];
    //localStorage.setItem("drawArray", drawArray);
});
colorInput.addEventListener("input", ev => {
    cursor.style.backgroundColor = colorInput.value;
});
bgcolorInput.addEventListener("input", ev => {
    ctx.fillStyle = bgcolorInput.value;
    ctx.fillRect(0, 0, width, height);
    redraw();
});
eraserBtn.addEventListener("click", ev => {
    eraserBtn.classList.toggle("active");
    isEraser = !isEraser;
    cursor.classList.toggle("erase");
    cursor.style.backgroundColor = isEraser ? "white" : colorInput.value;
});
downloadBtn.addEventListener("click", ev => {
    let dataURL = canvas.toDataURL();
    downloadBtn.href = dataURL;
    downloadBtn.download = "paint.png";
});
saveBtn.addEventListener("click", ev => {
    localStorage.setItem("drawArray", JSON.stringify(drawArray));
});
loadBtn.addEventListener("click", ev => {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    drawArray = JSON.parse(localStorage.getItem("drawArray"));
    redraw();
});
function redraw() {
    drawArray.forEach(arr => {
        drawLine(arr.x, arr.y, arr.x2, arr.y2, arr.size, arr.color, arr.isEraser);
    });
}