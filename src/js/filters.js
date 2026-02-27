// import { refs } from './refs.js';
// import { renderGenres, renderArtists } from './render-function.js';
// import { fetchArtistsByGenre } from './api-service.js';

// refs.toggleFiltersBtn.addEventListener('click', () => {
//   refs.filtersContainer.classList.toggle('hidden');
// });

// refs.genreButton.addEventListener('click', async () => {
//   refs.genreMenu.classList.toggle('hidden');
//   if (!refs.genreMenu.innerHTML) {
//     await renderGenres();
//   }
// });

// refs.genreMenu.addEventListener('click', async (event) => {
//     const selectedGenre = event.target.dataset.genre;
//     if (!selectedGenre) return;

//     try {
//       const artists = await fetchArtistsByGenre(selectedGenre);
//       refs.artistCardsContainer.innerHTML = '';
//       renderArtists(artists);

//       refs.filtersContainer.classList.add('hidden');

//       if (artists.length < 8) {
//         refs.loadMoreBtn.style.display = 'none';
//       } else {
//         refs.loadMoreBtn.style.display = 'block';
//       }

//     } catch (error) {
//       console.error('Error fetching artists by genre:', error);
//     }
// });

// document.addEventListener('DOMContentLoaded', () => {
//     refs.sortingDropdown = document.querySelector('#sorting-dropdown');
//     refs.sortingMenu = document.querySelector('#sorting-menu');
// });

//   refs.sortingMenu.addEventListener('click', (event) => {
//     const sortType = event.target.dataset.value;
//     if (!sortType) return;
// });
