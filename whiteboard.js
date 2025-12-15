const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const container = document.getElementById("boardContainer");

canvas.width = 3000;
canvas.height = 2000;

let tool = "pen";
let drawing = false;
let color = "#000";
let size = 3;
let mode = "light";

function setTool(t) {
  tool = t;
}

function toggleMode() {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}

document.getElementById("colorPicker").oninput = e => color = e.target.value;
document.getElementById("sizePicker").oninput = e => size = e.target.value;

// DRAWING
canvas.addEventListener("mousedown", start);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => drawing = false);

canvas.addEventListener("touchstart", start);
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("touchend", () => drawing = false);

function getPos(e) {
  const rect = canvas.getBoundingClientRect();
  const p = e.touches ? e.touches[0] : e;
  return {
    x: p.clientX - rect.left,
    y: p.clientY - rect.top
  };
}

function start(e) {
  if (tool === "text") return createTextBox(e);
  drawing = true;
  ctx.beginPath();
  const pos = getPos(e);
  ctx.moveTo(pos.x, pos.y);
}

function draw(e) {
  if (!drawing) return;
  const pos = getPos(e);

  if (tool === "highlighter") {
    ctx.globalAlpha = 0.3;
    ctx.lineWidth = size * 3;
  } else {
    ctx.globalAlpha = 1;
    ctx.lineWidth = size;
  }

  ctx.strokeStyle = tool === "eraser" ? "#fff" : color;
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
}

// TEXT BOX
function createTextBox(e) {
  const pos = getPos(e);
  const box = document.createElement("div");
  box.className = "text-box";
  box.contentEditable = true;
  box.style.left = pos.x + "px";
  box.style.top = pos.y + "px";
  box.innerText = "Type here...";
  makeDraggable(box);
  container.appendChild(box);
}

// IMAGE
function addImage(e) {
  const img = document.createElement("img");
  img.src = URL.createObjectURL(e.target.files[0]);
  img.className = "img-box";
  img.style.left = "100px";
  img.style.top = "100px";
  img.style.width = "300px";
  makeDraggable(img);
  container.appendChild(img);
}

// DRAG LOGIC
function makeDraggable(el) {
  let offsetX, offsetY;
  el.onmousedown = e => {
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    document.onmousemove = ev => {
      el.style.left = ev.pageX - offsetX + "px";
      el.style.top = ev.pageY - offsetY + "px";
    };
    document.onmouseup = () => document.onmousemove = null;
  };
}

function clearBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
