function updateResume() {
  const fields = ['name', 'email', 'phone', 'education', 'experience', 'skills', 'projects', 'certifications', 'languages', 'achievements', 'publications'];

  document.getElementById('p-name').textContent = document.getElementById('name').value || '[Your Name]';
  document.getElementById('p-email').textContent = document.getElementById('email').value || '[Your Email]';
  document.getElementById('p-phone').textContent = document.getElementById('phone').value || '[Your Phone]';
  document.getElementById('p-name-signature').textContent = document.getElementById('name').value || '[Your Name]';

  fields.slice(3).forEach(id => updateList(id, `p-${id}`));
}

function updateList(inputId, listId) {
  const input = document.getElementById(inputId);
  const list = document.getElementById(listId);
  const items = input.value.trim().split('\n').filter(Boolean);
  list.innerHTML = '';
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    li.classList.add('animated-list');
    list.appendChild(li);
  });
}

function previewPhoto(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      const img = document.getElementById('profile-pic');
      img.src = e.target.result;
      img.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
}

function generateCoverLetter() {
  const name = document.getElementById('name').value || '[Your Name]';
  const email = document.getElementById('email').value || '[Your Email]';
  const phone = document.getElementById('phone').value || '[Your Phone]';
  const letter = `Dear Hiring Manager,\n\nMy name is ${name}, and I am writing to express my interest in the opportunity available at your organization. I bring a strong background and relevant skills that align with your goals.\n\nPlease feel free to reach out via email at ${email} or phone at ${phone}.\n\nThank you for your consideration.\n\nSincerely,\n${name}`;
  document.getElementById('generated-letter').textContent = letter;
  document.getElementById('cover-letter').style.display = 'block';
}

function analyzeResume() {
  const fields = ['education', 'experience', 'skills', 'projects', 'certifications', 'languages', 'achievements', 'publications'];
  const list = document.getElementById('analysis-list');
  list.innerHTML = '';

  fields.forEach(id => {
    const text = document.getElementById(id).value.trim();
    const li = document.createElement('li');
    li.textContent = text ? `${id.charAt(0).toUpperCase() + id.slice(1)} looks good.` : `${id.charAt(0).toUpperCase() + id.slice(1)} is empty.`;
    list.appendChild(li);
  });

  document.getElementById('resume-analysis').style.display = 'block';
}

function printResume() {
  const resumeHTML = document.getElementById("resume").innerHTML;
  const printWindow = window.open('', '', 'width=800,height=1000');
  printWindow.document.write(`
    <html>
      <head>
        <title>Download Resume</title>
        <style>
          body { font-family: 'Segoe UI', sans-serif; padding: 2rem; color: #000; background: #fff; }
          h2, h3 { color: #1e3a8a; border-bottom: 1px solid #ccc; margin-top: 1.5rem; }
          img { height: 200px; width: 200px; border-radius: 12px; object-fit: cover; border: 2px solid #1e3a8a; margin-right: 1rem; }
          ul { padding-left: 1.5rem; list-style-type: square; }
          .signature { margin-top: 2rem; text-align: right; font-style: italic; border-top: 1px dashed #aaa; color: #555; padding-top: 1rem; }
        </style>
      </head>
      <body>${resumeHTML}</body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
}

function toggleDarkMode() {
  const body = document.body;
  const isDark = body.classList.toggle('dark-mode');
  document.getElementById('site-logo').style.display = isDark ? 'none' : 'block';
  document.getElementById('site-logo-white').style.display = isDark ? 'block' : 'none';
} 

window.onload = () => updateResume();
