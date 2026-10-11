/* ==========================================================
   Ritika Saini - Portfolio
   Table of contents
   1. Helpers
   2. Content data (edit your details here)
   3. Render sections from data
   4. Interactions (certificates, filters, tilt, spotlight)
   5. Active nav link, skill bars, scroll progress
   6. Typing animation
   7. Theme toggle
   8. Contact form
   9. 3D star background (canvas)
   10. 3D skills globe (canvas)
   ========================================================== */


/* ---------- 1. Helpers ---------- */
// Short version of document.querySelector
const $ = (selector) => document.querySelector(selector);

// Reads a CSS variable (for example "--a") from :root
const css = (name) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

// True if the visitor prefers less motion
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;


/* ---------- 2. Content data ---------- */
// Format: [name, level in %]
const skills = [
  ["HTML5", 95],
  ["CSS3", 75],
  ["JavaScript", 80],
  ["React.js", 80],
  ["Python", 80],
  ["Flask", 75],
  ["Django", 70],
  ["MySQL", 80],
  ["MongoDB", 75],
  ["Power BI", 80],
  ["Advanced Excel", 85],
  ["C++", 75],
  ["Git", 85],
  ["NumPy", 85],
  ["Pandas", 85],
  ["Matplotlib", 80]
];

// Skill groups shown on the page
const skillGroups = [
  ["Frontend", ["HTML5", "CSS3", "JavaScript", "React.js"]],
  ["Backend & databases", ["Python", "Flask", "Django", "MySQL", "MongoDB"]],
  ["Data & analytics", ["Power BI", "Advanced Excel", "NumPy", "Pandas", "Matplotlib"]],
  ["Tools & languages", ["C++", "Git"]]
];

// Format: [title, description, tags, category ("web" or "data"), GitHub repo name]
const projects = [

  [
    "College Internship Portal",
    "Web portal connecting students with internship opportunities, featuring application tracking and admin dashboard.",
    ["HTML", "CSS", "JavaScript","React","Flask","Django","FastApi","Mongodb"],
    "web",
    "internship-portal"
  ],
  [
    "Excel & Power BI Data Analysis",
    "Collection of data analysis projects using Advanced Excel and Power BI: dashboards, pivot tables, and interactive reports.",
    ["Advanced Excel", "Power BI", "Data Analysis"],
    "data",
    ""
  ]
];

// Emoji shown on each project thumbnail (same order as the projects above)
const projectIcons = ["🛰️", "🛒", "🎓", "📊"];

// Format: [repo name, language, description, stars, forks]
// Description and forks are optional: leave "" or null to hide them.
// Sorted by stars (highest first).
const repos = [
  
  ["internship-portal", "JavaScript", "College internship portal with student applications and admin management.", 35, 15],
  
  ["python", "Python", "", 11, null],
  ["mysql-project", "MySQL", "", 10, null],
  ["javascript", "JavaScript", "", 7, null],
  ["javascript-project", "JavaScript", "", 4, null],
  ["cpp-coding-practice", "C++", "", 4, null],
  ["numpy-notebook", "Jupyter Notebook", "", 1, null]
];

// Format: [date / label, title, description]
const experience = [
  [
    "2026 – Present",
    "Google Student Campus Ambassador",
    "Representing Google's developer community on campus by organizing tech events, workshops, and connecting students with Google technologies."
  ],
  [
    "Internship",
    "Gyanokar IT Solution",
    "Completed a 3-month Full-Stack internship."
  ],
  [
    "2026",
    "Project Competition Winner",
    "Won the college project competition with an innovative web application, recognized for technical excellence, creativity, and problem solving."
  ],
  [
    "2025",
    "Programmer Warrior",
    "Awarded the \"Programmer Warrior\" title for outstanding performance in coding challenges and competitive programming contests."
  ],
  [
    "College fest",
    "Minute-to-Win Runner-up",
    "Secured the runner-up position in the Minute-to-Win competition during the college fest."
  ]
];

// Format: [title, issuer, description]
const certificates = [
  ["Google Gemini Social Media Masterclass", "Google", "Training on using Google Gemini AI for social media content creation and strategy."],
  ["Be10x AI Tools Workshop", "Be10x", "Learned how to use AI tools effectively in a hands-on workshop."],
  ["Power BI Completion Certificate", "Power BI", "Data visualization, DAX functions, and interactive dashboard creation with Power BI."],
  ["Python for Data Science", "Python", "Data analysis with Python: Pandas, NumPy, Matplotlib, and exploratory data analysis."],
  ["Advanced Excel", "Skill-Learn", "Learned MS Excel from beginner to advanced level."]
];

// Rotating roles for the typing animation
const roles = [
  "Full-Stack Developer",
  "Data Science Enthusiast",
  "Power BI Storyteller",
  "SDE Intern in the making"
];


