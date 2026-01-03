const headingColor = document.getElementById("headingColor");
const textColor = document.getElementById("textColor");

headingColor.oninput = () =>
  document.documentElement.style.setProperty("--headingColor", headingColor.value);

textColor.oninput = () =>
  document.getElementById("resume").style.color = textColor.value;

function previewPhoto(e) {
  const img = document.getElementById("profile-pic");
  img.src = URL.createObjectURL(e.target.files[0]);
  img.style.display = "block";
}

function addEducation() {
  const ul = document.getElementById("p-education");
  ul.innerHTML += `<li><b>${eduInstitute.value}</b>, ${eduCourse.value} – ${eduCity.value} (${eduBatch.value})</li>`;
}

function addExperience() {
  p("p-experience", `<li><b>${expCompany.value}</b> – ${expRole.value} (${expDuration.value})<br>${expDesc.value}</li>`);
}

function addSkill() {
  p("p-skills", `<li>${skillInput.value}</li>`);
}

function addProject() {
  p("p-projects", `<li><b>${projTitle.value}</b>: ${projDesc.value}</li>`);
}

function addPublication() {
  p("p-publications", `<li><b>${pubTitle.value}</b>, ${pubJournal.value}, ${pubVolume.value}</li>`);
}

function p(id, html) {
  document.getElementById(id).innerHTML += html;
}

function downloadPDF() {
  window.print();
}

["name","email","phone"].forEach(id=>{
  document.getElementById(id).oninput=()=>{
    document.getElementById("p-"+id).innerText =
      document.getElementById(id).value;
  }
});
