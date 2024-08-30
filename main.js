const all_songs = [
  {
    id: 1,
    name: "Guts Over Fear",
    artist: "Eminem",
    img: "mp3/gutsoverfear.jpeg",
    genre: "Hip Hop",
    source: "mp3/Eminem - Guts Over Fear ft. Sia.mp3",
  },
  {
    id: 2,
    name: "Problem",
    artist: "Ariana Grande",
    img: "mp3/problem.jpeg",
    genre: "Hip Hop",
    source: "mp3/Ariana Grande - Problem ft. Iggy Azalea.mp3",
  },
  {
    id: 3,
    name: "Space Bound",
    artist: "Eminem",
    img: "mp3/spacebound.jpg",
    genre: "Pop",
    source: "mp3/Eminem - Space Bound (Official Video).mp3",
  },
  {
    id: 4,
    name: "Boulevard Of Broken Dreams",
    artist: "Green Day",
    img: "mp3/brokendreams.jpg",
    genre: "Pop",
    source:
      "mp3/Green Day - Boulevard Of Broken Dreams [Official Music Video].mp3",
  },
  {
    id: 5,
    name: "Wake Me Up When September Ends",
    artist: "Green Day",
    img: "mp3/septemberends.jpg",
    genre: "Rock",
    source: "mp3/Green Day - Wake Me Up When September Ends - [HQ].mp3",
  },
  {
    id: 6,
    name: "In The End",
    artist: "Linkin Park",
    img: "mp3/intheend.jpeg",
    genre: "Rock",
    source: "mp3/In The End [Official HD Music Video] - Linkin Park.mp3",
  },
  {
    id: 7,
    name: "Rude",
    artist: "Magic!",
    img: "mp3/rude.jpeg",
    genre: "Jazz",
    source: "mp3/MAGIC! - Rude (Official Video).mp3",
  },
  {
    id: 8,
    name: "Numb",
    artist: "Linkin Park",
    img: "mp3/numb.jpg",
    genre: "Jazz",
    source: "mp3/Numb (Official Music Video) [4K UPGRADE].mp3",
  },
  {
    id: 9,
    name: "Lifstyle",
    artist: "Rich Gang",
    img: "mp3/lifestyle.jpeg",
    genre: "Hip Hop",
    source: "mp3/Rich Gang - Lifestyle ft. Young Thug, Rich Homie Quan.mp3",
  },
  {
    id: 10,
    name: "Chandelier",
    artist: "Sia",
    img: "mp3/chandelier.jpeg",
    genre: "Pop",
    source: "mp3/Sia - Chandelier (Official Video).mp3",
  },
];

const genresList = ["All", "Pop", "Hip Hop", "Rock", "Jazz"];

let songsQueue = [...all_songs];
let currentSong = 0;

let filtered_queue = [];

const playlists = {};

let currentPlaylist = null;
let isPlaylistActive = false; //to check playlist is any playlist is running

document.getElementById("play-prev").addEventListener("click", playPrev);
document.getElementById("play-next").addEventListener("click", playNext);

function playNext() {
  currentSong = (currentSong + 1) % songsQueue.length;
  renderCurrentSong(songsQueue[currentSong]);
}
function playPrev() {
  if (currentSong === 0) currentSong = songsQueue.length - 1;
  else currentSong--;
  renderCurrentSong(songsQueue[currentSong]);
}

function renderCurrentSong(song) {
  const songImg = document.getElementById("song-image");
  songImg.src = song.img;
  const songName = document.getElementById("song-name");
  songName.textContent = song.name;
  const singerName = document.getElementById("singer-name");
  singerName.textContent = song.artist;
  const songControl = document.getElementById("song-control");
  const songSrc = document.getElementById("song-src");
  songSrc.src = song.source;
  songControl.load();
  songControl.play();
}

const dropDownList = document.getElementById("genres");
genresList.forEach((g) => {
  const item = document.createElement("option");
  item.value = g;
  item.textContent = g;
  dropDownList.appendChild(item);
});
dropDownList.addEventListener("change", () => {
  showSongs(dropDownList.value);
});

function showSongs(genreType) {
  if (genreType === "All") {
    filtered_queue = [...all_songs];
  } else {
    filtered_queue = all_songs.filter((song) => {
      if (song.genre === genreType) return true;
    });
  }
  const filteredList = document.getElementById("filtered-songs-list");
  filteredList.innerHTML = "";
  filtered_queue.forEach((song, index) => {
    const newItem = document.createElement("div");
    newItem.classList.add("song-item");
    newItem.textContent = `${song.name} -${song.artist}`;

    newItem.addEventListener("click", () => {
      isPlaylistActive = false;
      songsQueue = [...filtered_queue];
      currentSong = index;
      renderCurrentSong(songsQueue[currentSong]);
    });

    filteredList.appendChild(newItem);
  });
}

