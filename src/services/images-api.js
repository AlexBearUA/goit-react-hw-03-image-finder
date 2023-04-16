// const axios = require('axios').default;
// const API_KEY = '34213016-753010ce7a0400954b4163a43';
// const BASE_URL = 'https://pixabay.com/api';

// export default class ImagesApiService {
//   constructor() {
//     this.page = 1;
//     this.perPage = 12;
//   }

//   async fetchImages(searchQuery) {
//     const searchParams = new URLSearchParams({
//       key: API_KEY,
//       q: searchQuery,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: true,
//       per_page: this.perPage,
//       page: this.page,
//     });

//     const url = `${BASE_URL}/?${searchParams}`;

//     const {
//       data: { hits: images },
//     } = await axios.get(url);
//     return images;
//   }
// }
