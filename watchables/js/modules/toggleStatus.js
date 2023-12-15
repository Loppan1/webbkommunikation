// Modul för att ändra status mellan true och false på "watched". Gjorde till en modul då den inte använder några andra funktioner än de som finns nedan (förutom
// firebase funktionerna som redan är exporterade för resten av funktionerna)

import { db } from "./firebaseConfig.js";
import { getDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

//Ändrar watched-boolean mellan true och false
async function toggleWatchedStatus(id, movieCardElement, lightboxElement) {
    const movieId = doc(db, 'movies', id);

    try {
        const movieSnapshot = await getDoc(movieId);
        const movieData = movieSnapshot.data();

        // Om watched är true, sätt till false, annars sätt till true
        const updatedWatchedStatus = !movieData.watched;

        // Uppdatera watched-fältet i databasen med updateDoc
        await updateDoc(movieId, { watched: updatedWatchedStatus });
        updateUI(movieData, movieCardElement, lightboxElement);
    } catch (error) {
        console.error(`Error toggling watched status: ${error}`);
    }
}

//Uppdaterar UIn på watched-status med hjälp av movieData hos movieCardElement och lightboxElement
function updateUI(movieData, movieCardElement, lightboxElement) {
    const watchedStatusElementMain = movieCardElement.querySelector('.watched-status__main');
    const watchedStatusElementLight = lightboxElement.querySelector('.watched-status__lightbox');

    if (watchedStatusElementMain && watchedStatusElementLight) {
        watchedStatusElementMain.textContent = movieData.watched ? 'Not Watched' : 'Watched';
        watchedStatusElementLight.textContent = movieData.watched ? 'Not Watched' : 'Watched';
    }
}

export { toggleWatchedStatus }

// Valde att testa göra så att UIn uppdateras här istället för laddas om (tömma html och kalla igen) som jag gjort i de andra funktionerna, vet inte om
// det finns ett snyggare sätt att göra det på?