const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

navToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

siteNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const roles = [
  'Java & Backend Developer',
  'Database-Driven Systems',
  'Full-Stack Web Developer'
];

const typewriterEl = document.getElementById('typewriter');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function typewriterLoop(){
  if (reduceMotion) {
    typewriterEl.textContent = roles[0];
    return;
  }

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick(){
    const current = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      typewriterEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1600);
        return;
      }
    } else {
      charIndex--;
      typewriterEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(tick, deleting ? 40 : 70);
  }
  tick();
}
typewriterLoop();

const filterBar = document.getElementById('filterBar');
const projectCards = document.querySelectorAll('.project-card');

filterBar.addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;

  filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('is-active'));
  btn.classList.add('is-active');

  const filter = btn.dataset.filter;

  projectCards.forEach(card => {
    const tags = card.dataset.tags.split(' ');
    const show = filter === 'all' || tags.includes(filter);
    card.classList.toggle('is-hidden', !show);
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
