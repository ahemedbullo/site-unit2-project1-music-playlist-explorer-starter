let playlistData =  data.playlists;

//getting an index of the random playlist
const randomIndex = Math.floor(Math.random() * playlistData.length); 

const playlist = document.querySelector('.random-playlist');
    playlist.innerHTML = "";


function displayRandomPlaylist(){
    //selecting a random playlist
    let SelectedPlaylist = playlistData[randomIndex];

    //creating the playlist card with its data
    playlist.innerHTML=`
    <img src="${SelectedPlaylist.playlist_art}" alt="">
    <h3>${SelectedPlaylist.playlist_name}</h3>
    <h4>${SelectedPlaylist.playlist_creator}</h4>
    <div class="playlist-songs">
            <li class="song-list">
                <img src="" alt="">
                <h4></h4>
                <p class="creator-name"></p>
                <p class="playlist-name"></p>
                </li>
        </div>
    `
    //console.log(SelectedPlaylist.songs)
    let playlistSongs = document.querySelector('.song-list');
    playlistSongs.innerHTML = '';

    //appending each song from the randomly selected playlist
SelectedPlaylist.songs.forEach((song) => {
    console.log(song.artist);
    const html = `
    <li class="song-list">
    <img src="${song.cover_art}" alt="">
    <h4>${song.title}</h4>
    <p class="artist-name">${song.artist}</p>
    <p class="album-name">${song.album}</p>
    <p>${song.duration}</p>
    </li>
    `;
    playlistSongs.innerHTML += html;
    }
)

};

displayRandomPlaylist()