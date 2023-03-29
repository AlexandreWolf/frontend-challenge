const API_KEY = '';

let offset = 0;
const limit = 20;
let totalResults = 0;
let currentPage = 1;
let totalPages = 0;

const cardsContainer = document.getElementById('cards');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const currentPageElement = document.getElementById('current-page');
const totalPagesElement = document.getElementById('total-pages');

function updateButtons() {
  prevButton.disabled = false;

  if (currentPage === totalPages) {
    nextButton.disabled = true;
  } else {
    nextButton.disabled = false;
  }
}

function updatePaginationInfo() {
  currentPageElement.innerText = currentPage;
  totalPagesElement.innerText = totalPages;
}

function fetchCharacters() {
  const API_URL = `https://gateway.marvel.com/v1/public/characters?apikey=${API_KEY}&limit=${limit}&offset=${offset}`;

  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      totalResults = data.data.total;
      totalPages = Math.ceil(totalResults / limit);

      const characters = data.data.results;

      characters.forEach(character => {
        const card = document.createElement('div');
        card.classList.add('card');

        const image = document.createElement('img');
        image.src = `${character.thumbnail.path}/portrait_fantastic.${character.thumbnail.extension}`;
        card.appendChild(image);

        const name = document.createElement('h2');
        name.innerText = character.name;
        card.appendChild(name);

        const description = document.createElement('p');
        description.innerText = character.description;
        card.appendChild(description);

        cardsContainer.appendChild(card);
      });

      updatePaginationInfo();
      updateButtons();
    });
}

prevButton.addEventListener('click', () => {
  offset -= limit;
  currentPage--;
  cardsContainer.innerHTML = '';
  fetchCharacters();
});

nextButton.addEventListener('click', () => {
  if (currentPage < totalPages) {
    offset += limit;
    currentPage++;
    cardsContainer.innerHTML = '';
    fetchCharacters();
  }
});

fetchCharacters();