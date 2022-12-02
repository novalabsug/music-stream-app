function handleMusicPlayer() {
  const musicCards = [
    ...document.querySelectorAll(
      ".music-cards-wrapper .card-wrapper i#play-btn"
    ),
  ];
  const playBtn = document.querySelector("#play");
  const nextBtn = document.querySelector("#next");
  const prevBtn = document.querySelector("#prev");
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

  nextBtn.addEventListener("click", () => {
    playNextSong();
  });

  prevBtn.addEventListener("click", () => {
    playPrevSong();
  });

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
    let index = 0;
    let musicCard = "";

    musicCards.forEach((card) => {
      if (card.getAttribute("data-playing") == "true") {
        index = parseInt(card.getAttribute("data-id"));
        index++;
        musicCard = musicCards[index];
      }
      card.className = "fa fa-play";
      card.setAttribute("data-target", "");
      card.setAttribute("data-playing", "false");
      audio.src = "";
    });

    if (index < musicCards.length) return loadSong(index, musicCard);

    loadSong(0, musicCards[0]);
  }

  function playNextSong() {
    let index = 0;
    let musicCard = "";

    musicCards.forEach((card) => {
      if (card.getAttribute("data-playing") == "true") {
        index = parseInt(card.getAttribute("data-id"));
        index++;
        musicCard = musicCards[index];
      }
      card.className = "fa fa-play";
      card.setAttribute("data-target", "");
      card.setAttribute("data-playing", "false");
      audio.src = "";
    });

    if (index < musicCards.length) return loadSong(index, musicCard);

    loadSong(0, musicCards[0]);
  }

  function playPrevSong() {
    let index = 0;
    let musicCard = "";

    musicCards.forEach((card) => {
      if (card.getAttribute("data-playing") == "true") {
        index = parseInt(card.getAttribute("data-id"));
        index--;
        musicCard = musicCards[index];
      }
      card.className = "fa fa-play";
      card.setAttribute("data-target", "");
      card.setAttribute("data-playing", "false");
      audio.src = "";
    });

    if (index > 0) return loadSong(index, musicCard);

    loadSong(0, musicCards[0]);
  }

  function loadSong(i, card) {
    pauseOtherSongs(i, musicCards);

    const title = card.parentElement.querySelector("#title-wrapper").innerText;
    const album = card.parentElement
      .querySelector("#album-art")
      .getAttribute("src");
    const artist =
      card.parentElement.querySelector("#artist-wrapper").innerText;
    const filename = card.parentElement.getAttribute("data-target");

    musicTitle.innerHTML = `${title}`;
    musicAlbum.src = album;
    musicArtist.innerHTML = artist;
    audio.src = `/files/${filename}`;

    playSong(audio, card, playBtn);
  }

  function pauseOtherSongs(i, cards) {
    cards.forEach((card, index) => {
      if (parseInt(index) !== parseInt(i)) {
        card.className = "fa fa-play";
        card.setAttribute("data-target", "");
        card.setAttribute("data-playing", "false");
      }
    });
  }

  function playSong(audio, card, playBtn) {
    card.setAttribute("data-target", "playing");
    card.setAttribute("data-playing", "true");
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
}
