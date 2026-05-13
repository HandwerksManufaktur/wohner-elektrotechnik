/* Elektrotechnik Wohner — main.js */

// Mobile burger menu
const burger = document.getElementById('burger');
if (burger) {
  burger.addEventListener('click', () => {
    document.querySelector('.nav').classList.toggle('open');
  });
}

// Nav scroll state (transparent → solid)
const nav = document.querySelector('.nav');
const onScroll = () => nav && nav.classList.toggle('scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal').forEach(r => io.observe(r));

// Filter tabs (references gallery on home)
document.querySelectorAll('.filter-tabs').forEach(group => {
  const tabs = group.querySelectorAll('.filter-tab');
  const gallery = group.nextElementSibling;
  if (!gallery) return;
  const items = gallery.querySelectorAll('.gallery-item[data-cat]');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const f = tab.dataset.filter;
      items.forEach(it => {
        it.classList.toggle('hidden', !(f === 'all' || it.dataset.cat === f));
      });
    });
  });
});

// Randomize gallery images on subpages every page load
(function() {
  document.querySelectorAll('.gallery').forEach(function(gallery) {
    var items = Array.from(gallery.querySelectorAll('.gallery-item[data-img]'));
    if (items.length < 2) return;
    if (items[0].hasAttribute('data-cat')) return; // skip home filter gallery
    var srcs = items.map(function(it) { return it.dataset.img; });
    for (var i = srcs.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = srcs[i]; srcs[i] = srcs[j]; srcs[j] = t;
    }
    items.forEach(function(it, idx) {
      it.dataset.img = srcs[idx];
      var img = it.querySelector('img');
      if (img) img.src = srcs[idx];
    });
  });
})();

// Lightbox
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCounter = document.getElementById('lbCounter');
let lbList = [], lbIdx = 0;

function openLb(list, idx) {
  lbList = list; lbIdx = idx;
  renderLb();
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLb() {
  lb.classList.remove('open');
  document.body.style.overflow = '';
}
function renderLb() {
  const it = lbList[lbIdx]; if (!it) return;
  lbImg.src = it.src;
  lbCounter.textContent = String(lbIdx + 1).padStart(2, '0') + ' / ' + String(lbList.length).padStart(2, '0');
}
function nextLb() { lbIdx = (lbIdx + 1) % lbList.length; renderLb(); }
function prevLb() { lbIdx = (lbIdx - 1 + lbList.length) % lbList.length; renderLb(); }

document.querySelectorAll('.gallery-item[data-img]').forEach((it) => {
  it.addEventListener('click', () => {
    const scope = it.closest('.gallery');
    const allInScope = Array.from(scope.querySelectorAll('.gallery-item[data-img]:not(.hidden)'));
    openLb(allInScope.map(v => ({ src: v.dataset.img })), allInScope.indexOf(it));
  });
});

if (lb) {
  document.getElementById('lbClose').addEventListener('click', closeLb);
  document.getElementById('lbNext').addEventListener('click', nextLb);
  document.getElementById('lbPrev').addEventListener('click', prevLb);
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowRight') nextLb();
    if (e.key === 'ArrowLeft') prevLb();
  });
}

// Contact form – Formspree
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Wird gesendet…';
    const timeField = document.getElementById('form-time');
    if (timeField) timeField.value = new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' });
    try {
      const res = await fetch('https://formspree.io/f/mzdowkak', {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        btn.textContent = 'Nachricht gesendet ✓';
        btn.style.background = 'var(--green)';
        contactForm.reset();
      } else {
        btn.textContent = 'Fehler – bitte erneut versuchen';
        btn.style.background = '#c0392b';
        btn.disabled = false;
      }
    } catch {
      btn.textContent = 'Fehler – bitte erneut versuchen';
      btn.style.background = '#c0392b';
      btn.disabled = false;
    }
  });
}

// Testimonial show-more toggle
const testiBtn = document.getElementById('testi-toggle-btn');
if (testiBtn) {
  testiBtn.addEventListener('click', () => {
    const wrap = document.getElementById('testi-more-wrap');
    const open = wrap.classList.toggle('visible');
    testiBtn.textContent = open ? 'Weniger anzeigen ↑' : 'Weitere Bewertungen anzeigen ↓';
    if (open) {
      wrap.querySelectorAll('.reveal').forEach(r => {
        setTimeout(() => r.classList.add('in'), 50);
      });
    }
  });
}

