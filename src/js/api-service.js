import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

axios.defaults.baseURL = 'https://sound-wave.b.goit.study/api';

export async function fetchArtists(page = 1, limit = 8) {
  try {
    const { data } = await axios.get(`/artists`, {
      params: { page, limit },
    });
    return data;
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch artists. Please try again later.',
      position: 'topRight',
      timeout: 5000,
    });
    throw error;
  }
}

export async function fetchArtistById(id) {
  try {
    const { data } = await axios.get(`/artists/${id}`);
    return data;
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch artist details.',
      position: 'topRight',
      timeout: 5000,
    });
    throw error;
  }
}

export async function fetchArtistsAlbumsById(id) {
  try {
    const { data } = await axios.get(`/artists/${id}/albums`);
    return data.albumsList;
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch artist albums.',
      position: 'topRight',
      timeout: 5000,
    });
    throw error;
  }
}

export async function postFeedback({ name, rating, descr }) {
  try {
    const { data } = await axios.post('/feedbacks', {
name,
rating,
descr,
    });
    return data;
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to submit feedback. Please try again.',
      position: 'topRight',
    });
    throw error;
  }
}