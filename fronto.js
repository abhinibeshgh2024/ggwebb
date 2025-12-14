// MENU TOGGLE
const sideMenu = document.getElementById("sideMenu");
const menuBtn = document.getElementById("menuBtn");
const closeMenuBar = document.getElementById("closeMenuBar");

// Arrow button on left toggles menu
menuBtn.addEventListener("click", toggleMenu);
closeMenuBar.addEventListener("click", toggleMenu);

function toggleMenu() {
    if (sideMenu.classList.contains("open")) {
        sideMenu.classList.remove("open");
        menuBtn.textContent = "➤"; // right arrow
    } else {
        sideMenu.classList.add("open");
        menuBtn.textContent = "◀"; // left arrow
    }
}

// Keyboard scrolling when menu open
document.addEventListener("keydown", (e) => {
    if (sideMenu.classList.contains("open")) {
        if (e.key === "ArrowDown") sideMenu.scrollTop += 40;
        if (e.key === "ArrowUp") sideMenu.scrollTop -= 40;
    }
});

// DEMO SNIPPETS (20)
const demoSnippets = [
    { name: "Basic HTML", html: "<h1>Hello</h1>", css: "h1{color:red}", js: "" },
    { name: "Button Alert", html: "<button onclick='show()'>Click</button>", css: "button{padding:10px;}", js: "function show(){alert('Hi')}" },
    { name: "Card UI", html: "<div class='card'>Card</div>", css: ".card{padding:20px;background:#333;color:white;border-radius:10px;}", js: "" },
    { name: "Glow Text", html: "<h2 class='glow'>Glow</h2>", css: ".glow{text-shadow:0 0 8px red;}", js: "" },
    { name: "Flex Box", html: "<div class='flex'><div>A</div><div>B</div></div>", css: ".flex{display:flex;gap:10px;}", js: "" },
    { name: "Image Hover", html: "<img src='https://via.placeholder.com/100'>", css: "img:hover{transform:scale(1.2);transition:0.3s;}", js: "" },
    { name: "Simple Form", html: "<form><input placeholder='Name'><button>Submit</button></form>", css: "input,button{margin:5px;}", js: "" },
    { name: "List Style", html: "<ul><li>One</li><li>Two</li></ul>", css: "li{color:green;}", js: "" },
    { name: "Animated Box", html: "<div class='box'></div>", css: ".box{width:50px;height:50px;background:red;animation:move 2s infinite;}@keyframes move{0%{transform:translateX(0);}50%{transform:translateX(100px);}100%{transform:translateX(0);}}", js: "" },
    { name: "Dropdown", html: "<select><option>A</option><option>B</option></select>", css: "", js: "" },
    { name: "Table", html: "<table><tr><td>1</td></tr></table>", css: "table,td{border:1px solid #fff;}", js: "" },
    { name: "Paragraph Color", html: "<p>Hello World</p>", css: "p{color:blue;}", js: "" },
    { name: "Background Gradient", html: "<div>Box</div>", css: "div{background:linear-gradient(to right, red, yellow);padding:20px;}", js: "" },
    { name: "Border Radius", html: "<div>Round</div>", css: "div{border:2px solid red;border-radius:15px;padding:10px;}", js: "" },
    { name: "Text Shadow", html: "<h3>Shadow</h3>", css: "h3{text-shadow:2px 2px 4px #000;}", js: "" },
    { name: "Opacity Demo", html: "<div>Box</div>", css: "div{opacity:0.5;}", js: "" },
    { name: "Hover Effect", html: "<div>Hover Me</div>", css: "div:hover{color:red;}", js: "" },
    { name: "Fixed Header", html: "<header>Header</header>", css: "header{position:fixed;top:0;width:100%;background:#222;}", js: "" },
    { name: "CSS Grid", html: "<div class='grid'><div>A</div><div>B</div></div>", css: ".grid{display:grid;grid-template-columns:1fr 1fr;}", js: "" },
    { name: "JS Console", html: "<button onclick='console.log(123)'>Check</button>", css: "", js: "" },
];

// Load demo list
const demoList = document.getElementById("demoList");

function loadDemoList() {
    demoList.innerHTML = "";
    demoSnippets.forEach((d, i) => {
        const item = document.createElement("div");
        item.className = "demo-item";
        item.textContent = d.name;
        item.onclick = () => loadDemo(i);
        demoList.appendChild(item);
    });
}

loadDemoList();

// Load selected demo
function loadDemo(index) {
    const d = demoSnippets[index];
    htmlCode.value = d.html;
    cssCode.value = d.css;
    jsCode.value = d.js;
    toggleMenu(); // close menu after selecting
}

// SEARCH demo
document.getElementById("searchDemo").addEventListener("input", function () {
    const q = this.value.toLowerCase();
    demoList.childNodes.forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(q) ? "block" : "none";
    });
});

// RUN OUTPUT
document.getElementById("runBtn").addEventListener("click", function () {
    const html = htmlCode.value;
    const css = `<style>${cssCode.value}</style>`;
    const js = `<script>${jsCode.value}<\/script>`;
    const output = html + css + js;

    const frame = document.getElementById("outputFrame").contentWindow;
    frame.document.open();
    frame.document.write(output);
    frame.document.close();
});

// THEME Toggle
const themeBtn = document.getElementById("themeToggle");
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    themeBtn.textContent = document.body.classList.contains("light") ? "Dark" : "Light";
});
