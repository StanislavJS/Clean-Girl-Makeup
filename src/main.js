import './css/styles.css';
import './js/menu.js';
import './js/artists.js';
import './js/reviews.js';
import './js/reveal.js';
import './js/footer.js';

window.addEventListener('load', () => {
  const hash = window.location.hash;
  if (!hash) return;

  const id = hash.substring(1);
  const target = document.getElementById(id);
  if (!target) return;

  target.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
});