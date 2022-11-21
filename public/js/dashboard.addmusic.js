const form = document.querySelector("form.add-music-form");

const titleError = form.querySelector(".form-input .input p.error.title-error");
const artistError = form.querySelector(
  ".form-input .input p.error.artist-error"
);
const albumError = form.querySelector(".form-input .input p.error.album-error");
const trackLengthError = form.querySelector(
  ".form-input .input p.error.title-error"
);
const musicFileError = form.querySelector(
  ".form-input .input p.error.musicFile-error"
);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  titleError.innerHTML = "";
  artistError.innerHTML = "";
  albumError.innerHTML = "";
  trackLengthError.innerHTML = "";
  musicFileError.innerHTML = "";

  try {
    const res = await fetch("/dashboard/add-music", {
      method: "POST",
      body: new FormData(form),
    });

    const data = await res.json();

    if (data.response) {
      location.assign("/");
    }

    if (data.errors) {
      titleError.innerHTML = data.errors.title;
      artistError.innerHTML = data.errors.artist;
      albumError.innerHTML = data.errors.album;
      trackLengthError.innerHTML = data.errors.trackLength;
      musicFileError.innerHTML = data.errors.musicFile;
    }
  } catch (error) {
    let err = error;
  }
});
