import debounce from 'lodash.debounce';
import API from './fetchCountries.js';

import listContries from '../templates/list-countries.hbs';
import countryCard from '../templates/marcup-countries.hbs';

import { info, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const inputEl = document.querySelector('.input');
const cardContainer = document.querySelector('.js-card-container');

let countrySearch = '';

inputEl.addEventListener('input', debounce(onSearch, 500));

function onSearch() {
  cardContainer.innerHTML = '';
  countrySearch = inputEl.value;

  if (!countrySearch) {
    return;
  }
  API.fetchCountries(countrySearch).then(isFoundCountry).catch(onError);
}

function isFoundCountry(country) {
  if (country.length > 10) {
    tooManyCountries();
  } else if (country.length <= 10 && country.length > 1) {
    renderMarkup(listContries, country);
  } else if (country.length === 1) {
    renderMarkup(countryCard, country[0]);
  } else {
    noResult();
  }
}

function tooManyCountries() {
  info({
    text: 'Too many matches found. Please enter a more specific query!',
    delay: 2500,
    width: '500px',
    minHeight: '50px',
  });
}

function renderMarkup(template, country) {
  const markup = template(country);
  cardContainer.insertAdjacentHTML('beforeend', markup);
}

function noResult() {
  error({
    text: 'no matches found try a different search!',
    delay: 2500,
    width: '500px',
    minHeight: '50px',
  });
}

function onError() {
  error({
    text: 'Please enter correct query',
    delay: 2500,
    width: '500px',
    minHeight: '50px',
  });
}
