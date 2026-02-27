import { refs } from './refs.js';

window.history.scrollRestoration = 'manual';

/* =========================
   Helpers
========================= */

const getHeaderOffset = () => refs.header?.offsetHeight || 0;

const scrollToSection = (id) => {
  const target = document.getElementById(id);
  if (!target) return;

  const top = target.offsetTop - getHeaderOffset();

  window.scrollTo({ top, behavior: 'smooth' });
};

/* =========================
   Menu
========================= */

const closeMenu = () => {
  refs.navList?.classList.remove('is-open');
  refs.burgerIcon?.classList.remove('hidden');
  refs.closeIcon?.classList.add('hidden');
  document.body.classList.remove('body-lock');
  refs.toggleBtn?.setAttribute('aria-expanded', 'false');
};

const toggleMenu = () => {
  if (!refs.navList) return;

  const isOpen = refs.navList.classList.toggle('is-open');

  refs.burgerIcon?.classList.toggle('hidden', isOpen);
  refs.closeIcon?.classList.toggle('hidden', !isOpen);
  document.body.classList.toggle('body-lock', isOpen);
  refs.toggleBtn?.setAttribute('aria-expanded', String(isOpen));
};

refs.toggleBtn?.addEventListener('click', toggleMenu);

document.addEventListener('click', (e) => {
  if (
    refs.navList?.classList.contains('is-open') &&
    !refs.navList.contains(e.target) &&
    !refs.toggleBtn?.contains(e.target)
  ) {
    closeMenu();
  }
});

/* =========================
   Scroll Highlight
========================= */

let currentActive = null;

const sections = refs.navLinks
  ?.map(link => {
    const href = link.getAttribute('href');
    if (!href || (!href.startsWith('#') && !href.startsWith('/#')))
      return null;

    const id = href.replace('/#', '').replace('#', '');
    const section = document.getElementById(id);

    return section ? { link, section } : null;
  })
  .filter(Boolean);

const handleScrollHighlight = () => {
  if (!sections?.length) return;

  const scrollPos = window.scrollY + getHeaderOffset() + 10;

  let newActive = null;

  for (const { link, section } of sections) {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;

    if (scrollPos >= top && scrollPos < bottom) {
      newActive = link;
      break;
    }
  }

  if (newActive && currentActive !== newActive) {
    currentActive?.classList.remove('active');
    newActive.classList.add('active');
    currentActive = newActive;
  }
};

window.addEventListener(
  'scroll',
  () => {
    requestAnimationFrame(handleScrollHighlight);
  },
  { passive: true }
);

/* =========================
   Anchor Links
========================= */

refs.navLinks?.forEach(link => {
  const href = link.getAttribute('href');
  if (!href) return;

  const isAnchor = href.startsWith('#') || href.startsWith('/#');
  const isExternal = href.includes('.html');

  if (!isAnchor || isExternal) return;

  link.addEventListener('click', (e) => {
    e.preventDefault();

    const id = href.replace('/#', '').replace('#', '');
    scrollToSection(id);
    closeMenu();

    history.replaceState(null, '', window.location.pathname);
  });
});

/* =========================
   Hash Scroll
========================= */

window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash;
  if (!hash) return;

  setTimeout(() => {
    scrollToSection(hash.substring(1));
  }, 80);
});