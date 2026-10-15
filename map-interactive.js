/* ==========================================================================
   INTERACTIVE JOURNEY MAP & CRAFT LIST
   ========================================================================== */

export function initInteractiveMap() {
  const mapPins = document.querySelectorAll('.map-pin');
  const craftCards = document.querySelectorAll('.craft-card');

  // Synchronize hover on Map Pin -> Craft Card
  mapPins.forEach(pin => {
    const targetId = pin.getAttribute('data-craft');

    pin.addEventListener('mouseenter', () => {
      highlightCraft(targetId);
    });

    pin.addEventListener('mouseleave', () => {
      resetHighlights();
    });

    pin.addEventListener('click', () => {
      scrollToSection(targetId);
    });
  });

  // Synchronize hover on Craft Card -> Map Pin
  craftCards.forEach(card => {
    const targetId = card.getAttribute('data-craft');

    card.addEventListener('mouseenter', () => {
      highlightCraft(targetId);
    });

    card.addEventListener('mouseleave', () => {
      resetHighlights();
    });

    card.addEventListener('click', () => {
      scrollToSection(targetId);
    });
  });

  function highlightCraft(craftId) {
    mapPins.forEach(pin => {
      if (pin.getAttribute('data-craft') === craftId) {
        pin.classList.add('highlighted');
      } else {
        pin.classList.remove('highlighted');
      }
    });

    craftCards.forEach(card => {
      if (card.getAttribute('data-craft') === craftId) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  }

  function resetHighlights() {
    mapPins.forEach(pin => pin.classList.remove('highlighted'));
    craftCards.forEach(card => card.classList.remove('active'));
  }

  function scrollToSection(craftId) {
    const section = document.getElementById(craftId);
    if (section) {
      const topOffset = section.getBoundingClientRect().top + window.scrollY - 30;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
    }
  }
}
