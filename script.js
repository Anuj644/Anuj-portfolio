const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduce) document.documentElement.classList.add('js');

document.getElementById('yr').textContent = new Date().getFullYear();

const themeBtn = document.getElementById('themeBtn');
function applyTheme(theme, animate) {
  const root = document.documentElement;
  if (animate) {
    root.classList.add('theme-anim');
    setTimeout(() => root.classList.remove('theme-anim'), 450);
  }
  if (theme === 'dark') root.setAttribute('data-theme', 'dark');
  else root.removeAttribute('data-theme');
  themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  window.dispatchEvent(new Event('themechange'));
}
themeBtn.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next, true);
});
applyTheme('light', false);

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

const ICONS = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/';

const coreSkills = [
  { name: 'Python', icon: 'python/python-original.svg', note: 'Data processing, ML and automation' },
  { name: 'JavaScript', icon: 'javascript/javascript-original.svg', note: 'Interactive web interfaces' },
  { name: 'TypeScript', icon: 'typescript/typescript-original.svg', note: 'Typed code for larger apps' },
  { name: 'React', icon: 'react/react-original.svg', note: 'Reusable, responsive UI components' },
  { name: 'Node.js', icon: 'nodejs/nodejs-original.svg', note: 'REST APIs and backend services' },
  { name: 'MySQL', icon: 'mysql/mysql-original.svg', note: 'Database design and queries' },
  { name: 'MongoDB', icon: 'mongodb/mongodb-original.svg', note: 'Document databases' },
  { name: 'Pandas', icon: 'pandas/pandas-original.svg', note: 'Data cleaning and analysis' }
];

const moreSkills = [
  { title: 'Languages', items: [
    { name: 'Java', icon: 'java/java-original.svg' },
    { name: 'C', icon: 'c/c-original.svg' },
    { name: 'C++', icon: 'cplusplus/cplusplus-original.svg' }
  ] },
  { title: 'Web and databases', items: [
    { name: 'NestJS', icon: 'nestjs/nestjs-original.svg' },
    { name: 'HTML', icon: 'html5/html5-original.svg' },
    { name: 'CSS', icon: 'css3/css3-original.svg' },
    { name: 'Bootstrap', icon: 'bootstrap/bootstrap-original.svg' },
    { name: 'REST APIs' },
    { name: 'SQLite', icon: 'sqlite/sqlite-original.svg' }
  ] },
  { title: 'Data and ML', items: [
    { name: 'NumPy', icon: 'numpy/numpy-original.svg' },
    { name: 'scikit-learn', icon: 'scikitlearn/scikitlearn-original.svg' },
    { name: 'Matplotlib', icon: 'matplotlib/matplotlib-original.svg' },
    { name: 'Tableau', icon: 'tableau/tableau-original.svg' },
    { name: 'Power BI', icon: 'powerbi/powerbi-original.svg' }
  ] },
  { title: 'Generative AI', items: [
    { name: 'OpenAI', icon: 'openai/openai-original.svg' },
    { name: 'LangChain', icon: 'langchain/langchain-original.svg' },
    { name: 'FAISS' },
    { name: 'Streamlit', icon: 'streamlit/streamlit-original.svg' }
  ] },
  { title: 'Tools', items: [
    { name: 'Git', icon: 'git/git-original.svg' },
    { name: 'GitHub', icon: 'github/github-original.svg' },
    { name: 'Excel' }
  ] }
];

function makeIcon(item) {
  const box = document.createElement('span');
  box.className = 'icon';
  function showInitials() {
    box.textContent = '';
    const mono = document.createElement('span');
    mono.className = 'mono';
    mono.textContent = item.name.slice(0, 2);
    box.appendChild(mono);
  }
  if (!item.icon) {
    showInitials();
    return box;
  }
  const img = document.createElement('img');
  img.src = ICONS + item.icon;
  img.alt = '';
  img.loading = 'lazy';
  img.addEventListener('error', showInitials);
  box.appendChild(img);
  return box;
}

const coreEl = document.getElementById('coreSkills');
coreSkills.forEach(item => {
  const tile = document.createElement('div');
  tile.className = 'tile spot';
  const text = document.createElement('div');
  const title = document.createElement('h3');
  title.textContent = item.name;
  const note = document.createElement('p');
  note.textContent = item.note;
  text.append(title, note);
  tile.append(makeIcon(item), text);
  coreEl.appendChild(tile);
});

const groupsEl = document.getElementById('moreGroups');
let moreTotal = 0;
moreSkills.forEach(group => {
  const box = document.createElement('div');
  box.className = 'more-group';
  const title = document.createElement('h3');
  title.textContent = group.title;
  const list = document.createElement('div');
  list.className = 'mini-list';
  group.items.forEach(item => {
    moreTotal += 1;
    const mini = document.createElement('span');
    mini.className = 'mini';
    mini.append(makeIcon(item), document.createTextNode(item.name));
    list.appendChild(mini);
  });
  box.append(title, list);
  groupsEl.appendChild(box);
});

