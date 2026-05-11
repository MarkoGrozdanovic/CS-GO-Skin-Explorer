import { getCategorySkins } from "../helpers/categorySkinsHelper";
import { Skin } from "../interfaces/Skin";
import { setupDetails } from "./detailsService"
import { updateView, updateViewForFavorites } from "./pagination/pagination";
import { renderSkins } from "./selectCategory";


const input = document.getElementById("search-input") as HTMLInputElement;


export const search = (): void => {
  input.addEventListener("input", handleInput);
  input.addEventListener("change", handleInput);
};

const handleInput = (e: Event):void => {
    const skins = getCategorySkins();

    const filtered:Skin[] = skins.filter((skin) => {
      return skin.name
        .toLowerCase()
        .includes((e.currentTarget as HTMLInputElement).value.toLowerCase());
    });

    localStorage.setItem("skins", JSON.stringify(filtered));
    
    renderSkins(filtered);
    setupDetails();
    updateView(1);

    localStorage.setItem("skins", JSON.stringify(skins))
}
