import Swiper from 'swiper';
import { EffectFade, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

/* ================= STATE ================= */

const STORAGE_KEY = 'reviews';

const state = {
  rating: 0,
  swiper: null,
};

/* ================= SELECTORS ================= */

const modal = document.getElementById('feedback-modal');
const openBtn = document.querySelector('.reviews-open-btn');
const closeBtn = document.querySelector('.feedback-close-btn');
const form = document.querySelector('.feedback-form');
const stars = Array.from(document.querySelectorAll('#modal-rating .star'));
const container = document.getElementById('feedbacks-container');
const slider = document.querySelector('.reviews-swiper');

/* ================= STORAGE ================= */

function getReviews() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveReviews(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // fail silently
  }
}

/* ================= SWIPER ================= */

function initSwiper() {
  if (!slider || state.swiper) return;

  state.swiper = new Swiper(slider, {
    modules: [EffectFade, Pagination, Navigation],
    effect: 'fade',
    fadeEffect: { crossFade: true },
    loop: false,
    speed: 500,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.reviews-next',
      prevEl: '.reviews-prev',
    },
  });
}

/* ================= MODAL ================= */

function openModal() {
  if (!modal) return;

  modal.classList.remove('is-hidden');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('body-lock');

  modal.querySelector('input, textarea')?.focus();
}

function closeModal() {
  if (!modal || modal.classList.contains('is-hidden')) return;

  modal.classList.add('is-hidden');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('body-lock');

  openBtn?.focus();
}

modal?.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal?.classList.contains('is-hidden')) {
    closeModal();
  }
});

openBtn?.addEventListener('click', openModal);
closeBtn?.addEventListener('click', closeModal);

/* ================= RATING ================= */

function updateStars(value) {
  state.rating = value;

  stars.forEach(star => {
    const starValue = Number(star.dataset.value);
    star.classList.toggle('active', starValue <= value);
  });
}

stars.forEach(star => {
  star.addEventListener('click', () => {
    updateStars(Number(star.dataset.value));
  });
});

/* ================= RENDER ================= */

function createSlide(review) {
  const slide = document.createElement('div');
  slide.className = 'swiper-slide';

  const card = document.createElement('div');
  card.className = 'review-card';

  const text = document.createElement('p');
  text.className = 'review-text';
  text.textContent = String(review.message || '');

  const rating = document.createElement('div');
  rating.className = 'review-rating';
  rating.dataset.rating = review.rating;

  const author = document.createElement('div');
  author.className = 'review-author';

  const avatar = document.createElement('div');
  avatar.className = 'review-avatar';
  avatar.textContent = String(review.name || '').charAt(0).toUpperCase();

  const name = document.createElement('span');
  name.textContent = String(review.name || '');

  author.append(avatar, name);
  card.append(text, rating, author);
  slide.appendChild(card);

  return slide;
}

function applyRatings() {
  container?.querySelectorAll('.review-rating').forEach(el => {
    const rating = Number(el.dataset.rating || 0);
    const percent = (rating / 5) * 100;
    el.style.setProperty('--rating-percent', percent + '%');
  });
}

function renderReviews() {
  if (!container) return;

  const reviews = getReviews();

  container.innerHTML = '';

  const fragment = document.createDocumentFragment();

  reviews.forEach(review => {
    fragment.appendChild(createSlide(review));
  });

  container.appendChild(fragment);

  applyRatings();

  if (state.swiper) {
    state.swiper.update();
  } else {
    initSwiper();
  }
}

/* ================= FORM ================= */

form?.addEventListener('submit', e => {
  e.preventDefault();

  const formData = new FormData(form);

  const name = formData.get('name')?.toString().trim().slice(0, 40);
  const message = formData.get('message')?.toString().trim().slice(0, 300);

  if (!name || !message || state.rating === 0) {
    return;
  }

  const reviews = getReviews();

  reviews.unshift({
    name,
    message,
    rating: state.rating,
  });

  saveReviews(reviews);
  renderReviews();

  form.reset();
  updateStars(0);
  closeModal();
});

/* ================= INIT ================= */

renderReviews();