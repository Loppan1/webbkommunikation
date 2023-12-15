//Modul för funktionen som gör att när man trycker på confirm-add (knappen i 'Lägg till film' lightboxen) så skickas informationen till databasen.

import { db } from "./firebaseConfig.js";
import { addDoc, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { displayMovies } from "./displayMovies.js";

const addMovieButton = document.querySelector('.confirm-add')
const moviesContent = document.getElementById('movies');

// Skickar information till databasen
async function addMovie(movie) {
    const addLightbox = document.querySelector('.add-movie');
    const addLightboxContent = document.querySelector('.lightbox-content');
    
    try {
        // Kontrollera om filmen redan finns
        const isDuplicateTitle = await checkDuplicateTitle(movie.title);
        
        // Ta bort eventuell tidigare varningstext
        const previousWarning = document.querySelector('.warning-text');
        if (previousWarning) {
            addLightboxContent.removeChild(previousWarning);
        }

        if (isDuplicateTitle) {
            const addWarning = document.createElement('h2');
            addWarning.classList.add('warning-text');
            addWarning.innerHTML = "En film med samma titel finns redan";
            addLightboxContent.appendChild(addWarning);

        } else {
            // Lägg till filmen om titeln inte finns
            await addDoc(collection(db, 'movies'), movie);
            moviesContent.innerHTML = "";
            addLightbox.style.display = 'none';
            displayMovies();
            clearInputFields();
        }
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
}

//Läser av informationen i inputrutorna i lightboxen
addMovieButton.addEventListener('click', () => {
    const movie = {
        title: document.querySelector('#addTitle').value,
        genre: document.querySelector('#addGenre').value,
        release: document.querySelector('#addRelease').value,
        poster: document.querySelector('#addPoster').value,
        watched: false
    };
    addMovie(movie);
});

//Tömmer alla inputfält i addMovieLightbox
function clearInputFields() {
    document.querySelector('#addTitle').value = '';
    document.querySelector('#addGenre').value = '';
    document.querySelector('#addRelease').value = '';
    document.querySelector('#addPoster').value = '';
}

//Kollar om det finns en film med samma titel i databasen redan
async function checkDuplicateTitle(title) {
    const moviesRef = collection(db, 'movies');
    const q = query(moviesRef, where('title', '==', title));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // Returnerar true om det finns dubblett-titel, annars false
}

export { addMovieButton }