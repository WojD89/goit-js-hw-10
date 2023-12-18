import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js';
import axios from 'axios';
import Notiflix from 'notiflix';

axios.defaults.headers.common['x-api-key'] =
  'live_az1IdPtrVmEoiA6fRmskle8iNav9wOjPbGrtP5fGcLrL3hCGQu6XebTrHjXAuLRD';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

breedSelect.style.display = 'none';

fetchBreeds()
  .then(data => {
    const options = data.data;

    loader.style.display = 'block';
    error.style.display = 'none';

    breedSelect.innerHTML = options
      .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
      .join('');

    loader.style.display = 'none';
  })
  .catch(() => {
    loader.style.display = 'none';
    error.style.display = 'block';
  })
  .finally(() => {
    breedSelect.style.display = 'block';
  });

breedSelect.addEventListener('change', event => {
  error.style.display = 'none';
  loader.style.display = 'block';
  catInfo.style.display = 'none';

  const breed = event.target.value;

  fetchCatByBreed(breed)
    .then(data => {
      const catData = data.data[0].breeds[0];

      if (catData) {
        catInfo.innerHTML = `
          <p class="cat-name">${catData.name}</p>
          <p class="cat-desc">${catData.description}</p>
          <p class="cat-temper">${catData.temperament}</p>
          <img class="cat-img" src='${data.data[0].url}' >`;
      } else {
        catInfo.innerHTML = Notiflix.Notify.failure(
          'No information available for this breed'
        );
      }

      loader.style.display = 'none';
      catInfo.style.display = 'block';
    })
    .catch(() => {
      loader.style.display = 'none';
      error.style.display = 'block';
    });
});