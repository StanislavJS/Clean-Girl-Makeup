import { refs } from './refs.js';

if (refs.footer) {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          refs.footer.classList.add('footer--visible');
          obs.unobserve(entry.target); // отключаем после первого появления
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.15,
      }
    );

    observer.observe(refs.footer);
  } else {
    // fallback
    refs.footer.classList.add('footer--visible');
  }
}