/* ===== CUSTOM CURSOR ===== */
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

function animateTrail() {
  trailX += (parseFloat(cursor.style.left || 0) - trailX) * 0.12;
  trailY += (parseFloat(cursor.style.top || 0) - trailY) * 0.12;
  trail.style.left = trailX + 'px';
  trail.style.top = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

document.querySelectorAll('a, button, .project-item, .skill-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
    cursor.style.opacity = '0.6';
    trail.style.transform = 'translate(-50%,-50%) scale(1.5)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    cursor.style.opacity = '1';
    trail.style.transform = 'translate(-50%,-50%) scale(1)';
  });
});

/* ===== NAV SCROLL ===== */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

/* ===== TYPED CODE EFFECT ===== */
const codeLines = [
  '<span style="color:#6b7895">// Softwareentwickler</span>',
  '',
  '<span style="color:#0066ff">const</span> <span style="color:#00e5a0">developer</span> = {',
  '  <span style="color:#e8edf5">name</span>: <span style="color:#f4c07a">"Dein Name"</span>,',
  '  <span style="color:#e8edf5">role</span>: <span style="color:#f4c07a">"Full-Stack Dev"</span>,',
  '  <span style="color:#e8edf5">available</span>: <span style="color:#0066ff">true</span>,',
  '}',
  '',
  '<span style="color:#6b7895">// Bereit für dein Projekt 🚀</span>',
];

const codeEl = document.getElementById('typedCode');
let lineIdx = 0, charIdx = 0;
const fullLines = codeLines.map(l => l);
let rendered = [];
let tempLine = '';

function typeNext() {
  if (lineIdx >= fullLines.length) return;
  const line = fullLines[lineIdx];
  // Strip HTML for char counting; type the raw HTML directly
  const stripped = line.replace(/<[^>]+>/g, '');
  if (charIdx <= stripped.length) {
    // build visible portion
    let shown = 0;
    let result = '';
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '<') {
        // find closing >
        const end = line.indexOf('>', i);
        result += line.substring(i, end + 1);
        i = end;
      } else {
        if (shown < charIdx) { result += line[i]; shown++; }
        else break;
      }
    }
    const allLines = [...rendered, result];
    codeEl.innerHTML = allLines.join('\n');
    charIdx++;
    setTimeout(typeNext, charIdx === 1 ? 80 : 22);
  } else {
    rendered.push(fullLines[lineIdx]);
    lineIdx++;
    charIdx = 0;
    setTimeout(typeNext, lineIdx === fullLines.length ? 0 : 90);
  }
}
setTimeout(typeNext, 1200);

/* ===== SCROLL REVEAL ===== */
const revealEls = document.querySelectorAll(
  '.skill-card, .project-item, .about-text, .about-image, .contact-inner'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

/* ===== COUNTER ANIMATION ===== */
function animateCount(el, target) {
  let current = 0;
  const step = Math.ceil(target / 40);
  const interval = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(interval);
  }, 40);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num');
      nums.forEach(num => {
        const target = parseInt(num.dataset.target);
        animateCount(num, target);
      });
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) statObserver.observe(statsSection);

/* ===== SMOOTH SCROLL HELPERS ===== */
function scrollToProjects() {
  document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
}
function scrollToContact() {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

/* ===== FORM SUBMIT ===== */
function handleSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const btn = form.querySelector('.submit-btn span');
  btn.textContent = 'Wird gesendet...';
  setTimeout(() => {
    form.innerHTML = `
      <div class="success-msg show">
        <span>✅</span>
        <h3>Nachricht erhalten!</h3>
        <p>Ich melde mich innerhalb von 24 Stunden bei dir.</p>
      </div>
    `;
  }, 1200);
}

/* ===== ACTIVE NAV LINK ===== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 200) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}`
      ? 'var(--accent)' : '';
  });
});
