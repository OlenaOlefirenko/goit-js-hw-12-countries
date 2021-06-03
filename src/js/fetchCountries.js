const URL = 'https://restcountries.eu/rest/v2/name';

function fetchCountries(countryName) {
  return fetch(`${URL}/${countryName}`).then(response => response.json());
}

export default { fetchCountries };
