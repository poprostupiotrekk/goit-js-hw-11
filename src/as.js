import axios from 'axios';
import Notiflix from 'notiflix';

const apiKey = '39293413-f7845b49e753cbeb6dc88411e';
const urlApi = 'https://pixabay.com/api/';
const options = {
  key: apiKey,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  per_page: '40',
};

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const contenerGallery = document.querySelector('.gallery');

async function searchPhotos(e) {
  e.preventDefault();
  //   const page = '1';
  const q = searchInput.value;

  await loadPhotos({ q });
}

async function loadPhotos({ q, page = '1' }) {
  const photos = await pingPixabay({ q, page });
  if (photos === []) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  drawPhotos({ photos, page });
  return;
}
let photos = [];
async function pingPixabay({ q = '', page = '1' }) {
  try {
    const querystring = new URLSearchParams({
      ...options,
      page,
      q,
    });

    const response = await axios.get(`${urlApi}?${querystring}`);
    console.log(response.data.hits);
    if (!response.ok) {
      if (response.status === 400) {
        return [];
      }
      return { error: response.status };
    }

    photos = [...response.data.hits];
    console.log(photos);
    return photos;
  } catch (e) {
    return { error: e.toString() };
  }
}

function drawPhotos({ photos, page }) {
  if (page === '1') {
    console.log(i);
  }
  let i = 0;
  const children = [];
  photos.forEach(function (obj, i) {
    i += 1;
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

    children.push(photoCard);
  });
  contenerGallery.append(...children);
}

searchForm.addEventListener('submit', searchPhotos);
