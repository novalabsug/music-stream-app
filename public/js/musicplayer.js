const musicArr = [
  {
    title: "Music title #1",
    artist: "Music artist #1",
    albumArt: "/images/album-1.jpg",
    src: "/files/Haven - Different People.mp3",
  },
  {
    title: "Music title #2",
    artist: "Music artist #2",
    albumArt: "/images/album-2.jpg",
    src: "/files/Thomas Rhett - Remember You Young.mp3",
  },
  {
    title: "Music title #3",
    artist: "Music artist #3",
    albumArt: "/images/album-3.jpg",
    src: "/files/VoicePlay - Tennessee Whiskey.mp3",
  },
  {
    title: "Music title #4",
    artist: "Music artist #4",
    albumArt: "/images/album-2.jpg",
    src: "/files/Zoë Wees - Control.mp3",
  },
];

const musicCards = [
  ...document.querySelectorAll(".music-cards-wrapper .card-wrapper i#play-btn"),
];
const playBtn = document.querySelector("#play");
const nextBtn = document.querySelector("#next");
const prevBtn = document.querySelector("prev");
const audio = document.querySelector("audio#audio");
const progress = document.querySelector("#player-progress");
const progressBar = document.querySelector("#track-wrapper");
const musicTitle = document.querySelector("#player-music-title");
const musicAlbum = document.querySelector("#player-music-album");
const musicArtist = document.querySelector("#player-music-artist");
const volumeBar = document.querySelector("#volume-bar");
const volume = document.querySelector("#volume");
const volumeIcon = document.querySelector("#volume-icon");

audio.volume = 0.7;

playBtn.addEventListener("click", () => {
  musicCards.forEach((card) => {
    if (playBtn.classList.contains("fa-pause")) {
      if (card.getAttribute("data-target") == "playing") {
        pauseSong(audio, card, playBtn);
      }
    } else {
      if (card.getAttribute("data-target") == "paused") {
        playSong(audio, card, playBtn);
      }
    }
  });
});

musicCards.forEach((card) => {
  card.addEventListener("click", () => {
    if (card.getAttribute("data-target") == "playing") {
      pauseSong(audio, card, playBtn);
    } else if (card.getAttribute("data-target") == "paused") {
      playSong(audio, card, playBtn);
    } else {
      loadSong(parseInt(card.getAttribute("data-id")), card);
    }
  });
});

volumeIcon.addEventListener("click", (e) => {
  if (volumeIcon.classList.contains("fa-volume-up")) {
    volumeIcon.className = "fa fa-volume-mute";
    audio.volume = 0;
    volume.style.width = 0;
  }
});

volume.style.width = `${audio.volume * 100}%`;
audio.addEventListener("timeupdate", updateProgress);
progressBar.addEventListener("click", updateDuration);
volumeBar.addEventListener("click", updateVolume);

function updateDuration(e) {
  const width = this.clientWidth;
  const clientX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clientX / width) * duration;
}

function updateVolume(e) {
  const width = this.clientWidth;
  const clientX = e.offsetX;

  audio.volume = clientX / width;
  volume.style.width = `${audio.volume * 100}%`;
  updateVolumeIcon();
}

function updateVolumeIcon() {
  if (audio.volume >= 0.5) {
    volumeIcon.className = "fa fa-volume-up";
  }

  if (audio.volume < 0.5) {
    volumeIcon.className = "fa fa-volume-down";
  }

  if (audio.volume === 0) {
    volumeIcon.className = "fa fa-volume-mute";
  }
}

function updateProgress(e) {
  const { currentTime, duration } = e.srcElement;
  const progressPercentage = (currentTime / duration) * 100;
  progress.style.width = `${progressPercentage}%`;
  if (currentTime == duration) {
    autoPlayNextSong();
  }
}

function autoPlayNextSong() {
  musicCards.forEach((card, index) => {
    let i = 0;
    let nextCard = "";
    if (
      card.getAttribute("data-target") == "playing" ||
      card.getAttribute("data-target") == "paused"
    ) {
      i = parseInt(card.getAttribute("data-id")) + 1;
      nextCard = musicCards[index + 1];
      loadSong(i, nextCard);
    }
  });
}

function loadSong(i, card) {
  musicArr.forEach((music, index) => {
    if (index === i) {
      pauseOtherSongs(i, musicCards);

      musicTitle.innerHTML = `${music.title}`;
      musicAlbum.src = music.albumArt;
      musicArtist.innerHTML = music.artist;
      audio.src = music.src;

      playSong(audio, card, playBtn);
    }
  });
}

function pauseOtherSongs(i, cards) {
  cards.forEach((card, index) => {
    if (parseInt(index) !== parseInt(i)) {
      card.className = "fa fa-play";
      card.setAttribute("data-target", "");
    }
  });
}

function playSong(audio, card, playBtn) {
  card.setAttribute("data-target", "playing");
  card.className = "fa fa-pause playing";
  playBtn.className = "fa fa-pause";

  audio.play();
}

function pauseSong(audio, card, playBtn) {
  card.setAttribute("data-target", "paused");
  card.className = "fa fa-play";
  playBtn.className = "fa fa-play";

  audio.pause();
}
