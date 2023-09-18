import axios from 'axios';
import Notiflix from 'notiflix';

const urlApi = 'https://pixabay.com/api/';
const apiKey = '39518450-04307adc64ba4dc69e2391ead';

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const contenerGallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const photos = [];
let page = 1;
loadMoreBtn.classList.add('is-hiden');
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  loadMoreBtn.classList.add('is-hiden');
  page = 1;

  if (page === 1) {
    photos.splice(0, photos.length);
    contenerGallery.innerHTML = '';
  }

  fetchPhotos();
});
async function fetchPhotos() {
  const url = `${urlApi}?key=${apiKey}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}&q=${searchInput.value}`;
  try {
    const res = await axios.get(url);

    console.log(res.data);
    if (res.data.totalHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      res.data.hits.forEach(function (obj, i) {
        const photoCard = document.createElement('div');
        photoCard.classList = 'photo-card';

        const photoImg = document.createElement('img');
        photoImg.src = obj.webformatURL;
        photoImg.alt = obj.tags.replaceAll(', ', '-').replaceAll(' ', '-');
        photoImg.loading = 'lazy';
        photoCard.append(photoImg);

        const photoDiv = document.createElement('div');
        photoDiv.classList = 'info';
        photoCard.append(photoDiv);

        const likes = document.createElement('p');
        likes.classList = 'info-item';
        likes.textContent = obj.likes;
        photoDiv.append(likes);
        const like = document.createElement('b');
        like.textContent = 'Likes';
        likes.append(like);

        const views = document.createElement('p');
        views.classList = 'info-item';
        views.textContent = obj.views;
        photoDiv.append(views);
        const view = document.createElement('b');
        view.textContent = 'Views ';
        views.append(view);

        const comments = document.createElement('p');
        comments.classList = 'info-item';
        comments.textContent = obj.comments;
        photoDiv.append(comments);
        const comment = document.createElement('b');
        comment.textContent = 'Comments';
        comments.append(comment);

        const downloads = document.createElement('p');
        downloads.classList = 'info-item';
        downloads.textContent = obj.downloads;
        photoDiv.append(downloads);
        const download = document.createElement('b');
        download.textContent = 'Downloads';
        downloads.append(download);

        photos.push(photoCard);
      });
    }

    contenerGallery.append(...photos);

    loadMoreBtn.classList.remove('is-hiden');
    if (res.data.totalHits <= page * 40) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      loadMoreBtn.classList.add('is-hiden');
    }
  } catch {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}
loadMoreBtn.addEventListener('click', () => {
  page += 1;
  fetchPhotos();
});
