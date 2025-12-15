const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const container = document.getElementById("boardContainer");

canvas.width = 3000;
canvas.height = 2000;

let tool = "pen";
let drawing = false;
let color = "#000";
let size = 4;
let dark = false;

function togglePenMenu() {
  const menu = document.getElementById("penMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function selectPen(type) {
  tool = type;
  document.getElementById("penMenu").style.display = "none";
}

function setTool(t) {
  tool = t;
}

document.getElementById("colorPicker").oninput = e => color = e.target.value;
document.getElementById("sizePicker").oninput = e => size = e.target.value;

canvas.addEventListener("mousedown", e => {
  if (tool === "text") return createTextBox(e);
  drawing = true;
  ctx.beginPath();
  const p = getPos(e);
  ctx.moveTo(p.x, p.y);
});

canvas.addEventListener("mousemove", e => {
  if (!drawing) return;
  const p = getPos(e);

  if (tool === "marker") {
    ctx.globalAlpha = 1;
    ctx.lineWidth = size * 2;
  } else if (tool === "highlighter") {
    ctx.globalAlpha = 0.25;
    ctx.lineWidth = size * 4;
  } else if (tool === "eraser") {
    ctx.strokeStyle = dark ? "#000" : "#fff";
    ctx.lineWidth = size * 3;
  } else {
    ctx.globalAlpha = 1;
    ctx.lineWidth = size;
    ctx.strokeStyle = color;
  }

  ctx.lineTo(p.x, p.y);
  ctx.stroke();
});

canvas.addEventListener("mouseup", () => drawing = false);

function getPos(e) {
  const r = canvas.getBoundingClientRect();
  return { x: e.clientX - r.left, y: e.clientY - r.top };
}

function createTextBox(e) {
  if (e.target !== canvas) return;

  const box = document.createElement("div");
  box.className = "text-box";
  box.contentEditable = true;

  const cancel = document.createElement("span");
  cancel.className = "cancel";
  cancel.innerHTML = "❌";
  cancel.onclick = () => box.remove();

  box.appendChild(cancel);
  box.appendChild(document.createTextNode("Type here"));

  box.style.left = e.offsetX + "px";
  box.style.top = e.offsetY + "px";

  makeDraggable(box);
  container.appendChild(box);
  box.focus();
}

function addImage(e) {
  const img = document.createElement("img");
  img.src = URL.createObjectURL(e.target.files[0]);
  img.className = "img-box";
  img.style.width = "250px";
  img.style.left = "100px";
  img.style.top = "100px";
  makeDraggable(img);
  container.appendChild(img);
}

function makeDraggable(el) {
  let ox, oy;
  el.onmousedown = ev => {
    ox = ev.offsetX;
    oy = ev.offsetY;
    document.onmousemove = mv => {
      el.style.left = mv.pageX - ox + "px";
      el.style.top = mv.pageY - oy + "px";
    };
    document.onmouseup = () => document.onmousemove = null;
  };
}

function toggleMode() {
  dark = !dark;
  document.body.className = dark ? "dark" : "light";
}

function clearBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
