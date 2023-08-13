import Notiflix from 'notiflix';
import { fetchImages } from './pixabayApi';
import Simplelightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchFormEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

let query = '';
let page = 1;
const perPage = 40;

let simplelightbox;

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
      loadMoreBtnEl.classList.remove('unvisible');
    })
    .catch(error => console.log(error))
    .finally(() => {
      searchFormEl.reset();
      loadMoreBtnEl.classList.add('unvisible');
    });
}

const handleLoadMoreImg = () => {
  page += 1;

  fetchImages(query, page, perPage)
    .then(data => {
      console.log(data);

      if (data.page === data.totalHits) {
        loadMoreBtnEl.classList.add('unvisible');
      }
      renderGallery(data.hits);
      simplelightbox = new Simplelightbox('.gallery a').refresh();
    })
    .catch(error => console.log(error));
};

loadMoreBtnEl.addEventListener('click', handleLoadMoreImg);
