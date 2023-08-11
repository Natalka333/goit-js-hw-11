import Notiflix from 'notiflix';
import { fetchImages } from './pixabayApi';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

const searchFormEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('gallery');

// let query = '';
// let page = 1;
// let simplelightbox;
// const perPage = 40;

// // searchFormEl.addEventListener('submit', handleSearchForm);

// const markup = images
//   .map(image => {
//     const {
//       id,
//       webformatURL,
//       largeImageURL,
//       tags,
//       likes,
//       views,
//       comments,
//       downloads,
//     } = image;
//     return `<a class="gallery-link" href="${largeImageURL}">
// 	<div class="photo-card" id="${id}">
//   <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes</b>${likes}
//     </p>
//     <p class="info-item">
//       <b>Views</b>${views}
//     </p>
//     <p class="info-item">
//       <b>Comments</b>${comments}
//     </p>
//     <p class="info-item">
//       <b>Downloads</b>${downloads}
//     </p>
//   </div>
// </div>
// </a>`;
//   })
//   .join('');

// galleryEl.insertAdjacentHTML('beforeend', markup);
