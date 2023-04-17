import axios from 'axios';
const API_KEY = '34213016-753010ce7a0400954b4163a43';
const BASE_URL = 'https://pixabay.com/api';

async function fetchImages(searchQuery, page) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
    page: page,
  });

  const url = `${BASE_URL}/?${searchParams}`;
  const data = await axios.get(url);

  return data;
}

const api = {
  fetchImages,
};

export default api;
