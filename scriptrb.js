/* ===============================
   ADVANCED RESUME BUILDER + ANALYZER
   =============================== */

const REQUIRED_SECTIONS = [
  'education',
  'experience',
  'skills',
  'projects',
  'certifications',
  'languages',
  'achievements'
];

const STRONG_ACTION_WORDS = [
  'developed','designed','implemented','optimized','led','managed',
  'analyzed','engineered','deployed','automated','built','created'
];

const TECH_KEYWORDS = [
  'javascript','python','java','c++','html','css','react','node',
  'machine learning','ai','sql','mongodb','firebase','docker',
  'kubernetes','linux','cloud','aws','git','api'
];

/* ===============================
   LIVE RESUME UPDATE
   =============================== */

function updateResume() {
  document.getElementById('p-name').textContent =
    document.getElementById('name').value || '[Your Name]';

  document.getElementById('p-email').textContent =
    document.getElementById('email').value || '[Your Email]';

  document.getElementById('p-phone').textContent =
    document.getElementById('phone').value || '[Your Phone]';

  document.getElementById('p-name-signature').textContent =
    document.getElementById('name').value || '[Your Name]';

  updateList('education', 'p-education');
  updateList('experience', 'p-experience');
  updateList('skills', 'p-skills');
  updateList('projects', 'p-projects');
  updateList('certifications', 'p-certifications');
  updateList('languages', 'p-languages');
  updateList('achievements', 'p-achievements');
  updateList('publications', 'p-publications');
}

function updateList(inputId, listId) {
  const input = document.getElementById(inputId).value.trim();
  const list = document.getElementById(listId);
  list.innerHTML = '';

  if (!input) return;

  input.split('\n').forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    li.classList.add('animated-list');
    list.appendChild(li);
  });
}

/* ===============================
   PROFILE PHOTO
   =============================== */

function previewPhoto(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    const img = document.getElementById('profile-pic');
    img.src = e.target.result;
    img.style.display = 'block';
  };
  reader.readAsDataURL(file);
}

/* ===============================
   ADVANCED RESUME ANALYZER
   =============================== */

function analyzeResume() {
  const analysisList = document.getElementById('analysis-list');
  analysisList.innerHTML = '';

  let score = 0;
  let maxScore = 100;

  // Section completeness
  REQUIRED_SECTIONS.forEach(section => {
    const value = document.getElementById(section).value.trim();
    if (value.length > 20) {
      score += 10;
      addAnalysis(`${capitalize(section)} section is well filled ✔️`);
    } else {
      addAnalysis(`${capitalize(section)} section is weak or empty ⚠️`);
    }
  });

  // Skills keyword match
  const skillsText = document.getElementById('skills').value.toLowerCase();
  let keywordCount = 0;

  TECH_KEYWORDS.forEach(keyword => {
    if (skillsText.includes(keyword)) keywordCount++;
  });

  if (keywordCount >= 6) {
    score += 15;
    addAnalysis('Strong technical keyword presence (ATS-friendly) ✔️');
  } else {
    addAnalysis('Low technical keyword density ❌ (ATS risk)');
  }

  // Experience strength
  const expText = document.getElementById('experience').value.toLowerCase();
  let actionHits = 0;

  STRONG_ACTION_WORDS.forEach(word => {
    if (expText.includes(word)) actionHits++;
  });

  if (actionHits >= 3) {
    score += 15;
    addAnalysis('Experience section uses strong action verbs ✔️');
  } else {
    addAnalysis('Experience lacks impactful action verbs ⚠️');
  }

  // Resume length health
  const totalTextLength =
    document.getElementById('education').value.length +
    document.getElementById('experience').value.length +
    document.getElementById('skills').value.length;

  if (totalTextLength > 500) {
    score += 10;
    addAnalysis('Resume content length is optimal ✔️');
  } else {
    addAnalysis('Resume content is too short ❌');
  }

  // Final score
  const finalScore = Math.min(score, maxScore);
  addAnalysis(`Overall Resume Score: ${finalScore} / 100 ⭐`);

  document.getElementById('resume-analysis').style.display = 'block';
}

function addAnalysis(text) {
  const li = document.createElement('li');
  li.textContent = text;
  li.classList.add('animated-list');
  document.getElementById('analysis-list').appendChild(li);
}

/* ===============================
   COVER LETTER (SMART)
   =============================== */

function generateCoverLetter() {
  const name = document.getElementById('name').value || 'Candidate';
  const skills = document.getElementById('skills').value.split('\n')[0] || 'relevant skills';

  const letter = `
Dear Hiring Manager,

I am ${name}, a highly motivated professional with strong expertise in ${skills}.
My background reflects hands-on experience, problem-solving ability, and a results-driven mindset.

I am confident that my skills and dedication will add value to your organization.

Sincerely,
${name}
`;

  document.getElementById('generated-letter').textContent = letter.trim();
  document.getElementById('cover-letter').style.display = 'block';
}

/* ===============================
   PDF PRINT
   =============================== */

function printResume() {
  window.print();
}

/* ===============================
   DARK MODE
   =============================== */

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

/* ===============================
   INIT
   =============================== */

window.onload = updateResume;

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
