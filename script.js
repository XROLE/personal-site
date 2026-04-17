// ── Dark mode toggle ──────────────────────────────────────────
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = themeToggle.querySelector('.theme-icon');

function applyTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  themeIcon.textContent = dark ? '☀️' : '🌙';
}

const savedTheme  = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme ? savedTheme === 'dark' : prefersDark);

themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  applyTheme(!isDark);
  localStorage.setItem('theme', !isDark ? 'dark' : 'light');
});

// ── Mobile nav toggle ─────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Active nav link on scroll ─────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const links    = document.querySelectorAll('.nav-links a[href^="#"]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => navObserver.observe(s));

// ── Scroll-reveal ─────────────────────────────────────────────
// Mark elements that should animate on scroll
const revealSelectors = [
  '.skill-card',
  '.video-card',
  '.contact-card',
  '.section-title:not(.hero-name)',
  '.section-sub',
  '.stat-item',
];

// Add .reveal class and staggered delay to grid children
revealSelectors.forEach(sel => {
  document.querySelectorAll(sel).forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger siblings inside the same parent grid
    const siblings = el.parentElement.querySelectorAll(sel);
    const index    = Array.from(siblings).indexOf(el);
    el.style.transitionDelay = `${index * 80}ms`;
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target); // fire once
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── YouTube facade — load iframe on click ────────────────────
document.querySelectorAll('.yt-facade').forEach(facade => {
  facade.addEventListener('click', () => {
    const id = facade.dataset.id;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
    iframe.title = 'YouTube video';
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;border:none;';
    facade.innerHTML = '';
    facade.appendChild(iframe);
    facade.classList.remove('yt-facade');
  });
});

// ── Parallax tilt on avatar ───────────────────────────────────
const ring = document.querySelector('.avatar-ring');
if (ring) {
  document.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;  // -1 to 1
    const dy = (e.clientY - cy) / cy;
    ring.style.transform = `rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg)`;
  });

  document.addEventListener('mouseleave', () => {
    ring.style.transform = 'rotateY(0deg) rotateX(0deg)';
  });
}
