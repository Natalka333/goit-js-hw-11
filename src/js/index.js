import Notiflix from 'notiflix';
import { fetchImages } from './pixabayApi';
import Simplelightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchFormEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');

let query = '';
let page = 1;
let simplelightbox;
const perPage = 40;

searchFormEl.addEventListener('submit', handleSearchForm);

function renderGallery(images) {
  if (!galleryEl) {
    return;
  }

  const markup = images
    .map(image => {
      const {
        id,
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;
      return `<a class="gallery_link" href="${largeImageURL}">
	<div class="photo-card" id="${id}">
  <img class="gallery_img" src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div>
</a>`;
    })
    .join('');
  galleryEl.insertAdjacentHTML('beforeend', markup);
}

function handleSearchForm(event) {
  event.preventDefault();
  page = 1;
  query = event.currentTarget.elements.searchQuery.value.trim();
  // console.log(query);
  galleryEl.innerHTML = '';

  if (query === '') {
    Notiflix.Notify.failure('Please specify your search query');
    return;
  }

  fetchImages(query, page, perPage)
    .then(data => {
      if (data.totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        renderGallery(data.hits);
        simplelightbox = new Simplelightbox('.gallery a').refresh();
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      }
    })
    .catch(error => console.log(error))
    .finally(() => {
      searchFormEl.reset();
    });
}

function loadMoreImg() {
  page += 1;
  simplelightbox.destroy();

  fetchImages(query, page, perPage)
    .then(data => {
      renderGallery(data.hits);
      simplelightbox = new Simplelightbox('.gallery a').refresh();

      const totalPage = Math.ceil(data.totalHits / perPage);

      if (page > totalPage) {
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(error => console.log(error));
}