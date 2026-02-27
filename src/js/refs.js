export const refs = {
  /* ================= HEADER ================= */
  header: document.querySelector('.header'),

  nav: {
    list: document.querySelector('.js-nav-list'),
    links: Array.from(document.querySelectorAll('.nav-button')),
    toggleBtn: document.querySelector('.js-toggle'),
    burgerIcon: document.querySelector('.js-burger-icon'),
    closeIcon: document.querySelector('.js-close-icon'),
    logo: Array.from(document.querySelectorAll('.header-logo')),
  },

  /* ================= ARTISTS ================= */
  artists: {
    list: document.querySelector('.js-artist-list'),
    loadMoreBtn: document.querySelector('.artists-load-btn'),
    loader: document.getElementById('loader'),
  },

  /* ================= REVIEWS ================= */
  reviews: {
    list: document.getElementById('feedbacks-container'),
    openBtn: document.querySelector('.reviews-open-btn'),
    modal: document.getElementById('feedback-modal'),
    closeBtn: document.querySelector('.feedback-close-btn'),
    form: document.querySelector('.feedback-form'),
  },

  /* ================= FOOTER ================= */
  footer: document.querySelector('.footer'),
};