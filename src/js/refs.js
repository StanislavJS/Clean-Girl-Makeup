export const refs = {
  // Header & Navigation
  header: document.querySelector('.header'),
  navList: document.querySelector('.js-nav-list'),
  navLinks: document.querySelectorAll('.nav-button'),
  toggleBtn: document.querySelector('.js-toggle'),
  burgerIcon: document.querySelector('.js-burger-icon'),
  closeIcon: document.querySelector('.js-close-icon'),
  logo: document.querySelectorAll('.header-logo'),

  // Hero section
  heroSection: document.querySelector('.js-hero'),
  getStartedBtn: document.querySelector('.js-hero-button'),

  // Artists list
  artistCardsContainer: document.querySelector('.js-artist-list'),
  artistCards: document.querySelectorAll('.js-artist-card'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
  loader: document.getElementById('loader'),

  // Search filter
  toggleFiltersBtn: document.getElementById('toggle-filters'),
  filtersContainer: document.getElementById('filters-container'),
  genreButton: document.getElementById('genre-button'),
  genreMenu: document.getElementById('genre-menu'),
  sortingDropdown: document.querySelector('#sorting-dropdown'),
  sortingMenu: document.querySelector('#sorting-menu'),

  // About Artist Modal
  modal: document.querySelector('.js-modal'),
  modalCloseBtn: document.querySelector('.js-modal-close'),
  modalContent: document.querySelector('.js-modal-content'),
  modalFilters: document.querySelector('.js-modal-filters'),
  modalBody: document.querySelector('.js-modal-body'),
  modalLoader: document.getElementById('modal-loader'),

  // About section
  aboutSection: document.querySelector('.js-about'),
  aboutImage: document.querySelector('.js-about-image'),
  aboutText: document.querySelector('.js-about-text'),

  // Feedback
  testimonialsSection: document.querySelector('.js-testimonials'),
  testimonialsSlider: document.querySelector('.js-testimonials-slider'),
  testimonialPrevBtn: document.querySelector('.js-testimonials-btn-prev'),
  testimonialNextBtn: document.querySelector('.js-testimonials-btn-next'),
  // Feedback Modal
  feedbackModalEl: document.getElementById('feedback-modal'),
  feedbackOpenBtnEl: document.querySelector('.feedback-open-btn'),
  feedbackCloseBtnEl: document.querySelector('.feedback-close-btn'),
  feedbackFormEl: document.querySelector('.feedback-form'),
  feedbackStarsEls: document.querySelectorAll('.star'),

  // Footer
  footer: document.querySelector('.js-footer'),
};
