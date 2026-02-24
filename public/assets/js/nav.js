fetch("/nav.html")
  .then((response) => response.text())
  .then((html) => {
    const navContainer = document.createElement("div");
    navContainer.innerHTML = html;
    document.body.insertAdjacentElement("afterbegin", navContainer);
  })
  .catch((error) => {
    console.error("Error loading navigation:", error);
  });
