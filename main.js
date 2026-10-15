/* ==========================================================================
   MAIN APPLICATION SCRIPT - eMAGAZINE "KHI ĐÔI TAY DẦN IM TIẾNG"
   ========================================================================== */

import { initScrollProgress } from './scroll-progress.js';
import { initInteractiveMap } from './map-interactive.js';
import { initFolkInspector } from './folk-inspector.js';
import { initAudioPlayer } from './audio-player.js';
import { initLightbox } from './lightbox.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize submodules
  initScrollProgress();
  initInteractiveMap();
  initFolkInspector();
  initAudioPlayer();
  initLightbox();

  // Scroll Reveal Animation via IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal-fade-up');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // Smooth Scroll for CTA buttons and Anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const topOffset = targetEl.getBoundingClientRect().top + window.scrollY - 20;
        window.scrollTo({
          top: topOffset,
          behavior: 'smooth'
        });

        // Close mobile TOC if open
        const mobileDrawer = document.getElementById('mobileTocDrawer');
        if (mobileDrawer && mobileDrawer.classList.contains('open')) {
          mobileDrawer.classList.remove('open');
          document.body.style.overflow = '';
        }
      }
    });
  });

  // Mobile TOC Drawer Controls
  const mobileTocToggle = document.getElementById('mobileTocToggle');
  const mobileTocClose = document.getElementById('mobileTocClose');
  const mobileDrawer = document.getElementById('mobileTocDrawer');

  if (mobileTocToggle && mobileDrawer && mobileTocClose) {
    mobileTocToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
      mobileTocClose.focus();
    });

    mobileTocClose.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
      document.body.style.overflow = '';
    });

    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) {
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }
});
