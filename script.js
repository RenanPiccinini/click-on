// ClickON Landing Page - Interactive Script

// ======== NAVBAR SCROLL ========
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ======== HAMBURGER MENU ========
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-link, .btn-nav-cta').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ======== CANVAS PARTICLE ANIMATION ========
const canvas = document.getElementById('heroCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.5 ? 'rgba(255, 107, 0,' : 'rgba(255, 180, 80,'
    };
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < 80; i++) {
      particles.push(createParticle());
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.opacity + ')';
      ctx.fill();
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      // Draw connections
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[j].x - p.x;
        const dy = particles[j].y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(255, 107, 0,' + (0.05 * (1 - dist / 120)) + ')';
          ctx.lineWidth = 0.5;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    });
    animId = requestAnimationFrame(drawParticles);
  }

  resize();
  initParticles();
  drawParticles();
  window.addEventListener('resize', () => { resize(); initParticles(); });
}

// ======== COUNTER ANIMATION ========
function animateCounter(el, target, suffix) {
  let current = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + (suffix || '');
  }, 20);
}

// ======== SCROLL REVEAL ========
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Animate counters when hero stats visible
      if (entry.target.closest('.hero-stats')) {
        document.querySelectorAll('.stat-number').forEach(num => {
          const target = parseInt(num.dataset.target);
          const suffix = num.dataset.suffix || '';
          animateCounter(num, target, suffix);
        });
      }
      // Animate metric bars
      if (entry.target.classList.contains('metric-bar')) {
        setTimeout(() => {
          entry.target.style.width = entry.target.dataset.width + '%';
        }, 200);
      }
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

// Apply reveal to elements
document.querySelectorAll('.section-header, .solution-card, .testimonial-card, .faq-item, .value-item, .metric-row, .trust-badge').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Observe stat cards
document.querySelectorAll('.hero-stats').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Observe metric bars
document.querySelectorAll('.metric-bar').forEach(bar => {
  revealObserver.observe(bar);
});

// ======== FAQ ACCORDION ========
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const answerId = btn.id.replace('Btn', 'Answer');
    const answer = document.getElementById(answerId);
    const isOpen = answer && answer.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
    document.querySelectorAll('.faq-question').forEach(b => b.classList.remove('active'));

    // Open clicked if was closed
    if (!isOpen && answer) {
      answer.classList.add('open');
      btn.classList.add('active');
    }
  });
});

// ======== SMOOTH SCROLL FOR NAV LINKS ========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  });
});

// ======== FINAL CTA PARTICLES ========
function createFinalParticles() {
  const container = document.getElementById('finalParticles');
  if (!container) return;
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      background: rgba(255, 107, 0, ${Math.random() * 0.5 + 0.2});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: particleAnim ${Math.random() * 5 + 3}s ease-in-out infinite ${Math.random() * 3}s;
    `;
    container.appendChild(p);
  }
}
createFinalParticles();

// ======== 3D TILT EFFECT FOR CARDS ========
document.querySelectorAll('.solution-card, .testimonial-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    card.style.transform = `translateY(-8px) perspective(800px) rotateX(${y}deg) rotateY(${x}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ======== ACTIVE NAV HIGHLIGHT ========
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.id;
    }
  });
  navLinksAll.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--orange-light)';
    }
  });
});

console.log('%c ClickON ', 'background: linear-gradient(135deg, #FF6B00, #FF8C33); color: white; font-size: 20px; font-weight: bold; padding: 8px 20px; border-radius: 8px;');
console.log('%c Landing page developed with passion.', 'color: #FF8C33; font-size: 12px;');
