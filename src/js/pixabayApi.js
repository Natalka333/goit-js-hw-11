import axios from 'axios';
import Notiflix from 'notiflix';

const API_KEY = '38739030-af5614da71e4107ffbd422430';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.interceptors.response.use(
  response => {
    // console.log(response);
    return response;
  },
  error => {
    Notiflix.Notify.failure('Something went wrong. Please try again later.');
    return Promise.reject(error);
  }
);

async function fetchImages(query, page, perPage) {
  const response = await axios.get(
    `?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );

  return response.data;
}

export { fetchImages };

// async function fetchImages() {
//   page = 1;
//   query = null;

//   const searchParams = new SearchParams({
//     query: this.query,
//     page: this.page,
//     per_page: 40,
//     image_type: photo,
//     orientation: horizontal,
//     safesearch: true,
//   });
//   const response = await axios.get(`?key=${API_KEY}&${searchParams}`);

//   return response.data;
// }
