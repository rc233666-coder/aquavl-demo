/* ============================================================
   AQUAVL PROPERTY CARE — MAIN JAVASCRIPT
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

  /* ---- Active nav link on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function highlightNavLink() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');
      navLinks.forEach(link => {
        if (link.getAttribute('href') === `#${id}`) {
          if (scrollY >= top && scrollY < bottom) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        }
      });
    });
  }

  window.addEventListener('scroll', highlightNavLink, { passive: true });

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

  hamburger.addEventListener('click', function () {
    if (mobileMenu.classList.contains('open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMobileMenu();
  });

  /* ---- Smooth scroll for all anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
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
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  /* ---- Form Validation ---- */
  const form = document.getElementById('quoteForm');
  const submitBtn = document.getElementById('formSubmitBtn');

  if (form) {
    form.addEventListener('submit', function (e) {
      const name = document.getElementById('formName');
      const phone = document.getElementById('formPhone');
      const email = document.getElementById('formEmail');
      let isValid = true;

      // Reset previous errors
      [name, phone, email].forEach(field => {
        field.style.borderColor = '';
        field.style.boxShadow = '';
      });

      if (!name.value.trim()) {
        name.style.borderColor = '#ef4444';
        name.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.12)';
        isValid = false;
      }

      if (!phone.value.trim()) {
        phone.style.borderColor = '#ef4444';
        phone.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.12)';
        isValid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailRegex.test(email.value)) {
        email.style.borderColor = '#ef4444';
        email.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.12)';
        isValid = false;
      }

      if (!isValid) {
        e.preventDefault();
        // Scroll to first error
        const firstError = form.querySelector('[style*="ef4444"]');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstError.focus();
        }
        return;
      }

      // Loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;">
          <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
        </svg>
        Sending...
      `;

      // Add spin animation
      const style = document.createElement('style');
      style.textContent = '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
      document.head.appendChild(style);
    });
  }

  /* ---- Service card hover enhancement ---- */
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      serviceCards.forEach(c => {
        if (c !== card) {
          c.style.opacity = '0.75';
        }
      });
    });

    card.addEventListener('mouseleave', function () {
      serviceCards.forEach(c => {
        c.style.opacity = '';
      });
    });
  });

  /* ---- Hero badge entrance animation ---- */
  const heroBadges = document.querySelectorAll('.hero-badge-item');
  heroBadges.forEach((badge, i) => {
    badge.style.opacity = '0';
    badge.style.transform = 'translateY(12px)';
    badge.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    setTimeout(() => {
      badge.style.opacity = '1';
      badge.style.transform = 'translateY(0)';
    }, 600 + i * 100);
  });

  /* ---- Gallery Carousel Slider ---- */
  const galleryTrack = document.getElementById('galleryCarouselTrack');
  const galleryWrapper = document.getElementById('galleryCarouselWrapper');
  const galleryPrevBtn = document.getElementById('galleryPrevBtn');
  const galleryNextBtn = document.getElementById('galleryNextBtn');
  const galleryDotsContainer = document.getElementById('galleryCarouselDots');
  const galleryCards = document.querySelectorAll('#galleryCarouselTrack .gallery-card');

  if (galleryTrack && galleryWrapper && galleryCards.length > 0) {
    let gCurrentIndex = 0;
    let gCardsToShow = 3;
    let gStartX = 0;
    let gCurrentTranslate = 0;
    let gPrevTranslate = 0;
    let gIsDragging = false;

    function gUpdateCardsToShow() {
      const width = window.innerWidth;
      if (width >= 992) {
        gCardsToShow = 3;
      } else if (width >= 768) {
        gCardsToShow = 2;
      } else {
        gCardsToShow = 1;
      }

      const maxIndex = galleryCards.length - gCardsToShow;
      if (gCurrentIndex > maxIndex) {
        gCurrentIndex = Math.max(0, maxIndex);
      }

      gUpdateCarouselWidths();
      gCreateDots();
      gUpdateSlider();
    }

    function gUpdateCarouselWidths() {
      const gap = 24;
      const wrapperWidth = galleryWrapper.offsetWidth;
      const cardWidth = (wrapperWidth - (gap * (gCardsToShow - 1))) / gCardsToShow;

      galleryCards.forEach(card => {
        card.style.width = `${cardWidth}px`;
      });
    }

    function gCreateDots() {
      if (!galleryDotsContainer) return;
      galleryDotsContainer.innerHTML = '';
      const totalSteps = galleryCards.length - gCardsToShow + 1;

      if (totalSteps <= 1) return;

      for (let i = 0; i < totalSteps; i++) {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        if (i === gCurrentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => {
          gCurrentIndex = i;
          gUpdateSlider();
        });
        galleryDotsContainer.appendChild(dot);
      }
    }

    function gUpdateSlider() {
      const gap = 24;
      const cardWidth = galleryCards[0].offsetWidth;
      const translateAmount = -gCurrentIndex * (cardWidth + gap);

      galleryTrack.style.transform = `translateX(${translateAmount}px)`;
      gPrevTranslate = translateAmount;

      const dots = galleryDotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === gCurrentIndex);
      });

      if (galleryPrevBtn) galleryPrevBtn.disabled = gCurrentIndex === 0;
      if (galleryNextBtn) galleryNextBtn.disabled = gCurrentIndex >= (galleryCards.length - gCardsToShow);
    }

    if (galleryPrevBtn) {
      galleryPrevBtn.addEventListener('click', () => {
        if (gCurrentIndex > 0) { gCurrentIndex--; gUpdateSlider(); }
      });
    }

    if (galleryNextBtn) {
      galleryNextBtn.addEventListener('click', () => {
        if (gCurrentIndex < galleryCards.length - gCardsToShow) { gCurrentIndex++; gUpdateSlider(); }
      });
    }

    // Touch events
    galleryWrapper.addEventListener('touchstart', e => {
      gStartX = e.touches[0].clientX;
      gIsDragging = true;
      galleryTrack.style.transition = 'none';
    }, { passive: true });

    galleryWrapper.addEventListener('touchmove', e => {
      if (!gIsDragging) return;
      gCurrentTranslate = gPrevTranslate + (e.touches[0].clientX - gStartX);
      galleryTrack.style.transform = `translateX(${gCurrentTranslate}px)`;
    }, { passive: true });

    galleryWrapper.addEventListener('touchend', e => {
      if (!gIsDragging) return;
      gIsDragging = false;
      const diff = e.changedTouches[0].clientX - gStartX;
      galleryTrack.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      if (Math.abs(diff) > 50) {
        if (diff < 0 && gCurrentIndex < galleryCards.length - gCardsToShow) gCurrentIndex++;
        else if (diff > 0 && gCurrentIndex > 0) gCurrentIndex--;
      }
      gUpdateSlider();
    });

    // Mouse drag events
    galleryWrapper.addEventListener('mousedown', e => {
      gStartX = e.clientX;
      gIsDragging = true;
      galleryTrack.style.transition = 'none';
      e.preventDefault();
    });

    galleryWrapper.addEventListener('mousemove', e => {
      if (!gIsDragging) return;
      gCurrentTranslate = gPrevTranslate + (e.clientX - gStartX);
      galleryTrack.style.transform = `translateX(${gCurrentTranslate}px)`;
    });

    galleryWrapper.addEventListener('mouseup', e => {
      if (!gIsDragging) return;
      gIsDragging = false;
      const diff = e.clientX - gStartX;
      galleryTrack.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      if (Math.abs(diff) > 50) {
        if (diff < 0 && gCurrentIndex < galleryCards.length - gCardsToShow) gCurrentIndex++;
        else if (diff > 0 && gCurrentIndex > 0) gCurrentIndex--;
      }
      gUpdateSlider();
    });

    galleryWrapper.addEventListener('mouseleave', () => {
      if (gIsDragging) {
        gIsDragging = false;
        galleryTrack.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        gUpdateSlider();
      }
    });

    window.addEventListener('resize', gUpdateCardsToShow);
    gUpdateCardsToShow();
  }

  /* ---- Click-to-call tracking (optional analytics hook) ---- */
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function () {
      console.info('[AquaVL] Click-to-call initiated');
    });
  });

})();
