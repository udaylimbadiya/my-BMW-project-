
/* =============================================
   BMW M4 Homepage – script.js (cleaned)
   ============================================= */

// ── 1. NAVBAR: glassmorphism scroll effect ──────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });


// ── 2. VIDEO: autoplay fallback ─────────────────────────
const video = document.getElementById('heroVideo');

if (video) {
  video.addEventListener('error', () => {
    const wrapper = video.closest('.video-wrapper');
    wrapper.style.background =
      'linear-gradient(135deg, #0a0a0a 0%, #0d1b2e 40%, #0a2a4a 100%)';
    video.style.display = 'none';
  });
  video.muted = true;
  video.play().catch(() => {});
}


// ── 3. PARALLAX: subtle hero content shift on mouse ────
const heroContent = document.getElementById('heroContent');

document.addEventListener('mousemove', (e) => {
  if (!heroContent) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 12;
  const y = (e.clientY / window.innerHeight - 0.5) * 8;
  heroContent.style.transform = `translate(${x}px, ${y}px)`;
});


// ── 4. KEYBOARD ACCESSIBILITY ──────────────────────────
document.querySelectorAll('.btn-primary, .btn-ghost').forEach(btn => {
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      btn.click();
    }
  });
});


// ── 5. STAT COUNTER: animate numbers on load ───────────
function animateCounter(el, target, duration = 1800) {
  let start = null;
  const isDecimal = String(target).includes('.');

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = isDecimal ? (target * eased).toFixed(1) : Math.floor(target * eased);
    el.textContent = current;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

setTimeout(() => {
  const statEls = document.querySelectorAll('.stat-num');
  if (statEls[0]) animateCounter(statEls[0], 503, 1600);
  if (statEls[1]) {
    const small = statEls[1].querySelector('small');
    const textNode = statEls[1].firstChild;
    if (textNode && textNode.nodeType === Node.TEXT_NODE) {
      let start = null;
      function step(ts) {
        if (!start) start = ts;
        const p = Math.min((ts - start) / 1400, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        textNode.textContent = (3.5 * eased).toFixed(1);
        if (p < 1) requestAnimationFrame(step);
        else textNode.textContent = '3.5';
      }
      requestAnimationFrame(step);
    }
  }
}, 1600);


// ── 6. SECTION NAVIGATION ──────────────────────────────
function showHero() {
  exitDrive();
  document.querySelector('.hero').style.display = 'flex';
  document.getElementById('models').style.display = 'none';
  document.getElementById('innovation').style.display = 'none';
  document.getElementById('testdrive').style.display = 'none';
}

function showModels() {
  exitDrive();
  document.querySelector('.hero').style.display = 'none';
  document.getElementById('models').style.display = 'block';
  document.getElementById('innovation').style.display = 'none';
  document.getElementById('testdrive').style.display = 'none';
}

function showInnovation() {
  exitDrive();
  document.querySelector('.hero').style.display = 'none';
  document.getElementById('models').style.display = 'none';
  document.getElementById('innovation').style.display = 'block';
  document.getElementById('testdrive').style.display = 'none';
  document.body.style.overflow = 'auto';

  document.querySelectorAll('.icard').forEach((c, i) => {
    c.style.opacity = '0';
    c.style.transform = 'translateY(24px)';
    setTimeout(() => {
      c.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      c.style.opacity = '1';
      c.style.transform = 'translateY(0)';
    }, 80 + i * 80);
  });
}

function showTestDrive() {
  document.getElementById('hero').style.display = 'none';
  document.getElementById('models').style.display = 'none';
  document.getElementById('innovation').style.display = 'none';

  const td = document.getElementById('testdrive');
  td.style.display = 'block';

  const driveVideo = document.getElementById('driveVideo');
  driveVideo.pause();
  driveVideo.currentTime = 0;
  driveVideo.style.display = 'none';

  document.getElementById('tdIntro').style.display = 'flex';
  document.getElementById('tdIntro').style.opacity = '1';
  document.getElementById('tdIntro').style.pointerEvents = 'all';
  document.getElementById('tdExit').style.display = 'none';

  const ended = document.getElementById('tdEnded');
  if (ended) ended.style.display = 'none';
}


// ── 7. TEST DRIVE VIDEO ────────────────────────────────
function startDrive() {
  const driveVideo = document.getElementById('driveVideo');
  document.getElementById('tdIntro').style.display = 'none';
  driveVideo.style.display = 'block';
  document.getElementById('tdExit').style.display = 'block';
  driveVideo.muted = false;
  driveVideo.currentTime = 0;
  driveVideo.onended = null;

  driveVideo.play().catch(() => {
    driveVideo.muted = true;
    driveVideo.play();
  });

  driveVideo.onended = function () {
    driveVideo.pause();
    driveVideo.style.display = 'none';
    document.getElementById('tdExit').style.display = 'none';
    const ended = document.getElementById('tdEnded');
    if (ended) ended.style.display = 'flex';
    setTimeout(() => exitDrive(), 3000);
  };
}

function exitDrive() {
  const driveVideo = document.getElementById('driveVideo');
  driveVideo.onended = null;
  driveVideo.pause();
  driveVideo.muted = true;
  driveVideo.currentTime = 0;
  driveVideo.style.display = 'none';

  document.getElementById('tdExit').style.display = 'none';
  document.getElementById('testdrive').style.display = 'none';

  const ended = document.getElementById('tdEnded');
  if (ended) ended.style.display = 'none';

  document.getElementById('hero').style.display = 'flex';

/* =============================================
   BMW M4 Homepage – script.js (cleaned)
   ============================================= */

// ── 1. NAVBAR: glassmorphism scroll effect ──────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });


// ── 2. VIDEO: autoplay fallback ─────────────────────────
const video = document.getElementById('heroVideo');

if (video) {
  video.addEventListener('error', () => {
    const wrapper = video.closest('.video-wrapper');
    wrapper.style.background =
      'linear-gradient(135deg, #0a0a0a 0%, #0d1b2e 40%, #0a2a4a 100%)';
    video.style.display = 'none';
  });
  video.muted = true;
  video.play().catch(() => {});
}


// ── 3. PARALLAX: subtle hero content shift on mouse ────
const heroContent = document.getElementById('heroContent');

document.addEventListener('mousemove', (e) => {
  if (!heroContent) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 12;
  const y = (e.clientY / window.innerHeight - 0.5) * 8;
  heroContent.style.transform = `translate(${x}px, ${y}px)`;
});


// ── 4. KEYBOARD ACCESSIBILITY ──────────────────────────
document.querySelectorAll('.btn-primary, .btn-ghost').forEach(btn => {
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      btn.click();
    }
  });
});


