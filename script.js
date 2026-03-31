// Fade-in simple al hacer scroll
const elements = document.querySelectorAll(".card");

window.addEventListener("scroll", () => {
  elements.forEach(el => {
    const position = el.getBoundingClientRect().top;
    if (position < window.innerHeight - 50) {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }
  });
});

// Estado inicial
elements.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = "translateY(20px)";
});
