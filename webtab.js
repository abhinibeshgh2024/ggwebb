/* =====================================================
   WEBTAB.JS
   Search Suggestions + Navbar Dropdown Controller
   ===================================================== */

/* -------------------------------
   🔍 SEARCH DATA (Webpage Content)
-------------------------------- */
const webtabSearchData = [
  "Home",
  "About Us",
  "Academics",
  "Courses",
  "Departments",
  "Faculty",
  "Syllabus",
  "Time Table",
  "Assignments",

  "Services",
  "Web Development",
  "App Development",
  "UI UX Design",
  "AI Solutions",
  "Cyber Security",

  "Projects",
  "Frontend Projects",
  "Backend Projects",
  "AI Projects",

  "Student Zone",
  "Attendance",
  "Results",
  "Notices",
  "Grievance Cell",
  "Downloads",
  "Contact"
];

/* -------------------------------
   🔍 SEARCH BAR LOGIC
-------------------------------- */
const searchInput = document.getElementById("webtabSearchInput");
const suggestionBox = document.getElementById("webtabSearchResults");

let currentIndex = -1;

if (searchInput && suggestionBox) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();
    suggestionBox.innerHTML = "";
    currentIndex = -1;

    if (!query) {
      suggestionBox.style.display = "none";
      return;
    }

    const matched = webtabSearchData.filter(item =>
      item.toLowerCase().includes(query)
    );

    if (matched.length === 0) {
      suggestionBox.style.display = "none";
      return;
    }

    matched.forEach(text => {
      const div = document.createElement("div");
      div.textContent = text;

      div.onclick = () => {
        searchInput.value = text;
        suggestionBox.style.display = "none";
      };

      suggestionBox.appendChild(div);
    });

    suggestionBox.style.display = "block";
  });

  searchInput.addEventListener("keydown", (e) => {
    const items = suggestionBox.querySelectorAll("div");
    if (!items.length) return;

    if (e.key === "ArrowDown") {
      currentIndex = (currentIndex + 1) % items.length;
    }

    if (e.key === "ArrowUp") {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
    }

    if (e.key === "Enter" && currentIndex >= 0) {
      e.preventDefault();
      searchInput.value = items[currentIndex].textContent;
      suggestionBox.style.display = "none";
    }

    items.forEach(i => i.classList.remove("active"));
    if (items[currentIndex]) {
      items[currentIndex].classList.add("active");
    }
  });
}

/* Close search dropdown when clicked outside */
document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-container")) {
    if (suggestionBox) suggestionBox.style.display = "none";
  }
});

/* -------------------------------
   ☰ NAVBAR DROPDOWN LOGIC
-------------------------------- */
const dropdownParents = document.querySelectorAll(".nav-dropdown");

/* Desktop hover + mobile click support */
dropdownParents.forEach(drop => {
  const trigger = drop.querySelector(".dropdown-toggle");
  const menu = drop.querySelector(".dropdown-menu");

  if (!trigger || !menu) return;

  /* Mobile click */
  trigger.addEventListener("click", (e) => {
    e.preventDefault();

    dropdownParents.forEach(other => {
      if (other !== drop) {
        other.classList.remove("open");
      }
    });

    drop.classList.toggle("open");
  });
});

/* Close dropdown when clicking outside navbar */
document.addEventListener("click", (e) => {
  if (!e.target.closest(".navbar")) {
    dropdownParents.forEach(drop => drop.classList.remove("open"));
  }
});

/* -------------------------------
   ☰ MOBILE NAVBAR TOGGLE
-------------------------------- */
const menuBtn = document.getElementById("menuToggle");
const navMenu = document.getElementById("navLinks");

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("show");
    menuBtn.classList.toggle("active");
  });
}
