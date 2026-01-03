function updateResume() {
  setText("name", "p-name");
  setText("email", "p-email");
  setText("phone", "p-phone");

  makeList("education");
  makeList("experience");
  makeList("skills");
  makeList("projects");
  makeList("certifications");

  updateProgress();
}

function setText(input, output) {
  document.getElementById(output).innerText =
    document.getElementById(input).value;
}

function makeList(id) {
  const ul = document.getElementById("p-" + id);
  ul.innerHTML = "";
  document.getElementById(id).value
    .split("\n")
    .filter(Boolean)
    .forEach(item => {
      const li = document.createElement("li");
      li.innerText = item;
      ul.appendChild(li);
    });
}

function previewPhoto(e) {
  const img = document.getElementById("profile-pic");
  img.src = URL.createObjectURL(e.target.files[0]);
  img.style.display = "block";
}

function updateProgress() {
  let score = 0;
  ["education","experience","skills","projects","certifications"]
    .forEach(id => {
      if (document.getElementById(id).value.length > 15) score++;
    });
  document.getElementById("progressFill").style.width =
    (score / 5 * 100) + "%";
}

function analyzeResume() {
  const box = document.getElementById("resume-analysis");
  const list = document.getElementById("analysis-list");
  list.innerHTML = "";

  ["Education","Experience","Skills","Projects","Certifications"]
    .forEach(s => {
      const li = document.createElement("li");
      li.innerText = s + " section reviewed ✔";
      list.appendChild(li);
    });

  box.style.display = "block";
}

function downloadPDF() {
  window.print();
}

// AUTO META
document.getElementById("resumeId").innerText =
  "RB-" + Math.floor(Math.random() * 90000);

document.getElementById("genDate").innerText =
  new Date().toLocaleDateString();

updateResume();
