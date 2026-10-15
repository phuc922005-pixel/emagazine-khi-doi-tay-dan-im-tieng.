/* ==========================================================================
   eMAGAZINE "KHI ĐÔI TAY DẦN IM TIẾNG" - COMPLETE CLIENT SCRIPT BUNDLE
   Standalone, dependency-free vanilla JS.
   Compatible with both HTTP local servers and direct file:// protocol opening.
   ========================================================================== */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. SCROLL PROGRESS BAR & TABLE OF CONTENTS TRACKER
     -------------------------------------------------------------------------- */
  function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress-bar');
    const tocItems = document.querySelectorAll('.toc-item');
    const mobileLinks = document.querySelectorAll('.mobile-toc-link');
    const trackedSections = document.querySelectorAll('section[id], header[id]');

    function updateProgress() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (progressBar) {
        progressBar.style.width = Math.min(100, Math.max(0, progress)) + '%';
      }
    }

    if ('IntersectionObserver' in window) {
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute('id');
              setActiveNav(id);
            }
          });
        },
        { root: null, rootMargin: '-20% 0px -60% 0px', threshold: 0 }
      );

      trackedSections.forEach((sec) => sectionObserver.observe(sec));
    }

    function setActiveNav(id) {
      if (!id) return;

      tocItems.forEach((item) => {
        if (item.getAttribute('data-target') === id) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });

      mobileLinks.forEach((link) => {
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* --------------------------------------------------------------------------
     2. INTERACTIVE JOURNEY MAP & CRAFT ROSTER
     -------------------------------------------------------------------------- */
  function initInteractiveMap() {
    const mapPins = document.querySelectorAll('.map-pin');
    const craftCards = document.querySelectorAll('.craft-card');

    mapPins.forEach((pin) => {
      const targetId = pin.getAttribute('data-craft');

      pin.addEventListener('mouseenter', () => highlightCraft(targetId));
      pin.addEventListener('mouseleave', () => resetHighlights());
      pin.addEventListener('click', () => scrollToSection(targetId));
    });

    craftCards.forEach((card) => {
      const targetId = card.getAttribute('data-craft');

      card.addEventListener('mouseenter', () => highlightCraft(targetId));
      card.addEventListener('mouseleave', () => resetHighlights());
      card.addEventListener('click', () => scrollToSection(targetId));
    });

    function highlightCraft(craftId) {
      mapPins.forEach((pin) => {
        if (pin.getAttribute('data-craft') === craftId) {
          pin.classList.add('highlighted');
        } else {
          pin.classList.remove('highlighted');
        }
      });

      craftCards.forEach((card) => {
        if (card.getAttribute('data-craft') === craftId) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });
    }

    function resetHighlights() {
      mapPins.forEach((pin) => pin.classList.remove('highlighted'));
      craftCards.forEach((card) => card.classList.remove('active'));
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

  /* --------------------------------------------------------------------------
     3. INTERACTIVE FOLK PRINT WOODBLOCK COLOR INSPECTOR (CHAPTER 03)
     -------------------------------------------------------------------------- */
  const DONGHO_DETAILS = {
    diep: {
      title: 'MÀU ĐIỆP (TRẮNG ÁNH XÀ CỪ)',
      material: 'Vỏ sò điệp biển nghiền mịn + Hồ nếp làng',
      technique: 'Quét bằng chổi lá dứa trên giấy dó',
      description:
        'Lớp nền đặc trưng nhất của tranh Đông Hồ. Người thợ dùng vỏ con sò điệp biển (sò gai) nghiền thành bột mịn, hòa với hồ nếp quánh dẻo, rồi dùng chổi lá dứa quét đều lên từng tờ giấy dó. Những đường quét chổi tạo nên các thớ gân nổi sần sùi và ánh xà cừ trắng lấp lánh khi nghiêng dưới ánh sáng mặt trời.',
      woodblock: 'Lớp quét thủ công trước khi in các ván màu'
    },
    den: {
      title: 'MÀU ĐEN (THAN LÁ TRE KHÔ)',
      material: 'Than lá tre khô ủ kín trong lu sành',
      technique: 'Ván in nét đen (nét khắc tinh xảo nhất)',
      description:
        'Màu đen được người thợ chế tác bằng cách gom lá tre khô sạch vào lu sành, ủ đốt âm ỉ không có oxy. Bột than lá tre siêu mịn, sâu thẳm, không bao giờ ngả xám hay phai nhạt dù trải qua hàng trăm năm. Ván nét đen luôn là ván in cuối cùng để định hình toàn bộ nhân vật, cử chỉ và thần thái của bức tranh.',
      woodblock: 'Ván nét đen (in cuối cùng)'
    },
    vang: {
      title: 'MÀU VÀNG (HOA HÒE & DÀNH DÀNH)',
      material: 'Nụ hoa hòe sao vàng hoặc quả dành dành',
      technique: 'Nấu nước cốt cô đặc',
      description:
        'Màu vàng ấm áp tựa ánh nắng mùa gặt đồng bằng Bắc Bộ được chiết xuất từ nụ hoa hòe phơi khô sao vàng hạ thổ, hoặc quả dành dành giã dập nấu nước. Sắc vàng này dịu nhẹ, thanh khiết, không rực chói như màu hóa học hiện đại và mang tính thẩm mỹ trầm mặc của làng quê Việt.',
      woodblock: 'Ván in mảng màu vàng'
    },
    do: {
      title: 'MÀU ĐỎ SON (SỎI SON TỰ NHIÊN)',
      material: 'Đá sỏi son khai thác từ vùng núi đồi Kinh Bắc',
      technique: 'Nghiền cối đá và lắng lọc bột son',
      description:
        'Sắc đỏ nồng đượm của tranh Đông Hồ không dùng phẩm màu công nghiệp, mà dùng những viên sỏi son tự nhiên khai thác từ lòng đất đồi. Sỏi được nghiền thủ công bằng cối đá, lắng gạn nhiều lần để thu được lớp bột son tinh mịn. Màu đỏ này đại diện cho sự may mắn, sinh sôi và thịnh vượng ngày Tết.',
      woodblock: 'Ván in mảng màu đỏ son'
    },
    xanh: {
      title: 'MÀU XANH (GỈ ĐỒNG & LÁ CHÀM)',
      material: 'Gỉ đồng xanh tự nhiên ngâm dấm hoặc lá chàm',
      technique: 'Lắng đọng bột màu tự nhiên',
      description:
        'Màu xanh trầm mát của lá sen, khóm chuối hay bờ tre được điều chế từ bột gỉ đồng xanh hoặc chiết xuất từ lá chàm ủ lên men. Nhờ nguồn gốc khoáng vật và thực vật này, bức tranh luôn toát lên vẻ đẹp mộc mạc, gần gũi với thiên nhiên và không bị phai màu dưới tác động của thời gian.',
      woodblock: 'Ván in mảng màu xanh'
    }
  };

  function initFolkInspector() {
    const hotspots = document.querySelectorAll('.folk-hotspot');
    const swatches = document.querySelectorAll('.color-swatch-item');
    const titleEl = document.getElementById('folkDetailTitle');
    const materialEl = document.getElementById('folkDetailMaterial');
    const techniqueEl = document.getElementById('folkDetailTechnique');
    const descEl = document.getElementById('folkDetailDesc');
    const woodblockEl = document.getElementById('folkDetailWoodblock');

    if (!titleEl || !hotspots.length) return;

    function updateDetail(key) {
      const data = DONGHO_DETAILS[key];
      if (!data) return;

      hotspots.forEach((h) => {
        h.classList.toggle('active', h.getAttribute('data-color') === key);
      });

      swatches.forEach((s) => {
        s.classList.toggle('active', s.getAttribute('data-color') === key);
      });

      titleEl.textContent = data.title;
      if (materialEl) materialEl.textContent = data.material;
      if (techniqueEl) techniqueEl.textContent = data.technique;
      if (descEl) descEl.textContent = data.description;
      if (woodblockEl) woodblockEl.textContent = data.woodblock;
    }

    hotspots.forEach((spot) => {
      spot.addEventListener('click', () => {
        const colorKey = spot.getAttribute('data-color');
        updateDetail(colorKey);
      });
    });

    swatches.forEach((swatch) => {
      swatch.addEventListener('click', () => {
        const colorKey = swatch.getAttribute('data-color');
        updateDetail(colorKey);
      });
    });

    updateDetail('diep');
  }

  /* --------------------------------------------------------------------------
     4. AUTHENTIC ACOUSTIC STRING AUDIO PLAYER (CHAPTER 04)
     Synthesizes wood resonance decay via Web Audio API. Zero fake buttons.
     -------------------------------------------------------------------------- */
  function initAudioPlayer() {
    const playBtn = document.getElementById('audioPlayBtn');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    const canvas = document.getElementById('audioWaveformCanvas');
    const timeDisplay = document.getElementById('audioTimeDisplay');
    const scrubBar = document.getElementById('audioScrubBar');

    if (!playBtn || !canvas) return;

    const ctx = canvas.getContext('2d');
    let audioCtx = null;
    let isPlaying = false;
    let animationId = null;
    let timerInterval = null;
    let elapsedSeconds = 0;
    const TOTAL_DURATION = 42;

    const PENTATONIC_SEQUENCE = [
      { freq: 261.63, duration: 1.8, delay: 0 },
      { freq: 293.66, duration: 1.4, delay: 1.4 },
      { freq: 349.23, duration: 2.2, delay: 2.6 },
      { freq: 392.0, duration: 1.6, delay: 4.4 },
      { freq: 440.0, duration: 2.4, delay: 5.8 },
      { freq: 523.25, duration: 2.8, delay: 7.8 },
      { freq: 392.0, duration: 1.5, delay: 10.2 },
      { freq: 349.23, duration: 2.0, delay: 11.5 },
      { freq: 293.66, duration: 1.8, delay: 13.2 },
      { freq: 261.63, duration: 3.5, delay: 14.8 }
    ];

    let loopTimeout = null;
    let activeNodes = [];

    function initAudioContext() {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContextClass();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    }

    function pluckString(freq, duration, startTime) {
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      const harmonic = audioCtx.createOscillator();
      harmonic.type = 'sine';
      harmonic.frequency.setValueAtTime(freq * 2, startTime);

      const gainNode = audioCtx.createGain();
      const harmonicGain = audioCtx.createGain();

      const now = startTime;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.28, now + 0.025);
      gainNode.gain.exponentialRampToValueAtTime(0.0008, now + duration);

      harmonicGain.gain.setValueAtTime(0, now);
      harmonicGain.gain.linearRampToValueAtTime(0.08, now + 0.02);
      harmonicGain.gain.exponentialRampToValueAtTime(0.0005, now + duration * 0.6);

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.frequency.exponentialRampToValueAtTime(450, now + duration);

      osc.connect(gainNode);
      harmonic.connect(harmonicGain);
      harmonicGain.connect(gainNode);
      gainNode.connect(filter);
      filter.connect(audioCtx.destination);

      osc.start(now);
      harmonic.start(now);
      osc.stop(now + duration);
      harmonic.stop(now + duration);

      activeNodes.push(osc, harmonic);
    }

    function playSequence() {
      if (!isPlaying || !audioCtx) return;

      const baseTime = audioCtx.currentTime;
      PENTATONIC_SEQUENCE.forEach((note) => {
        pluckString(note.freq, note.duration, baseTime + note.delay);
      });

      loopTimeout = setTimeout(() => {
        if (isPlaying) {
          playSequence();
        }
      }, 18500);
    }

    function stopSequence() {
      if (loopTimeout) clearTimeout(loopTimeout);
      activeNodes.forEach((node) => {
        try {
          node.stop();
          node.disconnect();
        } catch (e) {}
      });
      activeNodes = [];
    }

    function drawWaveform(time) {
      if (!ctx) return;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      const barsCount = 36;
      const barWidth = 3;
      const gap = (width - barsCount * barWidth) / (barsCount - 1);

      for (let i = 0; i < barsCount; i++) {
        const x = i * (barWidth + gap);
        let h = 4;
        if (isPlaying) {
          const wave1 = Math.sin(time * 0.005 + i * 0.35);
          const wave2 = Math.cos(time * 0.003 - i * 0.2);
          const intensity = Math.abs(wave1 * 0.6 + wave2 * 0.4);
          h = Math.max(4, intensity * (height * 0.85));
        }
        const y = (height - h) / 2;

        ctx.fillStyle = isPlaying ? '#9F392C' : 'rgba(113, 107, 96, 0.35)';
        ctx.fillRect(x, y, barWidth, h);
      }

      animationId = requestAnimationFrame(drawWaveform);
    }

    function formatTime(sec) {
      const mins = Math.floor(sec / 60);
      const remSecs = sec % 60;
      return mins + ':' + (remSecs < 10 ? '0' : '') + remSecs;
    }

    function updateTimer() {
      elapsedSeconds++;
      if (elapsedSeconds >= TOTAL_DURATION) {
        elapsedSeconds = 0;
      }
      if (timeDisplay) {
        timeDisplay.textContent = formatTime(elapsedSeconds) + ' / ' + formatTime(TOTAL_DURATION);
      }
      if (scrubBar) {
        scrubBar.style.width = (elapsedSeconds / TOTAL_DURATION) * 100 + '%';
      }
    }

    function togglePlayback() {
      initAudioContext();

      if (!isPlaying) {
        isPlaying = true;
        if (playIcon) playIcon.style.display = 'none';
        if (pauseIcon) pauseIcon.style.display = 'block';
        playSequence();
        timerInterval = setInterval(updateTimer, 1000);
      } else {
        isPlaying = false;
        if (playIcon) playIcon.style.display = 'block';
        if (pauseIcon) pauseIcon.style.display = 'none';
        stopSequence();
        if (timerInterval) clearInterval(timerInterval);
      }
    }

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawWaveform(0);

    playBtn.addEventListener('click', togglePlayback);
  }

  /* --------------------------------------------------------------------------
     5. DOCUMENTARY PHOTOGRAPHY LIGHTBOX MODAL
     -------------------------------------------------------------------------- */
  function initLightbox() {
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
      imgEl.alt = alt || 'Documentary Photograph';
      captionEl.textContent = caption || alt || '';
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }

    function closeLightbox() {
      modal.classList.remove('active');
      imgEl.src = '';
      document.body.style.overflow = '';
      if (lastActiveElement) lastActiveElement.focus();
    }

    triggers.forEach((trigger) => {
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

  /* --------------------------------------------------------------------------
     INITIALIZE ALL MODULES ON DOM READY
     -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
    initInteractiveMap();
    initFolkInspector();
    initAudioPlayer();
    initLightbox();

    // Scroll Reveal Animation via IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal-fade-up');
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        { root: null, rootMargin: '0px 0px -60px 0px', threshold: 0.1 }
      );

      revealElements.forEach((el) => revealObserver.observe(el));
    } else {
      revealElements.forEach((el) => el.classList.add('revealed'));
    }

    // Smooth Scroll for CTA buttons and Anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
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
})();
