const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const container = document.getElementById("boardContainer");
const header = document.getElementById("headerTitle");

canvas.width = 3000;
canvas.height = 2000;

let tool = "pen";
let drawing = false;
let color = "#000";
let size = 4;

function setHeader() {
  header.innerText = "WHITEBOARD – " + tool.toUpperCase();
}

function togglePenMenu() {
  const m = document.getElementById("penMenu");
  m.style.display = m.style.display === "block" ? "none" : "block";
}

function selectPen(t) {
  tool = t;
  setHeader();
  document.getElementById("penMenu").style.display = "none";
}

function setTool(t) {
  tool = t;
  setHeader();
}

document.getElementById("colorPicker").oninput = e => color = e.target.value;
document.getElementById("sizePicker").oninput = e => size = e.target.value;

/* DRAW */
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
  } else {
    ctx.globalAlpha = 1;
    ctx.lineWidth = size;
  }

  ctx.strokeStyle = color;
  ctx.lineTo(p.x, p.y);
  ctx.stroke();
});

canvas.addEventListener("mouseup", () => drawing = false);

function getPos(e) {
  const r = canvas.getBoundingClientRect();
  return { x: e.clientX - r.left, y: e.clientY - r.top };
}

/* TEXT SYSTEM */
function createTextBox(e) {
  if (e.target !== canvas) return;

  const box = document.createElement("div");
  box.className = "text-box";
  box.contentEditable = true;

  const actions = document.createElement("div");
  actions.className = "text-actions";

  const ok = document.createElement("span");
  ok.innerHTML = "✅";

  const cancel = document.createElement("span");
  cancel.innerHTML = "❌";

  actions.appendChild(ok);
  actions.appendChild(cancel);
  box.appendChild(actions);

  box.style.left = e.offsetX + "px";
  box.style.top = e.offsetY + "px";

  ok.onclick = () => finalizeText(box);
  cancel.onclick = () => box.remove();

  container.appendChild(box);
  box.focus();
}

function finalizeText(box) {
  const text = box.innerText.replace("✅","").replace("❌","");
  const fixed = document.createElement("div");
  fixed.className = "fixed-text";
  fixed.innerText = text;
  fixed.style.left = box.style.left;
  fixed.style.top = box.style.top;

  fixed.onclick = () => {
    box.innerText = text;
    container.appendChild(box);
    fixed.remove();
  };

  container.appendChild(fixed);
  box.remove();
}

function clearBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
