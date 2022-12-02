class HandleHttpRequests {
  /* 
    ----------- FUNCTION -------------------------------------------------------------------------------------------------------------------------------------
  */
  async handleUserSignup(form) {
    const firstnameErr = form.querySelector(".error.firstname-error");
    const lastnameErr = form.querySelector(".error.lastname-error");
    const emailErr = form.querySelector(".error.email-error");
    const phoneErr = form.querySelector(".error.phone-error");
    const passwordErr = form.querySelector(".error.password-error");

    firstnameErr.innerHTML = "";
    lastnameErr.innerHTML = "";
    emailErr.innerHTML = "";
    phoneErr.innerHTML = "";
    passwordErr.innerHTML = "";

    try {
      const res = await fetch("/accounts/signup", {
        method: "POST",
        body: JSON.stringify({
          firstname: form.firstname.value,
          lastname: form.lastname.value,
          email: form.email.value,
          phone: form.phone.value,
          password: form.password.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.response == "SUCCESS") {
        return location.assign("/account");
      }

      if (data.errors) {
        firstnameErr.innerHTML = `${data.errors.firstname}`;
        lastnameErr.innerHTML = `${data.errors.lastname}`;
        emailErr.innerHTML = `${data.errors.email}`;
        phoneErr.innerHTML = `${data.errors.phone}`;
        passwordErr.innerHTML = `${data.errors.password}`;
      }
    } catch (error) {}
  }

  /* 
    ----------- FUNCTION -------------------------------------------------------------------------------------------------------------------------------------
  */
  async handleUserSignin(form) {
    const emailErr = form.querySelector(".error.email-error");
    const passwordErr = form.querySelector(".error.password-error");

    emailErr.innerHTML = "";
    passwordErr.innerHTML = "";

    try {
      const res = await fetch("/accounts/signin", {
        method: "POST",
        body: JSON.stringify({
          email: form.email.value,
          password: form.password.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.response == "SUCCESS") {
        return location.assign("/");
      }

      if (data.errors) {
        emailErr.innerHTML = `${data.errors.email}`;
        passwordErr.innerHTML = `${data.errors.password}`;
      }
    } catch (error) {}
  }

  /* 
    ----------- FUNCTION -------------------------------------------------------------------------------------------------------------------------------------
  */
  static async handleFetchingData() {
    let MusicArr = "";
    try {
      const res = await fetch("/fetch/music-data", {
        method: "GET",
      });

      const data = await res.json();

      if (data.music) {
        MusicArr = data.music;
      }
    } catch (error) {}

    return MusicArr;
  }

  /* 
    ----------- FUNCTION -------------------------------------------------------------------------------------------------------------------------------------
  */
  static async handleMusicSearch(form) {
    const searchErr = form.querySelector(".error.search-error");

    searchErr.innerHTML = "";

    let MusicSearchArr = "";

    try {
      const res = await fetch("/fetch/search-data", {
        method: "POST",
        body: JSON.stringify({
          search: form.search.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.music) {
        MusicSearchArr = data.music;
      }

      if (data.errors) {
        searchErr.innerHTML = `${data.errors.search}`;
      }
    } catch (error) {
      console.log(error);
    }

    return MusicSearchArr;
  }

  /* 
    ----------- FUNCTION -------------------------------------------------------------------------------------------------------------------------------------
  */
  static async handleFetchingArtistData() {
    let Artists = "";
    try {
      const res = await fetch("/fetch/artist-data", {
        method: "GET",
      });

      const data = await res.json();

      if (data.artists) {
        Artists = data.artists;
      }
    } catch (error) {
      console.log(error);
    }

    return Artists;
  }

  /* 
    ----------- FUNCTION -------------------------------------------------------------------------------------------------------------------------------------
  */
  static async handleLoadingArtisMusicData(artist) {
    let result = "";

    try {
      const res = await fetch("/fetch/artist/music-data", {
        method: "POST",
        body: JSON.stringify({ artist }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      data.music ? (result = data.music) : (result = "");
    } catch (error) {
      console.log(error);
    }

    return result;
  }
}
