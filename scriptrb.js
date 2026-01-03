const headingColor = document.getElementById("headingColor");
const textColor = document.getElementById("textColor");
const themeSelect = document.getElementById("themeSelect");

headingColor.oninput = () =>
  document.documentElement.style.setProperty("--headingColor", headingColor.value);

textColor.oninput = () =>
  document.getElementById("resume").style.color = textColor.value;

themeSelect.onchange = () => {
  const val = themeSelect.value;
  if(val==="corporate") document.body.style.background = "linear-gradient(135deg,#5d3fd3,#1e3a8a)";
  else if(val==="academic") document.body.style.background = "linear-gradient(135deg,#2a5298,#1e3a8a)";
  else if(val==="creative") document.body.style.background = "linear-gradient(135deg,#ff512f,#dd2476)";
  else document.body.style.background = "linear-gradient(135deg,#4b0082,#0f172a)";
};

function previewPhoto(e){
  const img = document.getElementById("profile-pic");
  img.src = URL.createObjectURL(e.target.files[0]);
  img.style.display = "block";
}

function addToList(listId, html){
  const ul = document.getElementById(listId);
  const li = document.createElement("li");
  li.innerHTML = html;
  ul.appendChild(li);
}

function addEducation() {
  const institute=document.getElementById("eduInstitute").value;
  const course=document.getElementById("eduCourse").value;
  const city=document.getElementById("eduCity").value;
  const batch=document.getElementById("eduBatch").value;
  if(!institute && !course && !city && !batch) return;
  addToList("p-education", `<b>${institute}</b>, ${course} – ${city} (${batch})`);
  ["eduInstitute","eduCourse","eduCity","eduBatch"].forEach(i=>document.getElementById(i).value="");
}

function addExperience() {
  const company=document.getElementById("expCompany").value;
  const role=document.getElementById("expRole").value;
  const duration=document.getElementById("expDuration").value;
  const desc=document.getElementById("expDesc").value;
  if(!company && !role && !duration && !desc) return;
  addToList("p-experience", `<b>${company}</b> – ${role} (${duration})<br>${desc}`);
  ["expCompany","expRole","expDuration","expDesc"].forEach(i=>document.getElementById(i).value="");
}

function addSkill() {
  const skill=document.getElementById("skillInput").value;
  if(!skill) return;
  addToList("p-skills", skill);
  document.getElementById("skillInput").value="";
}

function addProject() {
  const title=document.getElementById("projTitle").value;
  const desc=document.getElementById("projDesc").value;
  if(!title && !desc) return;
  addToList("p-projects", `<b>${title}</b>: ${desc}`);
  ["projTitle","projDesc"].forEach(i=>document.getElementById(i).value="");
}

function addPublication() {
  const title=document.getElementById("pubTitle").value;
  const journal=document.getElementById("pubJournal").value;
  const volume=document.getElementById("pubVolume").value;
  if(!title && !journal && !volume) return;
  addToList("p-publications", `<b>${title}</b>, ${journal}, ${volume}`);
  ["pubTitle","pubJournal","pubVolume"].forEach(i=>document.getElementById(i).value="");
}

function addCertification() {
  const name=document.getElementById("certName").value;
  const org=document.getElementById("certOrg").value;
  const year=document.getElementById("certYear").value;
  if(!name && !org && !year) return;
  addToList("p-certifications", `<b>${name}</b>, ${org}, ${year}`);
  ["certName","certOrg","certYear"].forEach(i=>document.getElementById(i).value="");
}

["name","email","phone"].forEach(id=>{
  document.getElementById(id).oninput=()=>{
    document.getElementById("p-"+id).innerText = document.getElementById(id).value;
  }
});

function generateCoverLetter(){
  const name=document.getElementById("name").value||"Your Name";
  const role=document.getElementById("coverRole").value||"Position";
  const company=document.getElementById("coverCompany").value||"Company";
  const letter=`Dear Hiring Manager,

My name is ${name}, and I am excited to apply for the ${role} role at ${company}. I have relevant experience and skills that align with your organization's needs.

I would welcome the opportunity to discuss how I can contribute. Please contact me at ${document.getElementById("email").value} or ${document.getElementById("phone").value}.

Sincerely,
${name}`;

  document.getElementById("generated-letter").textContent=letter;
  document.getElementById("cover-letter-preview").style.display="block";
}

function downloadPDF(){
  window.print();
}
