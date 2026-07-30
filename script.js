const enterScreen = document.getElementById("enterScreen");
const enterBtn = document.getElementById("enterBtn");

const viewCounter = document.getElementById("viewCounter");
const liveClock = document.getElementById("liveClock");
const discordStatus = document.getElementById("discordStatus");

const spotifyTrack = document.getElementById("spotifyTrack");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

enterBtn.addEventListener("click", () => {
  enterScreen.classList.add("hide");

  setTimeout(() => {
    spotifyTrack.src =
      "https://open.spotify.com/embed/track/6IQnS5jbctbXMd6TOeEYaz?theme=0&autoplay=1";
  }, 300);
}, { once: true });

// também permite entrar apertando Enter/Espaço, sem precisar do mouse
window.addEventListener("keydown", (e) => {
  if (!enterScreen.classList.contains("hide") && (e.key === "Enter" || e.key === " ")) {
    e.preventDefault();
    enterBtn.click();
  }
});

let fakeViews = 118;

function formatViews(num) {
  return num.toLocaleString("pt-BR");
}

function updateViews() {
  if (Math.random() > 0.2) {
    fakeViews += Math.floor(Math.random() * 3);
    viewCounter.textContent = formatViews(fakeViews);
  }

  setTimeout(updateViews, Math.random() * 3000 + 1800);
}

viewCounter.textContent = formatViews(fakeViews);
updateViews();

function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  liveClock.textContent = `${h}:${m}`;
}

updateClock();
setInterval(updateClock, 1000);

const discordStates = [
  "Online — ouvindo música",
  "Online — xleoo",
  "Online — no perfil",
  "Online — no PC agora"
];

let i = 0;
setInterval(() => {
  i = (i + 1) % discordStates.length;
  discordStatus.textContent = discordStates[i];
}, 3500);

// ---------------- partículas de fundo ----------------
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];
let dpr = Math.min(window.devicePixelRatio || 1, 2);

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function createParticles() {
  particles = [];
  const amount = Math.min(100, window.innerWidth / 18);

  for (let i = 0; i < amount; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2 + 0.4,
      s: Math.random() * 0.45 + 0.08,
      o: Math.random() * 0.8
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${p.o})`;
    ctx.fill();

    p.y += p.s;

    if (p.y > window.innerHeight) {
      p.y = -5;
      p.x = Math.random() * window.innerWidth;
    }
  });

  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  resize();
  createParticles();
});

resize();
createParticles();

// respeita "reduzir movimento" do sistema — desenha as partículas paradas, sem animar
if (!prefersReducedMotion) {
  animate();
} else {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${p.o})`;
    ctx.fill();
  });
}
