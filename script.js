const enterScreen = document.getElementById("enterScreen");
const enterBtn = document.getElementById("enterBtn");

const viewCounter = document.getElementById("viewCounter");
const liveClock = document.getElementById("liveClock");
const discordStatus = document.getElementById("discordStatus");

const bgm = document.getElementById("bgm");
const playBtn = document.getElementById("playBtn");
const playIcon = playBtn.querySelector("i");
const seekBar = document.getElementById("seekBar");
const volumeBar = document.getElementById("volumeBar");
const timeCurrent = document.getElementById("timeCurrent");
const timeTotal = document.getElementById("timeTotal");

bgm.volume = 0.55;

function formatTime(sec) {
  if (!isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function setPlayingUI(isPlaying) {
  playIcon.className = isPlaying ? "fa-solid fa-pause" : "fa-solid fa-play";
}

enterBtn.addEventListener("click", () => {
  enterScreen.classList.add("hide");

  bgm.play().then(() => setPlayingUI(true)).catch(() => {
    // navegador bloqueou o autoplay; o botão de play ainda permite iniciar manualmente
    setPlayingUI(false);
  });
});

playBtn.addEventListener("click", () => {
  if (bgm.paused) {
    bgm.play();
    setPlayingUI(true);
  } else {
    bgm.pause();
    setPlayingUI(false);
  }
});

bgm.addEventListener("loadedmetadata", () => {
  timeTotal.textContent = formatTime(bgm.duration);
});

bgm.addEventListener("timeupdate", () => {
  if (bgm.duration) {
    seekBar.value = (bgm.currentTime / bgm.duration) * 100;
  }
  timeCurrent.textContent = formatTime(bgm.currentTime);
});

seekBar.addEventListener("input", () => {
  if (bgm.duration) {
    bgm.currentTime = (seekBar.value / 100) * bgm.duration;
  }
});

volumeBar.addEventListener("input", () => {
  bgm.volume = volumeBar.value / 100;
});

bgm.addEventListener("ended", () => setPlayingUI(false));

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
