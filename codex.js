// Linking Textareas & Output
const htmlCode = document.getElementById("htmlCode");
const cssCode = document.getElementById("cssCode");
const outputFrame = document.getElementById("output");

// Live Preview Function
function updateOutput() {
    const html = htmlCode.value;
    const css = `<style>${cssCode.value}</style>`;

    const combined = html + css;

    const iframeDoc = outputFrame.contentDocument || outputFrame.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(combined);
    iframeDoc.close();
}

htmlCode.addEventListener("input", updateOutput);
cssCode.addEventListener("input", updateOutput);

// Theme Toggle
const toggleBtn = document.getElementById("themeToggle");

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");

    toggleBtn.textContent =
        document.body.classList.contains("light-theme")
            ? "Dark Mode"
            : "Light Mode";
});

// initial call
updateOutput();
