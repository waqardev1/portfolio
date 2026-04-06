// ============================================================
// NAVIGATION INTERACTIVITY
// ============================================================

const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
  });
}

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('active');
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  const isClickInsideNav = navToggle.contains(e.target) || navMenu.contains(e.target);
  if (!isClickInsideNav) {
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('active');
  }
});

// ============================================================
// SMOOTH SCROLL BEHAVIOR
// ============================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ============================================================
// ACTIVE NAVIGATION INDICATOR
// ============================================================

const updateActiveNav = () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`a[href="#${section.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
};

window.addEventListener('scroll', updateActiveNav);

// ============================================================
// SCROLL ANIMATIONS (Optional: Intersection Observer)
// ============================================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all cards and items for animation
document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ============================================================
// FORM HANDLING (Optional: Contact form can be added later)
// ============================================================

// Example form validation if a contact form is added
function validateContactForm(form) {
  const email = form.querySelector('input[type="email"]');
  const name = form.querySelector('input[name="name"]');
  
  if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    alert('Please enter a valid email');
    return false;
  }
  if (!name.value.trim()) {
    alert('Please enter your name');
    return false;
  }
  return true;
}

// ============================================================
// ACCESSIBILITY: KEYBOARD NAVIGATION
// ============================================================

document.addEventListener('keydown', (e) => {
  // Close menu with Escape key
  if (e.key === 'Escape') {
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('active');
  }
});

// ============================================================
// PAGE LOAD PERFORMANCE
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfolio page loaded successfully');
  
  // Lazy load images if needed
  if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img');
    images.forEach(img => observer.observe(img));
  }
});

// ============================================================
// SOCIAL / UTILITY FUNCTIONS
// ============================================================

// Copy contact info to clipboard
function copyToClipboard(text, label) {
  navigator.clipboard.writeText(text).then(() => {
    alert(`${label} copied to clipboard!`);
  }).catch(() => {
    alert('Failed to copy');
  });
}