import { refs } from './refs.js';
import spriteUrl from '../images/sprite.svg?url';

// рендеринг списку артистів
export function renderArtists(data) {
  const markup = data.artists
    .map(artist => {
      const { _id, strArtist, strBiographyEN, strArtistThumb, genres } = artist;
      return `
        <li class="artist-card" data-id="${_id}" data-artist="${encodeURIComponent(
        JSON.stringify(artist)
      )}">
          <img class="artist-card-img" src="${strArtistThumb}" alt="${strArtist}" loading="lazy"/>

          <ul class="artist-card-genres">
            ${genres.map(genre => `<li>${genre}</li>`).join('')}
          </ul>

          <h3 class="artist-card-name">${strArtist}</h3>

          <p class="artist-card-info">
            ${
              strBiographyEN
                ? strBiographyEN.slice(0, 100) + '...'
                : 'No description available'
            }
          </p>

          <button class="artist-card-btn" type="button">
            Learn More
            <svg class="artist-card-icon" width="24" height="24">
              <use href="${spriteUrl}#icon-caret-right"></use>
            </svg>
          </button>
        </li>`;
    })
    .join('');

  refs.artistCardsContainer.insertAdjacentHTML('beforeend', markup);
}

// функції для модального вікна
const artistInfo = document.querySelector('.artists-info');
const artistAlbums = document.querySelector('.artists-albums');
export function renderModal(artistData) {
  const {
    strArtist = '-',
    strArtistThumb,
    intFormedYear,
    intDiedYear,
    strGender = '-',
    intMembers,
    strCountry = '-',
    strBiographyEN = '-',
    genresList = [],
  } = artistData;

  const yearsActive = intFormedYear
    ? intDiedYear
      ? `${intFormedYear} - ${intDiedYear}`
      : `${intFormedYear} - present`
    : '-';

  const genresMarkup = genresList.length
    ? genresList.map(genre => `<p class="genre-item">${genre}</p>`).join('')
    : '-';

  const markupModal = `
    <h2 class="artist-title">${strArtist}</h2>
    <div class="modal-artist-info">
    <div class="artist-img-container">
        <img src="${strArtistThumb || ''}" alt="${strArtist}" loading="lazy"/>
      </div>
      <div class="artist-top">
      <ul class="artist-meta-list"> 
          <li class="artist-meta-list-item"><b>Years active</b><br>
            <p>${yearsActive}</p>
          </li>
          <li class="artist-meta-list-item"><b>Sex</b><br>
            <p>${strGender}</p>
          </li>
          <li class="artist-meta-list-item"><b>Members</b><br>
            <p>${intMembers != null ? intMembers : '-'}</p>
          </li>
          <li class="artist-meta-list-item"><b>Country</b><br>
            <p>${strCountry}</p>
          </li>
      </ul>
    <div class="artist-bottom">
      <div class="artist-biography">
        <h3 class="artist-biography-title">Biography</h3>
        <p class="artist-biography-desc">${strBiographyEN}</p>
      </div>
      <div class="artist-genres">
        ${genresMarkup}
      </div>
      </div>
    </div>
    </div>
  `;
  artistInfo.innerHTML = markupModal;
}

// функція для альбомів
export function renderAlbums(albumsList = []) {
  artistAlbums.innerHTML = '';

  if (!albumsList.length) {
    artistAlbums.innerHTML = '<h4>-</h4>';
    return;
  }

  const albumsMarkup = `
    <h2 class="albums-title">Albums</h2>
      <div class="albums-list">
  ${albumsList
    .map(album => {
      const tracksMarkup =
        album.tracks && album.tracks.length
          ? `
              <ul class="track-list">
                <li class="track-header">
                  <span>Track</span>
                  <span>Time</span>
                  <span>Link</span>
                </li>
              ${album.tracks
                .map(
                  track => `
                <li class="track-item">
                  <span class="track-name">${track.strTrack || '-'}</span>
                  <span class="track-duration">
  ${track.intDuration ? formatDuration(track.intDuration) : '-'}
</span>
                  ${
                    track.movie
                      ? `<a class="track-link" href="${track.movie}" target="_blank" rel="noopener noreferrer">
                          <svg width="24" height="24">
                            <use href="${spriteUrl}#icon-youtube"></use>
                          </svg>
                        </a>`
                      : `<span class="track-link empty"></span>`
                  }
                    </li>`
                )
                .join('')}
              </ul>`
          : '<p>No tracks</p>';

      return `
          <div class="album">
            <h3 class="album-title">${album.strAlbum || '-'}</h3>
            ${tracksMarkup}
          </div>`;
    })
    .join('')}
    </div>
  `;

  artistAlbums.innerHTML = albumsMarkup;
}

// функція для форматування тривалості
function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('visually-hidden');
}

export function hideLoadMoreBtn() {
  refs.loadMoreBtn.classList.add('visually-hidden');
}

export function showLoader() {
  refs.loader.classList.remove('visually-hidden');
}

export function hideLoader() {
  refs.loader.classList.add('visually-hidden');
}

export function showLoadMoreLoader() {
  refs.loader.classList.remove('visually-hidden');
  refs.loadMoreBtn.classList.add('visually-hidden');
}

export function hideLoadMoreLoader() {
  refs.loader.classList.add('visually-hidden');
  refs.loadMoreBtn.classList.remove('visually-hidden');
}

// рендеринг зірочок рейтингу
export function renderStars(containerSelector, rating) {
  const container =
    typeof containerSelector === 'string'
      ? document.querySelector(containerSelector)
      : containerSelector;

  if (!container) return;

  const starDiv = document.createElement('div');
  starDiv.className = 'stars';

  const percent = Math.min(100, Math.max(0, (rating / 5) * 100));
  starDiv.style.setProperty('--rating-percent', `${percent}%`);

  container.appendChild(starDiv);
}

