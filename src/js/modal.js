import { refs } from './refs';
import { renderModal, renderAlbums } from './render-function';

let scrollPosition = 0;

export function openArtistModal({ artist, albums }) {
  scrollPosition = window.scrollY || document.documentElement.scrollTop;

  const artistData = {
    ...artist,
    albumsList: albums || [],
    genresList: artist.genres || [],
  };

  renderModal(artistData);
  renderAlbums(artistData.albumsList);

  document.body.style.cssText = `
    position: fixed;
    top: -${scrollPosition}px;
    left: 0;
    width: 100%;
    overflow: hidden;
  `;

  refs.modal.classList.remove('hidden');

  addModalListeners();
}

// додавання та видалення слухачів для модального вікна
function closeModal() {
  refs.modal.classList.add('hidden');

  const scrollY = -parseInt(document.body.style.top);

  document.body.style.cssText = '';

  window.scrollTo({ top: scrollY });

  removeModalListeners();
}

function onModalClick(event) {
  if (event.target === refs.modal || event.target.closest('.js-modal-close')) {
    closeModal();
  }
}

function onModalKeydown(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

function addModalListeners() {
  document.addEventListener('click', onModalClick);
  document.addEventListener('keydown', onModalKeydown);
}

function removeModalListeners() {
  document.removeEventListener('click', onModalClick);
  document.removeEventListener('keydown', onModalKeydown);
}

export function showModalLoader() {
  refs.modalLoader?.classList.remove('visually-hidden');
}

export function hideModalLoader() {
  refs.modalLoader?.classList.add('visually-hidden');
}
