const track = document.getElementById("track");
let position = 0;
let velocity = 0;

const originalCards = Array.from(track.children);

// 🔁 duplicar para loop infinito
originalCards.forEach(card => {
  const clone = card.cloneNode(true);
  track.appendChild(clone);
});

function animate() {
  position += velocity;
  velocity *= 0.93;

  track.style.transform = `translateX(${position}px)`;

  updateCenter();
  infiniteLoop();

  requestAnimationFrame(animate);
}

// 🎯 detectar centro
function updateCenter() {
  const cards = document.querySelectorAll(".skill-card");
  const center = window.innerWidth / 2;

  let closest = null;
  let minDist = Infinity;

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;

    const dist = Math.abs(center - cardCenter);

    if (dist < minDist) {
      minDist = dist;
      closest = card;
    }

    card.classList.remove("active");
  });

  if (closest) closest.classList.add("active");
}

// 🔁 loop infinito
function infiniteLoop() {
  const width = track.scrollWidth / 2;

  if (position < -width) position += width;
  if (position > 0) position -= width;
}

// 🖱 drag + momentum
let isDown = false;
let startX;

track.addEventListener("mousedown", e => {
  isDown = true;
  startX = e.clientX;
});

window.addEventListener("mouseup", () => isDown = false);

window.addEventListener("mousemove", e => {
  if (!isDown) return;
  const delta = e.clientX - startX;
  velocity = delta * 0.4;
  startX = e.clientX;
});

// 📱 touch
track.addEventListener("touchstart", e => {
  isDown = true;
  startX = e.touches[0].clientX;
});

track.addEventListener("touchend", () => isDown = false);

track.addEventListener("touchmove", e => {
  if (!isDown) return;
  const delta = e.touches[0].clientX - startX;
  velocity = delta * 0.4;
  startX = e.touches[0].clientX;
});

// ✨ parallax (Vision Pro feel)
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  track.style.transform += ` rotateY(${x}deg)`;
});

// 🚀 start
animate();
