//Modul som hanterar sökning av filmer. Gjorde det till en egen modul för displayMovies började bli lång

import { getMovies, createMovieCard } from "./displayMovies.js";

const moviesContent = document.getElementById('movies');

function filterMoviesByTitle(movies, searchTerm) {
    return movies.filter(movie => movie.data.title.toLowerCase().includes(searchTerm.toLowerCase()));
}

// Funktion som hanterar sökrutan och ger tillbaka filtrerade filmer
function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim();

    getMovies().then(movies => {
        const filteredMovies = filterMoviesByTitle(movies, searchTerm);
        moviesContent.innerHTML = "";
        filteredMovies.forEach(movie => {
            createMovieCard(movie);
        });
    });
}

export { handleSearch }