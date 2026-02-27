import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { postFeedback } from './api-service';
import { refs } from './refs';

const {
  feedbackModalEl: modal,
  feedbackOpenBtnEl: openBtn,
  feedbackCloseBtnEl: closeBtn,
  feedbackFormEl: form,
  feedbackStarsEls: stars,
} = refs;

let selectedRating = 0;


openBtn.addEventListener('click', () => {
  modal.classList.remove('is-hidden');
  document.body.classList.add('no-scroll');
});


closeBtn.addEventListener('click', closeModal);

function closeModal() {
  modal.classList.add('is-hidden');
  document.body.classList.remove('no-scroll');
  form.reset();
  selectedRating = 0;
  updateStars(0);
}


stars.forEach(star => {
  star.addEventListener('click', () => {
    selectedRating = Number(star.dataset.value);
    updateStars(selectedRating);
  });
});


function updateStars(rating) {
  stars.forEach(star => {
    const val = Number(star.dataset.value);
    star.classList.toggle('active', val <= rating);
  });
}


form.addEventListener('submit', async e => {
  e.preventDefault();
  const name = form.elements.name.value.trim();
  const message = form.elements.message.value.trim();

  if (!name || !message || selectedRating === 0) {
    iziToast.error({
      title: 'Heads up!',
      message: 'Please fill out all fields and pick a rating.',
      position: 'topRight',
    });
    return;
  }

  if (message.length < 10) {
    iziToast.error({
      title: 'Oops!',
      message: 'Your feedback should be at least 10 characters long.',
      position: 'topRight',
    });
    return;
  }

  try {
    await postFeedback({
      name,
      descr: message,
      rating: selectedRating,
    });

    iziToast.success({
      title: 'Awesome!',
      message: 'Thank you so much for your feedback!',
      position: 'topRight',
      backgroundColor: '#764191',
      color: 'white',
    });

    closeModal();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  }
});