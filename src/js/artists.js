import { refs } from './refs.js';

/* ================= STATE ================= */

const state = {
  itemsPerPage: 3,
  currentPage: 1,
  isLoading: false,
  data: [
    { title: 'BB kremas', text: 'Lengvas ir natūralus padengimas.' },
    { title: 'CC kremas', text: 'Sulygina odos toną.' },
    { title: 'Maskuoklis', text: 'Paslepia netobulumus.' },
    { title: 'Bronzantas', text: 'Subtilus kontūravimas.' },
    { title: 'Highlighter', text: 'Natūralus švytėjimas.' },
    { title: 'Blush', text: 'Sveikas veido atspalvis.' },
  ],
};

/* ================= RENDER ================= */

function createCard({ title, text }) {
  const li = document.createElement('li');
  li.className = 'artist-card';

  const h3 = document.createElement('h3');
  h3.className = 'artist-card-title';
  h3.textContent = title;

  const p = document.createElement('p');
  p.className = 'artist-card-text';
  p.textContent = text;

  li.append(h3, p);

  return li;
}

function appendArtists() {
  if (!refs.artists.list) return;

  const start = (state.currentPage - 1) * state.itemsPerPage;
  const end = state.currentPage * state.itemsPerPage;
  const items = state.data.slice(start, end);

  const fragment = document.createDocumentFragment();

  items.forEach(item => {
    fragment.appendChild(createCard(item));
  });

  refs.artists.list.appendChild(fragment);

  updateLoadButton();
}

/* ================= LOAD MORE ================= */

function updateLoadButton() {
  if (!refs.artists.loadMoreBtn) return;

  const totalShown = state.currentPage * state.itemsPerPage;

  if (totalShown >= state.data.length) {
    refs.artists.loadMoreBtn.setAttribute('hidden', '');
  }
}

function handleLoadMore() {
  if (state.isLoading) return;

  state.isLoading = true;

  state.currentPage += 1;
  appendArtists();

  state.isLoading = false;
}

/* ================= INIT ================= */

function initArtists() {
  if (!refs.artists.list) return;

  appendArtists();

  refs.artists.loadMoreBtn?.addEventListener('click', handleLoadMore);
}

initArtists();