const musicTab = document.querySelector("section.sec-2 .music-cards");

const handleMusicFetch = async () => {
  try {
    const res = await fetch("/music/fetch", {
      method: "POST",
      body: JSON.stringify({
        loadded: "Page loaded",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    let MusicArr = "";

    if (data.music) {
      MusicArr = data.music;
    }

    if (MusicArr.length > 0) {
      MusicArr.forEach((music, key) => {
        let div = document.createElement("div");
        div.className = "music-card play-btn";
        div.setAttribute("data-switch", `${key}`);
        div.setAttribute("data-target", `${key}`);
        div.innerHTML = `
                <img src="/images/album-${
                  Math.floor(Math.random() * 3) + 1 <= 0
                    ? 1
                    : Math.floor(Math.random() * 3) + 1
                }.jpg" alt="" srcset="" />
                <div class="txt">
                <p>${music.title}</p>
                <h3 class="f-size-reg">${music.artist}</h3>
                </div>
                `;

        musicTab.append(div);
      });
    }
  } catch (error) {
    let err = error;
  }
};

handleMusicFetch();