const moreBtn = document.getElementById('moreBtn');
const moreLabel = document.getElementById('moreLabel');
const moreEl = document.getElementById('moreSkills');
const moreInner = document.getElementById('moreInner');
moreLabel.textContent = `More skills (${moreTotal})`;
moreBtn.addEventListener('click', () => {
  const open = moreBtn.getAttribute('aria-expanded') === 'true';
  moreBtn.setAttribute('aria-expanded', String(!open));
  moreEl.classList.toggle('open', !open);
  moreInner.inert = open;
  moreLabel.textContent = open ? `More skills (${moreTotal})` : 'Show fewer skills';
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
  const groups = ['.sec-title', '.sec-sub', '.about > div', '.tile', '.job', '.proj', '.edu-card', '.cert', '.contact .wrap'];
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
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cell = 18;
  const levels = [-2.4, -1.8, -1.2, -0.6, 0, 0.6, 1.2, 1.8, 2.4];
  const table = [null, [3, 2], [2, 1], [3, 1], [0, 1], [0, 1, 3, 2], [0, 2], [0, 3], [0, 3], [0, 2], [0, 3, 1, 2], [0, 1], [3, 1], [2, 1], [3, 2], null];
  const mouse = { x: -999, y: -999, tx: -999, ty: -999, power: 0, target: 0 };
  let w = 0, h = 0, cols = 0, rows = 0, field = new Float32Array(0);
  let color = '71,133,153';
  let running = false;
  let ex = 0, ey = 0;

  function readColor() {
    const value = getComputedStyle(document.documentElement).getPropertyValue('--contour').trim();
    if (value) color = value;
  }

  function sample(x, y, t) {
    const dx = x - mouse.x;
    const dy = y - mouse.y;
    const bump = mouse.power * 2.2 * Math.exp(-(dx * dx + dy * dy) / (2 * 150 * 150));
    return Math.sin(x * 0.0075 + t * 0.00025)
      + Math.sin(y * 0.01 - t * 0.0002)
      + Math.sin((x + y) * 0.0055 + t * 0.00018)
      + 0.8 * Math.sin(Math.hypot(x - w * 0.7, y - h * 0.4) * 0.012 - t * 0.0003)
      + bump;
  }

  function edgePoint(e, x0, y0, a, b, c, d, l) {
    if (e === 0) { ex = x0 + cell * (l - a) / (b - a); ey = y0; }
    else if (e === 1) { ex = x0 + cell; ey = y0 + cell * (l - b) / (c - b); }
    else if (e === 2) { ex = x0 + cell * (l - d) / (c - d); ey = y0 + cell; }
    else { ex = x0; ey = y0 + cell * (l - a) / (d - a); }
  }

  function draw(time) {
    ctx.clearRect(0, 0, w, h);
    if (mouse.tx !== -999) {
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;
    }
    mouse.power += (mouse.target - mouse.power) * 0.08;
    const stride = cols + 1;
    for (let j = 0; j <= rows; j++) {
      for (let i = 0; i <= cols; i++) {
        field[j * stride + i] = sample(i * cell, j * cell, time);
      }
    }
    levels.forEach((l, index) => {
      const major = index % 3 === 1;
      ctx.beginPath();
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const a = field[j * stride + i];
          const b = field[j * stride + i + 1];
          const c = field[(j + 1) * stride + i + 1];
          const d = field[(j + 1) * stride + i];
          const key = (a > l ? 8 : 0) | (b > l ? 4 : 0) | (c > l ? 2 : 0) | (d > l ? 1 : 0);
          const segments = table[key];
          if (!segments) continue;
          const x0 = i * cell;
          const y0 = j * cell;
          for (let k = 0; k < segments.length; k += 2) {
            edgePoint(segments[k], x0, y0, a, b, c, d, l);
            ctx.moveTo(ex, ey);
            edgePoint(segments[k + 1], x0, y0, a, b, c, d, l);
            ctx.lineTo(ex, ey);
          }
        }
      }
      ctx.lineWidth = major ? 1.4 : 1;
      ctx.strokeStyle = `rgba(${color},${major ? 0.42 : 0.2})`;
      ctx.stroke();
    });
  }

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = rect.width;
    h = rect.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(w / cell);
    rows = Math.ceil(h / cell);
    field = new Float32Array((cols + 1) * (rows + 1));
    if (!running) draw(0);
  }

  function loop(time) {
    draw(time);
    if (running) requestAnimationFrame(loop);
  }

  function start() {
    if (running || reduce) return;
    running = true;
    requestAnimationFrame(loop);
  }

  canvas.parentElement.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    if (mouse.target === 0) {
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    mouse.tx = e.clientX - rect.left;
    mouse.ty = e.clientY - rect.top;
    mouse.target = 1;
  });
  canvas.parentElement.addEventListener('mouseleave', () => {
    mouse.target = 0;
  });
  window.addEventListener('resize', resize);
  window.addEventListener('themechange', () => {
    readColor();
    if (!running) draw(0);
  });
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) start();
    else running = false;
  }).observe(canvas.parentElement);

  readColor();
  resize();
})();
