const enterScreen = document.getElementById("enterScreen");
const enterBtn = document.getElementById("enterBtn");

const viewCounter = document.getElementById("viewCounter");
const liveClock = document.getElementById("liveClock");
const discordStatus = document.getElementById("discordStatus");

const spotifyTrack = document.getElementById("spotifyTrack");
const bgm = document.getElementById("bgm");
const soundToggle = document.getElementById("soundToggle");
const soundIcon = soundToggle.querySelector("i");

bgm.volume = 0.55;

enterBtn.addEventListener("click", () => {
  enterScreen.classList.add("hide");

  bgm.play().catch(() => {
    // navegador bloqueou o autoplay; o botão de som ainda permite iniciar manualmente
  });
});

soundToggle.addEventListener("click", () => {
  if (bgm.paused) {
    bgm.play();
    soundToggle.classList.remove("muted");
    soundIcon.className = "fa-solid fa-volume-high";
  } else {
    bgm.pause();
    soundToggle.classList.add("muted");
    soundIcon.className = "fa-solid fa-volume-xmark";
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

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles() {
  particles = [];
  const amount = Math.min(100, window.innerWidth / 18);

  for (let i = 0; i < amount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.4,
      s: Math.random() * 0.45 + 0.08,
      o: Math.random() * 0.8
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${p.o})`;
    ctx.fill();

    p.y += p.s;

    if (p.y > canvas.height) {
      p.y = -5;
      p.x = Math.random() * canvas.width;
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
animate();
