// Modul för att visa alla filmer på sidan och ta bort filmer. Använder endast en annan modul förutom firebase och exporterar endast en funktion till index

import { db } from "./firebaseConfig.js";
import { collection, getDocs, deleteDoc, doc, } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { toggleWatchedStatus } from "./toggleStatus.js";

const moviesContent = document.getElementById('movies');

//Anropar databasen och hämtar id och data[title, genre, release, watched, poster]
async function getMovies() {
    try {
        const moviesCollection = collection(db, 'movies');
        const moviesSnapshot = await getDocs(moviesCollection);

        const formattedMovies = [];

        moviesSnapshot.forEach((movie) => {
            const formattedMovie = {
                id: movie.id,
                data: movie.data()
            };

            formattedMovies.push(formattedMovie);
        });

        return formattedMovies;

        } catch (error) {
        console.log(`ERROR: ${error}`);
}}

//Loopar igenom alla filmer som hämtats från databasen och gör ett kort per film
async function displayMovies() {
    const movies = await getMovies();

    movies.forEach((movie) => {
        createMovieCard(movie);
    });
}

//Hämtar och visar all information till varje film på framsidan 
function createMovieCard(movie) {
    const movieCardElem = document.createElement('section');
    movieCardElem.classList.add('movie-card');

    movieCardElem.innerHTML = 
    `
    <img src="${movie.data.poster}">
    <h3 class="movie-title__main">${movie.data.title}</h3>
    <h4 class="watched-status__main">${movie.data.watched ? 'Watched' : 'Not Watched'}</h4>
    `;

    //Gör så att om man klickar någonstans på filmkortet så öppnas lightboxen 
    movieCardElem.addEventListener('click', () => {
        openMovieLightbox(movieCardElem, movie);
    }); 

    moviesContent.appendChild(movieCardElem);
}


//Hämtar och visar all information till lightboxen när man klickat på en film och gör lightboxen synlig
function openMovieLightbox(movieCardElement, movie) {
    const movieLightbox = document.querySelector('.movie-lightbox');

    movieLightbox.innerHTML = `
    <div class="lightbox-content">
        <section class="lightbox-text">
        <h2 class="movie-title__light">${movie.data.title}</h3>
        <p>${movie.data.genre}</p>
        <p>Utgivningsdatum: ${movie.data.release}</p>

        <p class="watched-status__lightbox">${movie.data.watched ? 'Watched' : 'Not Watched'}</p>
        <button class="watched-button">Toggle watched status</button>
        <button class="remove-button">Ta bort film</button>
        </section>
        <img src="${movie.data.poster}">
    </div>
    `;


    //Läser av de nyskapade knapparna och ger dem funktioner om de klickas
    const watchedButton = document.querySelector('.watched-button')
    const removeButton = document.querySelector('.remove-button')
    
    watchedButton.addEventListener('click', () => {
        toggleWatchedStatus(movie.id, movieCardElement, movieLightbox);
    });
    removeButton.addEventListener('click', () => {
        removeMovie(movie.id);
    });

    //Ändrar lightboxen från 'none' till 'block' i CSS så att den syns
    movieLightbox.style.display = 'block';
}

//Tar bort en film ur databasen när man klickar på removeButton 
async function removeMovie(id) {
    const movieLightbox = document.querySelector('.movie-lightbox')

    try {
        await deleteDoc(doc(db, 'movies', id));
        moviesContent.innerHTML = ""
        movieLightbox.style.display = 'none';
        displayMovies();
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
}

export { displayMovies, getMovies, createMovieCard }