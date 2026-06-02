/* ============================================
   PORTFOLIO — main.js
   ============================================ */

// ── Nav scroll effect ────────────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// ── Mobile nav toggle ────────────────────────
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

if (navToggle && navMobile) {
  navToggle.addEventListener('click', () => {
    navMobile.classList.toggle('open');
  });
}

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    if (navMobile) navMobile.classList.remove('open');
  });
});

// ── Language switch ───────────────────────────
let currentLang = 'fr';

const langSwitch  = document.getElementById('langSwitch');
if (langSwitch) {
  const langFlag    = langSwitch.querySelector('.lang-switch__flag');
  const langLabel   = langSwitch.querySelector('.lang-switch__label');

  function applyLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;

    // Translate all [data-fr] / [data-en] elements
    document.querySelectorAll('[data-fr], [data-en]').forEach(el => {
      const text = el.getAttribute('data-' + lang);
      if (!text) return;
      if (el.tagName === 'H2' || text.includes('<')) {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    });

    // Translate placeholders
    document.querySelectorAll('[data-placeholder-fr], [data-placeholder-en]').forEach(el => {
      const ph = el.getAttribute('data-placeholder-' + lang);
      if (ph) el.placeholder = ph;
    });

    // Update switch button if elements exist
    if (langFlag && langLabel) {
      if (lang === 'fr') {
        langFlag.textContent  = '🇬🇧';
        langLabel.textContent = 'EN';
      } else {
        langFlag.textContent  = '🇫🇷';
        langLabel.textContent = 'FR';
      }
    }

    // Save preference
    localStorage.setItem('portfolioLang', lang);
  }

  langSwitch.addEventListener('click', () => {
    applyLang(currentLang === 'fr' ? 'en' : 'fr');
  });

  // Load saved preference (default: fr)
  const savedLang = localStorage.getItem('portfolioLang') || 'fr';
  applyLang(savedLang);
}

// ── Theme Switch (Dark/Light Mode) ───────────
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  const themeIcon = themeToggle.querySelector('.theme-toggle__icon');

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark-mode');
    if (themeIcon) themeIcon.textContent = '☀️';
  } else {
    document.documentElement.classList.remove('dark-mode');
    if (themeIcon) themeIcon.textContent = '🌙';
  }

  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark-mode');
    if (themeIcon) {
      if (isDark) {
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
      } else {
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
      }
    }
  });
}

// ── Reveal on scroll ─────────────────────────
const revealEls = document.querySelectorAll(
  '.section-label, .section-title, .about__text, .about__image-wrap, .skill-card, .project-card, .contact__left, .contact__form, .lang-card, .hobby-card, .timeline__item'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// ── Skill & language bar animation ───────────
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bar__fill, .lang-bar__fill').forEach((bar, i) => {
        setTimeout(() => bar.classList.add('animated'), i * 80);
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-card, .lang-card').forEach(card => barObserver.observe(card));

// ── Stagger grid children ────────────────────
document.querySelectorAll('.skills__grid, .projects__grid, .hobbies__grid, .languages__grid').forEach(grid => {
  grid.querySelectorAll(':scope > *').forEach((child, i) => {
    child.style.transitionDelay = `${i * 0.07}s`;
  });
});

// ── Contact form ─────────────────────────────
const contactForm = document.getElementById('contactForm');
const formNote    = document.getElementById('formNote');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    if (!btn) return;

    btn.textContent = currentLang === 'fr' ? 'Envoi en cours…' : 'Sending…';
    btn.disabled = true;

    const data = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        btn.textContent = currentLang === 'fr' ? 'Message envoyé ✓' : 'Message Sent ✓';
        if (formNote) {
          formNote.style.color = '#5cb85c';
          formNote.textContent = currentLang === 'fr'
            ? 'Merci ! Je vous répondrai très vite.'
            : 'Thanks! I\'ll get back to you soon.';
        }
        contactForm.reset();
      } else {
        throw new Error('Erreur Formspree');
      }
    } catch (error) {
      btn.textContent = currentLang === 'fr' ? 'Erreur ✕' : 'Error ✕';
      if (formNote) {
        formNote.style.color = '#ff4a4a';
        formNote.textContent = currentLang === 'fr'
          ? 'Oups ! Un problème est survenu lors de l\'envoi.'
          : 'Oops! Something went wrong while sending.';
      }
    }

    setTimeout(() => {
      btn.textContent = currentLang === 'fr' ? 'Envoyer →' : 'Send Message →';
      btn.disabled = false;
      if (formNote) formNote.textContent = '';
    }, 4000);
  });
}

// ── Active nav link on scroll ─────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__links a');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav__links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => activeObserver.observe(section));
