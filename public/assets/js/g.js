const gme_list = document.querySelector(".allGcontainer");
const pinned_list = document.querySelector(".pinnedGcontainer");
const gmes_search = document.querySelector("input[type='text']");
let pinnedG = JSON.parse(localStorage.getItem("pinnedGLocal")) || [];
console.log(pinnedG);
let gmes_data = [];

const render_gmes = (games) => {
  gme_list.innerHTML = "";
  pinned_list.innerHTML = "";
  games.forEach((game) => {
    const card = document.createElement("div");
    const pinned_list = document.querySelector(".pinnedGcontainer");
    card.className = "g";
    if (pinnedG.includes(game.file_name)) {
      card.classList.add("pinned");
      pinned_list.appendChild(card);
    } else {
      gme_list.appendChild(card);
      
    }

    card.innerHTML = `
    <img id="pin" class="pin" src="/assets/img/pin.png" onclick="togglePin('${game.file_name}')" loading="lazy">
    <h3 class="gTitle">${game.title}</h3>
		<img onclick="open_gme('${game.file_name}')" id="gImg" class="gImg" src='https://raw.githubusercontent.com/Hydra-Network/hydra-assets/main/${game.thumb}' loading="lazy"
		alt = "" > `;
  });
};
const frame = document.getElementById("gFrame");
const pin = document.getElementById("pin");
const open_gme = async (file_name) => {
  localStorage.setItem("gName", file_name);
  frame.src = "/g/gSrc.html";
  frame.style.zIndex = "1000";
  frame.style.opacity = "1";
  const goBackBtn = document.getElementById("goBackBtn");
  goBackBtn.style.top = "20px";
  document.body.style.overflow = "hidden";
};
goBackBtn.addEventListener("click", () => {
  frame.style.zIndex = "-10";
  frame.src = "";
  document.documentElement.style.overflow = "";
  goBackBtn.style.top = "-80px";
  frame.style.opacity = "0";
  document.body.style.overflow = "visible";
});

gmes_search.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = gmes_data.filter((g) =>
    g.title.toLowerCase().includes(query),
  );
  render_gmes(filtered);
});

function togglePin(f) {
  if (pinnedG.includes(f)) {
    pinnedG = pinnedG.filter((g) => g !== f);
    1;
  } else {
    pinnedG.push(f);
  }
  localStorage.setItem("pinnedGLocal", JSON.stringify(pinnedG));
  render_gmes(gmes_data);
}

(async () => {
  try {
    const res = await fetch(
      "https://cdn.jsdelivr.net/gh/Hydra-Network/bromine@main/src/data/gmes.json",
    );
    gmes_data = await res.json();
    render_gmes(gmes_data);
  } catch (err) {
    console.error("Could not load gmes JSON:", err);
    gme_list.innerHTML = "<p class='text-love'>Failed to load games.</p>";
  }
})();
