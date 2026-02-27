import { refs } from './refs.js';

window.history.scrollRestoration = 'manual';

const scrollToSection = (id) => {
  const target = document.getElementById(id);
  if (!target) return;

  const offset = target.offsetTop - refs.header.offsetHeight;
  window.scrollTo({ top: offset, behavior: 'smooth' });
};

const toggleMenu = () => {
  const isOpen = refs.navList.classList.toggle('is-open');
  refs.burgerIcon.classList.toggle('hidden', isOpen);
  refs.closeIcon.classList.toggle('hidden', !isOpen);
  document.body.classList.toggle('body-lock', isOpen);
};

const activateNavLink = (activeLink) => {
  refs.navLinks.forEach(link => link.classList.remove('active'));
  activeLink.classList.add('active');
  activeLink.blur();
};

const handleScrollHighlight = () => {
  const scrollPos = window.scrollY + refs.header.offsetHeight + 5;

  refs.navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href === '#' || href.startsWith('http')) return;

    const section = document.getElementById(href.slice(1));
    if (!section) return;

    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
};

refs.toggleBtn.addEventListener('click', toggleMenu);

refs.logo.forEach(logo => {
  logo.addEventListener('click', (e) => {
    e.preventDefault();
    location.reload();
  });
});

refs.navLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (!href || href === '#' || href.startsWith('http')) return;

  link.addEventListener('click', (e) => {
    e.preventDefault();
    const id = href.slice(1);
    scrollToSection(id);
    activateNavLink(link);
    refs.navList.classList.remove('is-open');
    refs.burgerIcon.classList.remove('hidden');
    refs.closeIcon.classList.add('hidden');
    document.body.classList.remove('body-lock');
    history.replaceState(null, null, ' ');
  });
});

window.addEventListener('scroll', handleScrollHighlight);

window.addEventListener('load', () => {
  if (window.location.hash) {
    setTimeout(() => {
      const id = window.location.hash.slice(1);
      scrollToSection(id);
      history.replaceState(null, null, ' ');
    }, 0);
  }
});