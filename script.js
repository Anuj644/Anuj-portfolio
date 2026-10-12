const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduce) document.documentElement.classList.add('js');

document.getElementById('yr').textContent = new Date().getFullYear();

const menu = document.getElementById('menu');
document.getElementById('menuBtn').addEventListener('click', () => menu.classList.toggle('open'));
menu.addEventListener('click', e => {
  if (e.target.tagName === 'A') menu.classList.remove('open');
});

const progress = document.getElementById('progress');
function updateProgress() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
}
addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const track = document.getElementById('track');
track.innerHTML += track.innerHTML;

document.addEventListener('mousemove', e => {
  const card = e.target.closest ? e.target.closest('.spot') : null;
  if (!card) return;
  const r = card.getBoundingClientRect();
  card.style.setProperty('--mx', `${e.clientX - r.left}px`);
  card.style.setProperty('--my', `${e.clientY - r.top}px`);
});

const links = document.querySelectorAll('nav ul a');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));

const roles = ['Full Stack Developer', 'Data Engineer', 'AI and ML builder'];
const roleEl = document.getElementById('role');
if (reduce) {
  roleEl.textContent = roles.join(', ');
} else {
  let ri = 0, ci = 0, deleting = false;
  (function type() {
    const word = roles[ri];
    ci += deleting ? -1 : 1;
    roleEl.textContent = word.slice(0, ci);
    let delay = deleting ? 45 : 90;
    if (!deleting && ci === word.length) { deleting = true; delay = 1600; }
    else if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; delay = 350; }
    setTimeout(type, delay);
  })();
}

function countUp(el) {
  const target = parseFloat(el.dataset.count);
  const dec = parseInt(el.dataset.dec, 10);
  if (reduce) { el.textContent = target.toFixed(dec); return; }
  const start = performance.now();
  const dur = 1300;
  (function step(now) {
    const t = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = (target * eased).toFixed(dec);
    if (t < 1) requestAnimationFrame(step);
  })(start);
}
const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      countUp(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });
document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));

if (!reduce) {
  const groups = ['.sec-title', '.sec-sub', '.about > div', '.skill-box', '.job', '.proj', '.edu-card', '.cert', '.contact .wrap'];
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add('in');
      revealObserver.unobserve(el);
      setTimeout(() => el.classList.remove('reveal', 'in'), 1400);
    });
  }, { threshold: 0.12 });
  groups.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.setProperty('--d', `${(i % 3) * 0.08}s`);
      revealObserver.observe(el);
    });
  });
}

(function () {
  const canvas = document.getElementById('net');
  const ctx = canvas.getContext('2d');
  let w, h, points = [];
  const mouse = { x: -999, y: -999 };

  function resize() {
    const r = canvas.parentElement.getBoundingClientRect();
    w = canvas.width = r.width;
    h = canvas.height = r.height;
    const count = Math.min(70, Math.floor((w * h) / 18000));
    points = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (const p of points) {
      if (!reduce) {
        p.x += p.vx;
        p.y += p.vy;
      }
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
    }
    for (let i = 0; i < points.length; i++) {
      const a = points[i];
      for (let j = i + 1; j < points.length; j++) {
        const b = points[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 130) {
          ctx.strokeStyle = `rgba(139,107,255,${0.28 * (1 - d / 130)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      const m = Math.hypot(a.x - mouse.x, a.y - mouse.y);
      if (m < 170) {
        ctx.strokeStyle = `rgba(68,217,242,${0.7 * (1 - m / 170)})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
      ctx.fillStyle = m < 170 ? '#44d9f2' : 'rgba(154,163,209,.7)';
      ctx.beginPath();
      ctx.arc(a.x, a.y, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
    if (!reduce) requestAnimationFrame(draw);
  }

  canvas.parentElement.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });
  canvas.parentElement.addEventListener('mouseleave', () => {
    mouse.x = mouse.y = -999;
  });
  addEventListener('resize', resize);
  resize();
  draw();
})();
