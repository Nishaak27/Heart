const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 2 + 1;
    this.originalX = x;
    this.originalY = y;
    this.timer = 0;
    this.maxTimer = Math.random() * 50 + 50;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
  }

  update() {
    this.timer++;
    this.x = this.originalX + Math.sin(this.timer / this.maxTimer * Math.PI * 2) * 5;
    this.y = this.originalY + Math.cos(this.timer / this.maxTimer * Math.PI * 2) * 5;
  }
}

function init() {
  const heartSize = 100;
  const scale = 0.03;
  const offsetX = canvas.width / 2;
  const offsetY = canvas.height / 2 - heartSize * scale;

  for (let angle = 0; angle <= Math.PI * 2; angle += 0.01) {
    const x = heartSize * (16 * Math.pow(Math.sin(angle), 3)) * scale + offsetX;
    const y = -heartSize * (13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle)) * scale + offsetY;
    particles.push(new Particle(x, y));
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });
}

init();
animate();
