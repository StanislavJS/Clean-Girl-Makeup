import axios from 'axios';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { renderStars } from './render-function';

const swiper = new Swiper('.swiper', {
  modules: [Navigation, Pagination],
  slidesPerView: 1,
  spaceBetween: 0,
  centeredSlides: true,
  touchEventsTarget: 'container',
  simulateTouch: true,
  touchRatio: 1,

  pagination: {
    el: '.swiper-pagination',
    type: 'custom',

    renderCustom(swiper, current, total) {
      return `
        <span class="swiper-pagination-bullet" data-index="0"></span>
        <span class="swiper-pagination-bullet" data-index="middle"></span>
        <span class="swiper-pagination-bullet" data-index="${total - 1}"></span>
      `;
    },

    clickable: true,
  },
  on: {
    init(swiper) {
      setTimeout(() => {
        updateActiveCustomBullet(swiper);
        attachCustomPaginationHandlers(swiper);
      }, 300);
    },
    slideChange(swiper) {
      updateActiveCustomBullet(swiper);
    },
  },

  navigation: {
    nextEl: '.feedback-next',
    prevEl: '.feedback-prev',
  },
  
 

  breakpoints: {
    320: { slidesPerView: 1 },
    768: { slidesPerView: 1 },
    1440: { slidesPerView: 1 },
  },
});

function attachCustomPaginationHandlers(swiper) {
  const container = swiper.pagination.el;
  container.addEventListener('click', e => {
    const bullet = e.target.closest('.swiper-pagination-bullet');
    if (!bullet) return;

    let index = bullet.dataset.index;
    if (index === 'middle') {
      index = Math.floor(swiper.slides.length / 2);
    } else {
      index = parseInt(index, 10);
    }
    swiper.slideTo(index);
  });

  updateActiveCustomBullet(swiper);
}

function updateActiveCustomBullet(swiper) {
  const container = swiper.pagination.el;
  const bullets = container.querySelectorAll('.swiper-pagination-bullet');

  bullets.forEach(b => b.classList.remove('swiper-pagination-bullet-active'));

  const index = swiper.realIndex;
  if (index === 0) {
    bullets[0].classList.add('swiper-pagination-bullet-active');
  } else if (index === swiper.slides.length - 1) {
    bullets[2].classList.add('swiper-pagination-bullet-active');
  } else {
    bullets[1].classList.add('swiper-pagination-bullet-active');
  }
}

axios.defaults.baseURL = 'https://sound-wave.b.goit.study/api/';

async function fetchFeedbacks() {
  try {
    const { data } = await axios.get('/feedbacks?limit=20&page=1');
    const feedbacks = data.data;
    const container = document.getElementById('feedbacks-container');
    container.innerHTML = '';

    feedbacks.forEach((fb, i) => {
      const slide = document.createElement('div');
      slide.classList.add('swiper-slide');

      const ratingId = `raty-${i}`;
      slide.innerHTML = `
        <div class="feedback-card">
          <div class="rating-star" id="${ratingId}"></div>
          <p class="feedback-text">"${fb.descr}"</p>
          <p class="author-name">${fb.name}</p>
        </div>
      `;
      container.appendChild(slide);
      renderStars(`#${ratingId}`, fb.rating);
    });

    swiper.update();
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
  }
}

fetchFeedbacks();

