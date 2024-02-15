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
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  }

  draw() {
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
    
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.size * 2);
    for (let i = 0; i < 5; i++) {
      ctx.rotate((Math.PI / 180) * 144);
      ctx.lineTo(this.x, this.y - this.size);
      ctx.rotate((Math.PI / 180) * 144);
      ctx.lineTo(this.x, this.y - this.size * 2);
    }
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.timer++;
    this.x = this.originalX + Math.sin(this.timer / this.maxTimer * Math.PI * 2) * 5;
    this.y = this.originalY + Math.cos(this.timer / this.maxTimer * Math.PI * 2) * 5;
  }
}

function init() {
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
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
