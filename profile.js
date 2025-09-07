// Dark mode toggle
const toggleButton = document.getElementById("theme-toggle");
toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    toggleButton.textContent = "☀️ Light Mode";
  } else {
    toggleButton.textContent = "🌙 Dark Mode";
  }
});

// Typing effect for header tagline
const typingText = "Cheminformatician | Computational Chemistry | Drug Discovery";
let index = 0;

function type() {
  if (index < typingText.length) {
    document.getElementById("typing").textContent += typingText.charAt(index);
    index++;
    setTimeout(type, 100);
  }
}
window.onload = type;
