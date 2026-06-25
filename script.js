document.addEventListener('DOMContentLoaded', () => {

  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const root = document.documentElement;

  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  applyTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem('portfolio-theme', next);
  });

  function applyTheme(theme) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    } else {
      root.removeAttribute('data-theme');
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    }
  }

  const navbar = document.getElementById('navbar');
  function handleNavbarScroll() {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll();

  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function setActiveLink() {
    let currentSection = '';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) {
        currentSection = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active-link', link.getAttribute('href') === `#${currentSection}`);
    });
  }
  window.addEventListener('scroll', setActiveLink);
  setActiveLink();

  const typedRoleEl = document.getElementById('typedRole');
  const roles = [
    'Aspiring Full Stack Developer',
    'Java Programmer',
    'Web Development Enthusiast',
    'Lifelong Learner'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let typingForward = true;

  function typeLoop() {
    const currentWord = roles[roleIndex];

    if (typingForward) {
      charIndex++;
      typedRoleEl.textContent = currentWord.substring(0, charIndex);
      if (charIndex === currentWord.length) {
        typingForward = false;
        setTimeout(typeLoop, 1400); // pause at full word
        return;
      }
    } else {
      charIndex--;
      typedRoleEl.textContent = currentWord.substring(0, charIndex);
      if (charIndex === 0) {
        typingForward = true;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeLoop, typingForward ? 80 : 40);
  }
  if (typedRoleEl) typeLoop();

  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');

        const bars = entry.target.querySelectorAll('.skill-bar-fill');
        bars.forEach(bar => {
          const level = bar.getAttribute('data-level') || '0';
          bar.style.width = `${level}%`;
        });

        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));

  const scrollProgress = document.getElementById('scrollProgress');
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = `${percent}%`;
  }
  window.addEventListener('scroll', updateScrollProgress);
  updateScrollProgress();

  const scrollTopBtn = document.getElementById('scrollTopBtn');
  function toggleScrollTopBtn() {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  }
  window.addEventListener('scroll', toggleScrollTopBtn);
  toggleScrollTopBtn();

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault(); 
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        formStatus.textContent = '⚠ Please fill in all fields before sending.';
        formStatus.style.color = 'var(--danger)';
        return;
      }

      
      formStatus.textContent = `✓ Thanks, ${name}! Your message has been noted.`;
      formStatus.style.color = 'var(--accent)';
      contactForm.reset();
    });
  }

});