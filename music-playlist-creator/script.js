// Select all card items
const cardItems = document.querySelectorAll('.card-item');

// Select the modal overlay element
const modalOverlay = document.getElementById('modal-overlay');

// Add an event listener to the close button (inside the modal) to close the modal
modalOverlay.addEventListener('click', (event) => {
if (event.target.classList.contains('close') || event.target === modalOverlay) {
// Remove the modal-overlay-show class from the overlay element
modalOverlay.classList.remove('modal-overlay-show');
}
});


let playlistData = data.playlists;

function displayPlaylist(curr) {
const playlistCards = document.querySelector('.playlist-cards');


// Check if the playlistCards element exists before trying to remove children
if (playlistCards) {
playlistCards.innerHTML = '';
}

const modalContent = document.querySelector('.modal-content');

playlistData.forEach((item) => {
const playlistId = item.playlistID;
const newPlaylistCard = document.createElement('li');

newPlaylistCard.innerHTML = `
    <img src="${item.playlist_art}" alt="">
    <h3>${item.playlist_name}</h3>
    <h4>${item.playlist_creator}</h4>
    <div class="like-section">
        <button class="like-button">&#9829;</button>
        <span class="like-count">${item.likeCount}</span>
        <button class="delete-button">🗑</button>
    </div>
   
`;


newPlaylistCard.classList.add('card-item');
const deleteButton = newPlaylistCard.querySelector('.delete-button');
deleteButton.addEventListener('click', (event) => {
    event.stopPropagation();
    //console.log('delete-button')
    // Remove the playlist card from the DOM
    newPlaylistCard.remove();
    // Also, remove the playlist from the playlistData array
    const index = playlistData.indexOf(item);
    if (index > -1) {
    playlistData.splice(index, 1);
    }
});

const likeButton = newPlaylistCard.querySelector('.like-button');
likeButton.addEventListener('click', (event) => {
// Prevent the event from propagating to the parent element
event.stopPropagation();

// Increment the like count
item.likeCount += 1;

// Update the like count display
const likeCountElement = newPlaylistCard.querySelector('.like-count');
likeCountElement.textContent = item.likeCount;

// Toggle like class
likeButton.classList.toggle('liked');
});

newPlaylistCard.addEventListener('click', (event) => {
//console.log('Modal Opened');
// Add the modal-overlay-show class to the overlay element
modalOverlay.classList.add('modal-overlay-show');

// Reset the modal
modalContent.innerHTML = `
<span class="close">&times;</span>
<img src="${item.playlist_art}" alt="">
<div class="playlist-info">
<h3>${item.playlist_name}</h3>
<h4>by ${item.playlist_creator}</h4>
</div>
<button class = "shuffle-button" <span> Shuffle</span> </button>
`;

// Render the songs into the modal from the item
item.songs.forEach((song) => {
const html = `
<li class="song-list">
<img src="${song.cover_art}" alt="">
<h4>${song.title}</h4>
<p class="artist-name">${song.artist}</p>
<p class="album-name">${song.album}</p>
<p>${song.duration}</p>
</li>
`;
modalContent.innerHTML += html;

// Shuffling the songs and appending it to the songs
let shuffleButton = modalContent.querySelector('.shuffle-button');
shuffleButton.addEventListener('click', (event) =>{
    //console.log("Shuffle-button working")
    const songList = modalContent.querySelectorAll('.song-list');
    const songArray = Array.prototype.slice.call(songList);

    for (let i = songArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [songArray[i], songArray[j]] = [songArray[j], songArray[i]];
    }

    songList.forEach((song) => {
    song.remove();
    });
    
    songArray.forEach((song) => {
    modalContent.appendChild(song);
    });
    
    });


});
});

playlistCards.appendChild(newPlaylistCard);
});
};



// Call the function without passing any argument
displayPlaylist();