/* ---------- 3. Render sections from data ---------- */

// Skills (grouped, with level bars)
$('#skg').innerHTML = skillGroups.map(([groupName, names]) => {
  const cards = skills
    .filter((skill) => names.includes(skill[0]))
    .map(([name, level]) => `
      <div class="t tilt">
        <h3>${name}<em>${level}%</em></h3>
        <div class="meter"><u data-w="${level}"></u></div>
      </div>`)
    .join('');

  return `
    <div class="sg">
      <h3>${groupName}</h3>
      <div class="sk">${cards}</div>
    </div>`;
}).join('');

// Projects
$('#pjg').innerHTML = projects.map(([title, description, tags, category, repo], i) => `
  <article class="t tilt" data-c="${category}">
    <div class="th" aria-hidden="true">${projectIcons[i]}</div>
    <h3>${title}</h3>
    <p>${description}</p>
    <div class="tags">${tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
    <a class="btn" href="https://github.com/ritika02052007${repo ? '/' + repo : ''}" target="_blank" rel="noopener">View on GitHub</a>
  </article>`).join('');

// GitHub repositories (each card links to the repo; forks and description are optional)
$('#ghg').innerHTML = repos.map(([name, language, description, stars, forks]) => `
  <a class="t tilt" href="https://github.com/ritika02052007/${name}" target="_blank" rel="noopener" style="text-decoration:none;display:block">
    <h3>${name}</h3>
    <span class="lang">${language}</span>
    ${description ? `<p>${description}</p>` : ''}
    <small>★ ${stars}${forks != null ? ' &nbsp; ⑂ ' + forks : ''}</small>
  </a>`).join('');

// Experience timeline
$('#tl').innerHTML = experience.map(([when, title, description]) => `
  <div class="t tilt">
    <time>${when}</time>
    <h3>${title}</h3>
    <p>${description}</p>
  </div>`).join('');

// Certificates (flip cards)
$('#ceg').innerHTML = certificates.map(([title, issuer, description]) => `
  <div class="fl" tabindex="0" role="button" aria-label="${title}. Flip card">
    <div class="fi">
      <div class="ff"><h3>${title}</h3><span>${issuer}</span></div>
      <div class="fb">${description}</div>
    </div>
  </div>`).join('');


/* ---------- 4. Interactions ---------- */

// Flip a certificate card on click or with Enter / Space
document.querySelectorAll('.fl').forEach((card) => {
  card.onclick = () => card.classList.toggle('on');

  card.onkeydown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.classList.toggle('on');
    }
  };
});

// Project filter buttons (All / Web Dev / Data Science)
$('#flt').onclick = (e) => {
  const button = e.target.closest('button');
  if (!button) return;

  document.querySelectorAll('#flt button').forEach((b) => {
    b.setAttribute('aria-pressed', b === button);
  });

  document.querySelectorAll('#pjg .t').forEach((card) => {
    const hide = button.dataset.f !== 'all' && card.dataset.c !== button.dataset.f;
    card.classList.toggle('off', hide);
  });
};

// 3D tilt: cards rotate towards the mouse pointer
document.querySelectorAll('.tilt').forEach((card) => {
  if (reduce) return;

  card.addEventListener('pointermove', (e) => {
    const box = card.getBoundingClientRect();
    const x = (e.clientX - box.left) / box.width - 0.5;
    const y = (e.clientY - box.top) / box.height - 0.5;
    card.style.transform = `rotateY(${x * 16}deg) rotateX(${-y * 16}deg) translateZ(14px)`;
  });

  card.addEventListener('pointerleave', () => {
    card.style.transform = '';
  });
});

// Spotlight: the light inside a card follows the cursor
document.querySelectorAll('.t').forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    const box = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - box.left) + 'px');
    card.style.setProperty('--my', (e.clientY - box.top) + 'px');
  });
});


/* ---------- 5. Active nav link, skill bars, scroll progress ---------- */

// Highlight the nav link of the section that is in the middle of the screen
const navLinks = [...document.querySelectorAll('nav ul a')];

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    navLinks.forEach((link) => {
      link.classList.toggle('on', link.getAttribute('href') === '#' + entry.target.id);
    });
  });
}, { rootMargin: '-45% 0px -50% 0px' });

navLinks.forEach((link) => {
  const section = $(link.getAttribute('href'));
  if (section) sectionObserver.observe(section);
});

// Animate the skill bars when they scroll into view
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.w + '%';
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.meter u').forEach((bar) => barObserver.observe(bar));

// Scroll progress (0 to 1). Also used by the 3D background.
let scrollProgress = 0;

