const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const numParticles = 1000;

function init() {
  for (let i = 0; i < numParticles; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 4 + 1;
    const color = `rgba(255, 0, 0, ${Math.random()})`;
    particles.push({ x, y, size, color });
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(particle => {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.fill();
  });
}

function animate() {
  requestAnimationFrame(animate);
  draw();
}

function heartAnimation() {
  let scale = 1;
  let isExpanding = true;
  let animationFrame = 0;

  function animateHeart() {
    animationFrame++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < numParticles; i++) {
      const angle = i * Math.PI * 2 / numParticles;
      const x = canvas.width / 2 + Math.sin(angle) * scale * 16 * Math.pow(Math.sin(angle), 3);
      const y = canvas.height / 2 - Math.cos(angle) * scale * (13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle));
      
      particles[i].x = x;
      particles[i].y = y;
    }

    draw();
    
    if (isExpanding) {
      scale += 0.02;
      if (scale >= 1.5) {
        isExpanding = false;
      }
    } else {
      scale -= 0.02;
      if (scale <= 1) {
        isExpanding = true;
      }
    }

    if (animationFrame < 120) {
      requestAnimationFrame(animateHeart);
    } else {
      animate();
    }
  }

  animateHeart();
}

init();
heartAnimation();
    
