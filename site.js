const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#ana-menu');
const sectionLinks = menu.querySelectorAll('a[href^="#"]');
const mobileNavigation = matchMedia('(max-width: 860px)');
document.documentElement.classList.add('js');

function setMenuOpen(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
  menu.inert = mobileNavigation.matches && !open;
}

setMenuOpen(false);
mobileNavigation.addEventListener('change', () => setMenuOpen(false));

menuButton.addEventListener('click', () => {
  setMenuOpen(menuButton.getAttribute('aria-expanded') === 'false');
});

document.querySelector('header').addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
    menuButton.focus();
  }
});

function updateLocation() {
  const current = location.hash || '#ana-sayfa';
  sectionLinks.forEach(link => {
    if (link.hash === current) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}

sectionLinks.forEach(link => link.addEventListener('click', () => {
  if (menuButton.getAttribute('aria-expanded') === 'true') menuButton.focus();
  setMenuOpen(false);
}));
window.addEventListener('hashchange', updateLocation);
updateLocation();

const aboutDialog = document.querySelector('#about-dialog');
document.querySelector('#about-open').addEventListener('click', () => aboutDialog.showModal());

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const hero = document.querySelector('.hero');
  hero.classList.add('hero-enter');
  hero.addEventListener('focusin', () => hero.classList.remove('hero-enter'), { once: true });

  if ('IntersectionObserver' in window) {
    const reveal = new IntersectionObserver(entries => {
      entries.forEach(({ isIntersecting, target }) => {
        if (!isIntersecting) return;
        target.classList.replace('reveal-pending', 'reveal-enter');
        reveal.unobserve(target);
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.cards article, .visit, .contact').forEach(element => {
      element.classList.add('reveal-pending');
      reveal.observe(element);
      element.addEventListener('focusin', () => {
        element.classList.remove('reveal-pending', 'reveal-enter');
        reveal.unobserve(element);
      }, { once: true });
    });
  }
}