addEventListener('scroll', () => {
  const page = document.documentElement;
  scrollProgress = scrollY / (page.scrollHeight - innerHeight || 1);
  $('#bar').style.width = scrollProgress * 100 + '%';
}, { passive: true });


/* ---------- 6. Typing animation ---------- */
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
  const word = roles[roleIndex];
  const target = $('#ty');

  // No animation for people who prefer reduced motion
  if (reduce) {
    target.textContent = roles[0];
    return;
  }

  target.textContent = word.slice(0, charIndex);

  if (!deleting && charIndex < word.length) {
    charIndex++;                       // typing
  } else if (!deleting) {
    deleting = true;                   // full word typed: pause, then delete
    return setTimeout(type, 1400);
  } else if (charIndex > 0) {
    charIndex--;                       // deleting
  } else {
    deleting = false;                  // word deleted: next role
    roleIndex = (roleIndex + 1) % roles.length;
  }

  setTimeout(type, deleting ? 40 : 85);
}

type();


/* ---------- 7. Theme toggle ---------- */
// Dark is the default. Pressing the button switches to light and back.
$('#tg').onclick = () => {
  const root = document.documentElement;
  root.dataset.mode = root.dataset.mode === 'light' ? 'dark' : 'light';
};


/* ---------- 8. Contact form ---------- */
// Opens the visitor's email app with the message filled in
$('#cf').onsubmit = (e) => {
  e.preventDefault();
  const form = e.target;

  const subject = encodeURIComponent(form.s.value);
  const body = encodeURIComponent(
    form.m.value + '\n\n' + form.n.value + ' (' + form.e.value + ')'
  );

  location.href = `mailto:rs0409290@gmail.com?subject=${subject}&body=${body}`;
  $('#fm').textContent = 'Opening your email app to send the message.';
};


/* ---------- 9. 3D star background (canvas, no libraries) ---------- */

// Mouse position from -0.5 to 0.5 (shared by background and globe)
let mx = 0;
let my = 0;

addEventListener('pointermove', (e) => {
  mx = e.clientX / innerWidth - 0.5;
  my = e.clientY / innerHeight - 0.5;
});

const bg = $('#bg');
const bx = bg.getContext('2d');
let W, H;
const stars = [];

function sizeBg() {
  const dpr = devicePixelRatio || 1;
  W = bg.width = innerWidth * dpr;
  H = bg.height = innerHeight * dpr;
}

sizeBg();
addEventListener('resize', sizeBg);

// Each star: [x, y, z, colour picker], coordinates between -1 and 1
for (let i = 0; i < 220; i++) {
  stars.push([
    Math.random() * 2 - 1,
    Math.random() * 2 - 1,
    Math.random() * 2 - 1,
    Math.random()
  ]);
}

// Current rotation of the star field
let angleY = 0;
let angleX = 0;

function drawBg() {
  bx.clearRect(0, 0, W, H);

  const red = css('--a');
  const second = css('--b');
  const lineRgb = css('--pt');

  // Rotation follows the scroll position and the mouse, with easing
  const targetY = scrollProgress * Math.PI * 2 + mx * 0.9;
  const targetX = my * 0.6;
  angleY += (targetY - angleY) * 0.05;
  angleX += (targetX - angleX) * 0.05;

  const cosY = Math.cos(angleY), sinY = Math.sin(angleY);
  const cosX = Math.cos(angleX), sinX = Math.sin(angleX);
  const focal = Math.min(W, H) * 0.9;

  // 3D to 2D projection
  const projected = stars.map((s) => {
    let x = s[0] * cosY - s[2] * sinY;
    let z = s[0] * sinY + s[2] * cosY;
    const y = s[1] * cosX - z * sinX;
    z = s[1] * sinX + z * cosX;
    z += 2.2;

    const scale = focal / z;
    return [W / 2 + x * scale, H / 2 + y * scale, z, s[3]];
  });

  // Lines between stars that are close to each other
  bx.lineWidth = 1;
  const maxDistSq = (W * 0.07) ** 2;

  for (let i = 0; i < projected.length; i++) {
    const a = projected[i];

    for (let j = i + 1; j < projected.length; j++) {
      const b = projected[j];
      const dx = a[0] - b[0];
      const dy = a[1] - b[1];
      const distSq = dx * dx + dy * dy;

      if (distSq < maxDistSq) {
        bx.strokeStyle = `rgba(${lineRgb}, ${(1 - distSq / maxDistSq) * 0.16})`;
        bx.beginPath();
        bx.moveTo(a[0], a[1]);
        bx.lineTo(b[0], b[1]);
        bx.stroke();
      }
    }
  }

  // The stars (closer stars are bigger and brighter)
  for (const star of projected) {
    const size = Math.max(0.6, (3.4 - star[2]) * 1.5) * (devicePixelRatio || 1);
    bx.fillStyle = star[3] > 0.5 ? red : second;
    bx.globalAlpha = Math.max(0.15, Math.min(0.9, (3.6 - star[2]) / 2));
    bx.beginPath();
    bx.arc(star[0], star[1], size, 0, 7);
    bx.fill();
  }

  bx.globalAlpha = 1;
  if (!reduce) requestAnimationFrame(drawBg);
}

