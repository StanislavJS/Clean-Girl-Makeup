const revealSections = document.querySelectorAll('.about');

revealSections.forEach(section => {
  section.classList.add('reveal');

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        section.classList.add('is-visible');
        observer.unobserve(section);
      }
    },
    { threshold: 0.2 }
  );

  observer.observe(section);
});