// ── 5. STAT COUNTER: animate numbers on load ───────────
function animateCounter(el, target, duration = 1800) {
  let start = null;
  const isDecimal = String(target).includes('.');

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = isDecimal ? (target * eased).toFixed(1) : Math.floor(target * eased);
    el.textContent = current;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

setTimeout(() => {
  const statEls = document.querySelectorAll('.stat-num');
  if (statEls[0]) animateCounter(statEls[0], 503, 1600);
  if (statEls[1]) {
    const small = statEls[1].querySelector('small');
    const textNode = statEls[1].firstChild;
    if (textNode && textNode.nodeType === Node.TEXT_NODE) {
      let start = null;
      function step(ts) {
        if (!start) start = ts;
        const p = Math.min((ts - start) / 1400, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        textNode.textContent = (3.5 * eased).toFixed(1);
        if (p < 1) requestAnimationFrame(step);
        else textNode.textContent = '3.5';
      }
      requestAnimationFrame(step);
    }
  }
}, 1600);


// ── 6. SECTION NAVIGATION ──────────────────────────────
function showHero() {
  exitDrive();
  document.querySelector('.hero').style.display = 'flex';
  document.getElementById('models').style.display = 'none';
  document.getElementById('innovation').style.display = 'none';
  document.getElementById('testdrive').style.display = 'none';
}

function showModels() {
  exitDrive();
  document.querySelector('.hero').style.display = 'none';
  document.getElementById('models').style.display = 'block';
  document.getElementById('innovation').style.display = 'none';
  document.getElementById('testdrive').style.display = 'none';
}

function showInnovation() {
  exitDrive();
  document.querySelector('.hero').style.display = 'none';
  document.getElementById('models').style.display = 'none';
  document.getElementById('innovation').style.display = 'block';
  document.getElementById('testdrive').style.display = 'none';
  document.body.style.overflow = 'auto';

  document.querySelectorAll('.icard').forEach((c, i) => {
    c.style.opacity = '0';
    c.style.transform = 'translateY(24px)';
    setTimeout(() => {
      c.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      c.style.opacity = '1';
      c.style.transform = 'translateY(0)';
    }, 80 + i * 80);
  });
}

function showTestDrive() {
  document.getElementById('hero').style.display = 'none';
  document.getElementById('models').style.display = 'none';
  document.getElementById('innovation').style.display = 'none';

  const td = document.getElementById('testdrive');
  td.style.display = 'block';

  const driveVideo = document.getElementById('driveVideo');
  driveVideo.pause();
  driveVideo.currentTime = 0;
  driveVideo.style.display = 'none';

  document.getElementById('tdIntro').style.display = 'flex';
  document.getElementById('tdIntro').style.opacity = '1';
  document.getElementById('tdIntro').style.pointerEvents = 'all';
  document.getElementById('tdExit').style.display = 'none';

  const ended = document.getElementById('tdEnded');
  if (ended) ended.style.display = 'none';
}


// ── 7. TEST DRIVE VIDEO ────────────────────────────────
function startDrive() {
  const driveVideo = document.getElementById('driveVideo');
  document.getElementById('tdIntro').style.display = 'none';
  driveVideo.style.display = 'block';
  document.getElementById('tdExit').style.display = 'block';
  driveVideo.muted = false;
  driveVideo.currentTime = 0;
  driveVideo.onended = null;

  driveVideo.play().catch(() => {
    driveVideo.muted = true;
    driveVideo.play();
  });

  driveVideo.onended = function () {
    driveVideo.pause();
    driveVideo.style.display = 'none';
    document.getElementById('tdExit').style.display = 'none';
    const ended = document.getElementById('tdEnded');
    if (ended) ended.style.display = 'flex';
    setTimeout(() => exitDrive(), 3000);
  };
}

function exitDrive() {
  const driveVideo = document.getElementById('driveVideo');
  driveVideo.onended = null;
  driveVideo.pause();
  driveVideo.muted = true;
  driveVideo.currentTime = 0;
  driveVideo.style.display = 'none';

  document.getElementById('tdExit').style.display = 'none';
  document.getElementById('testdrive').style.display = 'none';

  const ended = document.getElementById('tdEnded');
  if (ended) ended.style.display = 'none';

  document.getElementById('hero').style.display = 'flex';
}
}
