import { getFavorites, saveFavorites } from "../helpers/favorites";
import { Skin } from "../interfaces/Skin";
import { renderSkins } from "./selectCategory";

export const setupFavorites = () => {
  const favButons =
    document.querySelectorAll<HTMLButtonElement>(".favorite-btn");

  favButons.forEach((btn) => {
    const id = btn.getAttribute("data-id")!;
    let favorites = getFavorites();

    // set initial state
    if (favorites.includes(id)) {
      btn.classList.add("active");
      btn.textContent = "❤️";
    }

    btn.addEventListener("click", () => {
      favorites = getFavorites();

      if (favorites.includes(id)) {
        favorites = favorites.filter((f) => f !== id);
        btn.classList.remove("active");
        btn.textContent = "♡";
      } else {
        favorites.push(id);
        btn.classList.add("active");
        btn.textContent = "❤️";
      }

      saveFavorites(favorites);
    });
  });
};

export const showFavorites = (allSkins: Skin[]): void => {
  document.getElementById("show-favorites")!.addEventListener("click", () => {
    const favorites = getFavorites();

    const filtered = allSkins.filter((skin) => favorites.includes(skin.id));

    renderSkins(filtered);
    setupFavorites();
  });
};
