const addMusicForm = document.querySelector("form.add-music-form");

addMusicForm.addEventListener("submit", (e) => {
  e.preventDefault();

  HandleHttpRequests.handleAddingMusic(addMusicForm);
});
