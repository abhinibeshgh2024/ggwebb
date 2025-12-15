const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

let tool = "pen";
let drawing = false;
let color = "#000";
let size = 3;

function resizeCanvas() {
  canvas.width = 3000;
  canvas.height = 2000;
}
resizeCanvas();

function setTool(t) {
  tool = t;
}

document.getElementById("colorPicker").oninput = e => color = e.target.value;
document.getElementById("sizePicker").oninput = e => size = e.target.value;

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("touchstart", startDraw);
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("touchend", stopDraw);

function getPos(e) {
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches ? e.touches[0] : e;
  return {
    x: touch.clientX - rect.left,
    y: touch.clientY - rect.top
  };
}

function startDraw(e) {
  if (tool === "text") return;
  drawing = true;
  const pos = getPos(e);
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
}

function draw(e) {
  if (!drawing) return;
  const pos = getPos(e);
  ctx.strokeStyle = tool === "eraser" ? "#fff" : color;
  ctx.lineWidth = size;
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
}

function stopDraw() {
  drawing = false;
}

canvas.addEventListener("click", e => {
  if (tool !== "text") return;
  const pos = getPos(e);
  const text = prompt("Enter text:");
  if (text) {
    ctx.fillStyle = color;
    ctx.font = "20px Arial";
    ctx.fillText(text, pos.x, pos.y);
  }
});

function clearBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function addImage(event) {
  const img = new Image();
  img.onload = () => ctx.drawImage(img, 50, 50, 300, 200);
  img.src = URL.createObjectURL(event.target.files[0]);
}
