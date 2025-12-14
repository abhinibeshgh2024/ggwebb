const searchInput = document.getElementById("ecsys-search");
const suggestionsBox = document.getElementById("search-suggestions");

// Sample EcSys modules for search
const modules = ["Word", "Excel", "PowerPoint", "Notes", "Tasks", "Calendar", "AI Assistant", "Expense Tracker"];

searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    suggestionsBox.innerHTML = "";
    if (query) {
        const filtered = modules.filter(item => item.toLowerCase().includes(query));
        filtered.forEach(item => {
            const div = document.createElement("div");
            div.textContent = item;
            div.classList.add("suggestion-item");
            div.style.padding = "8px";
            div.style.cursor = "pointer";
            div.addEventListener("click", () => {
                searchInput.value = item;
                suggestionsBox.style.display = "none";
            });
            suggestionsBox.appendChild(div);
        });
        suggestionsBox.style.display = filtered.length ? "block" : "none";
    } else {
        suggestionsBox.style.display = "none";
    }
});

// Fade-in on scroll for module cards
const moduleCards = document.querySelectorAll(".module-card");

const fadeInOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.9;
    moduleCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if(cardTop < triggerBottom){
            card.classList.add("show");
        }
    });
};

window.addEventListener("scroll", fadeInOnScroll);
window.addEventListener("load", fadeInOnScroll);
