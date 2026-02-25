const gme_list = document.querySelector(".allGcontainer");
const gmes_search = document.querySelector("input[type='text']");

let gmes_data = [];

const render_gmes = (games) => {
	gme_list.innerHTML = "";
	games.forEach(game => {
		const card = document.createElement("div");
		card.className = "g"
		card.innerHTML = `
<h3 class="gTitle">${game.title}</h3>
						<img class="gImg" src='https://raw.githubusercontent.com/Hydra-Network/hydra-assets/main/${game.thumb}'
		alt = "" > `;
		card.addEventListener("click", () => open_gme_new_tab(game.file_name));
		gme_list.appendChild(card);
	});
};

const open_gme_new_tab = (file_name) => {
	fetch(`https://cdn.jsdelivr.net/gh/Hydra-Network/hydra-assets@main/${file_name}?t=${Date.now()}`)
		.then(response => response.text())
		.then(html => {
			const newWin = window.open("about:blank", "_blank");
			if (newWin) {
				newWin.document.open();
				newWin.document.write(html);
				newWin.document.close();
			} else {
				alert("Popup blocked! Please allow popups to open the game.");
			}
		})
		.catch(err => {
			console.error("Failed to load game:", err);
			alert("Failed to load game.");
		});
};

gmes_search.addEventListener("input", e => {
	const query = e.target.value.toLowerCase();
	const filtered = gmes_data.filter(g => g.title.toLowerCase().includes(query));
	render_gmes(filtered);
});

(async () => {
	try {
		const res = await fetch("https://cdn.jsdelivr.net/gh/Hydra-Network/bromine@main/src/data/gmes.json");
		gmes_data = await res.json();
		render_gmes(gmes_data);
	} catch (err) {
		console.error("Could not load gmes JSON:", err);
		gme_list.innerHTML = "<p class='text-love'>Failed to load games.</p>";
	}
})();
