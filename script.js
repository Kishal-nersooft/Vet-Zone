/**
 * Best Care VetZone — Marketing site interactions
 * Vanilla JS: particles, scroll reveal, counters, parallax, nav, FAQ, slider, form
 */

(function () {
  'use strict';

  /* --- Floating particles --- */
  function initParticles() {
    const container = document.querySelector('.particles');
    if (!container) return;

    const count = 40;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDuration = 8 + Math.random() * 12 + 's';
      p.style.animationDelay = Math.random() * 10 + 's';
      p.style.width = p.style.height = 2 + Math.random() * 4 + 'px';
      container.appendChild(p);
    }
  }

  /* --- Navbar scroll + mobile menu --- */
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (navbar) {
      const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    if (hamburger && navLinks) {
      const toggleMenu = (open) => {
        const isOpen = open ?? !navLinks.classList.contains('open');
        navLinks.classList.toggle('open', isOpen);
        hamburger.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
        document.body.classList.toggle('menu-open', isOpen);
      };

      hamburger.addEventListener('click', () => toggleMenu());

      navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => toggleMenu(false));
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('open')) {
          toggleMenu(false);
        }
      });
    }
  }

  /* --- Scroll reveal (Intersection Observer) --- */
  function initReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => entry.target.classList.add('visible'), Number(delay));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach((el) => observer.observe(el));
  }

  /* --- Animated counters --- */
  function animateCounter(el, target, duration, suffix) {
    const start = performance.now();
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(easeOutCubic(progress) * target);
      el.textContent = value.toLocaleString() + (suffix || '');
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString() + (suffix || '');
    }

    requestAnimationFrame(tick);
  }

  function initCounters() {
    const heroStats = document.querySelectorAll('.hero-stat .stat-num');
    const communityCounters = document.querySelectorAll('.community-stat .counter');

    const runHeroStats = () => {
      heroStats.forEach((el) => {
        const target = parseInt(el.dataset.count, 10);
        if (Number.isNaN(target)) return;
        const suffix = '';
        animateCounter(el, target, 1800, suffix);
      });
    };

    const runCommunityStats = () => {
      communityCounters.forEach((el) => {
        const target = parseInt(el.dataset.target, 10);
        if (Number.isNaN(target)) return;
        animateCounter(el, target, 2000, '');
      });
    };

    const heroSection = document.getElementById('hero');
    const aboutSection = document.getElementById('about');
    let heroDone = false;
    let aboutDone = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (entry.target === heroSection && !heroDone) {
            heroDone = true;
            runHeroStats();
          }
          if (entry.target === aboutSection && !aboutDone) {
            aboutDone = true;
            runCommunityStats();
          }
        });
      },
      { threshold: 0.25 }
    );

    if (heroSection) observer.observe(heroSection);
    if (aboutSection) observer.observe(aboutSection);
  }

  /* --- Hero parallax on mousemove --- */
  function initParallax() {
    const wrap = document.getElementById('heroParallax');
    const hero = document.getElementById('hero');
    if (!wrap || !hero) return;

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      wrap.style.transform = `translate(${x * 12}px, ${y * 12}px)`;

      wrap.querySelectorAll('.float-card').forEach((card, i) => {
        const factor = (i + 1) * 6;
        card.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    });

    hero.addEventListener('mouseleave', () => {
      wrap.style.transform = '';
      wrap.querySelectorAll('.float-card').forEach((card) => {
        card.style.transform = '';
      });
    });
  }

  /* --- FAQ accordion (single open) --- */
  function initFaq() {
    const items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach((item) => {
      const btn = item.querySelector('.faq-question');
      if (!btn) return;

      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        items.forEach((other) => {
          other.classList.remove('active');
          const q = other.querySelector('.faq-question');
          if (q) q.setAttribute('aria-expanded', 'false');
        });

        if (!isActive) {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* --- Testimonial slider --- */
  function initTestimonialSlider() {
    const track = document.getElementById('testimonialTrack');
    const dotsContainer = document.getElementById('testimonialDots');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    if (!track || !dotsContainer) return;

    const slides = track.querySelectorAll('.testimonial-slide');
    const total = slides.length;
    let current = 0;
    let autoplayTimer;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.testimonial-dot');

    function goTo(index) {
      current = (index + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function next() {
      goTo(current + 1);
    }

    function prev() {
      goTo(current - 1);
    }

    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(next, 6000);
    }

    function stopAutoplay() {
      if (autoplayTimer) clearInterval(autoplayTimer);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAutoplay(); });

    const slider = track.closest('.testimonial-slider');
    if (slider) {
      slider.addEventListener('mouseenter', stopAutoplay);
      slider.addEventListener('mouseleave', startAutoplay);
    }

    startAutoplay();
  }

  /* --- Contact form + inline success --- */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    if (!form) return;

    let successTimeout;

    function showFormSuccess() {
      if (!formSuccess) return;
      formSuccess.hidden = false;
      clearTimeout(successTimeout);
      successTimeout = setTimeout(() => {
        formSuccess.hidden = true;
      }, 8000);
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      form.reset();
      showFormSuccess();
    });
  }

  /* --- Init on DOM ready --- */
  function init() {
    initParticles();
    initNavbar();
    initReveal();
    initCounters();
    initParallax();
    initFaq();
    initTestimonialSlider();
    initContactForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
