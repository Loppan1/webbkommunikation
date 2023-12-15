//Har endast importerat in hela funktioner och deklarerat knappar

import { displayMovies } from "./modules/displayMovies.js";
import { addMovieButton } from "./modules/addMovie.js";
import { handleSearch } from "./modules/searchMovies.js";

await displayMovies()

const addButton = document.getElementById('addButton') 
const addLightbox = document.querySelector('.add-movie')
const movieLightbox = document.querySelector('.movie-lightbox')

// Öppnar lightbox för att lägga till ny film när man klickar på knappen
addButton.addEventListener('click', () => {
    addLightbox.style.display = "block";
});

// Stänger lightboxen för att lägga till om man klickar utanför rutan
window.addEventListener('click', function(event) {
    if (event.target === addLightbox) {
        addLightbox.style.display = 'none';
    }
});

// Stänger lightboxen för specifik film om man klickar utanför rutan
window.addEventListener('click', function(event) {
    if (event.target === movieLightbox) {
        movieLightbox.style.display = 'none';
    }
});


// Attach an event listener to the search input
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', handleSearch);