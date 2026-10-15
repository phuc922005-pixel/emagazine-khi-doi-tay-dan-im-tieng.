/* ==========================================================================
   SCROLL PROGRESS & TABLE OF CONTENTS TRACKER
   ========================================================================== */

export function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress-bar');
  const tocItems = document.querySelectorAll('.toc-item');
  const mobileLinks = document.querySelectorAll('.mobile-toc-link');
  const trackedSections = document.querySelectorAll('section[id], header[id]');

  function updateProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) {
      progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }
  }

  // Active section observer
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        setActiveNav(id);
      }
    });
  }, observerOptions);

  trackedSections.forEach(sec => sectionObserver.observe(sec));

  function setActiveNav(id) {
    if (!id) return;

    tocItems.forEach(item => {
      if (item.getAttribute('data-target') === id) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    mobileLinks.forEach(link => {
      if (link.getAttribute('href') === `#${id}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}