document.getElementById("add-playlist-btn").addEventListener("click", () => {
  const inputBox = document.getElementById("new-playlist-name");
  const playlListName = inputBox.value;
  inputBox.value = "";
  if (playlListName in playlists) return;
  if (playlListName === "") return;
  const playlistSection = document.getElementById("all-playlists");
  const playlistItem = document.createElement("div");
  playlistItem.classList.add("playlist-item");
  playlistItem.textContent = playlListName;
  playlistSection.appendChild(playlistItem);
  currentPlaylist = playlListName;
  playlists[playlListName] = [];
  playlistItem.addEventListener("click", () => {
    currentPlaylist = playlListName;
    showPlaylistItems(playlists[currentPlaylist]);
  });
});

function showPlaylistItems(playlist) {
  const currentPlaylistEl = document.getElementById("current-playlist");
  while (currentPlaylistEl.firstChild)
    currentPlaylistEl.removeChild(currentPlaylistEl.firstChild);
  playlist.forEach((pl, index) => {
    const newEl = document.createElement("div");
    newEl.classList.add("playlist-song");
    newEl.textContent = pl.name;
    //Delete playlist feature
    const delButton = document.createElement("button");
    delButton.textContent = "Del";
    delButton.id = "delete-button";
    newEl.appendChild(delButton);
    delButton.addEventListener("click", (event) => {
      if (isPlaylistActive) {
        if (index === currentSong) {
          if (songsQueue.length === 1) {
            playlists[currentPlaylist].splice(index, 1);
            songsQueue = [...all_songs];
            currentSong = 0;
            renderCurrentSong(songsQueue[currentSong]);
          }
          else
          {
            if (index === songsQueue.length - 1) {
              playlists[currentPlaylist].splice(index, 1);
              songsQueue = [...playlists[currentPlaylist]];
              currentSong = 0;
              renderCurrentSong(songsQueue[currentSong]);
            }
            else {
              playlists[currentPlaylist].splice(index, 1);
              songsQueue=[...playlists[currentPlaylist]];
              renderCurrentSong(songsQueue[currentSong]);
            }
          }
        }
        else 
        {
          if (index < currentSong)
          {
            let prevPlayingSong = currentSong;
            playlists[currentPlaylist].splice(index, 1);
            songsQueue = [...playlists[currentPlaylist]];
            currentSong = prevPlayingSong - 1;
          }
          else 
          {
            playlists[currentPlaylist].splice(index, 1);
            songsQueue = [...playlists[currentPlaylist]];
          }
        }
      }
      else 
      {
        playlists[currentPlaylist].splice(index, 1);
      }
      showPlaylistItems(playlists[currentPlaylist]);
      event.stopPropagation();
    });
    //
    currentPlaylistEl.appendChild(newEl);
    newEl.addEventListener("click", () => {
      isPlaylistActive = true;
      songsQueue = [...playlist];
      currentSong = index;
      renderCurrentSong(songsQueue[currentSong]);
    });
  });
}

document.getElementById("add-to-playlist").addEventListener("click", () => {
  if (currentPlaylist === null) return;
  if (
    playlists[currentPlaylist].find((song) => {
      if (song.id === songsQueue[currentSong].id) return true;
    })
  )
    return;
  playlists[currentPlaylist].push(songsQueue[currentSong]);
  showPlaylistItems(playlists[currentPlaylist]);
});

(function () {
  const dropdownGenre = document.getElementById("genres");
  dropdownGenre.value = "All";
  const event = new Event("change");
  dropdownGenre.dispatchEvent(event);
  const mediaPlayer = document.getElementById("song-control");
  renderCurrentSong(songsQueue[currentSong]);
  mediaPlayer.pause();
})();

function toggleTheme() {
  const toggleButton = document.getElementById("toggle-theme-button");
  if (toggleButton.checked) {
    //Dark Mode
    const prevTheme = document.getElementById("light-theme");
    if (prevTheme) prevTheme.remove();
    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "darkTheme.css";
    link.id = "dark-theme";
    document.head.appendChild(link);
  } //Light Mode
  else {
    const prevTheme = document.getElementById("dark-theme");
    if (prevTheme) prevTheme.remove();
    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "lightTheme.css";
    link.id = "light-theme";
    document.head.appendChild(link);
  }
}

document
  .getElementById("toggle-theme-button")
  .addEventListener("click", toggleTheme);

document
  .getElementById("searchButton")
  .addEventListener("click", searchCallback);
document.getElementById("searchInput").addEventListener("keydown", (event) => {
  if (event.key === "Enter") searchCallback();
});

function searchCallback() {
  let searchString = document.getElementById("searchInput").value;
  searchString = searchString.trim();
  // if (searchString === "") return;
  searchSongs(searchString);
}

function searchSongs(searchString) {
  let searchQueue = filtered_queue.filter((song) => {
    if (song.name.toLowerCase().includes(searchString.toLowerCase()))
      return true;
    if (song.artist.toLowerCase().includes(searchString.toLowerCase()))
      return true;
  });
  const filteredList = document.getElementById("filtered-songs-list");
  filteredList.innerHTML = "";
  searchQueue.forEach((song, index) => {
    const newItem = document.createElement("div");
    newItem.classList.add("song-item");
    newItem.textContent = `${song.name} -${song.artist}`;

    newItem.addEventListener("click", () => {
      songsQueue = [...searchQueue];
      currentSong = index;
      renderCurrentSong(songsQueue[currentSong]);
    });
    filteredList.appendChild(newItem);
  });
}
