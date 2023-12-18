import axios from 'axios';

export const fetchCatByBreed = breedId => {
  return axios.get(`/images/search?breed_ids=${breedId}`);
};
//fetch implementation
export const fetchBreeds = () => {
  return axios.get('/breeds').then(response => {
    return response.data;
  });
};