// HEART BACKGROUND
const heartCanvas = document.getElementById("heartCanvas");
const heartCtx = heartCanvas.getContext("2d");
heartCanvas.width = window.innerWidth;
heartCanvas.height = window.innerHeight;

let hearts = [];
function createHeart() {
  return {
    x: Math.random() * heartCanvas.width,
    y: heartCanvas.height + 20,
    size: 10 + Math.random() * 20,
    speed: 1 + Math.random() * 2,
    alpha: 0.6 + Math.random() * 0.4
  };
}

function drawHeart(heart) {
  heartCtx.save();
  heartCtx.translate(heart.x, heart.y);
  heartCtx.scale(heart.size / 30, heart.size / 30);
  heartCtx.globalAlpha = heart.alpha;
  heartCtx.fillStyle = "#ff69b4";
  heartCtx.beginPath();
  heartCtx.moveTo(0, 0);
  heartCtx.bezierCurveTo(-15, -15, -15, 10, 0, 20);
  heartCtx.bezierCurveTo(15, 10, 15, -15, 0, 0);
  heartCtx.fill();
  heartCtx.restore();
}

for (let i = 0; i < 50; i++) hearts.push(createHeart());

function animateHearts() {
  heartCtx.clearRect(0, 0, heartCanvas.width, heartCanvas.height);
  hearts.forEach((heart, i) => {
    heart.y -= heart.speed;
    drawHeart(heart);
    if (heart.y + heart.size < 0) hearts[i] = createHeart();
  });
  requestAnimationFrame(animateHearts);
}

animateHearts();

// BALLOON BACKGROUND
const balloonCanvas = document.getElementById("balloonCanvas");
const balloonCtx = balloonCanvas.getContext("2d");
balloonCanvas.width = window.innerWidth;
balloonCanvas.height = window.innerHeight;

let balloons = [];

function createBalloon() {
  const colors = ["#ff9999", "#ffcc66", "#99ccff", "#cc99ff"];
  return {
    x: Math.random() * balloonCanvas.width,
    y: balloonCanvas.height + Math.random() * 100,
    size: 30 + Math.random() * 20,
    speed: 0.5 + Math.random() * 1,
    color: colors[Math.floor(Math.random() * colors.length)],
    drift: (Math.random() - 0.5) * 2
  };
}

function drawBalloon(balloon) {
  balloonCtx.beginPath();
  balloonCtx.ellipse(balloon.x, balloon.y, balloon.size * 0.6, balloon.size, 0, 0, 2 * Math.PI);
  balloonCtx.fillStyle = balloon.color;
  balloonCtx.fill();
  // string
  balloonCtx.beginPath();
  balloonCtx.moveTo(balloon.x, balloon.y + balloon.size);
  balloonCtx.lineTo(balloon.x, balloon.y + balloon.size + 30);
  balloonCtx.strokeStyle = "#555";
  balloonCtx.stroke();
}

for (let i = 0; i < 30; i++) balloons.push(createBalloon());

function animateBalloons() {
  balloonCtx.clearRect(0, 0, balloonCanvas.width, balloonCanvas.height);
  balloons.forEach((balloon, i) => {
    balloon.y -= balloon.speed;
    balloon.x += balloon.drift;
    drawBalloon(balloon);
    if (balloon.y + balloon.size < 0) balloons[i] = createBalloon();
  });
  requestAnimationFrame(animateBalloons);
}

animateBalloons();

// SLIDESHOW
let current = 0;
const slides = document.querySelectorAll(".slide");
function showNextSlide() {
  slides[current].classList.remove("active");
  current = (current + 1) % slides.length;
  slides[current].classList.add("active");
}
setInterval(showNextSlide, 3000);

// MUSIC TOGGLE
function toggleAudio() {
  const audio = document.getElementById("birthdayAudio");
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

// Make sure canvas resizes on window resize
window.addEventListener("resize", () => {
  heartCanvas.width = window.innerWidth;
  heartCanvas.height = window.innerHeight;
  balloonCanvas.width = window.innerWidth;
  balloonCanvas.height = window.innerHeight;
});
