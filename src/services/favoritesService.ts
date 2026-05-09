import { getFavorites, saveFavorites } from "../helpers/favoritesHelper";
import { Skin } from "../interfaces/Skin";
import { setupDetails } from "./detailsService";
import { updateView, updateViewForFavorites } from "./pagination/pagination";
import { search } from "./searchService";
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
  const favButton = document.getElementById(
    "show-favorites",
  ) as HTMLButtonElement;
  

  favButton!.addEventListener("click", () => {
    const buttons = document.querySelectorAll<HTMLButtonElement>(
      ".category-guns button",
    );
    // remove active from all
    buttons.forEach((b) => b.classList.remove("active"));
    favButton.classList.add("active");
    setInputSrchToDsbld();

    const favorites = getFavorites();

    const filtered = allSkins.filter((skin) => favorites.includes(skin.id));

    renderSkins(filtered);
    updateViewForFavorites(1);
    setupFavorites();
    setupDetails();
  });
};

export const setInputSrchToDsbld = (disabled: boolean=true) => {
    const input = document.getElementById("search-input") as HTMLInputElement;
    
    if(disabled)
      input.disabled = true;
    else  
      input.disabled = false; 
}