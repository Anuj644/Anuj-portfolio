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
  const gap = 36;
  const mouse = { x: -999, y: -999, tx: -999, ty: -999 };
  let w = 0, h = 0, cols = 0, rows = 0, offX = 0, offY = 0;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    w = canvas.width = rect.width;
    h = canvas.height = rect.height;
    cols = Math.ceil(w / gap) + 1;
    rows = Math.ceil(h / gap) + 1;
    offX = (w - (cols - 1) * gap) / 2;
    offY = (h - (rows - 1) * gap) / 2;
    if (reduce) draw(0);
  }

  function draw(time) {
    ctx.clearRect(0, 0, w, h);
    mouse.x += (mouse.tx - mouse.x) * 0.18;
    mouse.y += (mouse.ty - mouse.y) * 0.18;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = offX + i * gap;
        let y = offY + j * gap;
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const d = Math.hypot(dx, dy) || 1;
        let near = d < 160 ? 1 - d / 160 : 0;
        near = near * near * (3 - 2 * near);
        x += (dx / d) * near * 14;
        y += (dy / d) * near * 14;
        const wave = reduce ? 0 : Math.max(0, Math.sin((i + j) * 0.3 - time * 0.001));
        const k = Math.max(near, Math.pow(wave, 8) * 0.55);
        const r = 1.1 + k * 3.4;
        const red = Math.round(162 + (35 - 162) * k);
        const green = Math.round(174 + (181 - 174) * k);
        const blue = Math.round(187 + (211 - 187) * k);
        ctx.fillStyle = `rgba(${red},${green},${blue},${0.22 + k * 0.75})`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    if (!reduce) requestAnimationFrame(draw);
  }

  canvas.parentElement.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    if (mouse.tx === -999) {
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    mouse.tx = e.clientX - rect.left;
    mouse.ty = e.clientY - rect.top;
  });
  canvas.parentElement.addEventListener('mouseleave', () => {
    mouse.x = mouse.y = mouse.tx = mouse.ty = -999;
  });
  addEventListener('resize', resize);
  resize();
  if (!reduce) requestAnimationFrame(draw);
})();
