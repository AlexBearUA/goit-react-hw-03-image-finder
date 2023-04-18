import axios from 'axios';
const API_KEY = '34213016-753010ce7a0400954b4163a43';
const BASE_URL = 'https://pixabay.com/api';

async function fetchImages(searchQuery, page) {
  const searchParams = new URLSearchParams({
    q: searchQuery,
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
    safesearch: true,
    page: page,
  });

  // https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

  const url = `${BASE_URL}/?${searchParams}`;
  const data = await axios.get(url);

  return data;
}

const api = {
  fetchImages,
};

export default api;
