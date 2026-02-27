const footer = document.querySelector('.footer');

if (footer && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          footer.classList.add('footer--visible');
          obs.unobserve(entry.target); // отключаем после первого срабатывания
        }
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1,
    }
  );

  observer.observe(footer);
} else if (footer) {
  // fallback для старых браузеров
  footer.classList.add('footer--visible');
}