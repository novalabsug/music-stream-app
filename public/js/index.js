// fetch and load music data
const musicWrapper = document.querySelector("section .music-cards-wrapper");

HandleHttpRequests.handleFetchingData()
  .then((result) => {
    const Music = result;

    if (Music.length > 0) {
      musicWrapper.className = "music-cards-wrapper grd grd-cl-5";
      Music.forEach((music, index) => {
        const card = document.createElement("div");
        card.className = "card-wrapper backdrop";
        card.setAttribute("data-target", `${music.filename}`);
        card.innerHTML = `
        <i class="fa fa-play" id="play-btn" data-id="${index}"></i>
        <img src="/files/${music.album}" alt="" id="album-art" srcset="" />
        <div class="card-wrapper-txt">
          <a>
            <h3 id="artist-wrapper" data-target="${music.artist}" class="primary-color">
              ${music.artist}
            </h3>
          </a>
          <p id="title-wrapper">${music.title}</p>
        </div>
      `;

        musicWrapper.append(card);
      });

      // handle music player functionality
      handleMusicPlayer();

      // handle artist music functionality
      handleLoadingArtistMusic();
    } else {
      musicWrapper.className = "music-cards-wrapper";
      musicWrapper.innerHTML = `<div class="empty-wrapper"><h3 class="center-align f-size-med">No music currently</p></div>`;
    }
  })
  .catch((err) => {
    console.log(err);
  });

// handle search functionality
const searchForm = document.querySelector("form.search-form");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  HandleHttpRequests.handleMusicSearch(searchForm)
    .then((result) => {
      const Music = result;

      musicWrapper.innerHTML = "";
      musicWrapper.parentElement.querySelector("h3.hdr").innerHTML =
        "Search results";

      if (Music.length > 0) {
        musicWrapper.className = "music-cards-wrapper grd grd-cl-5";
        Music.forEach((music, index) => {
          const card = document.createElement("div");
          card.className = "card-wrapper backdrop";
          card.setAttribute("data-target", `${music.filename}`);
          card.innerHTML = `
        <i class="fa fa-play" id="play-btn" data-id="${index}"></i>
        <img src="/files/${music.album}" alt="" id="album-art" srcset="" />
        <div class="card-wrapper-txt">
          <a>
          <h3 id="artist-wrapper" data-target="${music.artist}" class="primary-color">
              ${music.artist}
            </h3>
          </a>
          <p id="title-wrapper">${music.title}</p>
        </div>
      `;

          musicWrapper.append(card);
        });

        // handle music player functionality
        handleMusicPlayer();

        //// -------------
      } else {
        musicWrapper.className = "music-cards-wrapper";
        musicWrapper.innerHTML = `<div class="empty-wrapper"><h3 class="center-align f-size-med">No search results found</p></div>`;
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// handle shrinking of music play
const shrinkBtn = document.querySelector("#audio-player-shrink-btn");
const musicPlayer = document.querySelector("#audio-player");

shrinkBtn.addEventListener("click", () => {
  if (musicPlayer.classList.contains("shrinked")) {
    musicPlayer.classList.remove("shrinked");
    shrinkBtn.className = "fa fa-angle-right";
  } else {
    musicPlayer.classList.add("shrinked");
    shrinkBtn.className = "fa fa-angle-left";
  }
});

// handle fetching and loading of artists
const artistBtn = document.querySelector("#artists-btn");

artistBtn.addEventListener("click", () => {
  const musicCardsWrapper = document.querySelector(
    ".sec-1 .music-cards-wrapper"
  );

  HandleHttpRequests.handleFetchingArtistData()
    .then((result) => {
      const Artists = result;

      musicCardsWrapper.innerHTML = "";
      musicCardsWrapper.parentElement.querySelector("h3.hdr").innerHTML =
        "Artists";

      if (Artists.length > 0) {
        musicWrapper.className = "music-cards-wrapper grd grd-cl-5";
        Artists.forEach((artist) => {
          const card = document.createElement("a");
          card.setAttribute("data-target", `${artist}`);
          card.className = "card-wrapper artist-card-wrapper backdrop";
          card.innerHTML = `
          <i class="fa fa-microphone"></i>
          <div class="card-wrapper-txt">
          <h3 id="artist-wrapper" data-target="${artist}" class="f-size-reg primary-color">
                ${artist}
              </h3>
          </div>
        `;

          musicCardsWrapper.append(card);
        });

        // handle music player functionality
        handleMusicPlayer();

        // handle artist music functionality
        handleLoadingArtistMusic();
      } else {
        musicCardsWrapper.className = "music-cards-wrapper";
        musicCardsWrapper.innerHTML = `<div class="empty-wrapper"><h3 class="center-align f-size-med">No artists found</p></div>`;
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// handle fetching and loading of artist music
function handleLoadingArtistMusic() {
  const artistWrapper = [...document.querySelectorAll("#artist-wrapper")];
  const musicCardsWrapper = document.querySelector(
    ".sec-1 .music-cards-wrapper"
  );

  artistWrapper.forEach((artist) => {
    artist.addEventListener("click", () => {
      HandleHttpRequests.handleLoadingArtisMusicData(
        artist.getAttribute("data-target")
      )
        .then((result) => {
          let Music = result;

          musicCardsWrapper.innerHTML = "";
          musicCardsWrapper.className = "music-cards-wrapper";
          musicCardsWrapper.parentElement.querySelector(
            "h3.hdr"
          ).innerHTML = `artist - ${artist.getAttribute("data-target")}`;

          Music.forEach((music, index) => {
            const card = document.createElement("div");
            card.className =
              "card-wrapper music-artist-card-wrapper backdrop flx";
            card.setAttribute("data-target", `${music.filename}`);
            card.innerHTML = `
            <i class="fa fa-play" id="play-btn" data-id="${index}"></i>
            <img src="/files/${music.album}" alt="" id="album-art" srcset="" />
            <div class="card-wrapper-txt flx">
              <a>
                <h3 id="artist-wrapper" data-target="${music.artist}" class="primary-color">
                  ${music.artist}
                </h3>
              </a>
              <p id="title-wrapper">${music.title}</p>
            </div>
          `;

            musicCardsWrapper.append(card);
          });

          // handle music player functionality
          handleMusicPlayer();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
}