drawBg();


/* ---------- 10. 3D skills globe (drag to spin) ---------- */
const gc = $('#globe');
const gx = gc.getContext('2d');

// Words on the globe: all skills plus a few extra keywords
const words = skills
  .map((s) => s[0])
  .concat(["HTML", "React", "Flask", "Dashboards", "Data", "APIs", "SQL", "Web"]);

// Spread the words evenly over a sphere (Fibonacci sphere)
const N = words.length;
const globePoints = words.map((word, i) => {
  const y = 1 - (i / (N - 1)) * 2;
  const radius = Math.sqrt(1 - y * y);
  const theta = i * 2.399963;
  return { w: word, x: Math.cos(theta) * radius, y: y, z: Math.sin(theta) * radius };
});

let gw, gh;                    // canvas width and height
let rx = 0.3, ry = 0;          // current rotation
let vx = 0, vy = 0.006;        // rotation speed
let drag = false;
let lastX, lastY;

function sizeG() {
  const dpr = devicePixelRatio || 1;
  const box = gc.getBoundingClientRect();
  gw = gc.width = box.width * dpr;
  gh = gc.height = box.height * dpr;
}

sizeG();
addEventListener('resize', sizeG);

// Drag with mouse or finger to spin the globe
gc.addEventListener('pointerdown', (e) => {
  drag = true;
  lastX = e.clientX;
  lastY = e.clientY;
  gc.setPointerCapture(e.pointerId);
  gc.style.cursor = 'grabbing';
});

gc.addEventListener('pointermove', (e) => {
  if (!drag) return;
  vy = (e.clientX - lastX) * 0.0035;
  vx = (e.clientY - lastY) * 0.0035;
  lastX = e.clientX;
  lastY = e.clientY;
});

const stopDrag = () => {
  drag = false;
  gc.style.cursor = 'grab';
};

gc.addEventListener('pointerup', stopDrag);
gc.addEventListener('pointercancel', stopDrag);

function drawG() {
  gx.clearRect(0, 0, gw, gh);

  const ink = css('--ink');
  const red = css('--a');
  const second = css('--b');
  const radius = Math.min(gw, gh) * 0.38;
  const dpr = devicePixelRatio || 1;

  // Update rotation. After dragging, it slowly returns to auto-rotation.
  ry += vy;
  rx += vx;
  if (!drag) {
    vx *= 0.95;
    vy += ((reduce ? 0 : 0.006) - vy) * 0.03;
  }

  const cosY = Math.cos(ry), sinY = Math.sin(ry);
  const cosX = Math.cos(rx), sinX = Math.sin(rx);

  // Two guide rings
  gx.strokeStyle = css('--line');
  gx.lineWidth = dpr;
  gx.beginPath();
  gx.ellipse(gw / 2, gh / 2, radius, radius, 0, 0, 7);
  gx.stroke();
  gx.beginPath();
  gx.ellipse(
    gw / 2, gh / 2,
    radius,
    radius * Math.abs(Math.sin(rx + 1.2)) * 0.35 + radius * 0.05,
    ry * 0.3, 0, 7
  );
  gx.stroke();

  // Rotate and project every word, then sort so far words are drawn first
  const projected = globePoints
    .map((p) => {
      const x = p.x * cosY - p.z * sinY;
      let z = p.x * sinY + p.z * cosY;
      const y = p.y * cosX - z * sinX;
      z = p.y * sinX + z * cosX;

      const scale = 1 / (1.9 - z * 0.6);
      return {
        w: p.w,
        x: gw / 2 + x * radius * scale * 1.7,
        y: gh / 2 + y * radius * scale * 1.7,
        z: z,
        k: scale
      };
    })
    .sort((a, b) => a.z - b.z);

  gx.textAlign = 'center';
  gx.textBaseline = 'middle';

  // Draw the words (front words are bigger, brighter and red)
  for (const p of projected) {
    const depth = (p.z + 1) / 2;   // 0 = far, 1 = near
    gx.globalAlpha = 0.25 + 0.75 * depth;
    gx.fillStyle = depth > 0.7 ? red : depth > 0.4 ? ink : second;
    gx.font = `700 ${(13 + 13 * depth) * dpr}px 'Manrope', sans-serif`;
    gx.fillText(p.w, p.x, p.y);
  }

  gx.globalAlpha = 1;
  requestAnimationFrame(drawG);
}

drawG();