// COLOR PALETTE
const headingColor = document.getElementById("headingColor");
const textColor = document.getElementById("textColor");
const bgColor = document.getElementById("bgColor");

headingColor.oninput = () => document.documentElement.style.setProperty("--headingColor", headingColor.value);
textColor.oninput = () => document.getElementById("resume").style.color = textColor.value;
bgColor.oninput = () => document.getElementById("resume").style.backgroundColor = bgColor.value;

// PROFILE PHOTO
function previewPhoto(e){
  const img = document.getElementById("profile-pic");
  img.src = URL.createObjectURL(e.target.files[0]);
  img.style.display = "block";
}

// UPDATE BASIC DETAILS
["name","email","phone"].forEach(id=>{
  document.getElementById(id).oninput=()=>{
    document.getElementById("p-"+id).innerText=document.getElementById(id).value;
  }
});

// UTILITY: ADD ROW DATA AND EDIT/REMOVE
function addRow(sectionId, rowClass, previewId, formatFunc){
  const section = document.getElementById(sectionId);
  const rows = section.getElementsByClassName(rowClass);
  Array.from(rows).forEach(row=>{
    const data = Array.from(row.querySelectorAll("input,textarea")).map(i=>i.value).filter(Boolean);
    if(data.length){
      const li = document.createElement("li");
      li.innerHTML = formatFunc(data);
      // EDIT BUTTON
      const editBtn = document.createElement("button");
      editBtn.textContent="Edit";
      editBtn.style.marginLeft="10px";
      editBtn.onclick=()=>{
        row.querySelectorAll("input,textarea").forEach((i,idx)=>i.value=data[idx]);
        li.remove();
      };
      // REMOVE BUTTON
      const remBtn=document.createElement("button");
      remBtn.textContent="Remove";
      remBtn.style.marginLeft="5px";
      remBtn.onclick=()=>li.remove();
      li.appendChild(editBtn);
      li.appendChild(remBtn);
      document.getElementById(previewId).appendChild(li);
    }
  });
}

// EDUCATION
function addEducationRow(){
  addRow("edu-section","edu-row","p-education", d=>`<b>${d[0]}</b>, ${d[1]} – ${d[2]} (${d[3]})`);
  // ADD NEW INPUT ROW
  const div=document.createElement("div"); div.className="edu-row";
  div.innerHTML=`<input placeholder="Institute" class="eduInstitute"><input placeholder="Course / Degree" class="eduCourse"><input placeholder="City" class="eduCity"><input placeholder="Batch (e.g. 2021–2025)" class="eduBatch">`;
  document.getElementById("edu-section").appendChild(div);
}

// EXPERIENCE
function addExperienceRow(){
  addRow("exp-section","exp-row","p-experience", d=>`<b>${d[0]}</b> – ${d[1]} (${d[2]})<br>${d[3]}`);
  const div=document.createElement("div"); div.className="exp-row";
  div.innerHTML=`<input placeholder="Company Name" class="expCompany"><input placeholder="Role / Position" class="expRole"><input placeholder="Duration" class="expDuration"><textarea placeholder="Work Description" class="expDesc"></textarea>`;
  document.getElementById("exp-section").appendChild(div);
}

// SKILLS
function addSkillRow(){
  addRow("skill-section","skill-row","p-skills", d=>d[0]);
  const div=document.createElement("div"); div.className="skill-row";
  div.innerHTML=`<input placeholder="Skill (e.g. Java, AI, SQL)" class="skillInput">`;
  document.getElementById("skill-section").appendChild(div);
}

// PROJECTS
function addProjectRow(){
  addRow("proj-section","proj-row","p-projects", d=>`<b>${d[0]}</b>: ${d[1]}`);
  const div=document.createElement("div"); div.className="proj-row";
  div.innerHTML=`<input placeholder="Project Title" class="projTitle"><textarea placeholder="Project Description" class="projDesc"></textarea>`;
  document.getElementById("proj-section").appendChild(div);
}

// PUBLICATIONS
function addPublicationRow(){
  addRow("pub-section","pub-row","p-publications", d=>`<b>${d[0]}</b>, ${d[1]}, ${d[2]}`);
  const div=document.createElement("div"); div.className="pub-row";
  div.innerHTML=`<input placeholder="Paper Title" class="pubTitle"><input placeholder="Journal Name" class="pubJournal"><input placeholder="Volume / Issue / Year" class="pubVolume">`;
  document.getElementById("pub-section").appendChild(div);
}

// CERTIFICATIONS
function addCertificationRow(){
  addRow("cert-section","cert-row","p-certifications", d=>`<b>${d[0]}</b>, ${d[1]}, ${d[2]}`);
  const div=document.createElement("div"); div.className="cert-row";
  div.innerHTML=`<input placeholder="Certificate Name" class="certName"><input placeholder="Organization" class="certOrg"><input placeholder="Year" class="certYear">`;
  document.getElementById("cert-section").appendChild(div);
}

// COVER LETTER
function generateCoverLetter(){
  const name=document.getElementById("name").value||"Your Name";
  const role=document.getElementById("coverRole").value||"Position";
  const company=document.getElementById("coverCompany").value||"Company";
  const email=document.getElementById("email").value;
  const phone=document.getElementById("phone").value;
  const letter=`Dear Hiring Manager,

My name is ${name}, and I am excited to apply for the ${role} role at ${company}. I have relevant experience and skills that align with your organization's needs.

Please contact me at ${email} or ${phone}.

Sincerely,
${name}`;
  document.getElementById("generated-letter").textContent=letter;
  document.getElementById("cover-letter-preview").style.display="block";
}

// DOWNLOAD PDF
function downloadPDF(){ window.print(); }


