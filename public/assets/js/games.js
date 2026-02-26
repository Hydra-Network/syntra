const gme_list = document.querySelector(".allGcontainer");
const gmes_search = document.querySelector("input[type='text']");

let gmes_data = [];

const render_gmes = (games) => {
  gme_list.innerHTML = "";
  games.forEach((game) => {
    const card = document.createElement("div");
    card.className = "g";
    card.innerHTML = `
<h3 class="gTitle">${game.title}</h3>
						<img class="gImg" src='https://raw.githubusercontent.com/Hydra-Network/hydra-assets/main/${game.thumb}'
		alt = "" > `;
    card.addEventListener("click", () => open_gme(game.file_name));
    gme_list.appendChild(card);
  });
};

const open_gme = async (file_name) => {
  localStorage.setItem("gName", file_name);
  const frame = document.getElementById("gFrame");
  frame.src = "/g/gSrc.html";
  frame.style.zIndex = "1000";
};

gmes_search.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = gmes_data.filter((g) =>
    g.title.toLowerCase().includes(query),
  );
  render_gmes(filtered);
});

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