// Subhero slideshow
(function() {
  var bg = document.querySelector('.subhero__bg[data-slideshow]');
  if (!bg) return;
  var srcs = bg.dataset.slideshow.split(',').map(function(s) { return s.trim(); });
  if (srcs.length < 2) return;
  var bgPos = bg.style.backgroundPosition || 'center center';
  var layers = [bg];
  srcs.slice(1).forEach(function(src) {
    var d = document.createElement('div');
    d.className = 'subhero__bg--slide';
    d.style.backgroundImage = 'url(' + src + ')';
    d.style.backgroundPosition = bgPos;
    bg.parentNode.insertBefore(d, bg.nextSibling);
    layers.push(d);
  });
  var idx = 0;
  setInterval(function() {
    layers[idx].style.opacity = '0';
    idx = (idx + 1) % layers.length;
    layers[idx].style.opacity = layers[idx].classList.contains('subhero__bg--slide') ? '0.55' : '0.55';
    layers[idx].style.opacity = '0.55';
  }, 5000);
})();

// Cookie consent banner
(function() {
  if (localStorage.getItem('cookie-consent')) return;
  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.innerHTML = `
    <span class="cookie-banner__text">
      Diese Website verwendet ausschließlich technisch notwendige Cookies.
      Weitere Informationen finden Sie in unserer <a href="datenschutz.html">Datenschutzerklärung</a>.
    </span>
    <div class="cookie-banner__actions">
      <button class="cookie-banner__accept" id="cookieAccept">Verstanden</button>
      <button class="cookie-banner__decline" id="cookieDecline">Schließen</button>
    </div>`;
  document.body.appendChild(banner);
  const dismiss = (val) => {
    localStorage.setItem('cookie-consent', val);
    banner.classList.add('hidden');
    setTimeout(() => banner.remove(), 500);
  };
  document.getElementById('cookieAccept').addEventListener('click', () => dismiss('accepted'));
  document.getElementById('cookieDecline').addEventListener('click', () => dismiss('declined'));
})();

// Electric hover effect on buttons – SVG arc sparks + glow
(function() {
  const NS = 'http://www.w3.org/2000/svg';
  const STROKE_COLORS = ['#93c5fd','#60a5fa','#ffffff','#bfdbfe'];

  function edgePoint(rect) {
    const side = Math.floor(Math.random() * 4);
    if (side === 0) return { x: rect.left + Math.random() * rect.width, y: rect.top };
    if (side === 1) return { x: rect.right, y: rect.top + Math.random() * rect.height };
    if (side === 2) return { x: rect.left + Math.random() * rect.width, y: rect.bottom };
    return { x: rect.left, y: rect.top + Math.random() * rect.height };
  }

  function zigzagPath(x1, y1, x2, y2) {
    const steps = 4 + Math.floor(Math.random() * 3);
    let d = `M${x1},${y1}`;
    for (let i = 1; i < steps; i++) {
      const t = i / steps;
      const mx = x1 + (x2 - x1) * t + (Math.random() - 0.5) * 14;
      const my = y1 + (y2 - y1) * t + (Math.random() - 0.5) * 14;
      d += ` L${mx},${my}`;
    }
    return d + ` L${x2},${y2}`;
  }

  function spawnArc(rect) {
    const p1 = edgePoint(rect);
    const p2 = edgePoint(rect);
    const svg = document.createElementNS(NS, 'svg');
    svg.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999;overflow:visible;';
    const path = document.createElementNS(NS, 'path');
    path.setAttribute('d', zigzagPath(p1.x, p1.y, p2.x, p2.y));
    path.setAttribute('stroke', STROKE_COLORS[Math.floor(Math.random() * STROKE_COLORS.length)]);
    path.setAttribute('stroke-width', 1 + Math.random());
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-linecap', 'round');
    path.style.filter = 'drop-shadow(0 0 3px #60a5fa) drop-shadow(0 0 6px #3b82f6)';
    path.style.opacity = '0.9';
    path.style.transition = 'opacity 0.25s ease-out';
    svg.appendChild(path);
    document.body.appendChild(svg);
    requestAnimationFrame(() => requestAnimationFrame(() => { path.style.opacity = '0'; }));
    setTimeout(() => svg.remove(), 280);
  }

  document.querySelectorAll('.btn, .nav__cta').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.classList.add('btn--electric');
      this._sparkIv = setInterval(() => spawnArc(this.getBoundingClientRect()), 120);
    });
    btn.addEventListener('mouseleave', function() {
      this.classList.remove('btn--electric');
      clearInterval(this._sparkIv);
    });
  });
})();
