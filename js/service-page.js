/* ============================================================
   AQUAVL — SERVICE PAGE JAVASCRIPT
   Lightweight — no dependencies
   ============================================================ */

(function () {
  'use strict';

  /* ---- Navbar scroll effect ---- */
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  /* ---- Mobile Menu ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  function openMobileMenu() {
    hamburger.classList.add('active');
    mobileMenu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  window.closeMobileMenu = function () {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      if (mobileMenu.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMobileMenu();
  });

  /* ---- Scroll Reveal (Intersection Observer) ---- */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  /* ---- FAQ Accordion ---- */
  const faqItems = document.querySelectorAll('.sp-faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.sp-faq-question');
    const answer = item.querySelector('.sp-faq-answer');

    if (!btn || !answer) return;

    btn.addEventListener('click', function () {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      // Close all others
      faqItems.forEach(otherItem => {
        const otherBtn = otherItem.querySelector('.sp-faq-question');
        const otherAnswer = otherItem.querySelector('.sp-faq-answer');
        if (otherBtn && otherAnswer && otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          otherAnswer.setAttribute('hidden', '');
        }
      });

      // Toggle this one
      if (isExpanded) {
        btn.setAttribute('aria-expanded', 'false');
        answer.setAttribute('hidden', '');
      } else {
        btn.setAttribute('aria-expanded', 'true');
        answer.removeAttribute('hidden');
        // Smooth scroll into view if needed
        setTimeout(() => {
          const rect = item.getBoundingClientRect();
          if (rect.bottom > window.innerHeight) {
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 50);
      }
    });
  });

  /* ---- Click-to-call tracking ---- */
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function () {
      console.info('[AquaVL] Click-to-call initiated from service page');
    });
  });

})();
