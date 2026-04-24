// ========================
// CONTACT FORM
// ========================
function submitForm() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  if (name === '' || email === '' || message === '') {
    document.getElementById('formMsg').textContent =
      '⚠️ Please fill in all fields before sending.';
    document.getElementById('formMsg').style.color = '#f87171';
    return;
  }

  document.getElementById('formMsg').textContent =
    '✅ Thank you ' + name + '! Your message has been received.';
  document.getElementById('formMsg').style.color = '#a78bfa';

  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('message').value = '';
}

// ========================
// SCROLL ANIMATIONS
// ========================

// Select all elements with class "reveal"
const reveals = document.querySelectorAll('.reveal');

// Create an observer that watches when elements enter the screen
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {

    // If element is visible on screen
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  // Trigger when 15% of element is visible
  threshold: 0.15
});

// Tell observer to watch each reveal element
reveals.forEach(reveal => observer.observe(reveal));

// ========================
// PARTICLE BACKGROUND
// ========================

const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

// Make canvas fill the hero section
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create 120 particles
const particles = [];
const count = 120;

for (let i = 0; i < count; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 0.5,
    speedX: (Math.random() - 0.5) * 0.4,
    speedY: (Math.random() - 0.5) * 0.4,
    opacity: Math.random() * 0.6 + 0.2
  });
}

// Draw and move particles every frame
function animateParticles() {
  // Clear canvas each frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {

    // Draw each particle as a circle
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(167, 139, 250, ${p.opacity})`;
    ctx.fill();

    // Move particle
    p.x += p.speedX;
    p.y += p.speedY;

    // If particle goes off screen wrap it to other side
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;
  });

  // Draw lines between nearby particles
  particles.forEach((p1, i) => {
    particles.slice(i + 1).forEach(p2 => {
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Only draw line if particles are close enough
      if (distance < 100) {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(167, 139, 250, ${0.15 * (1 - distance / 100)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    });
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();

// Resize canvas when window size changes
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
// ========================
// HAMBURGER MENU
// ========================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when any nav link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});