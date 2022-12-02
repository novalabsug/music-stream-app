class HandleHttpRequests {
  static async handleAddingMusic(form) {
    const titleErr = form.querySelector(".error.title-error");
    const artistErr = form.querySelector(".error.artist-error");
    const albumErr = form.querySelector(".error.album-error");
    const trackLengthErr = form.querySelector(".error.trackLength-error");
    const musicFileErr = form.querySelector(".error.musicFile-error");

    titleErr.innerHTML = "";
    artistErr.innerHTML = "";
    albumErr.innerHTML = "";
    trackLengthErr.innerHTML = "";
    musicFileErr.innerHTML = "";

    try {
      const res = await fetch("/fetch/music-data", {
        method: "POST",
        body: new FormData(form),
      });

      const data = await res.json();

      if (data.response) {
        return location.assign("/dashboard/add-music");
      }

      if (data.errors) {
        titleErr.innerHTML = `${data.errors.title}`;
        artistErr.innerHTML = `${data.errors.artist}`;
        albumErr.innerHTML = `${data.errors.album}`;
        trackLengthErr.innerHTML = `${data.errors.trackLength}`;
        musicFileErr.innerHTML = `${data.errors.musicFile}`;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
