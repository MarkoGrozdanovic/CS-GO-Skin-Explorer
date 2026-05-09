import { getCategorySkins } from "../helpers/categorySkinsHelper";
import { Skin } from "../interfaces/Skin";
import { setupDetails } from "./detailsService"
import { updateView, updateViewForFavorites } from "./pagination/pagination";
import { renderSkins } from "./selectCategory";

export const search = (): void => {
  const input = document.getElementById("search-input") as HTMLInputElement;

  input.addEventListener("change", (e) => {
    const skins = getCategorySkins();

    const filtered = skins.filter((skin) => {
      return skin.name
        .toLowerCase()
        .includes((e.currentTarget as HTMLInputElement).value.toLowerCase());
    });

    
    const skinsForStorage = getCategorySkins();

    localStorage.setItem("skins", JSON.stringify(filtered));

    renderSkins(filtered);
    setupDetails();
    updateView(1);

    localStorage.setItem("skins", JSON.stringify(skinsForStorage));
  });
};
