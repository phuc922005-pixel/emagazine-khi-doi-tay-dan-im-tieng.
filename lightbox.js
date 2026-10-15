/* ==========================================================================
   DOCUMENTARY PHOTOGRAPHY LIGHTBOX MODAL
   ========================================================================== */

export function initLightbox() {
  const modal = document.getElementById('lightboxModal');
  const imgEl = document.getElementById('lightboxImage');
  const captionEl = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');
  const triggers = document.querySelectorAll('.lightbox-trigger');

  if (!modal || !imgEl || !closeBtn) return;

  let lastActiveElement = null;

  function openLightbox(src, alt, caption) {
    lastActiveElement = document.activeElement;
    imgEl.src = src;
    imgEl.alt = alt || "Documentary Photograph";
    captionEl.textContent = caption || alt || "";
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeLightbox() {
    modal.classList.remove('active');
    imgEl.src = "";
    document.body.style.overflow = '';
    if (lastActiveElement) lastActiveElement.focus();
  }

  triggers.forEach(trigger => {
    trigger.style.cursor = 'zoom-in';
    trigger.setAttribute('tabindex', '0');
    trigger.setAttribute('role', 'button');
    trigger.setAttribute('aria-label', 'Phóng to ảnh tư liệu');

    function handleTrigger() {
      const src = trigger.getAttribute('data-full') || trigger.src;
      const alt = trigger.alt;
      const caption = trigger.getAttribute('data-caption') || alt;
      openLightbox(src, alt, caption);
    }

    trigger.addEventListener('click', handleTrigger);
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleTrigger();
      }
    });
  });

  closeBtn.addEventListener('click', closeLightbox);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeLightbox();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeLightbox();
    }
  });
}
